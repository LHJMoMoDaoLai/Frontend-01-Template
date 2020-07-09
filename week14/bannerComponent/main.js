// import "./foo"
function createElement(Cls,attributes,...children){
    console.log(arguments)
    if(typeof Cls == "string"){
        o = new Wrap
        return
    }
    let o = new Cls;
    for(let neme in attributes){
        // o[neme] = attributes[neme]
        o.setAttribute(neme,attributes[neme])
    }

    for(let child of children){
        if(typeof child  === "string"){
            child = new Text(child)
        }
        o.appendChild(child)
        // o.children.push(child)
    }

    return o;

}
class Text{
    constructor(text){
        this.children = []
        this.root = document.createElement("text")
    }
    mountTo(parent){
        parent.appendChild(this.root)
        // 0-nmjjjjjjjerw
    }
}
class Wrap{
    constructor(type) {
        this.children = []
        this.root = document.createElement("text")
    }
    set id(id){
        console.log("id:"+id)
    }
    set class(claN){
        console.log(claN)
    }
    setAttribute(name,val){
        this.root.setAttribute(name,val)
    }
    appendChild(child){
        // child.mountTo(this.root)
        this.children.push(child)
    }
    mountTo(parent){
        parent.appendChild(this.root)
        for(let child in this.children){
            child.mountTo(this.root)
        }
    }
}
class Div{
    constructor(params) {
        this.children = []
        this.root = document.createElement("div")
    }
    set id(id){
        console.log("id:"+id)
    }
    set class(claN){
        console.log(claN)
    }
    setAttribute(name,val){
        this.root.setAttribute(name,val)
    }
    appendChild(child){
        // child.mountTo(this.root)
        this.children.push(child)
    }
    mountTo(parent){
        parent.appendChild(this.root)
        for(let child in this.children){
            child.mountTo(this.root)
        }
    }
}
let component = <Div id="a" class="b">
    <Div></Div>
    <Div></Div>
    <Div></Div>
</Div>
component.id= "hhh"
component.mountTo(document.getElementsByTagName("body")[0])
// component.setAttribute("id",'333')