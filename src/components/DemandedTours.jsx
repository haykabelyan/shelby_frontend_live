import '../scss/DemandedTours.scss';

export function DemandedTours({ demandedTours }) {
    return (
        <div className='DemandedTours'>
            {
                demandedTours.map(el => (
                    <div key={el.id} className='item'>
                        <div className='content'>
                            <h2>{el.title}</h2>
                            <div className='descr'>{el.descr}</div>
                        </div>

                        <div className='image'>
                            <img src={`https://shelby-backend-live.vercel.app/${el.image}`} alt='DemandedTours' />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
