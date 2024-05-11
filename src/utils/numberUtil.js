// numberUtils.js
export function parseNumberWithCommas(number) {
  let numberStr = String(number);
  let [integerPart, decimalPart] = numberStr.split('.');
  let integerPartWithCommas = "";
  for (let i = integerPart.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % 3 === 0) {
      integerPartWithCommas = ',' + integerPartWithCommas;
    }
    integerPartWithCommas = integerPart[i] + integerPartWithCommas;
  }
  if (decimalPart) {
    return integerPartWithCommas + '.' + decimalPart;
  } else {
    return integerPartWithCommas;
  }
}
