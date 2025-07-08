import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { price } from '../../base-data/price';
import { db } from "../firebase/init";
import { doc, getDoc, query, collection } from "firebase/firestore";
import * as ExcelJS from 'exceljs';

export const EachObjEstimate = (props) => {

  const {protName, protYear} = props;

  const [allQuan, setAllQuan] = useState([]);

  const headers = useSelector(state=>state.headersData); //показатели с редакс

  const downloadEstimateData = async (prot, year) => { //загрузка с бд
    const docRef = doc(db, String(year), String(prot));
    const docSnap = await getDoc(docRef); //получаем один документ вместо всей коллекции
    if (docSnap.exists()) {
      const data = docSnap.data();
      const allQuan = data.allQuan;
      setAllQuan(allQuan);
    };
  };

  useEffect(() => {
    if (allQuan.length> 0) saveExcEst(); // проверка на длину массива количесвтва и потом скачивание
  }, [allQuan]);

  const pricePoints = (allQuan) => {
    let arr = [];
    for (let i = 0; i < price.length; i++) {
      const element = price[i];
      arr.push([i+1, element['name'], element['point'], element['price'], allQuan[i], 1, allQuan[i] * element['price']]);
    }
    return arr;
  };

  const cbSave = (e) => downloadEstimateData(protName, protYear);

  const saveExcEst = () => {
    const downloadExcel = () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Смета', {
        pageSetup:{paperSize: 9, orientation:'portrait'},
        views: [{style: 'pageLayout'}]
      });
      worksheet.pageSetup.margins = {
        left: 0.9, right: 0.1,
        top: 0.75, bottom: 0.75,
        header: 0.3, footer: 0.3
      };
      worksheet.columns = [ //задана ширина первого столбца
        {width: 5},
        {width: 20},
        {width: 10},
        {width: 8},
        {width: 10},
        {width: 10},
        {width: 10}
      ];
      const row1 = worksheet.addRow(); // название
      row1.getCell(5).value = 'Сметный расчет';
      row1.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 14,
      };
      const row2 = worksheet.addRow(); // название
      row2.getCell(4).value = 'Испытательная лаборатория (отдел №12)';
      row2.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 14,
      };
      const row3 = worksheet.addRow(); // название
      row3.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 13,
      };
      row3.getCell(1).value = '№ п/п';
      worksheet.getCell('A3').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'},
      };
      worksheet.getCell('A3').alignment = {
        wrapText: true
      };
      row3.getCell(2).value = 'Вид работ';
      worksheet.getCell('B3').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };
      row3.getCell(3).value = '№ част. глав табл. и пункт. указ. к разд. или главе СБЦ';
      worksheet.getCell('C3').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'},
      };
      worksheet.getCell('C3').alignment = {
        wrapText: true
      };
      row3.getCell(4).value = 'Расценка (тыс. руб.)';
      worksheet.getCell('D3').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'},
      };
      worksheet.getCell('D3').alignment = {
        wrapText: true
      };
      row3.getCell(5).value = 'Кол-во образцов';
      worksheet.getCell('E3').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'},
      };
      worksheet.getCell('F3').alignment = {
        wrapText: true
      };
      row3.getCell(6).value = 'Коэф-т';
      worksheet.getCell('F3').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'},
      };
      worksheet.getCell('F3').alignment = {
        wrapText: true
      };
      row3.getCell(7).value = 'Стоимость (тыс. руб.)';
      worksheet.getCell('G3').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'},
      };
      worksheet.getCell('G3').alignment = {
        wrapText: true
      };

      worksheet.addRows(pricePoints(allQuan));

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
    };

    downloadExcel();
  }

  return (
      <div>
          <button onClick={cbSave}>Cмета объекта</button>
      </div>
  )
}