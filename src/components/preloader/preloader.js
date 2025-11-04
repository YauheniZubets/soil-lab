import loader from './load.svg';
import './preloader.css';

export const Preloader = () => {

    return (
        <div className="preloader">
            <div className='pleloader-icon'>
                <img src={loader} alt='loader' />
            </div>
        </div>
    )
}