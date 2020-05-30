const images = require("images");
function colorRgb(str){  
    //十六进制颜色值的正则表达式 
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = new String().toLocaleLowerCase.call(str);  
    console.log(sColor)
    if(sColor && reg.test(sColor)){  
        if(sColor.length === 4){  
            var sColorNew = "#";  
            for(var i=1; i<4; i+=1){  
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     
            }  
            sColor = sColorNew;  
        }  
        //处理六位的颜色值  
        var sColorChange = [];  
        for(var i=1; i<7; i+=2){  
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
        }  
        return sColorChange 
    }else{  
        return sColor;    
    }  
}; 

function render(viewport,element){
    
    if(element.style){
        console.log(element.style.width,'------------width')
        console.log(element.style.height,'-------------height')
        var img = images(element.style.width,element.style.height);
        // var img = images(100,100);
        console.log(element.style['background-color'])
        if(element.style['background-color']){
            let color = element.style['background-color'] || "rgb(0,0,0)";
            color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            let color16 = color.match(/^#/);
            // console.log(color.indexOf("rgb")>-1)
            if(color.indexOf("rgb")>-1){
                img.fill(Number(RegExp.$1),Number(RegExp.$2),Number(RegExp.$3),1);
            } else if(color16){
                let colorRgbArr = colorRgb(color)
                img.fill(Number(colorRgbArr[0]),Number(colorRgbArr[1]),Number(colorRgbArr[2]),1)
            }
            viewport.draw(img,element.style.left||0,element.style.top||0)
        }
    }

    if(element.children){
        for(var child of element.children){
            render(viewport,child)
        }
    }
}

module.exports = render;