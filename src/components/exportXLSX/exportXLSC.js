import { useSelector } from 'react-redux';
import * as ExcelJS from 'exceljs';

export const ExportXLSX = (props) => {
    const {sum2017, sumRes, code} = props;
    const cod = useSelector(state=>state.code);
    const dateWorking = useSelector(state=>state.dateWorking);
    const mainData = useSelector(state=>state.mainData.mainData); //все образцы

    function ExcelDateToJSDate(serial) { //перевод даты
      var utc_days  = Math.floor(serial - 25569);
      var utc_value = utc_days * 86400;                                        
      var date_info = new Date(utc_value * 1000);
      var fractional_day = serial - Math.floor(serial) + 0.0000001;
      var total_seconds = Math.floor(86400 * fractional_day);
      var seconds = total_seconds % 60;
      total_seconds -= seconds;
      var hours = Math.floor(total_seconds / (60 * 60));
      var minutes = Math.floor(total_seconds / 60) % 60;
      return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    }

    const cbSave = (e) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet', {
          properties:{
            tabColor:{argb:'yellow'},
          },
          pageSetup:{paperSize: 9, orientation:'portrait'},
        });
        worksheet.columns = [
          { header: 'Шифр объекта', key: 'id', width: 30},
          { header: 'Дата ведомости', key: 'date', width: 25},
          { header: 'Стоимость', key: 'price', width: 32 },
        ];
        const row = worksheet.getRow(2);
        row.getCell(1).value = cod.code;
        row.getCell(2).value = new Date(ExcelDateToJSDate(dateWorking.dateWorking));
        row.getCell(3).value = sumRes;
        
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

    const cbJornal = () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('My Sheet', {
        pageSetup:{paperSize: 9, orientation:'landscape'},
        views: [{style: 'pageLayout'}] // TODO количество колонок
      });
      worksheet.pageSetup.margins = {
        left: 0.1, right: 0.1,
        top: 0.5, bottom: 0.3,
        header: 0.3, footer: 0.3
      };
      worksheet.columns = [ //задана ширина первого столбца
        { width: 5},
      ];

      const row1 = worksheet.addRow(); // название
      row1.getCell(1).value = 'ГОСТ 5180-2015 п.5, п.9';
      row1.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 14,
      };
      row1.getCell(7).value = 'ЖУРНАЛ';
      row1.getCell(13).value = '№12-42/Б';

      const row2 = worksheet.addRow();
      row2.font = {
        name: 'Times New Roman',
        color: { argb: 'black' },
        size: 14,
      };
      row2.getCell(5).value = 'определения влажности и плотности грунта';

      const row3 = worksheet.addRow();
      row3.getCell(2).value = `Объект № ${cod.code}`;
      row3.getCell(11).value = `Протокол __________`;

      const row4 = worksheet.addRow();
      row4.getCell(5).value = 'Температура (        ) С';

      const row5 = worksheet.addRow();

      const row6 = worksheet.addRow();
      row6.height = 40;

      worksheet.mergeCells('A5:A7');
      worksheet.getCell('A5').value = 'Лабораторный номер образца';
      worksheet.getCell('A5').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('A5').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('B5:B7');
      worksheet.getCell('B5').value = 'Номер скважины';
      worksheet.getCell('B5').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('B5').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('C5:C7');
      worksheet.getCell('C5').value = 'Глубина отбора образца грунта, м';
      worksheet.getCell('C5').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('C5').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('D5:G5');
      worksheet.getCell('D5').value = 'Вес бюкса в граммах';
      worksheet.getCell('D5').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('D5').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('D6:D7');
      worksheet.getCell('D6').value = 'Пустого m, г';
      worksheet.getCell('D6').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('D6').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('E6:E7');
      worksheet.getCell('E6').value = 'С влажным грунтом m1, г';
      worksheet.getCell('E6').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('E6').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('F6:G6');
      worksheet.getCell('F6').value = 'С сухим грунтом m0, г';
      worksheet.getCell('F6').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('F6').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.getCell('F7').value = '1-ое взвешивание';
      worksheet.getCell('F7').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('F7').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.getCell('G7').value = '2-ое взвешивание';
      worksheet.getCell('G7').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('G7').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('H5:I6');
      worksheet.getCell('H5').value = 'Влажность w, % W=100(m1-m0)/(m0-m)';
      worksheet.getCell('H5').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('H5').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.getCell('H7').value = 'Отдельной пробы';
      worksheet.getCell('H7').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('H7').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.getCell('I7').value = 'Средняя';
      worksheet.getCell('I7').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('I7').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('J5:O5');
      worksheet.getCell('J5').value = 'Плотность грунта';
      worksheet.getCell('J5').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('J5').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('J6:J7');
      worksheet.getCell('J6').value = 'Масса кольца с грунтом, М1, г';
      worksheet.getCell('J6').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('J6').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('K6:K7');
      worksheet.getCell('K6').value = 'Масса кольца, М0, г';
      worksheet.getCell('K6').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('K6').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('L6:L7');
      worksheet.getCell('L6').value = 'Масса грунта, М, г';
      worksheet.getCell('L6').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('L6').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('M6:M7');
      worksheet.getCell('M6').value = 'Объем, V, см3';
      worksheet.getCell('M6').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('M6').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('N6:O6');
      worksheet.getCell('N6').value = 'Плотность грунта, р, г/см3';
      worksheet.getCell('N6').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('N6').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.getCell('N7').value = 'Образца';
      worksheet.getCell('N7').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('N7').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.getCell('O7').value = 'Средняя';
      worksheet.getCell('O7').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('O7').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      worksheet.mergeCells('P5:P7');
      worksheet.getCell('P5').value = 'Примечания';
      worksheet.getCell('P5').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('P5').border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };

      const rowNumbHead = () => {
        let arr = [];
        for (let i = 1; i <= 16; i++) {
          arr.push(i);
        };
        return arr;
      };
      worksheet.addRow(rowNumbHead(), 'i');

      const wetData = mainData.filter(item => { // фильтр только на влажность
        return item[8] === '+';
      })
       
      const rows1 = wetData.map((item, index) => { //скважины и глубины
        return [item[0], `${item[1]}-${item[2]}${item[3]}`, `${item[4]}-${item[5]}`]
      })
       worksheet.addRows(rows1, 'i');

      // для скачивания
      workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'jornal.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
    }

    return (
            <div>
              <input type="button" onClick={cbSave} value="Скачать в Excel"/>
              <input type="button" onClick={cbJornal} value="Журнал влажности"/>
            </div>
    )
}