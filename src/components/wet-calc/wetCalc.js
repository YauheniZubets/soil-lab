import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useForm} from 'react-hook-form';
import { WetCalcBack } from '../wetCalcBack/wetCalcBack';

import './wetClac.css';


export const WetCalc = (props) => {

    const mainData = useSelector(state=>state.mainData.mainData); //все образцы
    const wetData = mainData.filter(item => { // фильтр только на влажность
        return item[8] === '+';
    });
    const randomIntFromInterval = (min, max) => { // min and max included 
        return (Math.random() * (max - min + 1) + min).toFixed(2);
    };
    
    const [wetRes, setWetRes] = useState(new Array(wetData.length));
    const [viewFromBack, setviewFromBack] = useState(true);
    const { register, handleSubmit, setError, formState: { errors }, } = useForm({mode: 'onBlur'});

    const cbInputOnForm = e => {
        const targetForm = e.currentTarget; //форма
        const formId = targetForm.id;
        const eventTargetName = e.target.name; //инпут события
        const lengthInp = e.target.value.length;
        //console.log('lengthInp: ', lengthInp);
        const formData = new FormData(targetForm);
        const arrWeights = [];
        if (lengthInp === 5) {
            for (const i of formData.values()) {
                isFinite(i) && i > 0 && arrWeights.push(i);
            };
        }
        let res = null;
        if (arrWeights.length === 3) {
            res = (100 * (arrWeights[1] - arrWeights[2]) / (arrWeights[2] - arrWeights[0])).toFixed(1);
            wetRes.splice(+formId, 1, res);
            console.log(wetRes);
            setWetRes([...wetRes]);
        };
    };

    useEffect(()=> {
        // console.log(wetRes);
    })

    const onSubmit = (data) => console.log(data);
    
    const formsData = wetData.map((item, index) => { //скважины и глубины
        return (
            <div key={index}>
                <label>{item[0]}) {item[1]}-{item[2]}{item[3]} ({item[4]}-{item[5]}) м </label>
                <form className='index' onInput={cbInputOnForm} onSubmit={handleSubmit(onSubmit)} id={index} >
                    <input type='number' name={`m-${index}`}  />
                    <input type='number' name={`m1-${index}`}  />
                    <input type='number' name={`m0-${index}`}  />
                </form>
            </div>
        )
    });

    const wets = wetRes.map((item, index) => {
        return <span key={index}>{isFinite(item) ? item : '-'}</span>
    });

    return (
        <div className='wet-calc'>
            <input type='checkbox' onChange={()=>setviewFromBack(!viewFromBack)} name='view'/>
            <label htmlFor='view'>От обратного</label>
            {
                viewFromBack 
                ? 
                <div className='wet-calc-view'>
                    <div>{formsData}</div>
                    <div className='wet-res'>{wets}</div>
                </div>
                :
                <WetCalcBack wetData={wetData} />
                
            }
            <button>Сохранить в облако</button>
        </div>
    )
};