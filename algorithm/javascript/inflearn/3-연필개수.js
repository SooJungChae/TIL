function solution(cnt) {
    return Math.ceil(cnt / 12);
}

console.log(solution(25));

// parseInt 로 int 로 바꾸고 무조건 나머지는 + 해줬었는데
// 그냥 Math.ceil 로 해서 똑같이 나타내줄 수 있군...