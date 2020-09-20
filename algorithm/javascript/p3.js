function solution(play_list, listen_time) {
  // 1을 찾고, 앞으로 listen_time, 뒤로 listen_time 을 구한다.
  // 계산하기
  
  if (play_list.length < listen_time) {
    return play_list.length;
  } else {
    return listen_time;
  }
}

solution([1, 2, 3, 4], 5);