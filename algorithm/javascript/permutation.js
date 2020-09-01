function nPr(n, r) {
  let result = 1;
  let limit = (n - r + 1);
  
  for (let i = n; i >= limit; i--) {
    result *= i;
  }
  
  return result;
}

console.log(nPr(5, 3)); // 60