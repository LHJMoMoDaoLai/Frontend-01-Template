
let currentToken = null
let currentAttribute = null
let currentTextNode  = null

const EOF = Symbol("EOF")//EOF:end of file  标识文件结束

let stack 
function emit(token){
    let top = stack[stack.length-1];
    if(token.type === "text"){
        if(currentTextNode == null){
            currentTextNode = {
                type: "text",
                content:""
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }

   
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

        top.children.push(element)
        // element.parent = top;

        if(!token.isSelfClosing){
            stack.push(element)
        }
        currentTextNode = null;
    } else if(token.type ==="endTag" ){
        if(top.tagName ==token.tagName){
            stack.pop();
        } else {
            throw new Error("Tag start ebd doesn't match");
        }
        currentTextNode = null

    }
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
        //
        emit({
            type: "text",
            content : '<'
        });
        emit({
            type: "text",
            content : c
        });
        return data;
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
    if(c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF){
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
        // 修复了遇到自封闭标签时，属性未被添加到元素上的问题。
        if (currentAttribute && currentAttribute.name) {
            currentToken[currentAttribute.name] = currentAttribute.value;
            currentAttribute = {
                name : "",
                value : ""
            };
        }
        return selfClosingStartTag;
    } else if(c === ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data
    } else if(c === "="){
        return beforeAttributeValue
    } else if(c === EOF){

    } else {
        //属性在引号结束之后，直接跟随属性名，导致属性名被误认为是上一个属性的值的问题。解决多个attribute 合并为一个attribute的问题
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name : "",
            value : ""
        };
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
    if(c.match(/^[\t\n\f ]$/)){
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
    if(c == "\'"){
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
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    } else if(c =="/"){
        return selfClosingStartTag;
    } else if(c ==">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data
    } else if(c === EOF){

    } else {
        // currentAttribute.value+= c;
        // return doubleQuotedAttributeValue
        
        // 属性在引号结束之后，直接跟随属性名，导致属性名被误认为是上一个属性的值的问题。
        currentAttribute = { name: "", value: "" }
        return attributeName(c);
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

//in script
function scriptData(c){
    
    if(c == "<") {
        return scriptDataLessThanSign;
    } else {
        emit({
            type:"text",
            content:c
        });
        return scriptData;
    }
}
//in script received <
function scriptDataLessThanSign(c){
    if(c == "/") {
        return scriptDataEndTagOpen;
    } else {
        emit({
            type:"text",
            content:"<"
        });
        return scriptData(c);
    }
}
//in script received </
function scriptDataEndTagOpen(c){
    if(c == "s") {
        return scriptDataEndTagNameS;
    } else {
        emit({
            type:"text",
            content:"<"
        });

        emit({
            type:"text",
            content:"/"
        });

        return scriptData(c);
    }
}
//in script received </s
function scriptDataEndTagNameS(c){
    if(c == "c") {
        return scriptDataEndTagNameC;
    } else {
        emit({
            type:"text",
            content:"</s"
        });
        return scriptData(c);
    }
}

//in script received </sc
function scriptDataEndTagNameC(c){
    if(c == "r") {
        return scriptDataEndTagNameR;
    } else {
        emit({
            type:"text",
            content:"</sc"
        });
        return scriptData(c);
    }
}

//in script received </scr
function scriptDataEndTagNameR(c){
    if(c == "i") {
        return scriptDataEndTagNameI;
    } else {
        emit({
            type:"text",
            content:"</scr"
        });
        return scriptData(c);
    }
}
//in script received </scri
function scriptDataEndTagNameI(c){
    if(c == "p") {
        return scriptDataEndTagNameP;
    } else {
        emit({
            type:"text",
            content:"</scri"
        });
        return scriptData(c);
    }
}
//in script received </scrip
function scriptDataEndTagNameP(c){
    if(c == "t") {
        return scriptDataEndTag;
    } else {
        emit({
            type:"text",
            content:"</scrip"
        });
        return scriptData(c);
    }
}
//in script received </script
let spaces = 0
function scriptDataEndTag(c){
    if(c == " ") {
        spaces++;
        return scriptDataEndTag;
    } if(c == ">") {
        emit({
            type: "endTag",
            tagName : "script"
        });
        return data;
    } else {
        emit({
            type:"text",
            content:"</script" + new Array(spaces).fill(' ').join('')
        });
        return scriptData(c);
    }
}


module.exports.parseHTML = function parseHTML(html){
    // console.log(html)
    let state = data;
    stack = [{type:"document", children:[]}]
    for(let c of html){
        // console.log(c)
        state = state(c);
        if(stack[stack.length - 1].tagName === "script" && state == data) {
            state = scriptData;
        }
    }

    state = state(EOF)//处理文件结束的

    currentToken = null
    currentAttribute = null
    currentTextNode  = null

    return stack[0]
    // console.log(stack[0].children)
    // console.log(stack[0].children[1].attributes)
}
