import { useEffect, useState } from 'react';

export function Checkout({ checkin, checkout, setCheckout, bookingPageLabel }) {
  const [minValue, setMinValue] = useState('');

  useEffect(() => {
    if (checkin) {
      const checkinDate = new Date(checkin);
      checkinDate.setDate(checkinDate.getDate() + 1);
      setMinValue(checkinDate.toISOString().split('T')[0]);
    } else {
      const today = new Date().toISOString().split('T')[0];
      setMinValue(today);
    }
  }, [checkin]);


  return (
    <div className='date-input-container'>
      <div>{bookingPageLabel[0]?.checkOut}</div>
      <input id='checkout' type='date' min={minValue} value={checkout} onChange={(e) => setCheckout(e.target.value)} />
    </div>
  )
}
