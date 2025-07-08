import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, TextRun, Tab, AlignmentType, SectionType, HeadingLevel, 
    SymbolRun, TabStopType, TabStopPosition, BorderStyle, FrameAnchorType, HorizontalPositionAlign, VerticalPositionAlign
} from "docx";

const title = new Paragraph({
    children: [
        new TextRun({
            text: "Проектное научно-исследовательское республиканское унитарное предприятие \u00ABНИИ Белгипротопгаз\u00BB",
            size: 26,
            bold: true,
        }),
    ],
    alignment:	AlignmentType.CENTER,
});

const emptyPar = new Paragraph({
    children: [
        new TextRun({
            text: "",
            size: 26,
            bold: true,
        }),
    ],
    alignment:	AlignmentType.CENTER,
});

const headerTable = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({text:"Испытательная лаборатория", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Проектного научно-исследовательского", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "республиканского унитарного предприятия", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "\u00ABНИИ Белгипротопгаз\u00BB аккредитована", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Государственным предприятием \u00ABБГЦА\u00BB", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "на соответствие требованиям", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "ГОСТ ISO/IEC 17025-2019.", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Аттестат аккредитации № BY/112 1.0257", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "до 08.08.2029", size: 26})]}),
                       
                    ],
                    width: {
                        size: 55,
                        type: WidthType.PERCENTAGE,
                    },
                    borders: {
                        top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    },
                    
                }),
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({children:[new Tab(), "УТВЕРЖДАЮ"], size: 26, })]}),
                        new Paragraph({children:[new TextRun({children:[new Tab(), "Начальник ИЛ"], size: 26, })]}),
                        new Paragraph({children:[new TextRun({children:[new Tab(), "_________  Зубец Е.А."], size: 26, })]}),
                        new Paragraph({children:[new TextRun({children:[new Tab(), "          .2025"], size: 26, })]}),
                    ],
                    width: {
                        size: 45,
                        type: WidthType.PERCENTAGE,
                    },
                    borders: {
                        top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    },
                }),
            ],
            
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({text:"220005, г. Минск, ул.В.Хоружей,3, ком. 103", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Тел.8-017-263-82-13, e-mail: niilab@bgtg.by", size: 26})]}),
                    ],
                    borders: {
                        top: {style: BorderStyle.THIN_THICK_LARGE_GAP,},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    },
                }),
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({children:[new Tab(), "Протокол на 2 страницах в 2 экз."], size: 26, })]}),
                        new Paragraph({children:[new TextRun({children:[new Tab(), "страница 1 из 2-х"], size: 26, })]}),
                    ],
                    borders: {
                        top: {style: BorderStyle.THIN_THICK_LARGE_GAP,},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    },
                }),
            ],
        }),
    ],
});

const protName = new Paragraph({
    children: [
        new TextRun({
            text: "ПРОТОКОЛ ИСПЫТАНИЙ",
            size: 26,
            bold: true,
        }),
    ],
    alignment:	AlignmentType.CENTER,
});

const protNumb = new Paragraph({
    children: [
        new TextRun({
            text: "№ 281в/2024-69w-70w-71w от 30.12.2024",
            size: 26,
        }),
    ],
    alignment:	AlignmentType.CENTER,
});

const infoTable = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({text:"Цель: определение рН воды", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Наименование и реквизиты Заказчика: Управление инженерных изысканий государ-ственного предприятия «НИИ Белгипротопгаз», 220036, г. Минск, пер. Домашевский,11А, ком. 507", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Наименование объекта испытаний: №5.3-24.220", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Обозначение ТНПА, устанавливающего требования к объекту испытаний: СН 2.01.07-2020", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Обозначение ТНПА, устанавливающего метод испытаний: СТБ ISO 10523-2009", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Обозначение ТНПА, устанавливающего порядок отбора проб: СТБ ISO 5667.3-2012", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Наименование органа, производившего отбор проб: группа инженерно-геологических изысканий УИИ", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Ответственный за доставку проб в ИЛ: Данчиков И.В.", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Сопроводительный документ: Ведомость от 30.12.2024", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Количество испытываемых проб: 3 (три) пробы: 0,5 литра, идентификационный № 69w, № 70w, № 71w", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Дата получения образцов: 30.12.2024", size: 26})]}),
                        new Paragraph({children:[new TextRun({text: "Дата проведения испытаний (начало-окончание):  30.12.2024", size: 26})]}),
                    ],
                    width: {
                        size: 55,
                        type: WidthType.PERCENTAGE,
                    },
                    borders: {
                        top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    },
                    
                }),
            ],
        }),
    ]
});

