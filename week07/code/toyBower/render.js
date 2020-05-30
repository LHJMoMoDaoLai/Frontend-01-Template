const images = require("images");


function render(viewport,element){
    console.log(element)
    if(element.style){
        var img = images(element.style.width,element.style.height);
        console.log(11111111)

        if(element.style['background-color']){
            console.log(333333333)
            let color = element.style['background-color'] || "rgb(0,0,0)";
            console.log(color)
            let rgbFlag = color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            let color16 = color.match(/^#/);
            if(rgbFlag){
                img.fill(Number(RegExp.$1),Number(RegExp.$2),Number(RegExp.$3),1);
            } else if(color16){
                console.log(42423232332)
            }
            
            viewport.draw(img,element.style.left||0,element.style.top||0)
            console.log(5555)
        }
    }

    // if(element.children){
    //     for(var child of element.children){
    //         render(viewport,child)
    //     }
    // }
}

module.exports = render;