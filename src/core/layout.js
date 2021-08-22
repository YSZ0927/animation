import utils from '../utils/common'

export default class Layout {
    constructor(el) {
        this.nodeList = el
        this.liElemCoordY = 0
        this.liElemCoordX = 0
        this.liElemCoordZ = 0
        // li 元素 水平、垂直铺放的最大个数
        this.liElemRowMaxNum = 5
        this.liElemColMaxNum = 5
        // li 元素水平、垂直、纵深方向的最大间隔距离
        this.liElemOffsetX = 350
        this.liElemOffsetY = 350
        this.liElemOffsetZ = 350
        // X、Y偏移度数
        this.liElemDegX = 0
        this.liElemDegY = 0
        // li 元素水平、垂直、纵深方向偏移位
        this.offsetStepX = 0
        this.offsetStepY = 0
        this.offsetStepZ = 0
        // 默认景深
        this.liElemDepDefault = -1000
        // 单个方阵中 li 元素的总个数
        this.aScreenNum = this.liElemRowMaxNum * this.liElemColMaxNum
        // li 元素纵深方向的最在间隔距离
        this.liElemDepMaxDist = parseInt(el.length / this.aScreenNum)
        // 计算第一个li 元素的坐标点
        this.liElemFristSiteX = parseInt('-' + this.liElemRowMaxNum/2) * this.liElemOffsetX
        this.liElemFristSiteY = parseInt('-' + this.liElemColMaxNum/2) * this.liElemOffsetY
        this.liElemFristSiteZ = parseInt('-' + this.liElemDepMaxDist/2) * this.liElemOffsetZ
    }
    gridLayout() {
        this.nodeList.forEach((el, i) => {
            // 计算li 元素 水平、垂直、纵深方向的偏移位
            this.offsetStepX = ((i % this.aScreenNum) % this.liElemRowMaxNum) * this.liElemOffsetX;
            this.offsetStepY = parseInt((i % this.aScreenNum) / this.liElemColMaxNum) * this.liElemOffsetY;
            this.offsetStepZ = parseInt(i / this.aScreenNum) * this.liElemOffsetZ;
            // 计算当前li 元素的坐标值
            this.liElemCoordX = this.liElemFristSiteX + this.offsetStepX;
            this.liElemCoordY = this.liElemFristSiteY + this.offsetStepY;
            this.liElemCoordZ = this.liElemFristSiteZ + this.offsetStepZ;
            el.style.transform = `translate3d(${this.liElemCoordX}px,${this.liElemCoordY}px,${this.liElemCoordZ}px)`
            el.style.transition = "4s ease-in-out"
        })
    }
    threeLayout() {
        this.nodeList.forEach((el, i) => {
            this.liElemDegY = 3*i;
            this.liElemDegX = 60*i;
            // 计算当前li 元素的坐标值
            el.style.transform = `rotateY(${this.liElemDegY}deg)
                rotateX(${this.liElemDegX}deg)
                translateZ(${Math.abs(this.liElemDepDefault)}px)`
            el.style.transition = "4s ease-in-out"
        })
    }
    sphereLayout() {
        this.nodeList.forEach((el, i) => {
            this.liElemDegY = 3*i;
            this.liElemDegX = 30*i;
            // 计算当前li 元素的坐标值
            el.style.transform = `rotateY(${this.liElemDegY}deg)
                rotateX(${this.liElemDegX}deg)
                translateZ(${Math.abs(this.liElemDepDefault)}px)`
            el.style.transition = "4s ease-in-out"
        })
    }
    chaoticLayout() {
        this.nodeList.forEach((el, i) => {
            this.liElemCoordX = (Math.random()-0.5)*2000;
            this.liElemCoordY = (Math.random()-0.5)*2000;
            this.liElemCoordZ = (Math.random()-0.5)*2000;
            // 计算当前li 元素的坐标值
            el.style.transform = `translate3d(${this.liElemCoordX}px,${this.liElemCoordY}px,${this.liElemCoordZ}px)`
            el.style.transition = "4s ease-in-out"
        })
    }
}