const conditions = new Paragraph({
    children: [
        new TextRun({
            text: "УСЛОВИЯ ПРОВЕДЕНИЯ ИСПЫТАНИЙ:",
            size: 26,
        }),
    ],
    alignment:	AlignmentType.CENTER,
});

const room = new Paragraph({
    children: [
        new TextRun({
            text: "(помещение 103Г)",
            size: 26,
        }),
    ],
    alignment:	AlignmentType.CENTER,
});

const tempAndPress = new Paragraph({
    children: [
        new TextRun({
            text: "Температура воздуха 23,6 С, относительная влажность воздуха 56,1 %",
            size: 26,
        }),
    ],
    alignment:	AlignmentType.CENTER,
});

const eqiupmentTitle = new Paragraph({
    children: [
        new TextRun({
            text: "ОБОРУДОВАНИЕ И СИ, ПРИМЕНЯЕМЫЕ ПРИ ПРОВЕДЕНИИ ИСПЫТАНИЙ",
            size: 26,
        }),
    ],
    alignment:	AlignmentType.CENTER,
});

const eqiupmentTable = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"№ п/п", size: 24})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Наименование и тип (марка) испытательного оборудования и средства измерений", size: 24})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Заводской номер", size: 24})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"№ свидетельства по-верки / калибровки БелГИМ", size: 24})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Срок поверки до:", size: 24})], alignment: AlignmentType.CENTER})]}),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"1", size: 18})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"2", size: 18})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"3", size: 18})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"4", size: 18})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"5", size: 18})], alignment: AlignmentType.CENTER})]}),
            ]
        }),
        new TableRow({
            children: [
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"1", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"рН-метр HI83141", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"03130094991", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"1-0226912-5024, BY 01№0009053-5024", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"27.05.2025", size: 26})], alignment: AlignmentType.LEFT})]}),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"2", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Термометр электронный HI 98509 Checktemp 1", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"2С8328", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"1-017148-5524", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"21.01.2025", size: 26})], alignment: AlignmentType.LEFT})]}),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"3", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Секундомер электронный С-01", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"450443", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"1-0143945-4324", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"20.06.2025", size: 26})], alignment: AlignmentType.LEFT})]}),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"4", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Прибор измерительный ПИ-002/1М.Д", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"21333", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"1-0315817-4924", size: 26})], alignment: AlignmentType.LEFT})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"07.07.2025", size: 26})], alignment: AlignmentType.LEFT})]}),
            ],
        }),
    ]
});

const resultsTitle = new Paragraph({
    children: [
        new TextRun({
            text: "РЕЗУЛЬТАТЫ ИСПЫТАНИЙ",
            size: 26,
        }),
    ],
    alignment:	AlignmentType.CENTER,
});

const resultstTable = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Номер образца", size: 26})], alignment: AlignmentType.CENTER})], rowSpan: 2}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Номер скважины", size: 26})], alignment: AlignmentType.CENTER})], rowSpan: 2}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Глубина, м", size: 26})], alignment: AlignmentType.CENTER})], rowSpan: 2}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Результат испытания, единицы рН", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Расширенная неопределенность, U (P = 95 %; k = 2)", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Класс среды ", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Характеристика среды по степени воздействия на строительные конструкции", size: 26})], alignment: AlignmentType.CENTER})], rowSpan: 1}),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"СТБ ISO 10523-2009", size: 26})], alignment: AlignmentType.CENTER})], columnSpan: 2}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"СН 2.01.07-2020 табл.5", size: 26})], alignment: AlignmentType.CENTER})], columnSpan: 2}),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"69w", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"2", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"3,5-4,0", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"6,8", size: 26, bold: true, })], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"± 0,04", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"ХА0", size: 26})], alignment: AlignmentType.CENTER})]}),
                new TableCell({children: [new Paragraph({children:[new TextRun({text:"Неагрессивная", size: 26})], alignment: AlignmentType.CENTER})]}),
            ],
        }),
    ]
});

