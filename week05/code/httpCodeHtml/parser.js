const EOF = Symbol("EOF")//end of file

function data(c){
    if(c == "<"){
        return tagOpen;
    } else if(c == EOF){
        return ;
    }else {
        return data
    }
}
function tagOpen(c){
    if(c == "/"){
        return endTagOpen;
    } else if(c.match(/[a-zA-Z]+/)){
        return tagName(c)
    }else {
        return ;
    }
}
function tagName(c){
    if(c.match(/^$/)){
        return endTagOpen;
    } else if(c == "/"){
        return endTagOpen;
    } else if(c.match(/[a-zA-Z]+/)){
        return tagName(c)
    } else if(c == ">"){
        return data
    }else {
        return ;
    }
}
function data(c){
    if(c == "<"){
        return tagOpen;
    } else if(c.match(/[a-zA-Z]+/)){
        return tagName(c)
    }else {
        return ;
    }
}

module.exports.parseHTML = function parseHTML(html){

    let state = data;
    for(let c of html){
        state = state(c);
    }

    state = state(EOF)//处理文件结束的
}