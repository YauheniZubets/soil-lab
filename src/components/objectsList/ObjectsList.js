import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { WordProt } from "../word-prot/wordProt";
import { EachObjEstimate } from "../eachObjEstimate/eachObjEstimate";
import { ComplexEstimate } from "../complexEstimate/complexEstimate";
import { DeleteObj } from "../deleteObj/deleteObj";
import { db } from "../firebase/init";
import { getDocs, query, collection, where, getDoc, doc, limit, startAfter } from "firebase/firestore";
import { EstimateTable } from "../estimate-table/EstimateTable";
import { MonthEstimate } from "../monthEstimate/monthEstimate";
import { PaginationRounded } from "../pagination/Pagination";
import './objectsList.css';

export const ObjectsList = () => {

    const [dataList, setDataList] = useState([]);
    const [waterData, setWaterData] = useState([]);
    const [choosedYear, setChoosedYear] = useState('2026');
    const [choosedMonth, setChoosedMonth] = useState('all');
    const [represSum, setRepresSum] = useState(0);
    const [showTable, setShowTable] = useState(false);
    const [clickedProt, setClickedProt] = useState('');
    const [page, setPage] = useState(1);
    const [pageSnap, setPageSnap] = useState(null);

    const loadStatus = useSelector(state => state.loadStatus);

    const yearsListArr = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
    
    //!!!!!!длина массива для пагинатора
    // !!! подргружает только 10, и сумма только загруженных 10 объектов
    
    const listFromFire = async (year, month) => {
        let q;
        if (month === 'all') {
            q = query(collection(db, year));
        } else {
            q = query(collection(db, year), 
            where('date', '>=', new Date(+year, +month)), 
            where('date', '<', new Date(+year, +month+1)));
        }
        const querySnapshot = await getDocs(q);
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]; // для пагинации послед страница отображения
        const allArr = [];
        let representedSum = 0;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date = new Date(data?.date.seconds * 1000);
          const arrData = [data?.protocol, data?.code, date, data?.sum];
          allArr.push(arrData);
          representedSum += +data?.sum;
        });
        allArr.sort((a, b) => a[0] - b[0]);
        setDataList([...allArr]);
        console.log('allArr: ', allArr);
        setRepresSum(representedSum.toFixed(2));
        return allArr;
    };

    useEffect(()=>{
        listFromFire(choosedYear, choosedMonth);
    }, [choosedYear, choosedMonth, loadStatus.objLoaded]);

    const cbDownloadWater = async () => {
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
    };

    const changePage = (pageFromPagination) => {
        if (pageFromPagination !== page) setPage(pageFromPagination);
    }

    const itemsPerPage = 10;
    const indexOfLast = page * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const dataListShow = dataList.map( (i, ind) => {
        if (ind >= indexOfFirst && ind < indexOfLast) {
            return (
                <div key={i[0]} className="objects-list-data" onClick={cbShowTable} value={i[0]}>
                    <div className="objects-list-obj" value={i[0]}>{`${i[0]}п/${i[2]?.getFullYear()}`}</div>
                    <div className="objects-list-obj" value={i[0]}>{i[1]}</div>
                    <div className="objects-list-obj" value={i[0]}>{i[3]}</div>
                    <div className="container-buttons">
                        <div className="objects-list-obj" value={i[0]}>
                            <WordProt protName={i[0]} protYear={i[2]?.getFullYear()}/>
                        </div>
                        <div className="objects-list-obj" value={i[0]}>
                            <EachObjEstimate protName={i[0]} protYear={i[2]?.getFullYear()}/>
                        </div>
                        <DeleteObj prot={i[0]} choosedYear={choosedYear}/>
                    </div>
                    {showTable && clickedProt === String(i[0]) && <div><EstimateTable clickedProt={clickedProt} choosedYear={choosedYear} /></div>}
                </div>
            )
        }
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
                {loadStatus.isExist && <span>Уже в базе</span>}
                <div className="objects-list-month-estimate">
                    {choosedMonth !== 'all' && <MonthEstimate choosedYear={choosedYear} choosedMonth={choosedMonth} />}
                </div>
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
                    <div className="objects-list-header-obj">Сумма по смете, руб</div>
                    <div className="objects-list-header-obj">Действия</div>
                </div>
                {dataListShow}
            </div>
            <div className="Pagination">
                <PaginationRounded pageFunc={changePage} itemsPerPage={itemsPerPage} totalItems={dataList.length || 10} />
            </div>
        </div>
        
    )
}