var parser = require("./parser")
module.exports = function (source,map){

    let tree= parser.parseHTML(source)
  
    let template = null;
    let script = null;
    let style = null;

    for(let node of tree.children){
        if(node.tagName =="template"){
            template = node.children.filter(e=>e.type !="text")[0]
        } else if(node.tageName == "script"){
            script = node 
        } else if(node.tageName =="style"){
            style= node
        }
    }

    
    let createCode = "";

    let visit = (node)=>{
        if(node.type == "text") {
            return JSON.stringify(node.content)
        }
        let attrs = {};
        for(let attribute of node.attributes){
            attrs[attribute.name] = attribute.value
        }  

        let children = node.children.map(node => visit(node))
        return `createElement("${node.tagName}",${JSON.stringify(attrs)},${children})`
    }
    visit(template)
    let r =  `
import {createElement,Wrap,Text} from "./createElement"
export class Carousel{
    render(){
        return ${visit(template)}
    }
    mountTo(parent){
        this.render().mountTo(parent)
    }
    setAttribute(name,value){
        this[name] = value;
    }
}
    `
    console.log(r)
    return r
}