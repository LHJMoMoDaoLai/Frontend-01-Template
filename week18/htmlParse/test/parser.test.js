// let parseHTML = require("../src/parser");
import {parseHTML } from "../src/parser.js"
import { runInThisContext } from "vm";
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

it("Tag start end doesn't match ",()=>{
    try{
        let doc = parseHTML("<div>addd</vid>")
    } catch(e){
        assert.equal(e.message,"Tag start ebd doesn't match");
    }
})

it("content has < ",()=>{
    let doc = parseHTML("<div>a< b</div>")
    let text = doc.children[0].children[0];

    console.log(text)
    assert.equal(text.content,"a< b");
    assert.equal(text.type,'text')
})

it("parse has attributes",()=>{
    let doc = parseHTML(`<div class=hahah id='div1' data="abc" ></div>`)
    let text = doc.children[0];
    let  count = 0
    for(let attr of text.attributes){
        if(attr.name === "class"){
            assert.equal(attr.value,"hahah");
            count ++
        }
        if(attr.name === "id"){
            assert.equal(attr.value,"div1");
            count++
        }
        if(attr.name === "data"){
            assert.equal(attr.value,"abc");
            count++
        }
    }
    assert.ok(count==3)
})
it("selfClosingStartTag has attributes",()=>{
    let doc = parseHTML(`<div class=hahah id='div1' data="abc"/>`)
    let text = doc.children[0];
    let  count = 0
    for(let attr of text.attributes){
        if(attr.name === "class"){
            assert.equal(attr.value,"hahah");
            count ++
        }
        if(attr.name === "id"){
            assert.equal(attr.value,"div1");
            count++
        }
        if(attr.name === "data"){
            assert.equal(attr.value,"abc");
            count++
        }
    }
    assert.ok(count==3)
})
it("selfClosingStartTag has attributes",()=>{
    let doc = parseHTML(`<div id=a class="cls"data="abc"/>`)
    let text = doc.children[0];
    let  count = 0
    for(let attr of text.attributes){
        if(attr.name === "class"){
            assert.equal(attr.value,"cls");
            count ++
        }
        if(attr.name === "id"){
            assert.equal(attr.value,"a");
            count++
        }
        if(attr.name === "data"){
            assert.equal(attr.value,"abc");
            count++
        }
    }
    assert.ok(count==3)
})
it("selfClosingStartTag has attributes",()=>{
    let doc = parseHTML(`<div class= hahah id='div1' data="abc"></div>`)
    let text = doc.children[0];
    let  count = 0
    for(let attr of text.attributes){
        if(attr.name === "class"){
            assert.equal(attr.value,"hahah");
            count ++
        }
        if(attr.name === "id"){
            assert.equal(attr.value,"div1");
            count++
        }
        if(attr.name === "data"){
            assert.equal(attr.value,"abc");
            count++
        }
    }
    assert.ok(count==3)
})
it("parser has no attributes",()=>{
    let doc = parseHTML(`<div class />`)
    let text = doc.children[0];
    let  count = 0
    for(let attr of text.attributes){
        if(attr.name === "class"){
            assert.equal(attr.value,"");
            count ++
        }
    }
    assert.ok(count==1)
})
it('attribute with no value2', function () {
    let document = parseHTML('<div class id data = />');
    let div = document.children[0];
  
    let count = 0;
  
    for (const attr of div.attributes) {
      if (attr.name === 'id') {
        count++;
        assert.equal(attr.value, '');
      }
      if (attr.name === 'class') {
        count++;
        assert.equal(attr.value, '');
      }
      if (attr.name === 'data') {
        count++;
        assert.equal(attr.value, '');
      }
    }
  
    assert.ok(count === 3);
  });

  it('attribute with no value3', function () {
    let document = parseHTML('<div id = ></div>');
    let div = document.children[0];
  
    let count = 0;
  
    for (const attr of div.attributes) {
      if (attr.name === 'id') {
        count++;
        assert.equal(attr.value, '');
      }
    }
  
    assert.ok(count === 1);
  });
  it('self closed single element', function () {
    let document = parseHTML('<div/>');
    let div = document.children[0];
  
    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 3);
  });
  it('end tag open>', function () {
    let document = parseHTML('<div></>');
    let div = document.children[0];
  
    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 2);
  });
  it('UnquotedAttributeValue>', function () {
    let document = parseHTML('<div id=1></div>');
    let div = document.children[0];
  
    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 3);
  });
  it('tagName return tagName>', function () {
    let document = parseHTML('<div#></div#>');
    let div = document.children[0];
  
    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 2);
  });
  it('endTagOpen return beforeAttributeName>', function () {
    let document = parseHTML('<div></ div>');
    let div = document.children[0];
  
    assert.equal(div.tagName, 'div');
    console.log(div.children)
    assert.equal(div.children.length, 1);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 2);
  });
  it('script', function () {
    let content = `
    <div>abcd</div>
  <span>x</span>
  /script
  <script
  <
  </
  </s
  </sc
  </scr
  </scri
  </scrip
  </script 
  `;
    let document = parseHTML(`<script>${content}</script>`);
    let text = document.children[0].children[0];
  
    assert.equal(text.content, content);
    assert.equal(text.type, 'text');
  });
    
  



