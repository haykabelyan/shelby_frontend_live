import { useState } from 'react';

export function Adults({ adults, setAdults, bookingPageLabel }) {
  const [cursor, setCursor] = useState('pointer');

  const onChangeInput = () => {
    if (adults > 1) {
      setAdults(prev => prev - 1);
      setCursor('pointer');
    } else {
      setCursor('not-allowed');
    }
  };

  return (
    <div className='Adults'>
      <div>{bookingPageLabel[0]?.adults}</div>

      <div className='btnNumbers'>
        <span onClick={onChangeInput} className='prev' style={{ cursor }}>-</span>
        <span>{adults}</span>
        <span onClick={() => setAdults((prev) => +prev + 1)} className='next'>+</span>
      </div>
    </div>
  )
}
