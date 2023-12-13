import { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import '../scss/OurRatings.scss';

export function OurRatings({ ourRatings, homePageLabel }) {
    const [counter, setCounter] = useState(false);

    return (
        <div className='Ratings'>
            <h2>{homePageLabel[0]?.label}</h2>

            <div className='container'>
                {
                    ourRatings.map(el => <div key={el.id} className='content'>
                        <ScrollTrigger onEnter={() => setCounter(true)}>
                            {counter && <CountUp className='rating' start={0} end={el.rating} duration={5} />}
                        </ScrollTrigger>

                        <div className='title'>{el.title}</div>
                        <div className='descr'>{el.descr}</div>
                    </div>)
                }
            </div>
        </div>
    )
}
