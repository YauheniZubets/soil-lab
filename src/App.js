import {useState, useEffect}  from 'react';
import { Estimate } from './components/estimate/estimate';
import * as XLSX from 'xlsx';
import './App.css';
import { indicators } from './base-data/base-data';
import { useSelector, useDispatch } from 'react-redux';
import { setNewCode } from './redux/reducer';
import { setDateWorking } from './redux/dateReducer';
import { setMainData } from './redux/mainDataReducer';
import { Link } from 'react-router-dom';

function App() {

const [data, setData] = useState(null);
const [__html, setHTML] = useState(null);
const [headers, setHeaders] = useState([]);
const [code, setCode] = useState(null);
const [quantity, setQuantity] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const [prices, setPrices] = useState([100, 200, 100, 200, 100, 200, 100, 200, 100, 200]);

const dispatch = useDispatch();


function number_rows( main_rows) {
  return main_rows.filter(el => Number.isInteger(el[0] && el[1]))
};

function sortAll (allNumbes, indicators) {
  allNumbes.forEach(el => {
    if (el[indicators.fractions.key] === '+') indicators.fractions.inStatement.push(el);
    if (el[indicators.wet.key] === '+') indicators.wet.inStatement.push(el);
    if (el[indicators.density.key] === '+') indicators.density.inStatement.push(el);
    if (el[indicators.partDensity.key] === '+') indicators.partDensity.inStatement.push(el);
    if (el[indicators.fluidity.key] === '+') indicators.fluidity.inStatement.push(el);
    if (el[indicators.filtration.key] === '+') indicators.filtration.inStatement.push(el);
    if (el[indicators.corner.key] === '+') indicators.corner.inStatement.push(el);
    if (el[indicators.organik.key] === '+') indicators.organik.inStatement.push(el);
    if (el[indicators.carbo.key] === '+') indicators.carbo.inStatement.push(el);
    if (el[indicators.areometry.key] === '+') indicators.areometry.inStatement.push(el);
  });
  return [indicators]
};

function sortAllStatment (allNumbes) {
  allNumbes.forEach(el => {
    if (el[7] === '+') quantity[0] +=1;
    if (el[8] === '+') quantity[1] +=1;
    if (el[9] && el[7] === '+') quantity[2] +=1;
    if (el[9] && el[11] === '+') quantity[3] +=1;
    if (el[10] === '+') quantity[4] +=1;
    if (el[11] === '+') quantity[5] +=1;
    if (el[12] === '+') quantity[6] +=1;
    if (el[13] === '+') quantity[7] +=1;
    if (el[14] === '+') quantity[8] +=1;
    if (el[15] === '+') quantity[9] +=1;
    if (el[16] === '+') quantity[10] +=1;
    if (el[17] === '+') quantity[11] +=1;
  });
  setQuantity([...quantity])
};

const cbLoad = e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
    reader.onload = async (e) => {
      const workbook = XLSX.read(e.target.result, {type: 'binary'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet, {header: 1});
      
      const dateWorking = sheetData[0][6]; //дата ведомости
      dispatch(setDateWorking(dateWorking));
      const code = sheetData[0][11]; //шифр объекта
      dispatch(setNewCode(code));
      
      let headers = sheetData[6].slice(7, 18);
      headers.splice(2, 1, 'Плотность песчаных грунтов', 'Плотность глинистых грунтов');
      setHeaders(headers);
      
      const main_rows = sheetData.slice(9);
      const usefulNumbers = number_rows(main_rows);
      setData(usefulNumbers); //все давнные по скважинам и глубинам и типам грунта
      dispatch(setMainData(usefulNumbers));
      // sortAll(usefulNumbers, indicators);
      sortAllStatment(usefulNumbers); //добавляем в массив количества всех показателей
      // const htmlData = XLSX.utils.sheet_to_html(sheet);
    };
}

  return (
    <div className="App">
      <input  type='file' onChange={cbLoad} />
      {__html && (
        <div dangerouslySetInnerHTML={{__html}}/>
      )}
      {/* {data && (
        <div>
          <h2>Imported Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )} */}
      <div>
        <Estimate header={headers} quantity={quantity} code={code} />
      </div>
    </div>
  );
};

export default App;

