// var stdin  = process.stdin;

var tty = require('tty');
var ttys = require('ttys');
var rl = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;


stdin.setRawMode( true);
stdin.resume();
stdin.setEncoding("utf-8");



function getChar(){
    return new Promise((resolve=>{
        stdin.once("data", function(key){
            resolve(key)
            // process.stdout.write(key.toString().charCodeAt(0).toString())
        })
    }))
}

function up(n=1){
    stdout.write("\033["+n+"A");
}
function down(n=1){
    stdout.write("\033["+n+"B");
}
function right(n=1){
    stdout.write("\033["+n+"C");
}
function left(n=1){
    stdout.write("\033["+n+"D");
}

void async function(){
    stdout.write("whice framework do you want to use?\n")
    let answer = await options(["vue","react","angular"])
    stdout.write("You selected " + answer + "!\n")
    process.exit()
}()

async function options(choices){
    let selected =0
    for(let i =0;i<choices.length;i++){
        if(selected === i){
            stdout.write("[\x1b[32mX\x1b[0m] "+choices[i] +"\n")
        } else {
            stdout.write("[ ] "+choices[i] +"\n")
        }
        
    }
    up(choices.length)
    right()
    while(true){
        let char = await getChar()
        if(char =="\u0003"){
            process.exit()
            return 
        }
        if(char =="w" && selected>0){
            stdout.write(" ")
            left()
            selected --;
            up();
            stdout.write("\x1b[32mX\x1b[0m");
            left()
        }
        if(char =="s" && selected<choices.length-1){
            stdout.write(" ")
            left()
            selected ++;
            down();
            stdout.write("\x1b[32mX\x1b[0m");
            left()
        }

        if(char =="\r"){
            down(choices.length - selected);
            return choices[selected]
        }
        // console.log(char.split("").map(c => c.charCodeAt(0)))
    }
    
}

