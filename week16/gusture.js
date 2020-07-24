// let element = document.body;

function enableGusteure(element){
    let context = Object.create(null)

    let MOUSE_SYMBOL = Symbol("mouse")
    
    if(document.ontouchstart!==null){
        element.addEventListener("mousedown",(event1)=>{
            context[MOUSE_SYMBOL] = Object.create(null)
            start(event1,context[MOUSE_SYMBOL])
            let mousemove = event =>{
                move(event,context[MOUSE_SYMBOL])
            }
        
            let mouseup = event=>{
                end(event,context[MOUSE_SYMBOL])
                document.removeEventListener("mousemove",mousemove)
                document.removeEventListener("mouseup",mouseup)
            }
            document.addEventListener("mousemove",mousemove)
            document.addEventListener("mouseup",mouseup)
            
        })
        
    }
    
    element.addEventListener("touchstart",event=>{
        for(let touch of event.changedTouches){
            context[touch.identifier] = Object.create(null)
            start(touch,context[touch.identifier])
        }
    })
    element.addEventListener("tourchmove",event=>{
        for(let touch of event.changedTouches){
            context[touch.identifier] = Object.create(null)
            move(touch,context[touch.identifier])
        }
    })
    element.addEventListener("tourchend",event=>{
        for(let touch of event.changedTouches){
            context[touch.identifier] = Object.create(null)
            end(touch,context[touch.identifier])
        }
    })
    element.addEventListener("touchcancel",event=>{
        for(let touch of event.changedTouches){
            context[touch.identifier] = Object.create(null)
            cancel(touch,context[touch.identifier])
        }
    })
    
    
    
    //tap
    //pan =>panstart panmover panend
    //flick
    //press pressstart pressend
    
    
    let start = (point,context)=>{
        console.log("start",point.clientX,point.clientY)
        element.dispatchEvent(Object.assign(new CustomEvent("start"),{
            startX:context.clientX,
            startY:context.clientY,
            clientX:point.clientX,
            clientY:point.clientX,
        }))
        context.clientX = point.clientX
        context.clientY = point.clientY
    
        context.moves = []
    
        context.isTap = true;
        context.isPree = false;
        context.isPan = false;
    
        context.timeoutHander = setTimeout(()=>{
            if(context.isPan){
                return
            }
            context.isTap = false;
            context.isPree = true;
            context.isPan = false;
    
    
            console.log("press start")
            element.dispatchEvent(new CustomEvent("press start",{}))
    
        },500)
    
    }
    
    let move = (point,context)=>{
        let dx = point.clientX - context.startX,dy = point.clientY - context.startY
    
        if(dx**2 + dy ** 2 > 100 && !context.isPan) {
            context.isTap = false;
            context.isPree = false;
            context.isPan = true;
        }
        if(context.isPan){
            context.moves.push({
                dx,dy,
                t:Date.now()
            })
        
            context.moves = context.moves.filter(record =>Date.now()-record.t<300)
    
            console.log("pan")
            element.dispatchEvent(Object.assign(new CustomEvent("pan"),{
                startX:context.clientX,
                startY:context.clientY,
                clientX:point.clientX,
                clientY:point.clientX,
            }))
        }
    
        
    }
    
    let end = (point,context)=>{
        console.log(point.clientX,point.clientY)

        let dx = point.clientX - context.clientX,dy = point.clientY - context.clientY
        let spead = Math.sqrt((context.moves[0].dx-dx)**2 +(context.moves[0].dy-dy)**2)/(Date.now()-record.t)
        let isFlick = spead>2.5
    
        if(context.isPan){
           
            
            console.log(spead)
    
            
            if(spead>2.5){
                console.log("flick")
                element.dispatchEvent(Object.assign(new CustomEvent("flick"),{
                    startX:context.clientX,
                    startY:context.clientY,
                    clientX:point.clientX,
                    clientY:point.clientX,
                    spead:spead
                }))
            }
        }
        element.dispatchEvent(Object.assign(new CustomEvent("panend"),{
            startX:context.clientX,
            startY:context.clientY,
            clientX:point.clientX,
            clientY:point.clientX,
            spead:spead,
            isFlick:isFlick
        }))
        if(context.isPan){
            element.dispatchEvent(new CustomEvent("tap",{
                
            }))
        } 
        
        if(context.isPree){
            console.log("isPree")

            element.dispatchEvent(new CustomEvent("pressend",{}))
        } 
        
        clearTimeout(context.timeoutHander)
    }
    
    let cancel = (point,context)=>{
        console.log(point.clientX,point.clientY)
        clearTimeout(context.timeoutHander)
    }
}

