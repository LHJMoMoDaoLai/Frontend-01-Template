export class Timeline {
    constructor(){
        this.animations = []
        this.requestId = null;
        this.state = "inited"
        // //剪头函数，保护this
        // this.tick = ()=>{
        //     let t = Date.now() - this.startTime
        //     let animations = this.animations.filter(animation =>!animation.finished)
        //     for(let animation of this.animations){
        //         let {object,property,start,end,template,duration, delay,timingFunction} = animation
    
        //         let progression = timingFunction((t - delay)/duration) //0-1之间的数，百分比
    
        //         if(t>duration +delay){
        //             progression = 1
        //             animation.finished = true
        //             // continue
        //         }
        //         let val = start + progression * (end -start) //value就是根据progression来计算
        //         object[property]  = template(val)
        //     }
        //     if(animations.length){
        //         this.requestId = requestAnimationFrame(this.tick())
        //     }
            
        // }
    }
    //写在外面，this的值是不固定的
    tick(){
        let t = Date.now() - this.startTime 
        let animations = this.animations.filter(animation =>!animation.finished)
        for(let animation of this.animations){
            let {object,property,start,end,template,addTime,duration, delay,timingFunction} = animation

            let progression = timingFunction((t - delay-addTime)/duration) //0-1之间的数，百分比

            if(t>duration +delay +addTime){
                progression = 1
                animation.finished = true
                // continue
            }
            // let val = start + progression * (end -start) //value就是根据progression来计算
            let val = animation.valueFromProgression(progression) //value就是根据progression来计算
            object[property]  = template(val)
        }
        if(animations.length){
            this.requestId = requestAnimationFrame(()=>this.tick())
        }
        
    }
    pause(){
        if(this.state !="playing"){
            return
        }
        this.state = "paused"
        this.pauseTime = Date.now()
        //取消下一个tick
        if(this.requestId != null){
            cancelAnimationFrame(this.requestId)
        }   
    }
    resume(){
        if(this.state !="paused"){
            return
        }
        this.state = "playing"
        //没有做状态管理，多次点击就出错了。
        //把暂停的时间扣掉
        this.startTime += Date.now() - this.pauseTime
        this.tick()
    }

    start(){
        if(this.state !="inited"){
            return
        }
        this.state = "playing"
        this.startTime = Date.now()
        this.tick()
    }

    add(animation,addTime){
        animation.finished = false
        this.animations.push(animation)
        if(this.state == "playing"){
            animation.addTime = addTime != void 0?addTime:Date.now() - this.startTime
        } else {

            animation.addTime = addTime != void 0?addTime: 0
        }
        
    }

    restart(){
        if(this.state == "playing"){
            this.pause()
        }

        this.animations = []
        this.requestId = null;
        this.state = "playing"

        this.startTime = Date.now() - this.startTime
        this.pauseTime = null
        this.tick()
    }
}

export class Animation {
    constructor(object,property,start,end,duration, delay,timingFunction,template){
        this.object = object
        this.template = template
        this.property = property
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay 
        this.timingFunction = timingFunction 
    }
    valueFromProgression(progression){
        return this.start + progression * (this.end-this.start)
    }

}
export class ColorAnimation {
    constructor(object,property,start,end,duration, delay,timingFunction,template){
        this.object = object
        this.template = template || ((v) =>`rgba(${v.r},${v.g},${v.b},${v.a})`)
        this.property = property
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay 
        this.timingFunction = timingFunction 
    }
    valueFromProgression(progression){
        return {
            r:this.start.r + progression * (this.end.r-this.start.r),
            g:this.start.g + progression * (this.end.g-this.start.g),
            b:this.start.b + progression * (this.end.b-this.start.b),
            a:this.start.a + progression * (this.end.a-this.start.a),
        }
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


// timingFunction 相当于ease linear easein 
// js每帧去修改动画性能会不会有问题，要看js改的那部分会不会触发重排，只改transform不会触发重排就没问题。如果强制要用GPU去渲染，可以设置transform3D
