

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
    const matched = /^\[\s*([\w-]+).*\]$/.exec(selector)
}



function matchSimpleSelector(selector,element){
    if(!selector || !element){
        return false;
    }

    if(selector.startsWith(".")){
        return matchClassName(element,selector)
    } else if(selector.startsWith("#")){
        return matchId(element,selector)
    } else {
        return matchTagName(element,selector)
    }
}
