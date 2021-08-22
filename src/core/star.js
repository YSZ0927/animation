export default {
    creatStar(num, el) {
        while(num) {
            const _star = document.createElement('div')
            const _speed = 0.2 + (Math.random() * 1)
            const _distance = 300 + (Math.random() * 300)
            document.getElementById(el).appendChild(_star)
            _star.setAttribute('class', 'stars')
            _star.style.transformOrigin = `0 0 ${_distance}px`
            _star.style.transform = `
                translate3d(0,0,-${_distance}px) 
                rotateY(${Math.random() * 360}deg) 
                rotateX(${Math.random() * -50}deg) 
                scale(${_speed},${_speed})`
            num--
        }
    },
}