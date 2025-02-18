import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as ExcelJS from 'exceljs';
import { db } from "../firebase/init";
import { collection, doc, setDoc, getDocs, query } from "firebase/firestore";

export const ComplexEstimate = (props) => {

    useEffect(() => {

    },[]);

    const cbSave = (e) => {
      let protocols = [];
      let codes = [];
      let sums = [];
      let dates = [];
      let allArr = [];

      const saveFullEstFromFire = async () => {
        const q = query(collection(db, "works"));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const arrData = [data?.protocol, data?.code, data?.date.seconds, data?.sum];
          allArr.push(arrData);
          console.log(doc.id, " => ", doc.data());
        });

        downloadExcel();
      };

      const downloadExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet', {
          properties:{
            tabColor:{argb:'yellow'},
          },
          pageSetup:{paperSize: 9, orientation:'portrait'},
        });
      worksheet.columns = [
        { header: '№ протокола', key: 'numb', width: 30},
        { header: 'Шифр объекта', key: 'id', width: 30},
        { header: 'Дата ведомости', key: 'date', width: 25},
        { header: 'Стоимость', key: 'price', width: 32 },
      ];
      const newRows = worksheet.addRows(allArr);
      
      // для скачивания
      workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
        });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = 'download.xlsx';
          anchor.click();
          window.URL.revokeObjectURL(url);
        });
      }

      saveFullEstFromFire();


      
    };

    return(
        <div>
            <button onClick={cbSave}>Полная смета</button>
        </div>
    )
}