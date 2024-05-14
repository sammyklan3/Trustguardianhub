export function parseNumberWithCommas(number) {
  let numberStr = String(number);
  let [integerPart, decimalPart] = numberStr.split('.');
  let integerPartWithCommas = "";
  
  // Abbreviation threshold
  const abbreviateThreshold = 10000;

  // If the number is greater than or equal to the abbreviation threshold
  if (Math.abs(number) >= abbreviateThreshold) {
    // Abbreviate using k, M, etc.
    if (Math.abs(number) >= 1e6) {
      integerPart = (Math.abs(number) / 1e6).toFixed(1) + "M";
    } else if (Math.abs(number) >= 1e3) {
      integerPart = (Math.abs(number) / 1e3).toFixed(1) + "k";
    }
    // Include sign
    if (number < 0) {
      integerPart = "-" + integerPart;
    }
    return integerPart;
  }

  // If the number is below the abbreviation threshold, apply comma formatting
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
