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

        let nextPicStopHandler = null

        


        let children = this.data.map((url, currentPosition) =>{
            let onStart = ()=>{
                ()=>timeline.pause()
                clearTimeout(nextPicStopHandler)
            }
            let onPan = (event)=>{
                let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length
                let nextPositon = (currentPosition + 1) % this.data.length

                let lastElement = children[lastPosition]
                let currentElement = children[currentPosition]
                let nextElement = children[nextPositon]

                console.log(currentElement.style.transform)
                
                console.log()
                let currentTransformVal = Number(currentElement.style.transform.match(/translateX\(([\s\S])px\)/)[1])
                console.log(currentTransformVal)
            }
            let element = <img src={url} onStart={onStart} onPan = {onPan} enableGusture={true}/>
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

        root.addEventListener("mousedown", event => {


            let startX = event.clientX, startY = event.clientY;


            let lastPosition = (position - 1 + this.data.length) % this.data.length
            let nextPositon = (position + 1) % this.data.length

            
            let current = children[position]
            let last = children[lastPosition]
            let next = children[nextPositon]

            current.style.transition = "ease 0s"
            next.style.transition = "ease 0s"
            last.style.transition = "ease 0s"

            current.style.transform = `translateX(${-500 * position}px)`;
            last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
            next.style.transform = `translateX(${500 - 500 * nextPositon}px)`;


            let move = event => {
                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPositon}px)`


                // console.log(event.clientX - startX, event.clientX - startY);
            };
            let up = event => {
                let offset = 0

                if (event.clientX - startX > 250) {
                    offset = 1
                } else if (event.clientX - startX < -250) {
                    offset = -1
                }

                current.style.transition = ""
                next.style.transition = ""
                last.style.transition = ""

                //拖动的位置减去原本的位置
                current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPositon}px)`


                position = (position - offset + this.data.length) % this.data.length
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })
    
        return root
    }
}