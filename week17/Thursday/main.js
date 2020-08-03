// import "./foo"
import {createElement,Wrap,Text} from "./createElement"
import {Carousel} from "./Carousel"
import {Panel} from "./panel"
import {TabPanel} from "./TabPanel"




let carousel = <Carousel data = {[
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    ]

}></Carousel>

let panel = <TabPanel >
    <span title="this is a panel1">company1</span>
    <span title="this is a panel2">company2</span>
    <span title="this is a panel3">company3</span>
    <span title="this is a panel4">company4</span>
    <span title="this is a panel5">company5</span>
</TabPanel>
window.panel = panel
// carousel.mountTo(document.body)
panel.mountTo(document.body)
// // let component = <Div id="a" class="b">
// //     <Div></Div>
// //     <Div></Div>
// //     <Div></Div>
// // </Div>
// // component.id= "hhh"
// // component.mountTo(document.getElementsByTagName("body")[0])
// // component.setAttribute("id",'333')