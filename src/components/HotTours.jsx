import { Link } from 'react-router-dom';
import '../scss/HotTours.scss';

export function HotTours({ hotTours, homePageLabel }) {
    return (
        <div className='HotTours'>
            <h2>{homePageLabel[0]?.label}</h2>

            <div className='container'>
                {hotTours.map(el => <div key={el.id}>
                    <img src={`https://shelby-backend-services.vercel.app/${el.image}`} alt='HotTours' />
                    <div className='title'>{el.title}</div>
                    <div className='descr'>{el.descr}</div>
                    <Link to='/booking' className='btn'>{el.btn_text}</Link>
                </div>)}
            </div>
        </div>
    )
}
