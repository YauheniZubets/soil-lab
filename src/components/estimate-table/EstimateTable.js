import { useState, useEffect } from "react";
import { getDocs, query, collection, where, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/init";
import { price } from "../../base-data/price";


export const EstimateTable = (props) => {

    const {clickedProt, choosedYear} = props;

    const [objQuan, setObjQuan] = useState([]);

    const head = price.map((nm, index) => { //
        return <td key={index}>{nm.name}</td>
    });

    const priceList = price.map((pr, index) => {
        return <td key={index}>{pr.price}</td>
    });

    const quanList = objQuan.map((indi, index) => {
        return <td key={index}>{indi}</td>
    });

    const getDataFromFire = async (year, prot) => {
        const docRef = doc(db, year, prot);
        const docSnap = await getDoc(docRef);
        const quanFromFire = docSnap.data()?.allQuan;
        console.log('quanFromFire: ', quanFromFire);
        if (quanFromFire.length > 0) setObjQuan([...quanFromFire]);
    }

    useEffect(() => {
        if (clickedProt) {
           getDataFromFire(choosedYear, clickedProt)
        }
    }, [clickedProt, choosedYear])

    return (
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
                    {/* <tr>
                        <td>Цена за ед.</td>
                        {priceList}
                    </tr>
                    <tr>
                        <td>Сумма</td>
                        {sum}
                    </tr>
                    <tr>
                        <td>Итого с учетом коэффициентов на январь 2017</td>
                        <td>{summma2017}</td>
                    </tr>
                    <tr>
                        <td>Итого с учетом коэффициентов на текущий месяц</td>
                        <td>{sumRes}</td>
                    </tr> */}
                </tbody>
            </table>
            {/* <div className={`close-btn`} onClick={cbCloseComp}>
                <img src={closeImg} alt='close' />
            </div> */}
        </div>
    )
}