function match(string){
    for(let c of string){
        if(c === 'a'){
            return true
        } 
    }
    return false
}
console.log(match("xxxxx"))
console.log(match("xxxxa"))
console.log(match("axxx"))