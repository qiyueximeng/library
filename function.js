import { isDef, checkedType } from './check';
import { isString } from './check';

/**
 * 解析查询字符串
 * 将查询字符串解析为对象
 * @export
 * @param { string } [queryStr=location.search] - 需要解析的字符串，若不传则默认取浏览器查询字符串
 * @returns { Object } - 解析后的对象
 */
export function parseQuery(queryStr = location.search) {
    if(!isString(queryStr)) throw TypeError('The param "queryString" should be a string!');

    if(queryStr.charAt(0) === '?') queryStr = queryStr.slice(1);
    var queryObj = {};
    queryStr
        .split('&')
        .forEach(item => {
            var itemArr = item.split('=');
            queryObj[itemArr[0]] = itemArr[1];
        });
    return queryObj;
}

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
    if(typeof delay !== 'number' || Number.isNaN(delay)) throw new TypeError('The param "delay" should be a number!');
    var timer;
    return function() {
        var that = this;
        var args = arguments;
        if(timer) clearTimeout(timer);
        if(immediate) {
            var callNow = !timer;
            timer = setTimeout(function() {
                timer = null;
            }, delay);
            if(callNow) callback.apply(that, args);
        } else {
            timer = setTimeout(function() {
                callback.apply(that, args);
            }, delay);
        }
    }
};

/**
 * 节流
 * 连续触发的事件在指定时间间隔内只触发一次（函数执行频率被定为 n 毫秒一次）
 * @param { Function } callback - 指定事件句柄
 * @param { number } delay - 指定间隔时间
 * @return { Function } 返回一个加了节流操作的函数
 * @version v1.0 个人版
 */
export function throttle(callback, delay) {
    var prevTime = 0;
    return function() {
        var now = Date.now();
        if(now - prevTime > delay) {
            callback.apply(this, arguments);
            prevTime = now;
        }
    }
};

/**
 * 确保指定函数只会被调用一次
 * @param { Function } fn - 需要被执行的函数
 * @returns { Function } - 返回一个可被调用的函数
 * @export
 */
export function once(fn) {
    let called = false;
    
    return function() {
        if(called) return void 0;
        fn.apply(this, arguments);
    }
}

/**
 * 普通深拷贝
 * 仅兼容普通对象，通过递归实现
 * @export
 * @param {*} target
 * @returns
 */
export function cloneRecursion(target) {
    if(!(checkedType(target, 'Object'))) {
        return target;
    }
    let result = {};
    for(let key in target) {
        if(target.hasOwnProperty(key)) {
            if(checkedType(target[key], 'Object')) {
                result[key] = cloneRecursion(target[key]);
            } else {
                result[key] = target[key];
            }
        }
    }
    return result;
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
    if(!checkedType(target, 'Object') && !checkedType(target, 'Array')) {
        return target;
    }
    let result;
    try {
        result = JSON.parse(JSON.stringify(target));
    } catch(err) {
        if(isDef(defaultVal)) {
            result = defaultVal
        } else {
            throw err;
        }
    }
    return result;
}

/**
 * 倒计时函数
 *
 * @export
 * @param {*} calcTime
 * @param {*} callBack
 * @returns
 */
export function countDown(calcTime, callBack) {
    if(calcTime < 0) return;
    callBack(calcTime--);
    setTimeout(() => {
        countDown(calcTime, callBack);
    }, 1000);
}

export function removeItem(list) {

}

export function shallowClone(obj) {

};

export function deepClone(obj) {

};

export function createData(deep, breadth) {
    var data = {};
    var temp = data;
    
    for(var i = 0; i < deep; i++) {
        temp = temp['data'] = {};
        for(var j = 0; j < breadth; j++) {
            temp[j] = j;
        }
    }
    return data;
};