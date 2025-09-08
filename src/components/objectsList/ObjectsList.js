import { useState, useEffect } from "react";
import { WordProt } from "../word-prot/wordProt";
import { EachObjEstimate } from "../eachObjEstimate/eachObjEstimate";
import { ComplexEstimate } from "../complexEstimate/complexEstimate";
import { db } from "../firebase/init";
import { getDocs, query, collection } from "firebase/firestore";
import './objectsList.css';

export const ObjectsList = () => {

    const [dataList, setDataList] = useState([]);
    const [waterData, setWaterData] = useState([]);
    const [choosedYear, setChoosedYear] = useState('2024');
    const [choosedMonth, setChoosedMonth] = useState('');

    const yearsListArr = [2020, 2021, 2022, 2023, 2024, 2025];

    const listFromFire = async (year) => {
        const q = query(collection(db, year));
        const querySnapshot = await getDocs(q);
        const allArr = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date = new Date(data?.date.seconds * 1000);
          const arrData = [data?.protocol, data?.code, date, data?.sum];
          allArr.push(arrData);
        });
        setDataList([...allArr]);
        return allArr;
    };

    useEffect(()=>{
        listFromFire(choosedYear);
    }, []);

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
          console.log('data: ', data.waterData);
        });
        // return allArr;
    };

    const cbChangeYear = (e) => {
        const val = e.target.value;
        if (val === choosedYear) return;
        if (val) {
            setChoosedYear(String(val));
            listFromFire(String(val));
        } 
    };

    const cbChangeMonth = (e) => {
        const val = e.target.value;
        if (val === choosedYear) return;
        if (val) {
            setChoosedMonth(val);
        } 
    }

    const yearsList = yearsListArr.map((year, ind) => {
        return <option key={ind}>{year}</option>
    });

    const dataListShow = dataList.map((i, ind) => {
        return (
            <div key={ind} className="main-list" >
                <div className="main-list-obj" value={i[0]}>{`${i[0]}п/${i[2]?.getFullYear()}`}</div>
                <div className="main-list-obj" value={i[0]}>{i[1]}</div>
                <div className="main-list-obj" value={i[0]}>{i[3]}</div>
                <div className="main-list-obj" value={i[0]}>
                    <WordProt protName={i[0]} protYear={i[2]?.getFullYear()}/>
                </div>
                <div className="main-list-obj" value={i[0]}>
                    <EachObjEstimate protName={i[0]} protYear={i[2]?.getFullYear()}/>
                </div>
            </div>
        )
    });

    return (
        <div className="objects-list-main">
            <div className="objects-list-choose">
                <span>Выберите год: </span>
                <select onChange={cbChangeYear}>
                   {yearsList}
                </select>
                <select onChange={cbChangeMonth}>
                    <option value=''>Весь год</option>
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
            <div>
                <ComplexEstimate choosedYear={choosedYear} choosedMonth={choosedMonth}/>
            </div>
            <div className="objects-list">
                <div className="main-list">
                    <div className="main-list-obj">Номер протокола</div>
                    <div className="main-list-obj">Номер объекта</div>
                    <div className="main-list-obj">Сумма по смете</div>
                    <div className="main-list-obj">Действия</div>
                </div>
                {dataListShow}
            </div>
        </div>
        
    )
}