export const sumBase = (allQuan, priceArr) => {
    let sum = 0;
    for (let i = 0; i < priceArr.length; i++) {
      const element = priceArr[i];
      sum += allQuan[i] * element['price'];
    }
    return sum;
};

export const sumWithComp = (summaBase) => (summaBase * 1.2).toFixed(2);

export const sum2017 = (summaWithComp) => (summaWithComp * 1000 * 0.00013164 * 1.0914).toFixed(2);

export const sumCur = (summa2017) => (summa2017 * 1.0821 * 1.0655 * 1.0757 * 1.0826 * 1.1295 * 1.1069 * 1.0076).toFixed(2);