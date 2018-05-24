# Who likes it?

You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

Implement a function likes :: [String] -> String, which must take in input array, containing the names of people who like an item. It must return the display text as shown in the examples:

likes [] // must be "no one likes this"
likes ["Peter"] // must be "Peter likes this"
likes ["Jacob", "Alex"] // must be "Jacob and Alex like this"
likes ["Max", "John", "Mark"] // must be "Max, John and Mark like this"
likes ["Alex", "Jacob", "Mark", "Max"] // must be "Alex, Jacob and 2 others like this"
For 4 or more names, the number in and 2 others simply increases.

## Mine
```javascript
function likes(names) {
  var len = names.length;
  var result = "";
  
  if (len == 0) {
    result += "no one";
  }
  else if (len == 1) {
    result += names[0];
  }
  else if (len == 2) {
    result += names[0];
    result += " and ";
    result += names[1];
  }
  else if (len == 3) {
    result += names[0];
    result += ", ";
    result += names[1];
    result += " and ";
    result += names[2];
  }
  else {
    result += names[0];
    result += ", ";
    result += names[1];
    result += " and ";
    
    if (len > 2) {
      result += (len - 2);
      result += " others";
    }
  }
  
  result += (len <= 1) ? " likes this" : " like this";
  return result;
}
```

## Best Practice

```javascript
function likes(names) {
  names = names || [];
  switch(names.length){
    case 0: return 'no one likes this'; break;
    case 1: return names[0] + ' likes this'; break;
    case 2: return names[0] + ' and ' + names[1] + ' like this'; break;
    case 3: return names[0] + ', ' + names[1] + ' and ' + names[2] + ' like this'; break;
    default: return names[0] + ', ' + names[1] + ' and ' + (names.length - 2) + ' others like this';
  }
}
```

아아 switch case 문도 생각했었는데.. 무작정 하다보니 if 문으로 더러워졌다. switch case 문 애용하기^^
다음은 clever 딱지 받은 답변들

```javascript
function likes (names) {
  var templates = [
    'no one likes this',
    '{name} likes this',
    '{name} and {name} like this',
    '{name}, {name} and {name} like this',
    '{name}, {name} and {n} others like this'
  ];
  var idx = Math.min(names.length, 4);
  
  return templates[idx].replace(/{name}|{n}/g, function (val) {
    return val === '{name}' ? names.shift() : names.length;
  });
}
```

```javascript
function likes(names) {
  return {
    0: 'no one likes this',
    1: `${names[0]} likes this`, 
    2: `${names[0]} and ${names[1]} like this`, 
    3: `${names[0]}, ${names[1]} and ${names[2]} like this`, 
    4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`, 
  }[Math.min(4, names.length)]
}
```
