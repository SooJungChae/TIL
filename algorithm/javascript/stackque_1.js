// 스택큐문제1 - 탑
function solution(heights) {
    var answer = [];
    var standard, compareWith;

    for (var i = heights.length - 1; i >= 0 ; i--) {
        standard = heights[i];
        
        for (var j = i - 1; j >= 0; j--) {
            compareWith = heights[j];
            
            if (compareWith > standard) {
                answer[i] = j + 1;
                break;
            }
        }
        
        if (answer[i] == null) {
            answer[i] = 0;
        }
    }
    
    return answer;
}
