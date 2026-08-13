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
import { addObjectRequested } from './saga/actions';
import { Preloader } from './components/preloader/preloader';
import { Link } from 'react-router-dom';

function App() {

const dispatch = useDispatch();
const estimateStatus = useSelector(state=>state.closeEstimate);
const loadStatus = useSelector(state => state.loadStatus);

function number_rows( main_rows) {
  return main_rows.filter(el => Number.isInteger(el[0] && el[1]))
};

function sortAllStatment (allNumbes, arr) { //подсчет кол-ва в ведомости плюсов
  arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  allNumbes.forEach(el => {
    if (el[7] === '+') arr[0] +=1;
    if (el[8] && el[7] === '+') arr[1] +=1;
    if (el[8] && el[11] === '+') arr[2] +=1;
    if (el[9] && el[7] === '+') arr[3] +=1;
    if (el[9] && el[11] === '+') arr[4] +=1;
    if (el[10] === '+') arr[5] +=1;
    if (el[11] === '+') arr[6] +=1;
    if (el[12] === '+') arr[7] +=1;
    if (el[13] === '+') arr[8] +=1;
    if (el[14] === '+') arr[9] +=1;
    if (el[15] === '+') arr[10] +=1;
    if (el[16] === '+') arr[11] +=1;
    if (el[17] === '+') arr[12] +=1;
  });
  return arr;
};

const gettingMainDataFromInp = (addingFile) => {
  const protocolName = parseInt(addingFile?.name.split(' ')[0]); //получаем номер протокола в формате ХХХ
  dispatch(setNewProtocol(protocolName));
  
  const reader = new FileReader();
  reader.readAsArrayBuffer(addingFile);
  reader.onload = (e) => {
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
    
    headers.splice(1, 2, 'Влажность песчаных грунтов', 'Влажность глинистых грунтов', 'Плотность песчаных грунтов', 'Плотность глинистых грунтов');
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

const loadingObjectProcess = async (files) => { // последовательная загрузка нескольких файлов
  try {
    for (let i = 0; i < files.length; i++) {
      await  new Promise((res) => {
        gettingMainDataFromInp(files[i]);
        setTimeout(()=>res(), 1000);
      });
      await new Promise((res) => {
        dispatch(addObjectRequested());
        setTimeout(()=>res(), 1000);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

const cbLoad = async e => {
  const files = e.target.files;
  if (files.length > 5) {
    alert("Не более 5 файлов!");
    e.preventDefault();
  } else {
    await loadingObjectProcess(files);
  }
  e.target.value = '';
}

  return (
    <div className="App">
      {loadStatus.isLoading && <Preloader />}
      <input  type='file' multiple onChange={cbLoad} />
      {/* {
        estimateStatus.estimateStatus && <Estimate />
      } */}
      <ObjectsList />
    </div>
  );
};

export default App;

