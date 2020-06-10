

function matchClassName(element,selector){
    // return element.className === selector.replace(".",'')
    return element.className.split(/\s+/).includes(selector.replace(".",""))
}

function matchId(element,selector){
    return element.id.split(/\s+/).includes(selector.replace("#",""))
}

function matchTagName(element,selector){
    return element.tagName = selector.toUpperCase()
}

function matchAttribute(element,selector){

    // const matched = /^\[\s*([\w-]+).\s*\]$/.exec(selector)
    const matched = /^\[\s*([\w-]+)\s*(?:(=)\s*(\S+))?\s*\]$/.exec(selector)
    if(!matched){
        return false;
    }
    const name = matched[1];
    const attrValue = element.getAttribute(name);
    // return attrValue === null
    if(attrValue == null){
        return false
    }

    const value = matched[2]
    if(!value){
        return true
    }
    //属性值比较
    const selectorVal = matched[3].replace(/["']/g,'') //去除value的引导
    return attrValue === selectorVal
}



function matchSimpleSelector(selector,element){
    if(!selector || !element){
        return false;
    }

    if(selector.startsWith(".")){
        return matchClassName(element,selector)
    } else if(selector.startsWith("#")){
        return matchId(element,selector)
    } else if(selector.match(/^\[(.+?)\]$/)){
        return matchAttribute(element,selector)
    }else {
        return matchTagName(element,selector)
    }
}
let flag = matchSimpleSelector("[data='attr1']",document.getElementById("ids"))
console.log(flag)