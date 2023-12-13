import { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import '../scss/ScrollTop.scss';

export function ScrollTop() {
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', scrollTopFunc);
    }, []);

    const scrollTopFunc = () => {
        if (window.scrollY > 320) {
            setShowBtn(true);
        } else {
            setShowBtn(false);
        }
    };

    const handlerScrollTopFunc = () => {
        scroll.scrollToTop({ duration: .5 * window.scrollY });
    };

    return showBtn && (
        <div className='ScrollTop' onClick={handlerScrollTopFunc}>
            <i className='fa-solid fa-arrow-up'></i>
        </div>
    )
}
