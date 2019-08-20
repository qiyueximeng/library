import { isString } from './check'

/**
 * 读取 URL 中指定 query 参数的值
 * @param name 需要查询的 query 键名
 */
export function getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const result = window.location.search.slice(1).match(reg)
    if (result !== null) return decodeURI(result[2])
    return null
}

/**
 * 解析查询字符串
 * 将查询字符串解析为对象
 * @param { string } [queryStr=location.search] - 需要解析的字符串，若不传则默认取浏览器查询字符串
 * @returns { Object } - 解析后的对象
 */
export function parseQuery(queryStr = (location.search)) {
    if(!isString(queryStr)) throw TypeError('The param "queryString" should be a string!')

    if(queryStr.charAt(0) === '?') queryStr = queryStr.slice(1)
    let queryObj = {}
    queryStr
        .split('&')
        .forEach(item => {
            const itemArr = item.split('=')
            queryObj[itemArr[0]] = itemArr[1]
        })
    return queryObj
}
