# Notion API 사용한 후기

Notion API 로 데이터베이스 만들 수 있다고 해서 토이프로젝트에 한번 시도해봤다.

이 프로젝트에선 어드민 페이지처럼 List, Edit, Create 페이지가 필요했다. 
막상 사용해보니 List 페이지에서 여러가지 데이터를 조합해서 보여주는게 힘들다는 걸 느꼈다.

---

Notion API 는 크게 database, page, block 으로 나눠져 있다.

database 를 조회하면 column 속성이 나온다. 

```js
// GET https://api.notion.com/v1/databases/{databaseId}
// Issue Number, Name 이 있는 database 를 조회했다.

{
    "object": "database",
    "id": "{databaseId}",
    ...
    "properties": {
        "Issue Number": {
            "id": "g%60k~",
            "name": "Issue Number",
            "type": "number",
            "number": {
                "format": "number"
            }
        },
        "Name": {
            "id": "title",
            "name": "Name",
            "type": "title",
            "title": {}
        }
    }
}
```

database query 로 조회하면 page 형태의 row 가 리턴된다.
문제는, 여기에서 바로 데이터를 가져올 수 없기 때문에 List 페이지에서 데이터를 바로 보여줄 수 없다.

```js
// POST https://api.notion.com/v1/databases/{databaseId}/query
// query 해온 column 정보와 데이터 갯수 정도만 볼 수 있다.
{
    "object": "list",
    "results": [
        {
            "object": "page",
            "id": "xxx...",
            ...
            "properties": {
                "Issue Number": {
                    "id": "g%60k~"
                },
                "Name": {
                    "id": "title"
                }
            }
        },
        {
            "object": "page",
            "id": "yyy...",
            "properties": {
                "Issue Number": {
                    "id": "g%60k~"
                },
                "Name": {
                    "id": "title"
                }
            }
        }
    ],
    "next_cursor": null,
    "has_more": false,
    "type": "page",
    "page": {}
}
```

대신 특정 page 를 조회하면 Edit 페이지에서 기존 데이터를 불러올 수 있다. 
```js
// GET https://api.notion.com/v1/pages/{pageId}
// 이제 내가 원하던 value 가 나타났다.
{
    "object": "page",
    "id": "{pageId}",
    ...
    "properties": {
        "Issue Number": {
            "id": "g%60k~",
            "type": "number",
            "number": 2 // --> value
        },
        "Name": {
            "id": "title",
            "type": "title",
            "title": [
                {
                    "type": "text",
                    "text": {
                        "content": "ho", // --> value
                        "link": null
                    },
                    "annotations": {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    },
                    "plain_text": "ho",
                    "href": null
                }
            ]
        }
    }
}
```

---

결론.

List 에서 컨텐츠 불러오는 게 개선된 후 Notion API 를 사용해보려고 한다.
지금 프로젝트에선 다른 걸 해보기로 ..

참고: https://developers.notion.com/
