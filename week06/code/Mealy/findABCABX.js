function match(string){
    let state = start
    for(let c of string){
        state = state(c)
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

function findA(c){
    if(c === 'b'){
        return findB
    } else {
         return start(c)
    }
}

function findB(c){
    if(c === 'c'){
        return findC
    } else {
        return start(c)
    }
}

function findC(c){
    if(c === 'a'){
        return findA2
    } else {
        return start(c)
    }
}
function findA2(c){
    if(c ==='b'){
        return findB2
    } else {
        return start(c)
    }
}

function findB2(c){
    if(c === 'x'){
        return end
    }else {
        //这一轮要判断是不是x,如果不是x,而是b,那么回到findB2,在findB2中判断看是不是b,
        return findB(c)
    }
}

function end(c){
    return end
}

match('ababcabcabx')