import { isNumber } from './check';

/**
 * 将不足两位的数字添加 0 补成 2 位字符串
 * 达到和超过两位的数字直接返回对应字符串
 * @param { number } n - 需要处理的数字
 * @returns { string } - 处理后的字符串
 * @export
 */
export function doubleDigit(n) {
    if(!isNumber(n)) throw new TypeError('The param "n" should be a number!');
    const res = n < 10 ? ('0' + n) : String(n);
    return res;
}