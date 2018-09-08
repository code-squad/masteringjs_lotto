var widget = {
    "debug": "on",
    "window": {
        "title": "Sample Konfabulator Widget",
        "name": "main_window",
        "width": 500,
        "height": 500
    },
    "image": { 
        "src": "Images/Sun.png",
        "name": "sun1",
        "hOffset": 250,
        "vOffset": 250,
        "alignment": "center"
    },
    "text": {
        "data": "Click Here",
        "size": 36,
        "style": "bold",
        "name": "text1",
        "hOffset": 250,
        "vOffset": 100,
        "alignment": "center",
        "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
    }
}

var key1 = Object.keys(widget)
var result = [];

key1.forEach(function(value){
	if(typeof widget[value] == "object"){
		Object.keys(widget[value]).forEach(function(value2){
			if(typeof widget[value][value2] == "number") {
                result.push(value2);}})
	  }});
console.log (result);

