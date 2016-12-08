{
  "$wrapper": {
    "type": "div",
    "style": "width: 100%; position:relative; margin:0 auto, background-color:#000;",
    "data": { "ratio": "16:9" },
    "$loader": {
      "type": "img",
      "style": "width:30px; height:30px; position:absolute; margin:auto; top:0; bottom:0; left:0; right:0; object-fit:contain;"
    },
    "$video": {
      "type": "div",
      "style": "width: 80%; height: 80%; position:relative; margin:auto; top:0 auto; background-color:#000;",
      "$player": {
        "type": "dynamic",
        "style": "width:100%; height:100%; position:absolute; margin:auto; top:1px; bottom:2px; left:3px; right:4px; object-fit:contain;"
      },
      "$tome": {
        "type": "dynamic",
        "style": "width: 100%; height: 100%; position:absolute; margin:auto; top:0; bottom:0; left:0; right:0; object-fit:contain;",
        "data": { "companionX": 640, "companionY": 360 }
      },
      "$btnFull": {
        "type": "img",
        "style": "width: 30px; height: 30px; bottom:1px; right:1px;"
      },
      "$btnDetail": {
        "type": "img",
        "style": "width: 30px; height: 30px; bottom:1px; right:1px;"
      },
      "$btnReplay": {
        "type": "img",
        "style": "width: 30px; height: 30px; bottom:1px; right:32px;"
      }
    },
    "$btnClose": {
      "type": "img",
      "style": "width: 30px; height: 30px; top:1px; right:1px;"
    },
    "$passback": {
      "type": "div",
      "style": "width: 300px; height: 250px;"
    }
  }
}
