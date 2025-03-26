import { useState, useEffect } from "react";
import { WordProt } from "../word-prot/wordProt";
import { db } from "../firebase/init";
import { getDocs, query, collection } from "firebase/firestore";
import './objectsList.css';

export const ObjectsList = () => {

    const [dataList, setDataList] = useState([]);
    const [waterData, setWaterData] = useState([]);

    const listFromFire = async () => {
        const q = query(collection(db, '2024'));
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
        listFromFire();
    }, []);

    const cbObjClick = (ev) => {
        const target = ev.target;
        const prot = +target.getAttribute('value');
        console.log('target: ', target.getAttribute('value'));
    };

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
    }

    const dataListShow = dataList.map((i, ind) => {
        return (
            <div key={ind} className="main-list" onClick={cbObjClick}>
                <div className="main-list-obj" value={i[0]}>{`${i[0]}п/${i[2]?.getFullYear()}`}</div>
                <div className="main-list-obj" value={i[0]}>{i[1]}</div>
                <div className="main-list-obj" value={i[0]}>{i[3]}</div>
                <div className="main-list-obj" value={i[0]}>
                    <WordProt protName={i[0]} />
                </div>
            </div>
        )
    });

    return (
        <div className="objects-list">
            <div className="main-list">
                <div className="main-list-obj">Номер протокола</div>
                <div className="main-list-obj">Номер объекта</div>
                <div className="main-list-obj">Сумма по смете</div>
                <div className="main-list-obj">Действия</div>
            </div>
            {dataListShow}
        </div>
    )
}