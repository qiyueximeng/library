import { isDef, checkType } from './check'

/**
 * 防抖
 * 在事件触发的指定时间间隔后执行一次事件，若在间隔事件内事件被再次触发，则重新计算时间
 * @param { Function } callback - 指定事件句柄
 * @param { number } delay - 指定间隔时间
 * @param { boolean } immediate - 是否立即执行（默认为false）
 * @return { Function } 返回一个加了防抖操作的函数
 * @version v1.0 个人版
 */
export function debounce(callback, delay, immediate) {
    if(typeof delay !== 'number' || Number.isNaN(delay)) throw new TypeError('The param "delay" should be a number!')

    let timer
    return function() {
        const args = arguments
        if(timer) clearTimeout(timer)
        if(immediate) {
            const callNow = !timer
            timer = setTimeout(() => { timer = null }, delay)
            if(callNow) callback.apply(this, args)
        } else {
            timer = setTimeout(() => { callback.apply(this, args) }, delay)
        }
    }
}

/**
 * 节流
 * 连续触发的事件在指定时间间隔内只触发一次（函数执行频率被定为 n 毫秒一次）
 * @param { Function } callback - 指定事件句柄
 * @param { number } delay - 指定间隔时间
 * @return { Function } 返回一个加了节流操作的函数
 * @version v1.0 个人版
 */
export function throttle(callback, delay) {
    let prevTime = 0
    return function() {
        const now = Date.now()
        if(now - prevTime > delay) {
            callback.apply(this, arguments)
            prevTime = now
        }
    }
}

/**
 * 确保指定函数只会被调用一次
 * @param { Function } fn - 需要被执行的函数
 * @returns { Function } - 返回一个可被调用的函数
 * @export
 */
export function once(fn) {
    let called = false
    
    return function() {
        if(called) return void 0
        fn.apply(this, arguments)
        called = true
    }
}

/**
 * 普通深拷贝
 * 仅兼容普通对象，通过递归实现
 * @param {*} target
 * @returns
 */
export function cloneRecursion(target) {
    if(!(checkType(target, 'Object'))) return target

    let result = {}
    for(let key in target) {
        if(target.hasOwnProperty(key)) {
            if(checkType(target[key], 'Object')) {
                result[key] = cloneRecursion(target[key])
            } else {
                result[key] = target[key]
            }
        }
    }
    return result
}

/**
 * 通过 JSON 的方法进行对象深拷贝
 * 仅兼容不同对象、数组和自定义对象，不兼容 JavaScript 内置对象和 function
 * @export
 * @param { any } target - 需要进行深拷贝的数据
 * @param { any } defaultVal - 拷贝出现错误时返回的默认值，未传则报错
 * @returns { any } - 拷贝结果
 */
export function cloneJSON(target, defaultVal) {
    if(!checkType(target, 'Object') && !checkType(target, 'Array')) return target

    let result
    try {
        result = JSON.parse(JSON.stringify(target))
    } catch(err) {
        if(!isDef(defaultVal)) throw err
        result = defaultVal
    }
    return result
}

/**
 * 倒计时函数
 *
 * @param {*} calcTime
 * @param {*} callBack
 */
export function countDown(calcTime, callBack) {
    if(calcTime < 0) return
    callBack(calcTime--)
    setTimeout(() => { countDown(calcTime, callBack) }, 1000)
}

// 创建指定深度和广度的对象数（用于测试）
export function createData(deep, breadth) {
    let data = {}
    let temp = data
    
    for(let i = 0; i < deep; i++) {
        temp = temp['data'] = {}
        for(var j = 0; j < breadth; j++) {
            temp[j] = j
        }
    }
    return data
}

/**
 * rgba 颜色转十六进制颜色
 * @param { string } color - rgba 颜色字符串
 */
export function hexify(color) {
    let values = color
        .replace(/rgba?\(/, '')
        .replace(/\)/, '')
        .replace(/[\s+]/g, '')
        .split(',')
    let a = parseFloat(values[3] || 1),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
    return "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2)
}

// XSS过滤
export function filterXSS(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\r{0,}\n/g, '<br/>')
}
