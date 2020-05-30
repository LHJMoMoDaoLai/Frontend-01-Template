function getStyle(element){
    if(!element.style){
        element.style = {}
    }

    for(let prop in element.computedStyle){
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value
    
        if(element.style[prop].toString().match(/px$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
        if(element.style[prop].toString().match(/^[0-9\.]+$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style
}

function layout(element){
    if(!element.computedStyle){
        return;
    }
    var elementStyle = getStyle(element);

    if(elementStyle.display !== "flex"){
        return ;
    }
    console.log(element.children )
    var items = element.children.filter(e=> e.type === "element")

    items.sort(function(a,b){
        return (a.order || 0) -(b.order || 0)
    })

    var style = elementStyle;

    ["width","height"].forEach(size =>{
        if(style[size] === "auto" || style[size] ===""){
            style[size] = null
        }
    })

    if(!style.flexDirection || style.flexDirection === "auto"){
        style.flexDirection = "row";
    }
    if(!style.alignItem || style.alignItem ==="auto"){
        style.alignItem = "stretch";
    }
    if(!style.justifyContent || style.justifyContent === "auto"){
        style.justifyContent = "flex-start"
    }
    if(!style.flexWrap || style.flexWrap == "auto"){
        style.flexWrap = "nowrap"
    }
    if(!style.alignContent || style.alignContent === "auto"){
        style.alignContent = "stretch"
    }

    var mainSize,mainStart,mainEnd,mainSign,mainBase,
        crossSize,crossStart,crossEnd,crossSign,crossBase;
    
    if(style.flexDirection ==="row"){
        mainSize = "width";
        mainStart = "left";
        mainEnd = "right";
        mainSign = +1;
        mainBase = 0;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom"
    }
    if(style.flexDirection === "row-reverse"){
        mainSize = "width";
        mainStart = "right";
        mainEnd = "left";
        mainSign = -1;
        mainBase = style.width;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
    }
    if(style.flexDirection === "column"){
        mainSize = "height";
        mainStart = "top";
        mainEnd = "bottom";
        mainSign = +1;
        mainBase = 0;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right"
    }

    if(style.flexDirection === "column-reverse"){
        mainSize = "height";
        mainStart = "bottom";
        mainEnd = "top";
        mainSign = -1;
        mainBase = style.height;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
    }

    if(style.flexWrap === "wrap-reverse"){
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign= -1;
    } else {
        crossSign = 1;
        crossBase = 0;
    }

    var isAutoMainSize = false;
    if(!style[mainSize]){
        elementStyle[mainSize] = 0;
        for(var i = 0 ; i< items.length;i++){
            var item = item[i];
            var itemStyle = getStyle(item)
            if(itemStyle[mainSize] !== null ||itemStyle[mainSize] !== (void 0)){
                elementStyle[mainSize] = elementStyle[mainSize] +itemStyle[mainSize];
            }
        }
        isAutoMainSize = true;
    }


    var flexLine = []

    var flexLines = [flexLine]

    var mainSpace = elementStyle[mainSize]

    var crossSpace = 0;

    for(var i = 0; i < items.length; i++){
        var item = item[i];
        var itemStyle = getStyle(item);

        if(itemStyle[mainSize] === null){
            itemStyle[mainSize] = 0
        } 

        if(itemStyle.flex){
            flexLine.push(item)
        } else if(style.flexWrap === "nowrap" && isAutoMainSize){
            mainSpace -= itemStyle[mainSpace];
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
                crossSpace = Math.max(crossSpace,itemStyle[crossSize])
            }
            flexLine.push(item)
        } else {
            if(itemStyle[mianSize] > style[mianSize]){
                itemStyle[mainSize] = style[mainSize];
            }

            if(mainSpace<itemStyle[mainSize]){
                //剩余空间放不下item
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;

                flexLine = [];
                flexLines.push(flexLine);

                flexLine.push(item);

                mainSpace = style[mainSize]

                crossSpace = 0;

            } else {
                flexLine.push(item);
            }

            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
                crossSpace = Math.max(crossSpace,itemStyle[crossSize])
            }
            mainSpace -= itemStyle[mainSize]
        }
    }
    flexLine.mainSpace = mainSpace

    if(style.flexWrap === "nowrap" || isAutoMainSize){
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] :crossSpace;
    } else {
        flexLine.crossSpace = crossSpace
    }

    if(mainSpace<0){
        //overflow，宽度为负
        var scale = style[mainSize] / (style[mainSize]-mainSpace);
        var currentMain = mainBase;

        for(var i = 0;i< items.length;i++){
            var item = items[i];
            var itemStyle = getStyle(item);

            if(itemStyle.flex){
                itemStyle[mainSize] = 0
            }

            itemStyle[mainSize] = item[mainSize] * scale;

            itemStyle[mainStart] = currentMain;

            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];

            currentMain = itemStyle[mainEnd]
        } 
    }else {
        //处理每一个flexLine
        flexLines.forEach(function(items){
            var mainSpace = items.mainSpace;
            var flexTotal = 0;
            
            for(var i = 0;i<items.length;i++){
                var item = items[i]
                var itemStyle = getStyle(item);

               if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))){
                   flexTotal += itemStyle.flex;
                   continue
               }
            }
            if(flexTotal >0){
                //有flex items
                var currentMain = mainBase;
                for(var i = 0;i<items.length;i++){
                    var item = items[i]
                    var itemStyle = getStyle(item);
                    if(itemStyle.flex){
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }
    
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] +mainSign *itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd]
                }
            } else {
                var currentMain,step;
                //没有flex item,这时候处理justfyContent
                if(style.justifyContent === "flex-start"){
                    currentMain = mainBase;
                    step = 0;
                } 
                if(style.justifyContent ==="flex-end"){
                    currentMain = mainSpace * mainSign + mainBase;
                    step = 0;
                }
                if(style.justifyContent ==="space-between"){
                    step = mainSpace / 2 * mainSign + mainBase;
                    currentMain = mainBase;
                }
                if(style.justifyContent ==="space-around"){
                    step = mainSpace / (items.length-1) * mainSign ;
                    currentMain = step / 2 + mainBase;
                }

                for(var i = 0;i<items.length;i++){
                    var item = items[i];
                    var itemStyle = getStyle(item);

                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] +mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd]
                }
                

            }

            
        })  
    }

    //计算cross 
    //align-items,align-self

    var  crossSpace ;

    if(!style[crossSize]){
        crossSpace = 0;
        elementStyle [crossSpace] = 0;

        for(var i = 0;i<flexLines.length;i++){
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
        }
    } else {
        crossSpace = style[crossSize];

        for(var i = 0;i<flexLine.length;i++){
            crossSpace -= flexLines[i].crossSpace
        }
    }

    if(style.flexWrap == "wrap-reverse"){
        crossBase = style[crossSize];
    } else {
        crossBase = 0
    }

    var lineSize = style[crossSize] / flexLines.length;

    var step ;
    if(style.alignContent  === "flex-start"){
        crossBase += 0 ;
        step = 0;
    }
    if(style.alignContent  === "flex-end"){
        crossBase += crossSign * crossSpace ;
        step = 0;
    }
    if(style.alignContent  === "center"){
        crossBase += crossSign * crossSpace /2 ;
        step = 0;
    }
    if(style.alignContent  === "space-between"){
        crossBase += 0 ;
        step = crossSpace / (flexLines.length -1);
    }
    
    if(style.alignContent  === "space-around"){
        
        step = crossSpace / (flexLines.length );
        crossBase = crossSpace * step  / 2;
    }
    if(style.alignContent  === "stretch"){
        step =0;
        crossBase = 0;
    }

    flexLines.forEach(function(item){
        var lineCrossSize = style.alignContent == "stretch" ?
            items.crossSpace  + crossSpace / flexLines.length :
            item.crossSpace;
        for(var i =0;i<items.length;i++){
            var item = items[i];
            var itemStyle = getStyle(item);

            var align = itemStyle.alignSelf || style.alignItems;

            if(itemStyle[crossSize] == null){
                itemStyle[crossSize] = (align === "stretch") ? lineCrossSize :0;

                if(align === "flex-start"){
                    itemStyle[crossStart] = crossBase;
                    itemStyle[crossEnd] = itemStyle[crossStart] - crossSign * itemStyle[crossSize];
                }
                if(align === "flex-end"){
                    itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                    itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
                }
                if(align === "center"){
                    itemStyle[crossStart] =  crossBase + crossSign * (lineCrossSize - itemStyle[crpssSize]) /2;
                    itemStyle[crossEnd] = itemStyle[crossStart] - crossSign * itemStyle[crossSize];
                    
                }
                if(align === "stretch"){
                    itemStyle[crossStart] =  crossBase 
                    itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))?
                    itemStyle[crossSize] :lineCrossSize);
                    
                    itemStyle[crossSize ]= crossSign * (itemStyle[corssEnd] - itemStyle[crossStart])
                }
            }
            crossBase += crossSign * (lineCrossSize +step)
        }
    })


}

module.exports = layout