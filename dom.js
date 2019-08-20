/**
 * 检查元素中是否包含指定 class
 * @param { Element } el - 元素对象
 * @param { string } className - 需要检测的 class 名
 */
export const hasClass = (el, className) => new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className)

/**
 * 为元素添加指定 class
 * @param { Element } el - 元素对象
 * @param { string } className - 需要添加的 class 名
 */
export function addClass(el, className) {
    if (hasClass(el, className)) return void 0

    el.className = el.className.split(' ').push(className).join(' ')
}

/**
 * 对元素删除指定 class
 * @param { Element } el - 元素对象
 * @param { string } className - 需要删除的 class 名
 */
export function removeClass(el, className) {
    if (!hasClass(el, className)) return void 0

    el.className = el.className.replace(new RegExp('(^|\\s)' + className + '(\\s|$)', 'g'), ' ')
}

/**
 * 读取 DOM 的位置信息
 * @param el DOM 元素
 */
export function getRect(el) {
    if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        }
    } else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    }
}