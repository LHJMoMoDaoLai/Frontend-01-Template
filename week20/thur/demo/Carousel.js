import {createElement,Wrap,Text} from "./createElement"

import {Timeline,Animation} from "./animation.js"
import {ease,liner} from "./cubicBezier"
import {enableGusture} from "./gusture"


export class Carousel{
    constructor(params) {
        this.children = []
        this.attributes = new Map()
        // this.data = null
        this.root = document.createElement("div")
    }
    setAttribute(name,value){
        this.attributes.set(name, value);
        this[name] = value;
    }
    appendChild(child){
        this.children.push(child)
    }
    get style(){
        return this.root.style
    }
    mountTo(parent){
        this.render().mountTo(parent)
    }
    addEventListener(){
        this.root.addEventListener(...arguments)
    }
    render(){

        let timeline = new Timeline()
        // window.xtimeline = timeline
        timeline.start()

        //用一个变量记录自动播放的timer
        let nextPicStopHandler = null

        let children = this.data.map((url, currentPosition) =>{
            //前后三个元素的位置
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length
            let nextPositon = (currentPosition + 1) % this.data.length

            //偏移量
            let offset = 0 

            //在拖拽点下去的时候记录一个偏移量,顺便停止自动播放动画，清除自动播放的timer，在这里可以使用children
            let onStart = ()=>{
                timeline.pause()
                clearTimeout(nextPicStopHandler)

                let currentElement = children[currentPosition]
                let currentTransformVal = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1])
                offset = currentTransformVal + 500 * currentPosition;
               
            }
            //在移动的时候，transform:translateX = 移动的距离+ 开始的偏移量，在这里可以用children
            let onPan = (event)=>{
                let lastElement = children[lastPosition]
                let currentElement = children[currentPosition]
                let nextElement = children[nextPositon]

                let currentTransformVal = -500 * currentPosition + offset
                let lastTransformVal = -500 - 500 * lastPosition + offset
                let nextTransformVal = 500 - 500 * nextPositon + offset

                let dx = event.clientX - event.startX;

                lastElement.style.transform = `translateX(${lastTransformVal+ dx}px)`
                currentElement.style.transform = `translateX(${currentTransformVal+ dx}px)`
                nextElement.style.transform = `translateX(${nextTransformVal+ dx}px)`
                
            }

            //拖拽停止时，判断偏移量+拖拽的距离是否大于250，重置时间线，重新设置animation的开始位置、结束位置，一次动画，然后再重新设置position，重新开启定时器
            let onPanend = (event)=>{
                let direction = 0
                let dx = event.clientX - event.startX;
                console.log("isFlick",event.isFlick)

                


                if (dx+offset > 250 || dx >0 &&event.isFlick) {
                    direction = 1
                } else if (dx+ offset < -250 || dx <0 &&event.isFlick) {
                    direction = -1
                }
                timeline.reset()
                timeline.start()

                let lastElement = children[lastPosition]
                let currentElement = children[currentPosition]
                let nextElement = children[nextPositon]

                // let currentTransformVal = -500 * currentPosition + offset + dx
                // let lastTransformVal = -500 - 500 * lastPosition + offset + dx
                // let nextTransformVal = 500 - 500 * nextPositon + offset + dx

                
                let lastAnimation = new Animation(
                    lastElement.style,
                    "transform",
                    -500 - 500 * lastPosition + offset + dx,
                    -500 - 500 * lastPosition + direction * 500,
                    500,
                    0,
                    ease,
                    v=>`translateX(${v}px)`
                ) 
                let currentAnimation = new Animation(
                    currentElement.style,
                    "transform",
                    -500 * currentPosition + offset + dx,
                    -500 * currentPosition + direction * 500,
                    500,
                    0,
                    ease,
                    v=>`translateX(${v}px)`
                ) 
                let nextAnimation = new Animation(
                    nextElement.style,
                    "transform",
                    500 - 500 * nextPositon + offset + dx,
                    500 - 500 * nextPositon + direction * 500,
                    500,
                    0,
                    ease,
                    v=>`translateX(${v}px)`
                ) 
                

                timeline.add(lastAnimation)
                timeline.add(currentAnimation)
                timeline.add(nextAnimation)

                position = (position - direction + this.data.length) % this.data.length

                nextPicStopHandler = setTimeout(nextPic, 3000)

                //拖动的位置减去原本的位置
                // current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
                // last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
                // next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPositon}px)`


                // position = (position - offset + this.data.length) % this.data.length
                // document.removeEventListener("mousemove", move);
                // document.removeEventListener("mouseup", up);
            }
            let element = <img src={url} onStart={onStart} onPan = {onPan} onPanend={onPanend} enableGusture={true}/>
            element.style.transform = "translateX(0px)"
            element.addEventListener("dragstart", event => event.preventDefault())
            return element
        })

        let root =  <div class="carousel">
            { 
                children
            }
        </div>

        let position = 0;

        let nextPic = () => {
            //一次移动两张
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style,"transform",-100 * position,-100 - 100 * position,500,0,ease,v=>`translateX(${v}%)`) 
            let nextAnimation = new Animation(next.style,"transform",100 -100 * nextPosition,-100 * nextPosition,500,0,ease,v=>`translateX(${v}%)`) 
            
            timeline.add(currentAnimation)

            timeline.add(nextAnimation)

            
            position = nextPosition;


            // current.style.transition = "ease 0s"
            // next.style.transition = "ease 0s"

            // current.style.transform = `translateX(${-100 * position}%)`;
            // next.style.transform = `translateX(${100 -100 * nextPosition}%)`;

            //给浏览器加一个响应时间
            // setTimeout(function () {
            //     //使用css上的样式
            //     current.style.transition = ""
            //     next.style.transition = ""

            //     current.style.transform = `translateX(${-100 - 100 * position}%)`;
            //     next.style.transform = `translateX(${-100 * nextPosition}%)`;

            //     position = nextPosition;
            // }, 16)
            // setTimeout(nextPic, 3000)
            // setTimeout(nextPic, 3000)
            nextPicStopHandler = setTimeout(nextPic, 3000)
            // window.xstopHandel = setTimeout(nextPic, 3000)
        }
        nextPicStopHandler = setTimeout(nextPic,3000)

        // root.addEventListener("mousedown", event => {

        //     let startX = event.clientX, startY = event.clientY;
        //     let lastPosition = (position - 1 + this.data.length) % this.data.length
        //     let nextPositon = (position + 1) % this.data.length

            
        //     let current = children[position]
        //     let last = children[lastPosition]
        //     let next = children[nextPositon]

        //     current.style.transition = "ease 0s"
        //     next.style.transition = "ease 0s"
        //     last.style.transition = "ease 0s"

        //     current.style.transform = `translateX(${-500 * position}px)`;
        //     last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
        //     next.style.transform = `translateX(${500 - 500 * nextPositon}px)`;


        //     let move = event => {
        //         current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
        //         last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
        //         next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPositon}px)`


        //         // console.log(event.clientX - startX, event.clientX - startY);
        //     };
        //     let up = event => {
        //         let offset = 0

        //         if (event.clientX - startX > 250) {
        //             offset = 1
        //         } else if (event.clientX - startX < -250) {
        //             offset = -1
        //         }

        //         current.style.transition = ""
        //         next.style.transition = ""
        //         last.style.transition = ""

        //         //拖动的位置减去原本的位置
        //         current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
        //         last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
        //         next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPositon}px)`


        //         position = (position - offset + this.data.length) % this.data.length
        //         document.removeEventListener("mousemove", move);
        //         document.removeEventListener("mouseup", up);
        //     };
        //     document.addEventListener("mousemove", move);
        //     document.addEventListener("mouseup", up);
        // })
    
        return root
    }
}