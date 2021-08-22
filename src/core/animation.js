import Layout from './layout'

export default function Animation(liElemMaxNum ) {
    let idx,
        timer,
        liArr = [],
        // 鼠标X、Y坐标值
        oldCoordX,
        oldCoordY,
        nowCoordX,
        nowCoordY,
        // 鼠标X、Y差值
        minusX = 0,
        minusY = 0,
        // X、Y偏移度数
        liElemDegX = 0,
        liElemDegY = 0,
        // li 元素默认景深
        liElemDepDefault = -1000,
        // 避免覆盖默认景深值
        depDefault = liElemDepDefault-600,
        // 避免第一次拖动发生错位
        liElemDepZ = liElemDepDefault-600
    const data = ['Three','Chaotic', 'Sphere', 'Grid'];
    const randomFrom = (lowerValue,upperValue) =>{
        return Math.floor(Math.random()*(upperValue-lowerValue+1)+lowerValue);
    }
    let arr = [...Array(liElemMaxNum ).keys()];
    arr.forEach(() => {
        const li = document.createElement('li')
        idx = randomFrom(0,data.length-1);
        li.innerHTML = data[idx]
        // 设置文本颜色
        li.style.color = `rgb(${randomFrom(100,255)},${randomFrom(100,255)},${randomFrom(100,255)})`
        // 将已创建的li 元素添加至容器中
        document.getElementById('item-box').append(li);
        liArr.push(li)
    })

    const mouseDown = (event) => {
        event = event || window.event
        // 上一个点的X、Y坐标
        oldCoordX = event.clientX;
        oldCoordY = event.clientY;
        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }

    const mouseMove = (event) => {
        nowCoordX = event.clientX;
        nowCoordY = event.clientY;
        // 计算机X、Y差值
        minusX = nowCoordX - oldCoordX;
        minusY = nowCoordY - oldCoordY;
        // 更新上一个点的X、Y坐标值
        oldCoordX = nowCoordX;
        oldCoordY = nowCoordY;
        // 计算X、Y轴的移动度数
        liElemDegX -= minusY*0.1;
        liElemDegY += minusX*0.1;
        document.getElementById('item-box').style.transform = `translateZ(${liElemDepZ}px) rotateX(${liElemDegX}deg) rotateY(${liElemDegY}deg)`;
    }
    const mouseUp = () => {
        window.removeEventListener('mousemove', mouseMove)
        timer && clearInterval(timer);
        timer = setInterval(() => {
            // 缓动差值 
            minusX *= 0.95;
            minusY *= 0.95;
            // 计算X、Y轴的移动度数
            liElemDegX -= minusY*0.1;
            liElemDegY += minusX*0.1;
            // 当差值超出指定范围时，则清除定时器
            Math.abs(minusX)<0.05
            && Math.abs(minusY)<0.05
            && clearInterval(timer);
            document.getElementById('item-box').style.transform = `translateZ(${liElemDepZ}px) rotateX(${liElemDegX}deg) rotateY(${liElemDegY}deg)`;
          }, 12);
    }
    const nodeList = document.getElementsByTagName('li')
    for (let i = 0; i<nodeList.length;i++) {
        nodeList[i].onclick = function() {
            const text = nodeList[i].innerHTML && nodeList[i].innerHTML.toLowerCase()
            const layout = new Layout(liArr)
            layout[`${text}Layout`]()
        }
    }
    window.addEventListener('mousedown', mouseDown)
}