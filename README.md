json2dom
===
t will make HTML DOM from json format file.

## Install

```bash
npm install json2dom
```

## Sample Code

```javascript
class Controller {
  beforeContentCreate(data){
    // some action for before create 'Content' element
    return true;
  }
}
const ctl = new Controller();
const Json2Dom = require('json2dom');
const j2d = new Json2Dom(ctl);
j2d.load('path/to/format.js').then((dom) => {
  const target = document.getElementById('target');
  target.appendChild(dom);
});
```
## Sample JSON
```javascript
{
  "$wrapper": {
    "type": "div",
    "style": "width: 100%; position:relative; margin:0 auto, background-color:#000;",
    "$content": {
      "type": "div"
    }
  }
}
```

## Author
[kuro-daei](https://github.com/kuro-daei)

## Repository
[GitHub](https://github.com/kuro-daei/json2dom)

## Lisence
Apache-2.0