const resultsDescr = new Paragraph({
    children: [
        new TextRun({
            text: "Полученные результаты измерений распространяются только на испытанные образцы, предоставленные Заказчиком.",
            size: 26,
        }),
    ],
    alignment:	AlignmentType.JUSTIFIED
});

const responsibility = new Paragraph({
    children: [
        new TextRun({
            text: "ИЛ не несет ответственности за отбор и транспортировку образцов.",
            size: 26,
        }),
    ],
    alignment:	AlignmentType.JUSTIFIED
});

const signaturesTable = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({text: "Испытания провел: начальник ИЛ", size: 26})]}),
                    ],
                    borders: {
                        top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    }
                }),
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({children:[new Tab(), "Е.А. Зубец"], size: 26, })], tabStops: [
                            {
                                type: TabStopType.LEFT,
                                position: 1500,
                            }
                        ]}),
                    ],
                    borders: {
                        top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    }
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({text: "Протокол испытаний (измерений) подготовил: начальник ИЛ", size: 26})]}),
                    ],
                    borders: {
                        top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    }
                }),
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({children:[new Tab(), "Е.А. Зубец"], size: 26, })], 
                        tabStops: [
                            {
                                type: TabStopType.LEFT,
                                position: 1500,
                            }
                        ]}),
                    ],
                    borders: {
                        top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    }
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({text: "Оформление протокола проверил: начальник ИЛ", size: 26})]}),
                    ],
                    borders: {
                        top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    }
                }),
                new TableCell({
                    children: [
                        new Paragraph({children:[new TextRun({children:[new Tab(), "Е.А. Зубец"], size: 26})], 
                        tabStops: [
                            {
                                type: TabStopType.LEFT,
                                position: 1500,
                            }
                        ]})],
                    borders: {
                        top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                        right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
                    }
                }),
            ],
        }),
    ]
});

const stampPlace = new Paragraph({
    children: [
        new TextRun({
            text: "М.П.",
            size: 16,
        }),
    ],
});

const stampPlace2 = new Paragraph({
    children: [
        new TextRun({
            text: "¥ ۞ỹ",
            size: 8,
        }),
    ],
});

const copies = new Paragraph({
    children: [
        new TextRun({
            text: "Данный протокол оформлен в 2 экземплярах на 2-х страницах и направлен:",
            size: 26,
        }),
    ],
});

const copy1 = new Paragraph({
    children: [
        new TextRun({
            text: "1-й экз.: ИЛ Государственное предприятие «НИИ Белгипротопгаз»",
            size: 26,
        }),
    ],
});

const copy2 = new Paragraph({
    children: [
        new TextRun({
            text: "2-ой экз.: Управление инженерных изысканий «НИИ Белгипротопгаз»",
            size: 26,
        }),
    ],
});

const dateIssued = new Paragraph({
    children: [
        new TextRun({
            text: "Дата выдачи протокола: 30.12.2025",
            size: 26,
        }),
    ],
});

const lawCopies = new Paragraph({
    children: [
        new TextRun({
            text: "Отчет не должен быть воспроизведен не в полном объеме без разрешения государственного предприятия ИЛ «НИИ Белгипротопгаз».",
            size: 26,
        }),
    ],
    alignment:	AlignmentType.JUSTIFIED
});






export const protDoc = new Document({
    sections: [
        {
            children: [
                title, emptyPar, headerTable, emptyPar, protName, protNumb, emptyPar, infoTable, emptyPar, 
                conditions, room, tempAndPress, emptyPar, eqiupmentTitle, eqiupmentTable, emptyPar, resultsTitle, emptyPar,
                resultstTable, emptyPar, resultsDescr, responsibility, emptyPar, signaturesTable, emptyPar, stampPlace, stampPlace2,
                emptyPar, copies, copy1, copy2, emptyPar, dateIssued, emptyPar, lawCopies
            ],
            properties: {
                page: {
                    margin: {
                        top: '1cm',
                        right: '1cm',
                        bottom: '1cm',
                        left: '2cm',
                    },
                },
            },
        }
       
    ],
});