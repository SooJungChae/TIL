# 트리

- 트리를 닮은 형태로 root 와 , child nodes 들로 구성되어 있다.
- N 노드와 N-1 엣지가 있는 비순환 그래프이다.

## Binary tree
- 트리의 전형적인 구조.
- 이름에서 알다시피 각각의 노드는 최대 2개의 자식을 가질 수 있다.
- child 를 left, right 로 구분한다.

## 트리 순회
- Pre-order: 루트 > left subtree > right subtree

- In-order: left subtree > 루트 > right subtree
    - `binary search tree` 에선 in-order 방식으로 데이터를 정렬할 수 있다. [Binary-Search Tree](https://leetcode.com/explore/learn/card/introduction-to-data-structure-binary-search-tree/)
- Post-order: left subtree > right subtree > root
    - 노드를 `삭제`할 때 `post-order` 프로세스가 진행된다. 즉, 노드를 삭제하면 그 전에 left child, right child 를 먼저 삭제한다.
    - 수식이나 boolean 을 표현할 수 있다. 수학 표현식에서 많이 사용된다. 프로그램을 수학적으로 표현하는 게 쉽다. (참고 경로 1번의 이미지를 꼭! 보면서 이해하자) 연산자를 만나면 2개 요소를 stack 에서 뽑아서 연산한다음에 다시 스택에 추가해두면 된다. (-> 이건 나중에 다시 )

- Level-order: center > 다음 레벨 이웃 > 다음 레벨 이웃...
    - 트리 레벨 별로 조회한다.
    - 넓이 우선 탐색
    - que 를 사용

- Recursive(재귀) 나 Iterative(반복)로 구현하면 된다.
- Pre-order, in-order ... 조회 순서가 헷갈린다면 root가 어떤 위치에 있는지 보면 된다. (ex. pre-order 는 center 가 맨 왼쪽. in-order 는 center 가 가운데, post-order 는 center 가 맨 마지막)

## 참고
- [트리 움직임이 어려웠는데 leetcode 설명이 제일 이해하기 쉬웠다.](https://leetcode.com/explore/learn/card/data-structure-tree/134/traverse-a-tree/992/)
- [이진 표현식 트리](https://www.youtube.com/watch?v=_LxbhLNRZkI)