
let currentToken = null
let currentAttribute = null

const EOF = Symbol("EOF")//EOF:end of file  标识文件结束

function emit(token){
    // if(token.type!="text"){
        console.log(token)
    // } 
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
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    } else if(c == "/"){
        return selfClosingStartTag;
    } else if(c.match(/[a-zA-Z]+/)){
        currentToken = {
            type: "endTag",
            tagName:""
        }
        return tagName(c)
    } else if(c == ">"){
        return data
    }else {
        return tagName(c);
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
    // console.log(11111111)
    // console.log(c)
    if(c.match((/^[\t\n\f ]$/))){
        return afterAttributeName
    } else if(c === "/"){
        return selfClosingStartTag;
    } else if(c === ">"){
        return data
    } else if(c === "="){
        return beforeAttributeValue
    } else if(c === EOF){

    } else {
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
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data
    } else {
        return UnquotedAttributeValue(c)
    }
}

function UnquotedAttributeValue(c){
    if(c.match("/^[\t\n\f ]$/")){
        currentAttribute[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if(c == "/"){
        currentAttribute[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data
    } else if( c == "\u0000"){

    } else {
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
    // console.log(html)
    debugger;
    let state = data;
    for(let c of html){
        // console.log(c)
        state = state(c);
    }

    state = state(EOF)//处理文件结束的
}
