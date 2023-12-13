import { useEffect, useState, useRef } from 'react';
import { SearchCity } from '../components/SearchCity';
import { Checkin } from '../components/Checkin';
import { Checkout } from '../components/Checkout';
import { Adults } from '../components/Adults';
import { Children } from '../components/Children';
import { ChildAge } from '../components/ChildAge';
import { Rooms } from '../components/Rooms';
import { Tour } from '../components/Tour';
import { getSavedDataFromLocalStorage } from '../components/Header';
import axios from '../axios';
import '../scss/BookingPage.scss';

export function BookingPage() {
  const currentLanguage = localStorage.getItem('shelby-Language') || 'en';
  const savedData = localStorage.getItem('fetchedData');
  const [dropdown, setDropDown] = useState(false);
  const controlCheckPersonRef = useRef(null);
  const [cities, setCities] = useState([]);
  const [bookingPageLabel, setBookingPageLabel] = useState({});
  const [tours, setTours] = useState([]);
  const [adults, setAdults] = useState('1');
  const [rooms, setRooms] = useState('1');
  const [children, setChildren] = useState('0');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [childrenAge, setChildrenAge] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [tableShow, setTableShow] = useState(false);
  const [result, setResult] = useState({});

  useEffect(() => {
    loadingData();
    window.scrollTo(0, 0);
    window.addEventListener("mousedown", handleClickOutSide);
  }, [savedData]);

  useEffect(() => {
    let arr = [];

    for (let i = 0; i < +children; i++) {
      arr.push(i);
    }

    setChildrenAge(arr);
  }, [children]);

  async function loadingData() {
    const data = getSavedDataFromLocalStorage();
    if (data) {
      setBookingPageLabel(data.bookingPageLabelData);
      setCities(data.citiesData);
    }

    if (sessionStorage.getItem('shelbyBookingPage')) {
      loadDataInSessionStorage();
    }
  }

  const handleClickOutSide = (e) => {
    try {
      if (!controlCheckPersonRef.current.contains(e.target)) setDropDown(false);
    } catch (error) { }
  };

  const closeTableHandler = () => {
    sessionStorage.clear();
    setTableShow(false);
    setSelectedCity('');
    setCheckin('');
    setCheckout('');
    setRooms('1');
    setAdults('1');
    setChildren('0');
  };

  const loadDataInSessionStorage = async () => {
    const result = JSON.parse(sessionStorage.getItem('shelbyBookingPage'));
    await setSelectedCity(result.selectedCity);
    await setCheckin(result.checkin);
    await setCheckout(result.checkout);
    await setRooms(result.rooms);
    await setAdults(result.adults);
    await setChildren(result.children);
    await setChildrenAge(JSON.parse(result.childageArr));

    setTimeout(() => {
      const childageArr = document.querySelectorAll('.childage-container .childeAge');
      const childAgeInSession = JSON.parse(result.childageArr);

      for (let i = 0; i < childageArr.length; i++) {
        childageArr[i].value = childAgeInSession[i];
      }
    }, 500);

    const toursData = await axios.get(`tour/city?lang=${currentLanguage}&city=${result.selectedCity}`);
    setTours(toursData.data);

    setResult({
      selectedCity: result.selectedCity,
      checkin: result.checkin,
      checkout: result.checkout,
      rooms: result.rooms,
      adults: result.adults,
      children: result.children,
      childageArr: result.childageArr
    });

    setTableShow(true);
  };

  const submitSearchPackages = async () => {
    if (!selectedCity || !checkin || !checkout) {
      return alert(bookingPageLabel[0].requiredFieldsMsg);
    }

    const childageArr = document.querySelectorAll('.childage-container .childeAge');
    const ages = [];

    for (let i = 0; i < childageArr.length; i++) {
      if (childageArr[i].value === bookingPageLabel[0].childrenAge) {
        return alert(bookingPageLabel[0].specifyChildAgeMsg);
      }

      ages.push(childageArr[i].value);
    }

    const toursData = await axios.get(`tour/city?lang=${currentLanguage}&city=${selectedCity}`);
    setTours(toursData.data);

    setResult({
      selectedCity,
      checkin,
      checkout,
      rooms,
      adults,
      children,
      childageArr: JSON.stringify(ages)
    });

    sessionStorage.setItem('shelbyBookingPage', JSON.stringify({
      selectedCity,
      checkin,
      checkout,
      rooms,
      adults,
      children,
      childageArr: JSON.stringify(ages)
    }));

    setTableShow(true);
  };

  return (
    <div className='BookingPage'>
      <div className='background'></div>

      <div className='search'>
        <div className='check-city'>
          <SearchCity
            cities={cities}
            selectedCity={selectedCity}
            bookingPageLabel={bookingPageLabel}
            setSelectedCity={setSelectedCity}
          />
        </div>

        <div className='check-date'>
          <Checkin checkin={checkin} setCheckin={setCheckin} bookingPageLabel={bookingPageLabel} />
          <i className="fa-solid fa-arrow-right-arrow-left"></i>
          <Checkout checkin={checkin} checkout={checkout} setCheckout={setCheckout} bookingPageLabel={bookingPageLabel} />
        </div>

        <div className='check-person' ref={controlCheckPersonRef} onClick={() => setDropDown(true)}>
          <div className='title'>
            <span>{rooms}</span> {bookingPageLabel[0]?.rooms}
          </div>

          <div className='circle'></div>

          <div className='title'>
            <span>{adults}</span> {bookingPageLabel[0]?.adults}
          </div>

          <div className='circle'></div>

          <div className='title'>
            <span>{children}</span> {bookingPageLabel[0]?.children}
          </div>

          <div className={dropdown ? 'controlCheckPerson activeCheckPerson' : 'controlCheckPerson'}>
            <Rooms rooms={rooms} setRooms={setRooms} bookingPageLabel={bookingPageLabel} />
            <Adults adults={adults} setAdults={setAdults} bookingPageLabel={bookingPageLabel} />
            <Children children={children} setChildren={setChildren} bookingPageLabel={bookingPageLabel} />

            {
              children > 0 && <div className='childage-container'>
                {childrenAge.map((el, index) => <ChildAge key={index} bookingPageLabel={bookingPageLabel} />)}
              </div>
            }
          </div>
        </div>

        <button onClick={submitSearchPackages}>SEARCH</button>
      </div>

      {
        tableShow &&
        <div className='tours-container'>
          <i className="fa-solid fa-xmark closeTable" onClick={closeTableHandler}></i>

          <div className='tours'>
            <table>
              <thead>
                <tr>
                  {
                    bookingPageLabel && bookingPageLabel[0].table_headings.split('/')
                      .map((el, index) => <th key={index}>{el}</th>)
                  }
                </tr>
              </thead>

              <tbody>
                {
                  tours.map((el, index) => <Tour
                    {...el}
                    key={el.id}
                    index={index}
                    selectedDataFromUser={result}
                  />)
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  )
}
