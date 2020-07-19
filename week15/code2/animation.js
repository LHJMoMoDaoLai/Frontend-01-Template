export class Timeline {
    constructor(){
        this.animation = []
    }
    tick(){
        let t = Date.now() - this.startTime
        for(let animation of this.animation){

            let {object,property,start,end,template,duration, delay,timingFunction} = animation
            if(t>animation.duration +animation.delay){
                continue
            }
            object[property]  = template(timingFunction(start,end)(t-delay))
        }
        
        console.log("tick")
        requestAnimationFrame(()=>this.tick())
    }

    start(){
        this.startTime = Date.now()
        this.tick()
    }

    add(animation){
        this.animation.push(animation)
    }

}

export class Animation {
    constructor(object,property,template,start,end,duration, delay,timingFunction){
        this.object = object
        this.template = template
        this.property = property
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay
        this.timingFunction = timingFunction ||((start,end)=>{
            return t=>start + t/duration * (end - start)
        }) 
    }

}


// let animation = new Animation(objexct,property,start,end,duration, delay,timingFunction)

// let animation2 = new Animation(objexct,property,start,end,duration, delay,timingFunction)


// let timeline = new Timeline;
// timeline.add(animation)
// timeline.add(animation2)
// timeline.start()
// timeline.start()

// timeline.pause()
// timeline.resume()

// timeline.stop()

// setTimeout()
// setInterval(() => {
    
// }, interval);

// requestAnimationFrame
