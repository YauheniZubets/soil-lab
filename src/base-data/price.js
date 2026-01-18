export const computerTech = 1.2;
export const factors2017 = 0.00013164 * 1.09140;
export const factorsCurrent = 1.0821 * 1.0655 * 1.0757 * 1.0826 * 1.1295 * 1.1069;
export const factorsMonth2024 = 1.0076;
export const factorsMonth2025 = [1.0105, 1.0105, 1.0105, 1.0144, 1.0144, 1.0144, 1.0144, 1.0144, 1.0144, 1.0144, 1.0144, 1.0144];
export const factorsMonth2026 = [1.0119, 1.0119, 1.0119, 1.0119, 1.0119, 1.0119, 1.0119, 1.0119, 1.0119, 1.0119, 1.0119, 1.0119];

export const factorByChoosedMonth = (year, month) => {
    let res = 1;
    if (year.length > 0) {
        for (let i = 0; i <= month; i++) {
            if (month === 0) {
                return year[0];
            } else {
                res *= year[i];
                res = res.toFixed(4);
                Number(res);
            }
        }
    }
    return res;
}

export const price = [
    {
        name: 'Гранулометрический состав',
        price: 33,
        point: 'табл. 13.3 п.8'
    },
    {
        name: 'Влажность песчаных грунтов',
        price: 7,
        point: 'табл. 13.3 п._'
    },
    {
        name: 'Влажность глинистых грунтов',
        price: 14,
        point: 'табл. 13.1 п.1'
    },
    {
        name: 'Плотность песчаных грунтов',
        price: 11,
        point: ''
    },
    {
        name: 'Плотность глинистых грунтов',
        price: 18,
        point: 'табл. 13.1 п.4',
    },
    {
        name: 'Плотность частиц грунта',
        price: 26,
        point: 'табл. 13.1 п.5'
    },
    {
        name: 'Граница текучести и раскатывания',
        price: 68,
        point: 'табл. 13.2 п.3'
    },
    {
        name: 'Коэффициент фильтрации песч. грунтов',
        price: 61,
        point: 'табл. 13.3 п.5'
    },
    {
        name: 'Угол естественного откоса',
        price: 13,
        point: 'табл. 13.3 п.4'
    },
    {
        name: 'Содержание органического вещества',
        price: 30,
        point: 'табл. 13.8 п.2'
    },
    {
        name: 'Степень разложения',
        price: 33,
        point: ''
    },
    {
        name: 'Карбонатность',
        price: 30,
        point: 'табл. 13.9 п.51'
    },
    {
        name: 'Грансостав ареометрическим методом',
        price: 66,
        point: 'табл. 13.1 п.23'
    },
    {
        name: 'Агрессивность к бетону',
        price: 95,
        point: 'табл. 13.14 п.5'
    },
    {
        name: 'Агрессивность к стали',
        price: 68,
        point: 'табл. 13.14 п.4'
    },
    {
        name: 'Хим. анализ воды',
        price: 170,
        point: 'табл. 13.12 п.3'
    }
];