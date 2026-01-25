import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { price } from '../../base-data/price';
import { db } from "../firebase/init";
import { doc, getDocs, query, collection, where } from "firebase/firestore";
import * as ExcelJS from 'exceljs';

export const MonthEstimate = (props) => {

  const {choosedYear, choosedMonth} = props;

  const [allQuan, setAllQuan] = useState([]);
  const [dateFired, setDateFired] = useState('');
  const [sumFromWork, setSumFromWork] = useState('');
  const [sumComputed, setSumComputed] = useState('');
  const [summa2017, setSumma2017] = useState('');
  const [sumRes, setSumRes] = useState('');

  const [dataList, setDataList] = useState([]);

  const headers = useSelector(state=>state.headersData); //показатели с редакс

  const downloadEstimateData = async (choosedYear, choosedMonth) => {
    let q = query(collection(db, choosedYear), 
        where('date', '>=', new Date(+choosedYear, +choosedMonth)), 
        where('date', '<', new Date(+choosedYear, +choosedMonth+1)));
    const querySnapshot = await getDocs(q);
    const allArr = [];
   
    const arrQuan = [];
    let representedSum = 0;
    let sumFromWork = 0;
    let sumComputed = 0;
    let sum2017 = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const date = new Date(data?.date.seconds * 1000);
      const arrData = [data?.protocol, data?.code, date, data?.sum];
      allArr.push(arrData);
      arrQuan.push(data?.allQuan);
      representedSum += +data?.sum;
      sumFromWork += +data?.sumFromWork;
      sumComputed += +data?.sumComputed;
      sum2017 += +data?.summa2017;
    });
    console.log('allArr: ', allArr);
    setDateFired(new Date(allArr[0][2]));
    console.log(dateFired);
    setDataList([...allArr]);
    setAllQuan([...arrQuan]);
    setSumFromWork(sumFromWork);
    setSumComputed(sumComputed);
    setSumma2017(sum2017);
    setSumRes(representedSum.toFixed(2));
    return allArr;
};

  useEffect(()=> {
    if (allQuan.length > 0) saveExcEst(); // проверка на длину массива количесвтва и потом скачивание
  }, [allQuan]);

  const monthRus = (dateFired) => dateFired.toLocaleString('default', { month: 'long' });

  const pricePoints = (allQuan) => { // количество испытаний и сумма
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let k = 0; k < allQuan.length; k++) { // сумма всех испытаний за месяц одним массивом
      const objElemQuan = allQuan[k];
      for (let i = 0; i < objElemQuan.length; i++) {
        const el = objElemQuan[i];
        arr[i] += +el
      }
    }
    let arrSummary = [];
    for (let i = 0; i < price.length; i++) {
      const element = price[i];
      arrSummary.push(
        [
          i+1, element['name'], element['point'], element['price'], arr[i], 1, arr[i] * element['price']
        ]
      );
    } 
    return arrSummary;
  };

  const cbSave = (e) => downloadEstimateData(choosedYear, choosedMonth);

  const saveExcEst = () => {
    const downloadExcel = () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Смета', {
        pageSetup:{paperSize: 9, orientation:'portrait'},
        views: [{style: 'pageLayout'}]
      });
      worksheet.pageSetup.margins = {
        left: 0.9, right: 0.1,
        top: 0.4, bottom: 0.4,
        header: 0.3, footer: 0.3
      };
      worksheet.columns = [ //задана ширина первого столбца
        {width: 3},
        {width: 38},
        {width: 15},
        {width: 8},
        {width: 8},
        {width: 8},
        {width: 11}
      ];
      const row1 = worksheet.addRow(); // название
      worksheet.mergeCells('A1:G1');
      row1.getCell(1).value = `Сметный расчет за ${monthRus(dateFired)}`;
      row1.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 12,
        bold: true
      };
      row1.alignment ={ horizontal: 'center' };

      const row2 = worksheet.addRow(); // название
      worksheet.mergeCells('A2:G2');
      row2.getCell(4).value = 'Испытательная лаборатория (отдел №12)';
      row2.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 12,
        bold: true
      };
      row2.alignment ={ horizontal: 'center' };

      const row3 = worksheet.addRow(); // название
      row3.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 12,
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
      worksheet.getCell('E3').alignment = {
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

      const dataRows = worksheet.addRows(pricePoints(allQuan));
      for (const row of dataRows) {
        row.font = {
          name: 'Times New Roman',
          color: { argb: 'black' },
          size: 12,
        };
      }

      const row4 = worksheet.addRow();
      row4.getCell(1).value = '17';
      row4.getCell(2).value = 'Итого в денежных знаках образца 2009 года на 01.01.2017';
      row4.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 12,
      };
      row4.getCell(7).value = sumFromWork;

      const row5 = worksheet.addRow();
      row5.getCell(1).value = '18';
      row5.getCell(2).value = 'Выполнение лабораторных работ с применением компьютерных технологий';
      worksheet.getCell('B21').alignment = { wrapText: true };
      row5.getCell(3).value = 'п. 2.18 д';
      row5.getCell(6).value = '1,2';
      row5.getCell(7).value = sumComputed;
      row5.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 12,
      };
      row5.height = 48;

      const row6 = worksheet.addRow();
      row6.getCell(1).value = '19';
      row6.getCell(2).value = 'Письмо МАиС РБ № 02-3-05/648 от 16.01.2017, приказ МАиС №11 от 27.01.2017 (стоимость в рублях)';
      worksheet.mergeCells('B22:C22');
      worksheet.mergeCells('D22:F22');
      worksheet.getCell('B22').alignment = { wrapText: true };
      worksheet.getCell('D22').alignment = { wrapText: true };
      row6.getCell(4).value = `${sumComputed} * 1000 * 0.00013164 * 1.0914`;
      row6.getCell(7).value = summa2017;
      row6.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 12,
      };
      row6.height = 44;

      const row7 = worksheet.addRow();
      row7.getCell(1).value = '20';
      row7.getCell(2).value = 'Письмо МАиС РБ № 04-3-03/1433 от 31.01.2018, приказ МАиС №23 от 30.01.2019, письмо МАиС РБ от 05.04.2019 №04-3-03/4689, письмо МАиС РБ от 30.04.2020 №04-3-03/5416, письмо МАиС РБ от 12.04.2021 №04-3-03/4433,   письмо МАиС РБ от 04.05.2023 №04-3-04/5871, письмо МАиС РБ от 19.04.2024 №04.3-05/5157, письмо МАиС РБ от 21.03.2025 №04.3-05/4106';
      worksheet.mergeCells('B23:C23');
      worksheet.mergeCells('D23:F23');
      worksheet.getCell('B23').alignment = { wrapText: true };
      worksheet.getCell('D23').alignment = { wrapText: true };
      row7.getCell(4).value = `${summa2017} * 1.0821 * 1.0655 * 1.0757 * 1.0826 * 1.1295 * 1.1069 * 1.0076`;
      row7.getCell(7).value = sumRes;
      row7.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 12,
      };
      row7.height = 122;

      const row8 = worksheet.addRow();
      row8.getCell(1).value = `Итого сумма с учетом прогнозных индексов в ценах на ${monthRus(dateFired)} ${new Date(dateFired).getFullYear()}, руб`;
      worksheet.mergeCells('A24:F24');
      row8.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 12,
        bold: true
      };
      row8.getCell(7).value = sumRes;

      const listOfObjectsRows = worksheet.addRows([['№ протокола', 'шифр объекта', 'дата', 'сумма по смете'], ...dataList]);
      for (const row of listOfObjectsRows) {
        row.font = {
          name: 'Times New Roman',
          color: { argb: 'black' },
          size: 12,
        };
      }

      const row10 = worksheet.addRow();
      row10.getCell(1).value = 'Начальник УИИ';
      row10.getCell(5).value = 'Д.О. Кудревич';
      row10.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 12,
      };

      const row11 = worksheet.addRow(); //пустая строка
      row11.getCell(1).value = '';

      const row12 = worksheet.addRow();
      row12.getCell(1).value = 'Начальник ИЛ';
      row12.getCell(5).value = 'Е.А. Зубец';
      row12.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 12,
      };


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
          <button onClick={cbSave}>Смета за месяц</button>
      </div>
  )
}