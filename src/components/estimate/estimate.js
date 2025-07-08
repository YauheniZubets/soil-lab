import { useState, useEffect } from "react";
import { ExportXLSX } from "../exportXLSX/exportXLSC";
import { ComplexEstimate } from "../complexEstimate/complexEstimate";
import { price, factors2017, factorsCurrent, factorsMonth2024, factorsMonth2025, factorsMonth2026, computerTech } from "../../base-data/price";
import { useSelector } from "react-redux";
import { db } from "../firebase/init";
import { collection, addDoc, setDoc, updateDoc, getDoc, doc, query, where, getDocs } from "firebase/firestore";
import ExcelDateToJSDate from "../../base-data/convertDate";
import { Link } from "react-router-dom";
import './estimate.css';

export const Estimate = (props) => {
    const {header, quantity, code} = props;
    console.log('quantity: ', quantity);
    const codeFromRed = useSelector(state=>state.code);
    const protocolFromRed = useSelector(state=>state.protocol);
    const dateFromRed = useSelector(state=>state.dateWorking);
    const kbData = useSelector(state=>state.kbData);
    const kstData = useSelector(state=>state.kstData);
    const waterData = useSelector(state=>state.waterData);
    const allQuan = useSelector(state=>state.allQuan);
    // const mainData = useSelector(state=>state.mainData);
    const [isExistObj, setIsExist] = useState(false);
    const kbPrice = 95000;
    const kstPrice = 30000;
    const waterPrice = 105000;

    const head = price.map((nm, index) => { //
        return <td key={index}>{nm.name}</td>
    });

    // const quanList = quantity.map((indi, index) => {
    //     if (header.length) return <td key={index}>{indi}</td>
    // });
    const quanList = allQuan.allQuan.map((indi, index) => {
        if (header.length) return <td key={index}>{indi}</td>
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
        sum += price.price * quantity[index];
        return <td key={index}>{price.price * quantity[index]}</td>
    });

    const summaryKbKstW = (strt) => {
        strt += kbPrice * kbData.kbData?.length;
        strt += kstPrice * kstData.kstData?.length;
        strt += waterPrice * waterData.waterData?.length;
        return strt;
    };

    sum += summaryKbKstW(0); //грунты + кб + кст + вода

    const dateNormalized = ExcelDateToJSDate(dateFromRed.dateWorking);
    const estimateMonth = dateNormalized.getMonth();
    const estimateYear = dateNormalized.getFullYear();
    const currentYear = new Date().getFullYear();
    const currentIndex = (yearArr, month) => {
        let sum = yearArr[0];
        for (let i = 1; i <= month; i++) sum *= yearArr[i];
        return sum.toFixed(4);
    };
    const sum2017 = (sum * computerTech * factors2017).toFixed(2);
    const sumRes = (sum2017 * factorsCurrent * factorsMonth2024 * currentIndex(factorsMonth2025, estimateMonth)).toFixed(2);

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
            alert('Записано успешно');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const getSumIfExist = async () => {
        const docRef = doc(db, "works", String(protocolFromRed.protocol));
        const docSnap = await getDoc(docRef);
        const resCode = await docSnap.data()?.code;
        if (resCode === codeFromRed.code) {
            setIsExist(true);
            alert(`Этот объект ${codeFromRed.code} уже был сохранен ранее`);
        } else {
            writeSumInFire();
        }
    }

    useEffect(() => {
        if (codeFromRed && dateFromRed && sum) {
            getSumIfExist();
        }
    }, [codeFromRed]);

    return (
        <div>
            {isExistObj && <div>Этот объект уже в базе</div>}
            {header.length > 0 && <div>{codeFromRed.code}</div>}
            {header.length > 0
            && <table className="estimate-table">
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
            }
            {
                header.length > 0 &&
                <div className="estimate-buttons">
                    <ExportXLSX sum2017={sum2017} sumRes={sumRes} code={code}/>
                    <ComplexEstimate />
                    <Link to={`/wet-calc`}>Рассчитать влажность</Link>
                </div>
            }
        </div>
    )
}