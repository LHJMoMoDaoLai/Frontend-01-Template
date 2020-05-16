function match(string){
    let state = start
    for(let c of string){
        state = state(c)
    }

    return state === end;
}


function start(c){
    if(c === 'a'){
        return findA
    } else {
        return start
    }

}
function findA(c){
    if(c === 'b'){
        return findB
    } else {
        return start(c)//相当于把本状态代理到start上
    }
} 
function findB(c){
    if(c === 'a'){
        return findA2
    } else {
        return start(c)
    }
} 
function findA2(c){
    if(c === 'b'){
        return findB2
    } else {
        return start(c)
    }
} 
function findB2(c){
    if(c === 'a'){
        return findA3
    } else {
        return start(c)
    }
} 
function findA3(c){
    if(c === 'b'){
        return findB3
    } else {
        return start
    }
} 
function findB3(c){
    if(c === 'c'){
        return findC
    } else {
        return start
    }
} 
function findC(c){
    if(c === 'd'){
        return end
    } else {
        return start(c)
    }
} 
function end(c){
    return end
} 


match("abababcde")