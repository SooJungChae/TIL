// 프로그래머스 코딩테스트 '위장' (작업중)
// 해시 + 경우의 수 문제

function solution(clothes) {
    var answer = 0;
    // 매일 다른 옷. 서로 다른 옷의 조합의 수 return 하기
    // 의상 이름, 의상 종류
    // [[yellow_hat, headgear], 
    // [blue_sunglasses, eyewear], 
    // [green_turban, headgear]]
    
    // headgear : yellow_hat, green_turban (2)
    // eyewear : blue_sunglasses (1)
    var result = [];
    // 한 종류당 하나의 물건만 착용할 수 있음.
    clothes.filter((item) => {
        if (!result[item[1]]) {
            result[item[1]] = [item[0]];
            return;
        }
        result[item[1]].push(item[0]);
    })
    
    console.log(result);
    for (var key in result) {
        console.log(key, result[key].length);
        answer += result[key].length;
    }
    
    return answer;
}
