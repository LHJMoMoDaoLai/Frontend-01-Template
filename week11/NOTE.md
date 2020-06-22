# 每周总结可以写在这里
### 寻路算法
1. 画路径   
 首先我们要弄一个画板 100*100的,画上去，mousedown之后再mouseover 就可以开始画了  如果mouseup了  就说明一笔已经画完了。
当mousedown之后，mouse标志位为true,之后再mouseover且mouse为true，我们就就将划过的地方的颜色变掉 
一旦mouseup了，mouse就变为false
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .cell {
            display:inline-block;
            width:6px;
            height:6px;
            background-color: gray;
            border-bottom:solid 1px white;
            border-right:solid 1px white;
            vertical-align: middle;
            line-height:6px;
        }
        #container{
            width:701px;
            font-size:0;
        }
    </style>
</head>
<body>
    <div id="container"></div>
    
    <script>
        
        var map = new Array(10000).fill(0);

        //鼠标是否按下  按下再移动才开始画，按下时mouse=true
        var mouse = false;

        function show(){
            let container = document.getElementById("container");
            for(let y = 0;y<100;y++){
                for(let x = 0;x<100;x++){
                    let cell = document.createElement("div");
                    cell.classList.add("cell")
                    container.appendChild(cell)

                    cell.addEventListener("mouseover",e=>{
                        if(mouse){
                            cell.style.backgroundColor = "black"
                        }
                    })
                }
            }
        }
        document.addEventListener("mousedown",e=>{
            mouse = true
        })
        document.addEventListener("mouseup",e=>{
            mouse = false
        })
        
        show()

    </script>
</body>
</html>
```

2. 解决画完图一刷新就没有了的问题   
   首先多加了一个保存按钮，点击按钮，将map一维数组存到localStorage，取也要从localStorage中取  
   一维数组 0代表没画，1代表画了  在渲染cell的时候做了判断，在画cell的时候也要把数据放在map数据里。
   ```
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                .cell {
                display:inline-block;
                width:6px;
                height:6px;
                background-color: gray;
                border-bottom:solid 1px white;
                border-right:solid 1px white;
                vertical-align: middle;
                line-height:6px;
                
            }
            #container{
                width:701px;
                font-size:0;
            }
            </style>
        </head>
        <body>
            <div id="container"></div>
            <button onclick="localStorage.map = JSON.stringify(map)">save</button>
            <script>
                //从缓存中取
                var map = localStorage.map?JSON.parse(localStorage.map): new Array(10000).fill(0);

                //鼠标是否按下  按下再移动才开始画，按下时mouse=true
                var mouse = false;

                function show(){
                    let container = document.getElementById("container");
                    for(let y = 0;y<100;y++){
                        for(let x = 0;x<100;x++){
                            let cell = document.createElement("div");
                            cell.classList.add("cell")
                            container.appendChild(cell)
                            
                            //根据从缓存的数据中渲染
                            if(map[y*100 + x] === 1){
                                cell.style.backgroundColor = "black";
                            }

                            cell.addEventListener("mouseover",e=>{
                                if(mouse){
                                    cell.style.backgroundColor = "black"
                                    //画的时候也要改变map数组
                                    map[y*100 + x] = 1
                                }
                            })
                        }
                    }
                }
                document.addEventListener("mousedown",e=>{
                    mouse = true
                })
                document.addEventListener("mouseup",e=>{
                    mouse = false
                })

                show()
            </script>
        </body>
    </html>
   ```  

3. 橡皮檫功能
   右箭按住滑动就当橡皮檫   
   加一个是否是橡皮檫的标志位  clear  
   首先监听右键事件（contextmenu)，阻止默认事件  
   然后监听document的mousedown事件，如果e.which===3,就说明是右键的点击。如果是右箭的点击，就将clear置为true  
   监听cell的mouseover事件，如果clear为true，就将当前cell的背景换成空。 并修改map数组
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .cell {
            display:inline-block;
            width:6px;
            height:6px;
            background-color: gray;
            border-bottom:solid 1px white;
            border-right:solid 1px white;
            vertical-align: middle;
            line-height:6px;
            
        }
        #container{
            width:701px;
            font-size:0;
        }
    </style>
</head>
<body>
    <div id="container"></div>
    <button onclick="localStorage.map = JSON.stringify(map)">save</button>
    <script>
        var map = localStorage.map?JSON.parse(localStorage.map): new Array(10000).fill(0);

        //鼠标是否按下  按下再移动才开始画，按下时mouse=true
        var mouse = false;

        //橡皮檫功能 
        var clear = false
        function show(){
            let container = document.getElementById("container");
            for(let y = 0;y<100;y++){
                for(let x = 0;x<100;x++){
                    let cell = document.createElement("div");
                    cell.classList.add("cell")
                    container.appendChild(cell)

                    if(map[y*100 + x] === 1){
                        cell.style.backgroundColor = "black";
                    }

                    cell.addEventListener("mouseover",e=>{
                        if(mouse){
                            if(clear){
                                cell.style.backgroundColor = ""
                                map[y*100 + x] = 0
                            } else {
                                cell.style.backgroundColor = "black"
                                map[y*100 + x] = 1
                            }
                            
                        }
                    })
                }
            }
        }
        document.addEventListener("mousedown",e=>{
            mouse = true
            console.log(e.which)
            clear = (e.which===3);
        })
        document.addEventListener("mouseup",e=>{
            mouse = false
        })

        document.addEventListener("contextmenu",(e)=>e.preventDefault())
        
        show()

    </script>
</body>
</html>
```

### 异步编程
1. 红绿灯问题
绿灯10秒  黄灯2秒 红灯5秒无限循环



### 正则表达式
1. match
   返回的不是true或false  
   ```"abc".match(/a(b)|c/)```
   不带g，拆分结构  
   ```"[a=value]".match(/\[([^/)```

   括号：圈组的作用
   捕获()
    非捕获的括号通过 (?:)
2. replace  
   可以传一个函数
   ```
   "abc".replace(/a(b)c/,function(str,$1){
       console.log(str,$1)
   })
   ```
   $1 要显示$1 =>就要再加一个$
   比如  
   ```"abc".replace(/a(b)c/,"$$1$$1")```
3. exec