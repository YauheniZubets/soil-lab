import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';
import wetReducer from '../../redux/wetReducer';


export const WetCalcBack = (props) => {

    const {wetData} = props;
    const dataMass = useSelector(state=>state.wetDataMass);

    const randomIntFromInterval = (min, max) => { // min and max included 
        return (Math.random() * (max - min + 1) + min).toFixed(2);
    };

    const [wetResBack, setWetResBack] = useState(new Array(wetData.length));
    const [emptyBuxArr, setEmptyBuxArr] = useState(wetData.map(item => randomIntFromInterval(21.00, 26.00)));
    const [dryBuxArr, setDryBuxArr] = useState(wetData.map(item => randomIntFromInterval(40.00, 50.00)));

    const cbInputOnFormBack = e => {
        const targetForm = e.currentTarget; //форма
        const formId = targetForm.id;
        const eventTargetName = e.target.name; //инпут события
        const lengthInp = e.target.value.length;
        const formData = new FormData(targetForm);
        const emp = emptyBux[formId].props.children;
        const dry = dryBux[formId].props.children;
        const arrWeights = [];
        if (lengthInp === 4) {
            arrWeights.push(emp, dry);
            for (const i of formData.values()) {
                arrWeights.push(i);
            };
        };
        let res = null;
        if (arrWeights.length === 3) {
            res = (+arrWeights[1] + ((arrWeights[2] / 100) * (arrWeights[1]-arrWeights[0]))).toFixed(2);
            wetResBack.splice(+formId, 1, res);
            setWetResBack([...wetResBack]);
        };
    };

    const formsDataBack = wetData.map((item, index) => { //скважины и глубины
        return (
            <div key={index}>
                <label>{item[0]}) {item[1]}-{item[2]}{item[3]} ({item[4]}-{item[5]}) м </label>
                <form className='index' onInput={cbInputOnFormBack}  id={index} >
                    <input type='number' name={`w-${index}`}  />
                </form>
            </div>
        )
    });

    const emptyBux = emptyBuxArr.map((item, index) => {
        return <div key={index}>{item}</div>
    });
    const dryBux = dryBuxArr.map((item, index) => {
        return <div key={index}>{item}</div>
    });
    const wetBux = wetResBack.map((item, index) => {
        return <div key={index}>{item ? item : '-'}</div>
    });
    console.log(wetResBack);

    const cbKeyDown = (e) => {
        const targ = e.target;
        const r = targ.parentElement;
        // console.log('r: ', r);
        // console.log('targ: ', targ);
    }

    return (
        <div className='wet-calc-view' onKeyDown={cbKeyDown}>
            <div>{formsDataBack}</div>
            <div>Вес пустого бюкса</div>
            <div className='wet-bux'>
                {emptyBux}
            </div>
            <div>Высушенный бюкс</div>
            <div className='wet-bux'>
                {dryBux}
            </div>
            <div>Влажный бюкс</div>
            <div className='wet-bux'>{wetBux}</div>
        </div>
    )
}

