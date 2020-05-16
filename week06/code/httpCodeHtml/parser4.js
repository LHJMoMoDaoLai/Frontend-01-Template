
let currentToken = null

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
    } else if(c === ">"){
        return data
    } else if(c === "="){
        return beforeAttributeName
    } else {
        return beforeAttributeName;
    }
}
function selfClosingStartTag(c){
    if(c === ">"){
        currentToken.isSelfClosing = true;
        return data
    } else if(c === "EOF"){
        
    } else {
       
    }
}

module.exports.parseHTML = function parseHTML(html){
    console.log(html)
    let state = data;
    for(let c of html){
        state = state(c);
    }

    state = state(EOF)//处理文件结束的
}