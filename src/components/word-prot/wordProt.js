import { getDocs, query, collection } from "firebase/firestore";
import { db } from "../firebase/init";
import { Document, Packer, Paragraph, Tab, TextRun } from "docx";

export const WordProt = () => {

    const cbDownloadWater = async () => {
        console.log('click');
        const q = query(collection(db, "works"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('data: ', data.waterData);
        });
        // return allArr;
    };

    return (
        <input type="button" value='Протокол pH' onClick={cbDownloadWater} />
    )
}