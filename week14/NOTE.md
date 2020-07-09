# 组件
Carousel

    state
        activeIndex(currentIndex)
    property
        loop
        time
        imgList
        autoplay
        color
        forward
    attribute
        startIndex
        loop
        time
        imgList
        autoplay
        color
        forward

    children
        2
        append 
        remove 
        add

    event 
        onChange
        click
        hover
        swiper
        resize
        dbclick

    method
        this()
        prev()
        goTo()
        play()
        stop()
    config 
        mode:"useRAF","vvvv'fuseTimeout"
        setInterval(tick,16)
        setTimeOut
CarouselView