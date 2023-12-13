import { useState } from 'react';

export function Children({ children, setChildren, bookingPageLabel }) {
  const [cursor, setCursor] = useState('pointer');

  const onChangePrevInput = () => {
    if (children > 0) {
      setChildren(prev => prev - 1);
      setCursor('pointer');
    } else {
      setCursor('not-allowed');
    }
  };

  const onChangeNextInput = () => {
    setChildren((prev) => +prev + 1);
  };

  return (
    <div className='Children'>
      <p>{bookingPageLabel[0]?.children}</p>

      <div className='btnNumbers'>
        <span onClick={onChangePrevInput} className='prev' style={{ cursor }}>-</span>
        <span>{children}</span>
        <span onClick={onChangeNextInput} className='next'>+</span>
      </div>
    </div>
  )
}
