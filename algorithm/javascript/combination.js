// nCr = nPr / r!
// nCr = n!/(n-r)! / r!
// nCr = n!/r!(n-r)!
// nCr = n*(n-1)*(n-2)*...(n-r+1) / r!

function factorial(n) {
  let result = 1;
  
  for (let i = n; i > 0; i--) {
    result *= i;
  }
  
  return result;
}

function nPr(n, r) {
  let result = 1;
  let limit = (n - r + 1);
  
  for (let i = n; i >= limit; i--) {
    result *= i;
  }
  
  return result;
}

function nCr(n, r) {
  return nPr(n, r) / factorial(r);
}

console.log(nCr(11, 3)); // 165