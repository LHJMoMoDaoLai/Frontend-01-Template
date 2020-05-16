function match(string){
    let foundA = false;
    let foundB = false;
    let foundA2 = false;
    let foundB2 = false;
    let foundA3 = false;
    let foundB3 = false;
    let foundC = false;
    let foundD = false;

    for(let c of string){
        if(c === 'a'){
            foundA = true
        } else if(foundA && c === 'b'){
            foundB = true
        } else if(foundB && c === 'a'){
            foundA2 = true
        } else if(foundA2 && c === 'b'){
            foundB2 = true
        } else if(foundB2 && c === 'a'){
            foundA3 = true
        } else if(foundA3 && c === 'b'){
            foundB3 = true
        }  else if(foundB3 && c === 'c'){
            foundC = true 
        }  else if(foundC && c === 'd'){
            return true 
        } else {
            foundA = false
            foundB = false
            foundA2 = false
            foundB2 = false
            foundA3 = false
            foundB3 = false
            foundC = false
            foundD = false
        }
    } 
    return false
}

let res = match("abababcdef")
console.log(res)