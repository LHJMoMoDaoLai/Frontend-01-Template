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
4. 寻路
 * 思路：
    1) 起点的上下左右点，然后不断往外扩散，走过的点就不再走。 这个是广度优先搜索
    2) 深度优先搜索：就是一条道走到黑，适用于不去找最佳路径。广度优先搜索和深度优先搜索的区别就是数据结构不一样。    
    3) 点有三种状态：  
        白格：没有触达，不知道能不能走到；
        紫格：已经走到它了，但没有判断它的四周是否能走，四周的格不变紫；
        蓝格：已经走的格，且四周已走，四周的格变紫   
    4) 数组的方法
        push()：在数组的末尾添加一个或多个元素，返回数组的新长度  
        pop()：移除数组的最后一项，返回移除项  
        shift():移除数组的第一项，返回移除项  
        unshift():在数组的第一项前面添加一个或多个元素，返回数组的长度  

        LIFO：last in first out 后进先出的数据结构，类似栈的行为。在栈顶插入和移除。
        ```
            let arr = [1,2];
            let length = arr.push(3) //length:3
            let item =  arr.pop() //item 3
        ```
        FIFO:first in first out 先进先出的数据结构，类似队列的行为。在队尾增加元素，在队头删除元素
        ```
            let arr = [1,2];
            var data = arr.shift() //data:1
            var math = arr.unshift(4,5,6)//math:4；arr:4,5,6,2

        ```
    ```
        function sleep(t){
            return new Promise((resolve,reject)=>{
                setTimeout(resolve,t)
            })
        }
        
        async function findPath(map,start,end){
            //创建一个队列，将紫色格放到这个队列里，最先开始放开始的那个格，
            let queue = [start];

            async function insert([x,y]){
                map = map.slice()

                if(map[100*y + x] !==0) return
                if(x<0||y<0||x>=100||y>=100) return

                map[100*y + x]  = 2

                container.children[y * 100 + x].style.backgroundColor = "red";
                // debugger
                await sleep(1)

                queue.push([x,y]);
            }

            while(queue.length){

                //队列是先进先出，队尾入队，对头出队。 //pop unshift / push shift
                let [x,y] = queue.shift()//从队头拿出去一个格子

                //找到终点，就return true
                if(x === end[0] && y === end[1]){
                    return true
                }
                

                //找出它的上下左右格 [x,y-1],[x,y+1],[x-1,y],[x+1,y] 判断是否能并入队，当遇到障碍的时候是不能入队的，到边的不能走
                await insert([x,y-1]);
                await insert([x,y+1]);
                await insert([x-1,y]);
                await insert([x+1,y]);
                

            }

            return false 

        }


    ```

    5) 把路径找出来  
        把每个点找出来。 
        ```
        function sleep(t){
            return new Promise((resolve,reject)=>{
                setTimeout(resolve,t)
            })
        }
        
        async function findPath(map,start,end){
            //创建一个队列，将紫色格放到这个队列里，最先开始放开始的那个格，
            map = map.slice()
            let queue = [start];

            async function insert([x,y], pre){

                if(map[100*y + x] !==0) return
                if(x<0||y<0||x>=100||y>=100) return

                map[100*y + x]  = pre
                container.children[y * 100 + x].style.backgroundColor = "red";

                await sleep(2)
                queue.push([x,y]);
            }

            while(queue.length){

                //队列是先进先出，队尾入队，对头出队。 //pop unshift / push shift
                let [x,y] = queue.shift()//从队头拿出去一个格子

                //找到终点，就把路径存起来，并标上颜色。
                if(x === end[0] && y === end[1]){
                    let path = []
                    while(x !== start[0] || y !== start[1]){
                        path.push([x,y]);
                        container.children[y* 100 + x].style.backgroundColor = "pink";
                        [x,y] = map[y*100 + x]
                        console.log(x,y)
                    }
                    return path;
                }

                //找出它的上下左右格 [x,y-1],[x,y+1],[x-1,y],[x+1,y] 判断是否能并入队，当遇到障碍的时候是不能入队的，到边的不能走
                await insert([x-1,y],[x,y])
                await insert([x+1,y],[x,y])
                await insert([x,y-1],[x,y])
                await insert([x,y+1],[x,y])

                //斜线
                await insert([x-1,y-1],[x,y])
                await insert([x+1,y-1],[x,y])
                await insert([x-1,y+1],[x,y])
                await insert([x+1,y+1],[x,y])
                

            }

            return null 

        }

        ``` 
    6) 优化寻路算法，已有的寻路算法比较笨拙，只能横着竖着走，不能对角线走。    
        ```
            async function findPath(map,start,end){
                //创建一个队列，将紫色格放到这个队列里，最先开始放开始的那个格，
                map = map.slice()
                let queue = [start];

                async function insert([x,y], pre){

                    if(map[100*y + x] !==0) return
                    if(x<0||y<0||x>=100||y>=100) return

                    map[100*y + x]  = pre
                    container.children[y * 100 + x].style.backgroundColor = "red";

                    await sleep(2)
                    queue.push([x,y]);
                }

                while(queue.length){

                    //队列是先进先出，队尾入队，对头出队。 //pop unshift / push shift
                    let [x,y] = queue.shift()//从队头拿出去一个格子

                    //找到终点，就把路径存起来，并标上颜色。
                    if(x === end[0] && y === end[1]){
                        let path = []
                        while(x !== start[0] || y !== start[1]){
                            path.push([x,y]);
                            container.children[y* 100 + x].style.backgroundColor = "pink";
                            [x,y] = map[y*100 + x]
                            console.log(x,y)
                        }
                        return path;
                    }

                    //找出它的上下左右格 [x,y-1],[x,y+1],[x-1,y],[x+1,y] 判断是否能并入队，当遇到障碍的时候是不能入队的，到边的不能走
                    await insert([x-1,y],[x,y])
                    await insert([x+1,y],[x,y])
                    await insert([x,y-1],[x,y])
                    await insert([x,y+1],[x,y])
                    

                }

                return null 

            }
        ```
    7) 优化寻路算法，已有的寻路算法性能比较低，可以用另一种
        ```
            
        ```
    8) BinaryHeap
       1) Heap的take取走了时间复杂度是O（1），把空位填上就变成O（N）了，不填就是O（1）
       2) 时间复杂度：O（logN）
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