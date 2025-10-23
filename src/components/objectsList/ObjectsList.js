import { useState, useEffect } from "react";
import { WordProt } from "../word-prot/wordProt";
import { EachObjEstimate } from "../eachObjEstimate/eachObjEstimate";
import { ComplexEstimate } from "../complexEstimate/complexEstimate";
import { db } from "../firebase/init";
import { getDocs, query, collection, where, getDoc, doc } from "firebase/firestore";
import { EstimateTable } from "../estimate-table/EstimateTable";
import './objectsList.css';

export const ObjectsList = () => {

    const [dataList, setDataList] = useState([]);
    const [waterData, setWaterData] = useState([]);
    const [choosedYear, setChoosedYear] = useState('2025');
    const [choosedMonth, setChoosedMonth] = useState('all');
    const [represSum, setRepresSum] = useState(0);
    const [showTable, setShowTable] = useState(false);
    const [clickedProt, setClickedProt] = useState('');

    const yearsListArr = ['2020', '2021', '2022', '2023', '2024', '2025'];

    const listFromFire = async (year, month) => {
        // const q = query(collection(db, year));
        let q;
        if (month === 'all') {
            q = query(collection(db, year));
        } else {
            q = query(collection(db, year), where('date', '>=', new Date(+year, +month)), where('date', '<', new Date(+year, +month+1)));
        }
        const querySnapshot = await getDocs(q);
        const allArr = [];
        let representedSum = 0;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date = new Date(data?.date.seconds * 1000);
          const arrData = [data?.protocol, data?.code, date, data?.sum];
          allArr.push(arrData);
          representedSum += +data?.sum;
        });
        setDataList([...allArr]);
        setRepresSum(representedSum);
        return allArr;
    };

    useEffect(()=>{
        listFromFire(choosedYear, choosedMonth);
    }, [choosedYear, choosedMonth]);

    // const cbObjClick = (ev) => {
    //     const target = ev.target;
    //     const prot = +target.getAttribute('value');
    //     console.log('target: ', target.getAttribute('value'));
    // };

    const cbDownloadWater = async () => {
        console.log('click');
        const q = query(collection(db, "works"));
        const querySnapshot = await getDocs(q);
        const allArr = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
        });
        // return allArr;
    };

    const cbChangeYear = (e) => {
        const val = e.target.value;
        if (val === choosedYear) return;
        if (val) {
            setChoosedYear(String(val));
            setChoosedMonth('all');
            // listFromFire(String(val));
        } 
    };

    const cbChangeMonth = (e) => {
        const val = e.target.value;
        if (val === choosedMonth) return;
        if (val) {
            setChoosedMonth(val);
        } 
    }

    const yearsList = yearsListArr.map((year, ind) => {
        return <option key={ind} value={year}>{year}</option>
    });

    const cbShowTable = (e) => {
        const targ = e.target;
        setShowTable(!showTable);
        const keyOfObj = targ.getAttribute('value');
        if (keyOfObj !== clickedProt) setClickedProt(keyOfObj);
    }

    const dataListShow = dataList.map( i => {
        console.log(clickedProt, i[0]);
        return (
            <div key={i[0]} className="objects-list-data" onClick={cbShowTable} value={i[0]}>
                <div className="objects-list-obj" value={i[0]}>{`${i[0]}п/${i[2]?.getFullYear()}`}</div>
                <div className="objects-list-obj" value={i[0]}>{i[1]}</div>
                <div className="objects-list-obj" value={i[0]}>{i[3]}</div>
                <div>
                    <div className="objects-list-obj" value={i[0]}>
                        <WordProt protName={i[0]} protYear={i[2]?.getFullYear()}/>
                    </div>
                    <div className="objects-list-obj" value={i[0]}>
                        <EachObjEstimate protName={i[0]} protYear={i[2]?.getFullYear()}/>
                    </div>
                </div>
                {showTable && clickedProt === String(i[0]) && <div><EstimateTable clickedProt={clickedProt} choosedYear={choosedYear} /></div>}
            </div>
        )
    });

    return (
        <div className="objects-list-main">
            <div className="objects-list-choose">
                <span>Выберите год: </span>
                <select value={choosedYear} onChange={cbChangeYear}>
                   {yearsList}
                </select>
                <select onChange={cbChangeMonth} value={choosedMonth}>
                    <option value='all'>Весь год</option>
                    <option value={0}>Январь</option>
                    <option value={1}>Февраль</option>
                    <option value={2}>Март</option>
                    <option value={3}>Апрель</option>
                    <option value={4}>Май</option>
                    <option value={5}>Июнь</option>
                    <option value={6}>Июль</option>
                    <option value={7}>Август</option>
                    <option value={8}>Сентябрь</option>
                    <option value={9}>Октябрь</option>
                    <option value={10}>Ноябрь</option>
                    <option value={11}>Декабрь</option>
                </select>
            </div>
            <div className="objects-list-sum-filtered">
                <span>Сумма за период: {represSum} руб.</span>
            </div>
            <div>
                <ComplexEstimate choosedYear={choosedYear} choosedMonth={choosedMonth}/>
            </div>
            <div className="objects-list">
                <div className="objects-list-header">
                    <div className="objects-list-header-obj">Номер протокола</div>
                    <div className="objects-list-header-obj">Номер объекта</div>
                    <div className="objects-list-header-obj">Сумма по смете</div>
                    <div className="objects-list-header-obj">Действия</div>
                </div>
                {dataListShow}
            </div>
        </div>
        
    )
}