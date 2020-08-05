<<<<<<< HEAD
# 每周总结可以写在这里


### 
#### 输入命令行的操作
移动光标：
https://github.com/asyncly/cdir/blob/223fe0039fade4fad2bb08c2f7affac3bdcf2f89/cdir.js#L24
http://tldp.org/HOWTO/Bash-Prompt-HOWTO/x361.html
http://ascii-table.com/ansi-escape-sequences-vt-100.php

Position the Cursor: \033[<L>;<C>H or \033[<L>;<C>f (puts the cursor at line L and column C)

Move the cursor up N lines: \033[<N>A
Move the cursor down N lines: \033[<N>B
Move the cursor forward N columns: \033[<N>C
Move the cursor backward N columns: \033[<N>D
Clear the screen, move to (0,0): \033[2J
Erase to end of line: \033[K
Save cursor position: \033[s
Restore cursor position: \033[u

```
var tty = require('tty');
var ttys = require('ttys');
var readline = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;

stdout.write("hello  world!\n")
stdout.write("\033[1A");
stdout.write("winter ");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  async function ask(question){
      return new Promise((resolve,reject)=>{
        rl.question(question, (answer) => {
            // TODO: Log the answer in a database
            resolve(answer)
          });
      })
  }
  void async function (){
      console.log(await ask("your project name ?"))
  }()
```

光标的颜色：https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color?r=SearchResults
#### npm
#### 文件模板
=======
# Tab组件和List
>>>>>>> a4244a02456acd0406f6e3f43cf659bd6cf9ed02
