import { useNavigate, createSearchParams } from 'react-router-dom';

export function Tour({ id, index, name, city, hotel, transport_depart, transport_arrive, price, btn_text, selectedDataFromUser }) {
  const navigate = useNavigate();

  const handlerButton = () => {
    navigate({
      pathname: '/booking/' + id,
      search: createSearchParams(selectedDataFromUser).toString(),
    });
  };

  return (
    <tr className='Tour'>
      <td className='tour-id'>{index + 1}</td>
      <td className='tour-name'>{name}</td>
      <td className='tour-city'>{city}</td>
      <td className='tour-hotel'>{hotel}</td>
      <td className='tour-transport_depart'>{transport_depart}</td>
      <td className='tour-transport_arrive'>{transport_arrive}</td>
      <td className='tour-price'>{price}</td>

      <td>
        <button className='tour-detail-btn' onClick={handlerButton}>
          {btn_text}
        </button>
      </td>
    </tr>
  )
}
