import { useEffect } from 'react';
import { useState, useRef } from 'react';

export function SearchCity({ cities, selectedCity, bookingPageLabel, setSelectedCity }) {
  const [dropdown, setDropDown] = useState(false);
  const bookingRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutSide);
  }, []);

  const onChangeInput = (e) => {
    setSelectedCity(e.target.value);

    if (selectedCity.length > 1 && cityIncludes()) {
      setDropDown(true);
    } else {
      setDropDown(false);
    }
  };

  const handleClickOutSide = (e) => {
    try {
      if (!bookingRef.current.contains(e.target)) setDropDown(false);
    } catch { }
  };

  const handeClickListItem = async (name) => {
    await setDropDown(false);
    setSelectedCity(name);
  };

  const cityIncludes = () => {
    for (let i = 0; i < cities.length; i++) {
      let inputValue = selectedCity.toLowerCase();

      if (cities[i].name.toLowerCase().includes(inputValue)) {
        setDropDown(true);
        return true;
      }
    }

    return false;
  };

  return (
    <div className='SearchCity' ref={bookingRef}>
      <div className='searchBar'>
        <i className='fa-solid fa-hotel'></i>

        <input type='search'
          value={selectedCity}
          onChange={onChangeInput}
          onClick={() => setDropDown(true)}
          placeholder={bookingPageLabel[0]?.inputPlaceholder} />
      </div>

      <ul className={dropdown ? 'activeUl' : ''}>
        {
          cities
            .filter(el => el.name.toLowerCase().includes(selectedCity.toLowerCase()))
            .map(el => <li key={el.id} onClick={() => handeClickListItem(el.name)}>
              <i className="fa-solid fa-location-dot"></i>
              {el.name}
            </li>)
        }
      </ul>
    </div>
  )
}
