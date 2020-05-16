function match(string){
    let state = start
    for(let c of string){
        state = state(c)
        // console.log(state)
    }

    return state === end
}

function start(c){
    if(c === 'a'){
        return findA 
    } else {
        return start
    }
}

function end(c){
    return end
}

function findA(c){
    if(c === 'b'){
        return findB
    } else {
         return start(c)
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
        return start(c)
    }
}
function findB3(c){
    if(c === 'x'){
        return end
    } else {
        return findB2(c)
    }
}

match("bababxabababx")