import { useEffect, useState } from 'react';

export function Checkin({ checkin, setCheckin, bookingPageLabel }) {
  const [minValue, setMinValue] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinValue(today);
  }, []);

  return (
    <div className='date-input-container'>
      <div>{bookingPageLabel[0]?.checkIn}</div>
      <input min={minValue} type='date' value={checkin} onChange={(e) => setCheckin(e.target.value)} />
    </div>
  )
}
