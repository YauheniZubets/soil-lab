import { useState, useEffect } from "react";
import { db } from "../firebase/init";
import { getDocs, query, collection } from "firebase/firestore";

export const ObjectsList = () => {

    const listFromFire = async () => {
        const q = query(collection(db, "works"));
        const querySnapshot = await getDocs(q);
        const allArr = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date = new Date(data?.date.seconds * 1000);
          const arrData = [data?.protocol, data?.code, date, data?.sum];
          allArr.push(arrData);
        });
        return allArr;
    };

    useEffect(()=>{
        console.log('first-time');
        listFromFire();
    }, []);

    return (
        <div className="objects-list">

        </div>
    )
}