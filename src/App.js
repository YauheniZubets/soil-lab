import {useState, useEffect}  from 'react';
import { Estimate } from './components/estimate/estimate';
import { ObjectsList } from './components/objectsList/ObjectsList';
import * as XLSX from 'xlsx';
import './App.css';
import { indicators } from './base-data/base-data';
import { useSelector, useDispatch } from 'react-redux';
import { setNewCode } from './redux/codeReducer';
import { setNewProtocol } from './redux/protocolReducer';
import { setDateWorking } from './redux/dateReducer';
import { setMainData } from './redux/mainDataReducer';
import { setKbData } from './redux/kbDataReducer';
import { setKstData } from './redux/kstDataReducer';
import { setWaterData } from './redux/waterDataReducer';
import { setAllQuan } from './redux/allQuanReducer';
import { setEstimateStatus } from './redux/closeEstimateReducer';
import { setNewDescription } from './redux/descrReducer';
import { setHeaders } from './redux/headersReducer';
import { setLoadQuan, addObjectRequested } from './redux/loadStatusReducer';
import { Link } from 'react-router-dom';

function App() {

const dispatch = useDispatch();
const estimateStatus = useSelector(state=>state.closeEstimate);
const loadQuan = useSelector(state => state.loadStatus.loadQuan);

function number_rows( main_rows) {
  return main_rows.filter(el => Number.isInteger(el[0] && el[1]))
};

// function sortAll (allNumbes, indicators) {
//   allNumbes.forEach(el => {
//     if (el[indicators.fractions.key] === '+') indicators.fractions.inStatement.push(el);
//     if (el[indicators.wet.key] === '+') indicators.wet.inStatement.push(el);
//     if (el[indicators.density.key] === '+') indicators.density.inStatement.push(el);
//     if (el[indicators.partDensity.key] === '+') indicators.partDensity.inStatement.push(el);
//     if (el[indicators.fluidity.key] === '+') indicators.fluidity.inStatement.push(el);
//     if (el[indicators.filtration.key] === '+') indicators.filtration.inStatement.push(el);
//     if (el[indicators.corner.key] === '+') indicators.corner.inStatement.push(el);
//     if (el[indicators.organik.key] === '+') indicators.organik.inStatement.push(el);
//     if (el[indicators.carbo.key] === '+') indicators.carbo.inStatement.push(el);
//     if (el[indicators.areometry.key] === '+') indicators.areometry.inStatement.push(el);
//   });
//   return [indicators]
// };

function sortAllStatment (allNumbes, arr) { //подсчет кол-ва в ведомости плюсов
  arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  allNumbes.forEach(el => {
    if (el[7] === '+') arr[0] +=1;
    if (el[8] === '+') arr[1] +=1;
    if (el[9] && el[7] === '+') arr[2] +=1;
    if (el[9] && el[11] === '+') arr[3] +=1;
    if (el[10] === '+') arr[4] +=1;
    if (el[11] === '+') arr[5] +=1;
    if (el[12] === '+') arr[6] +=1;
    if (el[13] === '+') arr[7] +=1;
    if (el[14] === '+') arr[8] +=1;
    if (el[15] === '+') arr[9] +=1;
    if (el[16] === '+') arr[10] +=1;
    if (el[17] === '+') arr[11] +=1;
  });
  return arr;
  // setQuantity([...arr]);
};
const gettingMainDataFromInp = (addingFile) => {
  const protocolName = parseInt(addingFile?.name.split(' ')[0]); //получаем номер протокола в формате ХХХ
  dispatch(setNewProtocol(protocolName));
  const reader = new FileReader();
  reader.readAsArrayBuffer(addingFile);
  reader.onload = async (e) => {
    const workbook = XLSX.read(e.target.result, {type: 'binary'});
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(sheet, {header: 1});
    dispatch(setNewDescription(sheetData[1][11])); //текстовое описание в редакс
    // setNameObj(sheetData[1][11]);
    const dateWorking = sheetData[0][6]; //дата ведомости
    dispatch(setDateWorking(dateWorking));
    const code = sheetData[0][11]; //шифр объекта
    dispatch(setNewCode(code));
    
    let headers = sheetData[6].slice(7, 18);
    headers.splice(2, 1, 'Плотность песчаных грунтов', 'Плотность глинистых грунтов');
    dispatch(setHeaders(headers));
    // setHeaders(headers); //сделан дубликат в редакс это потом удалить
    
    const main_rows = sheetData.slice(9);
    const usefulNumbers = number_rows(main_rows);
    dispatch(setMainData(usefulNumbers));
    // setQuantity(sortAllStatment(usefulNumbers)); //добавляем в массив количества всех показателей
    const sheetName1 = workbook.SheetNames[1];
    const sheet1 = workbook.Sheets[sheetName1];
    const sheetData1 = XLSX.utils.sheet_to_json(sheet1, {header: 1});
    const main_rows1 = sheetData1.slice(8);
    const usefulNumbers1 = number_rows(main_rows1);
    dispatch(setKbData([...usefulNumbers1])); //инфо с листа кор к бет

    const sheetName2 = workbook.SheetNames[2];
    const sheet2 = workbook.Sheets[sheetName2];
    const sheetData2 = XLSX.utils.sheet_to_json(sheet2, {header: 1});
    const main_rows2 = sheetData2.slice(8);
    const usefulNumbers2 = number_rows(main_rows2);
    dispatch(setKstData([...usefulNumbers2])); //инфо с листа кор к стали

    const sheetName3 = workbook.SheetNames[3];
    const sheet3 = workbook.Sheets[sheetName3];
    const sheetData3 = XLSX.utils.sheet_to_json(sheet3, {header: 1});
    const main_rows3 = sheetData3.slice(7);
    const usefulNumbers3 = number_rows(main_rows3);
    dispatch(setWaterData([...usefulNumbers3])); //инфо с листа вода

    dispatch(setAllQuan([...sortAllStatment(usefulNumbers), usefulNumbers1.length, usefulNumbers2.length, usefulNumbers3.length]));

    headers.length > 0 && dispatch(setEstimateStatus(true)); //если есть массив то включаем estimate
  };
};


const cbLoad = e => {
  const files = e.target.files;
  const targ = e.target.result;
  const filesLength = files.length; //количество объектов
  // dispatch(setLoadQuan(+filesLength));
  // for (let i = 0; i <= files.length; i++) {
  //   const file = files[i];
  //   gettingMainDataFromInp(file);
  // }
  const file = e.target.files[0];
  const file1 = e.target.files[1];
  const file2 = e.target.files[2];
  gettingMainDataFromInp(file);
  // console.log('files: ', file, file1, file2);
  // gettingMainDataFromInp(file);
  // const protocolName = parseInt(file.name.split(' ')[0]); //получаем номер протокола в формате ХХХ
  // dispatch(setNewProtocol(protocolName));
  // const reader = new FileReader();
  // reader.readAsArrayBuffer(file);
  // reader.onload = async (e) => {
  //   const workbook = XLSX.read(e.target.result, {type: 'binary'});
  //   console.log('workbook: ', workbook);
  //   const sheetName = workbook.SheetNames[0];
  //   const sheet = workbook.Sheets[sheetName];
  //   const sheetData = XLSX.utils.sheet_to_json(sheet, {header: 1});
  //   dispatch(setNewDescription(sheetData[1][11])); //текстовое описание в редакс
  //   // setNameObj(sheetData[1][11]);
  //   const dateWorking = sheetData[0][6]; //дата ведомости
  //   dispatch(setDateWorking(dateWorking));
  //   const code = sheetData[0][11]; //шифр объекта
  //   dispatch(setNewCode(code));
    
  //   let headers = sheetData[6].slice(7, 18);
  //   headers.splice(2, 1, 'Плотность песчаных грунтов', 'Плотность глинистых грунтов');
  //   dispatch(setHeaders(headers));
  //   // setHeaders(headers); //сделан дубликат в редакс это потом удалить
    
  //   const main_rows = sheetData.slice(9);
  //   const usefulNumbers = number_rows(main_rows);
  //   dispatch(setMainData(usefulNumbers));
  //   // setQuantity(sortAllStatment(usefulNumbers)); //добавляем в массив количества всех показателей
  //   const sheetName1 = workbook.SheetNames[1];
  //   const sheet1 = workbook.Sheets[sheetName1];
  //   const sheetData1 = XLSX.utils.sheet_to_json(sheet1, {header: 1});
  //   const main_rows1 = sheetData1.slice(8);
  //   const usefulNumbers1 = number_rows(main_rows1);
  //   dispatch(setKbData([...usefulNumbers1])); //инфо с листа кор к бет

  //   const sheetName2 = workbook.SheetNames[2];
  //   const sheet2 = workbook.Sheets[sheetName2];
  //   const sheetData2 = XLSX.utils.sheet_to_json(sheet2, {header: 1});
  //   const main_rows2 = sheetData2.slice(8);
  //   const usefulNumbers2 = number_rows(main_rows2);
  //   dispatch(setKstData([...usefulNumbers2])); //инфо с листа кор к стали

  //   const sheetName3 = workbook.SheetNames[3];
  //   const sheet3 = workbook.Sheets[sheetName3];
  //   const sheetData3 = XLSX.utils.sheet_to_json(sheet3, {header: 1});
  //   const main_rows3 = sheetData3.slice(7);
  //   const usefulNumbers3 = number_rows(main_rows3);
  //   dispatch(setWaterData([...usefulNumbers3])); //инфо с листа вода

  //   dispatch(setAllQuan([...sortAllStatment(usefulNumbers), usefulNumbers1.length, usefulNumbers2.length, usefulNumbers3.length]));

  //   headers.length > 0 && dispatch(setEstimateStatus(true)); //если есть массив то включаем estimate
  // };
    
  e.target.value = '';
}

  return (
    <div className="App">
      <input  type='file' onChange={cbLoad} />
      {
        estimateStatus.estimateStatus && <Estimate />
      }
      <ObjectsList />
    </div>
  );
};

export default App;

