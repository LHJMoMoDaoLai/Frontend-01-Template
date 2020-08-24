import {createElement,Wrap,Text} from "./createElement"
export class Panel{
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
       
        return <div class="panel" style="border:1px solid  lightgreen;width:300px;min-height:300px;">
            <h1 style="background-color:lightgreen;margin:0;">{this.title}</h1>
            <div  style="background-color:#fff;">{this.children}</div>
        </div>
    }
}