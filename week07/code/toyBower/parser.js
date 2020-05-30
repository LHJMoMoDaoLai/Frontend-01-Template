
const EOF = Symbol("EOF")//EOF:end of file  标识文件结束
let css = require("css")
let currentToken = null
let currentAttribute = null
let currentTextNode  = null
let layout =  require("./layout")

let stack = [{type:"document", children:[]}]
let rules = [];


function addCSSRules(text){
    var ast = css.parse(text);
    // console.log(JSON.stringify(ast,null,"    "));
    rules.push(...ast.stylesheet.rules);
}
function matchF(element,selector){
    if(!selector || !element.attributes){
        return false;
    }
    if(selector.charAt(0) == "#"){
        var attr = element.attributes.filter(attr => attr.name === "id")[0]
        if(attr && attr.value === selector.replace("#","")){
            return true
        }
    } else if(selector.charAt(0) == "."){
        var attr = element.attributes.filter(attr => attr.name === "class")[0]
        if(attr && attr.value === selector.replace(".","")){
            return true
        }
    } else {
        if(element.tagName === selector){
            return true
        }
    }
    return false
}

function specificity(selector) {
    var p = [0,0,0,0];
    var selectorParts = selector.split(" ");
    for (var part of selectorParts) {
        if (part.charAt(0) == "#") {
            p[1] += 1;
        } else if (part.charAt(0) == ".") {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}
function compare(sp1,sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] -sp2[0];
    } 
    if (sp1[1] - sp2[1]) {
        return sp1[1] -sp2[1];
    }
    if (sp1[2] - sp2[2]) {
        return sp1[2] -sp2[2];
    }
    return sp1[3] - sp2[3];

}
function computedCSS(element){
    //获取父元素序列 
    //slice切片 两个参数  如果不传，就复制一份，不污染stack
    var elements = stack.slice().reverse()

    // //拆分选择器
    if(!element.computedStyle){
        element.computedStyle = {}
    }
    
    for(let rule of rules){
        var selectorParts = rule.selectors[0].split(" ").reverse();
        
        if(!matchF(element,selectorParts[0]))
            continue;
        

        
        var j = 1//表示每一个selector
        for(let i =0 ; i<elements.length; i++){
           
            if(matchF(elements[i],selectorParts[j])){
                j++
            }
        }
        let matched = false //每一条规则的mached
        console.log(j >= selectorParts.length)
        if(j >= selectorParts.length){
            matched = true
        }
        
        if(matched){
            // console.log("Element",element,"matched rule", rule)
            var sp = specificity(rule.selectors[0]);
            var computedStyle = element.computedStyle;
            for(var declaration of rule.declarations){
                if(!computedStyle[declaration.property]){
                    computedStyle[declaration.property] = {}
                }
                if(!computedStyle[declaration.property].specificity){
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                } else if(compare(computedStyle[declaration.property].specificity,sp)<0){
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }
                
            }
            // console.log(element.computedStyle)
        }
    }
}
function emit(token){
    let top = stack[stack.length-1];
   

    if(token.type === "startTag"){
        let element = {
            type: "element",
            children:[],
            attributes:[]
        }
        element.tagName = token.tagName;
        for(let x in token){
            if(x !="type" || x != "tagName"){
                element.attributes.push({
                    name:x,
                    value: token[x]
                })
            }
        }
        computedCSS(element)

        // element.parent = top;
        top.children.push(element)
        if(!token.isSelfClosing){
            stack.push(element)
        }
        currentTextNode = null;
    } else if(token.type ==="endTag" ){
        if(top.tagName !==token.tagName){
            throw new Error("Tag start ebd doesn't match");
            
        } else {
            /***************遇到style标签，执行添加css规则的操作**********************/
            if(top.tagName === "style"){
                addCSSRules(top.children[0].content)
            }
            layout(top)
            stack.pop();
        }
        currentTextNode = null

    } else  if(token.type === "text"){
        if(currentTextNode == null){
            currentTextNode = {
                type: "text",
                content:""
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
}





function data(c){
    if(c == "<"){
        return tagOpen;//开始标签 结束标签  自封闭标签
    } else if(c == EOF){
        emit({
            type:"EOF"
        })
        return ;
    }else {
        emit({
            type:"text",
            content: c
        })
        return data
    }
}
function tagOpen(c){
    if(c == "/"){//结束标签
        return endTagOpen;
    } else if(c.match(/[a-zA-Z]+/)){ //标签名称
        currentToken = {
            type:"startTag",
            tagName:""
        }
        return tagName(c)
    }else {
        emit({
            type: "text",
            content: c
        })
        return ;
    }
}
function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    } else if(c == "/"){
        return selfClosingStartTag;
    } else if(c.match(/[a-zA-Z]+/)){
        currentToken.tagName += c//.toLowerCase();
        return tagName
    } else if(c == ">"){
        emit(currentToken)
        return data
    }else {
        return tagName;
    }
}

function endTagOpen(c){
    if(c.match(/[a-zA-Z]+/)){
        currentToken = {
            type: "endTag",
            tagName:""
        }
        return tagName(c)
    } else if(c == ">"){
        // return data
    } else if(c ==EOF){

    }else {
        // return tagName(c);
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    } else if(c=== "/" ||c === ">" || c === "EOF"){
        return afterAttributeName(c);
    } else if(c === "="){
        // return beforeAttributeName
    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}

function attributeName(c){
    if(c.match((/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF)){
        return afterAttributeName(c)
    } else if(c === "="){
        return beforeAttributeValue
    } else if(c === "\u0000"){

    } else if( c === "\"" || c === "‘" || c === "<"){

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function afterAttributeName(c){
    if(c.match((/^[\t\n\f ]$/))){
        return afterAttributeName
    } else if(c === "/"){
        return selfClosingStartTag;
    } else if(c === ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data
    } else if(c === "="){
        return beforeAttributeValue
    } else if(c === EOF){

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: "",
            value:""
        }
        return attributeName(c)
    }
    // if()
}

function beforeAttributeValue(c){
    if(c.match((/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF)){
        return beforeAttributeValue
    } else if(c === "\""){
        return doubleQuotedAttributeValue
    } else if(c === "\'"){
        return singleQuotedAttributeValue
    } else if(c === ">"){
        // currentToken[currentAttribute.name] = currentAttribute.value;
        // emit(currentToken)
        return data
    } else {
        return UnquotedAttributeValue(c)
    }
}

function UnquotedAttributeValue(c){
    if(c.match("/^[\t\n\f ]$/")){
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data
    } else if( c == "\u0000"){

    } else if(c == "\"" ||c =="'"||c == "<" || c =="=" || c == "`"){

    } else if(c == EOF){

    }else {
        currentAttribute.value += c;
        return UnquotedAttributeValue
    }
}

function doubleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue;
    } else if( c == "\u0000"){

    } else if(c === EOF){

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue;
    } else if( c == "\u0000"){

    } else if(c === EOF){

    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue
    }
}
function afterQuotedAttributeValue(c){
    if(c.match("/^[\t\n\f ]$/")){
        return beforeAttributeName;
    } else if(c =="/"){
        return selfClosingStartTag;
    } else if(c ==">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data
    } else if(c === EOF){

    } else {
        currentAttribute.value+= c;
        return doubleQuotedAttributeValue
        
    }
}


function selfClosingStartTag(c){
    if(c === ">"){
        currentToken.isSelfClosing = true;
        emit(currentToken)
        return data
    } else if(c === "EOF"){
        
    } else {
       
    }
}

module.exports.parseHTML = function parseHTML(html){
    let state = data;
    for(let c of html){
        // console.log(c)
        state = state(c);
    }

    state = state(EOF)//处理文件结束的
    return stack[0]
    console.log(stack[0])
}
