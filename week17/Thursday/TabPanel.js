import {createElement,Wrap,Text} from "./createElement"
export class TabPanel{
    constructor(params) {
        this.children = []
        this.attributes = new Map()
        this.state = Object.create(null)
        // this.data = null
        this.root = document.createElement("div")
    }
    setAttribute(name,value){
        this.attributes.set(name, value);
        this[name] = value;
    }
    getAttribute(name,value){
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
    select(i){
        for(let view of this.childViews){
            view.style.display="none";
        }
        this.childViews[i].style.display=""

        for(let view of this.titleViews){
            view.classList.remove("selected")
        }
        this.titleViews[i].classList.add("selected")

        this.titleViews.innerText = this.children[i].title
    }
    render(){
        this.childViews = this.children.map(child => <div style="background-color:#fff;min-height:300px;">{child}</div>)
        this.titleViews =  this.children.map((child,i) => {
            console.log(child);
            <span onClick={()=>this.select(i)}
                                 style="display:inline-block;background-color:lightgreen;margin:5px 5px 0 5px;font-size:24px;width:auto;min-height:40px;" >{child.title||" "}</span>})
        setTimeout(()=>this.select(0),16)
        return <div class="panel" style="border:1px solid  lightgreen;width:300px;min-height:300px;">
            <h1 style="background-color:lightgreen;margin:0;">{this.titleViews}</h1>
            <div  >
                {this.childViews}
            </div>
        </div>
    }
}