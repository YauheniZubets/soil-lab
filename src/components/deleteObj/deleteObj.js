import { useDispatch } from 'react-redux';
import { delObjectRequested } from '../../saga/actions';
import delIcon from './delete.svg';
import './deleteObj.css';

export const DeleteObj = (props) => {

    const {prot, choosedYear} = props;

    const dispatch = useDispatch();

    const cbDel = (ev) => {
        if (!ev) return;
        // console.log('del', prot, choosedYear);
        dispatch(delObjectRequested([prot, choosedYear]));
    }

    return (
        <div className='DeleteObj-overlaw'>
            <img src={delIcon} onClick={cbDel}  alt='Удалить объект'/>
        </div>
    ) 
    
}