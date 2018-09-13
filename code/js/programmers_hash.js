// 프로그래머스 코딩테스트 '위장' (작업중)
// 해시 + 경우의 수 문제

function solution(clothes) {
    var answer = 0;
    var result = [];
    
    // --- 한 종류당 하나의 물건만 착용할 수 있음.
    // --- 의상 종류 :  의상 이름
    
    // headgear : yellow_hat, green_turban (2)
    // eyewear : blue_sunglasses (1)
    // face: blue_sunglasses (1)
    
    clothes.filter((item) => {
        if (!result[item[1]]) {
            result[item[1]] = [item[0]];
            return;
        }
        result[item[1]].push(item[0]);
    })
    
    console.log(result);
    
    for (var key in result) {
        answer += result[key].length;
    }
    
    return answer;
}
