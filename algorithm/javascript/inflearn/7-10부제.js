function solution(day, cars) {
  // 1자리 숫자 day 랑 비교.
  // 같은 자리 숫자는 위반하는 차임.
  return cars.reduce((acc, cur) => {
    if (cur % 10 === day) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

console.log(solution(3, [25, 23, 11, 47, 53, 17, 33]));
console.log(solution(0, [12, 20, 54, 30, 87, 91, 30]));