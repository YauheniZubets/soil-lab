import { useState, useEffect } from "react";
import { ExportXLSX } from "../exportXLSX/exportXLSC";
import { ComplexEstimate } from "../complexEstimate/complexEstimate";
import { price, factors2017, factorsCurrent, factorsMonth2024, factorsMonth2025, factorsMonth2026, computerTech } from "../../base-data/price";
import { useSelector, useDispatch } from "react-redux";
import { setEstimateStatus } from "../../redux/closeEstimateReducer";
import { db } from "../firebase/init";
import { collection, addDoc, setDoc, updateDoc, getDoc, doc, query, where, getDocs } from "firebase/firestore";
import ExcelDateToJSDate from "../../base-data/convertDate";
import { Link } from "react-router-dom";
import closeImg from './icons8-close.svg';
import './estimate.css';

export const Estimate = (props) => {
    const codeFromRed = useSelector(state=>state.code);
    const protocolFromRed = useSelector(state=>state.protocol);
    const dateFromRed = useSelector(state=>state.dateWorking);
    const kbData = useSelector(state=>state.kbData);
    const kstData = useSelector(state=>state.kstData);
    const waterData = useSelector(state=>state.waterData);
    const allQuan = useSelector(state=>state.allQuan);
    const description = useSelector(state=>state.description);
    const mainData = useSelector(state=>state.mainData);
    const headers = useSelector(state=>state.headers);
    const [isExistObj, setIsExist] = useState(false);
    const [isExistStatus, setIsExistStatus] = useState('');
    const [table, setTable] = useState(true);
    const [scaled, setScaled] = useState(false);
    // console.log(codeFromRed.code, protocolFromRed.protocol, dateFromRed.dateWorking, allQuan.allQuan, description.description);
    const dispatch = useDispatch();

    const head = price.map((nm, index) => { //
        return <td key={index}>{nm.name}</td>
    });

    const quanList = allQuan.allQuan.map((indi, index) => {
        if (headers.headers.length) return <td key={index}>{indi}</td>
    });

    const priceList = price.map((pr, index) => {
        return <td key={index}>{pr.price}</td>
    });

    const waterDataNoNested = waterData.waterData.map((item, index) => {
        const ob = {watData: item};
        return ob;
    });

    let sum = 0;

    const summary = price.map((price, index) => {
        sum += price.price * allQuan.allQuan[index];
        return <td key={index}>{price.price * allQuan.allQuan[index]}</td>
    });

    const dateNormalized = ExcelDateToJSDate(dateFromRed.dateWorking);
    const estimateMonth = dateNormalized.getMonth();
    const estimateYear = dateNormalized.getFullYear();
    const currentYear = new Date().getFullYear();
    const currentIndex = (yearArr, month) => { //подсчет индексов ДОПИСАТЬ в формулу!!
        let sum = yearArr[0];
        for (let i = 1; i <= month; i++) sum *= yearArr[i];
        return sum.toFixed(4);
    };
    const sum2017 = (sum * 1000 * computerTech * factors2017).toFixed(2);
    const sumRes = (sum2017 * factorsCurrent * factorsMonth2024).toFixed(2);

    const writeSumInFire = async () => {
        try {
            const docRef = await setDoc(doc(db, `${estimateYear}`, String(protocolFromRed.protocol)), {
                protocol: protocolFromRed.protocol,
                code: codeFromRed.code,
                date: dateNormalized,
                sum: sumRes,
                waterData: waterDataNoNested, // инфа по воде
                allQuan: allQuan.allQuan
            });
            setIsExistStatus('Записано успешно');
            // alert('Записано успешно');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const getSumIfExist = async () => {
        const docRef = doc(db, `${estimateYear}`, String(protocolFromRed.protocol));
        const docSnap = await getDoc(docRef);
        const resCode = await docSnap.data()?.code;
        if (resCode === codeFromRed.code) {
            if (isExistObj === false) {
                setIsExist(true);
                setIsExistStatus('Этот объект уже в базе')
            }
            console.log('в базе');
        } else {
            writeSumInFire();
            isExistObj && setIsExist(false);
        }
    };

    const cbCloseComp = (ev) => { //закрыть комп estimate
        dispatch(setEstimateStatus(false));
    };

    useEffect(() => {
        if (codeFromRed.code) {
            getSumIfExist();
        }
    }, [codeFromRed.code]);

    useEffect(() => {
        if (isExistStatus) setTimeout(()=> setIsExistStatus(''), 5000);
    }, [isExistStatus]);

    // console.log('render');
    return (
        <div>
                 {isExistObj && <div>{isExistStatus}</div>}
                 <div className="estimate-descr">
                    <div>{codeFromRed.code}</div>
                    <div>{description.description}</div>
                </div>
                 {headers.headers.length > 0 && table && 
                     <div className="table-brd">
                         <table className="estimate-table">
                             <thead>
                                 <tr>
                                     <td/>
                                     {head}
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr>
                                     <td>Количество</td>
                                     {quanList}
                                 </tr>
                                 <tr>
                                     <td>Цена за ед.</td>
                                     {priceList}
                                 </tr>
                                 <tr>
                                     <td>Сумма</td>
                                     {summary}
                                 </tr>
                                 <tr>
                                     <td>Итого с учетом коэффициентов на январь 2017</td>
                                     <td>{sum2017}</td>
                                 </tr>
                                 <tr>
                                     <td>Итого с учетом коэффициентов на текущий месяц</td>
                                     <td>{sumRes}</td>
                                 </tr>
                             </tbody>
                         </table>
                         <div className={`close-btn`} onClick={cbCloseComp}>
                             <img src={closeImg} alt='close' />
                         </div>
                     </div>
                 }
                 {
                     headers.headers.length > 0 &&
                     <div className="estimate-buttons">
                         <ExportXLSX sum2017={sum2017} sumRes={sumRes} code={codeFromRed.code}/>
                         <Link to={`/wet-calc`}>Рассчитать влажность</Link>
                     </div>
                 }
        </div>
    )
}