// let parseHTML = require("../src/parser");
import {parseHTML } from "../src/parser.js"
var  assert =require("assert")

it('parse a element',()=>{
    // let doc = parseHTML.parseHTML("<div></div>")
    let doc = parseHTML("<div></div>")

    let text = doc.children[0];

    assert.equal(text.tagName,"div");
    assert.equal(text.type,"element");
    assert.equal(text.attributes.length,2)
    assert.equal(text.children,0)
    // assert.equal(div.attributes.length,0)
})
it('parse a singe element width content',()=>{
    let doc = parseHTML("<div>addd</div>")
    let text = doc.children[0].children[0];

    // console.log(text)
    assert.equal(text.content,"addd");
})