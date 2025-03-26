import { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { Document, Packer, Paragraph, Tab, TextRun } from "docx";

export const WordProt = (props) => {

    const {protName} = props;

    const [waterData, setWaterData] = useState(null);

    const cbStartDownloadWater = (ev) => {
        const targ = ev.target;
        const protocolFromBut = targ.id;
        if (isFinite(protocolFromBut)) downloadWater(protocolFromBut);
    };

    const downloadWater = async (prot) => {
        const docRef = doc(db, '2024', prot);
        const docSnap = await getDoc(docRef); //получаем один документ вместо всей коллекции
        if (docSnap.exists()) {
            const data = docSnap.data()?.waterData;
            if (data.length) setWaterData(data); 
        } else {
            console.log("No such document!");
          }
    };

    return (
        <input type="button" onClick={cbStartDownloadWater} id={protName} value='Протокол pH'/>
    )
}