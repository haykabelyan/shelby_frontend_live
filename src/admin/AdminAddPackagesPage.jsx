import React, { useEffect, useState } from 'react';
import axios from '../axios';
import '../scss/AdminAddPackagesPage.scss';

export function AdminAddPackagesPage() {

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cities, setCities] = useState([]);
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [filterFormData, setFilterFormData] = useState({ lang: 'selectLanguage', city: 'selectCity' });
  const [filteredCitiesByLang, setFilteredCities] = useState([]);
  const [data, setData] = useState({
    lang: 'en',
    name: '',
    city: 'selectCity',
    hotel: '',
    transport_depart: '',
    transport_arrive: '',
    price: '',
    btn_text: '',
  });

  useEffect(() => {
    loadingData();
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage]);


  async function loadingData() {
    try {
      const [citiesData, toursData] = await Promise.all([
        axios.get(`city?lang=${data.lang}`),
        axios.get('/tour')
      ]);

      setCities(citiesData.data);
      setTours(toursData.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const onChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeLang = (e) => {
    const selectedLang = e.target.value;
    setFilterFormData({ ...filterFormData, lang: selectedLang });

    const filteredCitiesByLangSet = new Set(tours.filter((el) => el.lang === selectedLang).map((el) => el.city));
    setFilteredCities(Array.from(filteredCitiesByLangSet));
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      if (data.city === 'selectCity') {
        return alert('Լրացրեք City դաշտը:');
      }

      if (!token) {
        alert('Token is missing. Please log in first.');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axios.post('tour/add', data, { headers });
      setSuccessMessage('Tour added successfully');

      setData({
        name: '',
        hotel: '',
        transport_arrive: '',
        transport_depart: '',
        lang: 'en',
        city: 'selectCity',
        price: '',
        btn_text: '',
      });

    } catch {
      setErrorMessage('Failed to add tour');
    }
  };


  const deleteHandler = async (id) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Token is missing. Please log in first.');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axios.post(`tour/remove/${id}`, id, { headers });
      setTours((prevTours) => {
        if (Array.isArray(prevTours)) {
          return prevTours.filter((tour) => tour.id !== id);
        } else {
          console.error('prevTours is not an array');
          return prevTours;
        }
      });
      setSuccessMessage('Tour deleted successfully');

      setFilteredTours((prevTours) => {
        if (Array.isArray(prevTours)) {
          return prevTours.filter((tour) => tour.id !== id);
        } else {
          console.error('filteredTours is not an array');
          return prevTours;
        }
      });

      if (filteredTours.length === 1) {
        setFilterFormData({
          lang: 'selectLanguage',
          city: 'selectCity'
        });
      }

    } catch {
      setErrorMessage('Failed to delete tour');
    }
  };

  const onSelectCity = (city) => {
    setFilterFormData({ ...filterFormData, city });
    const filteredCity = tours.filter(el => el.city === city);
    setFilteredTours(filteredCity);
  };

  const clearFilter = (e) => {
    e.preventDefault();
    setFilteredTours({});
    setTours(tours);
    setFilterFormData({
      lang: 'selectLanguage',
      city: 'selectCity'
    });
  };


  return (
    <div className='AdminAddPackagesPage'>
      <div className='backgroundAdmin'><span>Tours</span></div>

      <div className='message'>
        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>

      <form onSubmit={submitHandler}>
        <div className='inner'>
          <div className='inputBox'>
            <select name='lang' onChange={onChangeInput} value={data.lang}>
              <option value="en">En</option>
              <option value="ru">Ru</option>
              <option value="am">Am</option>
            </select>
          </div>

          <div className='inputBox'>
            <select name='city' value={data.city} onChange={onChangeInput}>
              <option value="selectCity" disabled>Select city *</option>
              {cities.map((el) => <option value={el.name} key={el.id}>{el.name}</option>)}
            </select>
          </div>
        </div>

        <div className='inner'>
          <div className='inputBox'>
            <div>Name *</div>
            <input type='text' name='name' value={data.name} onChange={onChangeInput} required />
          </div>

          <div className='inputBox'>
            <div>Hotel *</div>
            <input type='text' name='hotel' value={data.hotel} onChange={onChangeInput} required />
          </div>
        </div>

        <div className='inner'>
          <div className="inputBox">
            <div>Transport depart *</div>
            <input type='text' value={data.transport_depart} onChange={onChangeInput} name='transport_depart' required />
          </div>

          <div className="inputBox">
            <div>Transport arrive *</div>
            <input type='text' value={data.transport_arrive} onChange={onChangeInput} name='transport_arrive' required />
          </div>
        </div>

        <div className='inner'>
          <div className="inputBox">
            <div>Price *</div>
            <input type='text' value={data.price} onChange={onChangeInput} name='price' required />
          </div>

          <div className="inputBox">
            <div>Action *</div>
            <input type='text' value={data.btn_text} onChange={onChangeInput} name='btn_text' required />
          </div>
        </div>

        <input type='submit' value='Add New Tour' />
      </form>

      <div className='midSection'>All Tours</div>

      <form className='tourFilterForm' onSubmit={clearFilter}>

        <select name='lang' onChange={onChangeLang} value={filterFormData.lang}>
          <option value="selectLanguage" disabled>Select language *</option>
          <option value="en">En</option>
          <option value="ru">Ru</option>
          <option value="am">Am</option>
        </select>

        <select name='city' value={filterFormData.city} onChange={(e) => onSelectCity(e.target.value)}>
          <option value="selectCity" disabled>Select city *</option>
          {filteredCitiesByLang.map((el) => <option value={el.city} key={el.id}>{el}</option>)}
        </select>

        <input type='submit' value='Clear Filter' />

      </form>

      <div className='allTours'>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Lang</th>
              <th>Name</th>
              <th>City</th>
              <th>Hotel</th>
              <th>Transport depart</th>
              <th>Transport arrive</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {(filteredTours.length > 0 ? filteredTours : tours).map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.lang}</td>
                <td>{el.name}</td>
                <td>{el.city}</td>
                <td>{el.hotel}</td>
                <td>{el.transport_depart}</td>
                <td>{el.transport_arrive}</td>
                <td>
                  <button onClick={() => deleteHandler(el.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}