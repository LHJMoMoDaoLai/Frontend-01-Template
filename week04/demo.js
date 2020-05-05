
new Promise(resolve=>resolve()).then(res=>console.log(1))
setTimeout(function(){
    console.log(2)
},0)
console.log(3)