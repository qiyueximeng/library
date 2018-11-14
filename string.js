/**
 * 将指定字符创转换为数字
 * 如果转换失败，则返回原有的字符串
 * @param { string } val - 需要转换为数字的字符串
 * @returns { number | string } - 转换结果
 * @export
 */
export function stringToNumber(val) {
    if(typeof val !== 'string') throw new TypeError('the param "val" should be a string');
    const n = parseFloat(val);
    return Number.isNaN(n) ? val : n;
}