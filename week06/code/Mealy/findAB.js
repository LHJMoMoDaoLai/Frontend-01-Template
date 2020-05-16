function match(string){
    let foundA = false
    for(let c of string){
        if(c === 'a'){
            foundA = true
        } else if(foundA && c === 'b'){
            return true
        } else {
            //foundA重置，如果adb
            foundA = false
        }
    }
    return false
}

console.log(match("acdab"))