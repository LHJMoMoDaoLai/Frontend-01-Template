// import "./foo"
function createElement(Cls,attributes,...children){
    console.log(arguments)
    let o;
    if(typeof Cls == "string"){
        o = new Wrap(Cls)
    } else {
        o = new Cls({
            timer:{}
        })
    }
    
    for(let neme in attributes){
        o.setAttribute(neme,attributes[neme])
    }

    for(let child of children){
        console.log(child)
        if(typeof child  === "string"){
            child = new Text(child)
        }

        o.appendChild(child)
    }

    return o;

}
class Text{
    constructor(text){
        this.children = []
        this.root = document.createTextNode(text)
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}
class Wrap{
    constructor(type) {
        this.children = []
        this.root = document.createElement(type)
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
        this.children.push(child)
    }
    mountTo(parent){
        parent.appendChild(this.root)
        for(let child of this.children){
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
        this.children.push(child)
    }
    mountTo(parent){
        this.slot = <div></div>
        // parent.appendChild(this.root)
        for(let child of this.children){
             this.slot.appendChild(child)
            // child.mountTo(this.root)
        }
        this.render().mountTo(parent)
    }
    render(){
        return <article>
            <header>I'm  a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }
}
let component = <Div id="a" class="b">
    <div>text text text</div>
</Div>
component.id= "hhh"
component.mountTo(document.getElementsByTagName("body")[0])