import '../scss/MainTours.scss';

export function MainTours({ mainTours, homePageLabel }) {
    return (
        <div className='MainTours'>
            <h2>{homePageLabel[0]?.label}</h2>

            <div className='container'>
                {
                    mainTours.map(el => (
                        <div className='item' key={el.id}>
                            <img src={`https://shelby-backend-live.vercel.app/${el.image}`} alt='mainTours' />

                            <div className='content'>
                                <div className='title'>{el.title}</div>
                                <div className='descr'>{el.descr}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
