import { useState } from 'react';

export function Rooms({ rooms, setRooms, bookingPageLabel }) {
  const [cursor, setCursor] = useState('pointer');

  const onChangeInput = () => {
    if (rooms > 1) {
      setRooms(prev => prev - 1);
      setCursor('pointer');
    } else {
      setCursor('not-allowed');
    }
  };

  return (
    <div className='Rooms'>
      <div>{bookingPageLabel[0]?.rooms}</div>

      <div className='btnNumbers'>
        <span onClick={onChangeInput} className='prev' style={{ cursor }}>-</span>
        <span>{rooms}</span>
        <span onClick={() => setRooms((prev) => +prev + 1)} className='next'>+</span>
      </div>
    </div>
  )
}
