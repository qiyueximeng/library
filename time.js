import { stringToNumber } from './string';
import { doubleDigit } from './number';
import { isString, isNumber } from './check';

/**
 * 将字符串格式的时间转换成秒数
 * @export
 * @param { string } timeStr - 需要转换的时间字符串
 * @param { string } flag - 时分秒之间的拼接符号，默认值为 ':'
 * @returns { number } - 转换后的秒数
 */
export function transformTimeToSecond(timeStr, flag = ':') {
    if(!isString(timeStr) || !isString(flag)) {
        throw TypeError('The param "timeStr" and "flag" should be a string!');
    }
    const timeArr = timeStr.split(flag);
    if(timeArr.length < 3) throw new Error('The time format was not ture!');
    let h = stringToNumber(timeArr[0]);
    let m = stringToNumber(timeArr[1]);
    let s = stringToNumber(timeArr[2]);
    return h * 3600 + m * 60 + s;
}

/**
 * 将秒数转换成字符串格式的时间
 * @export
 * @param { number } second - 需要转换的秒数
 * @param { string } flag - 指定时分秒之间拼接的符号，默认值为 ':'
 * @returns { string } - 转换后的时间字符串
 */
export function transformSecondToTime(second, flag = ':') {
    if(!isNumber(second)) throw new TypeError('The param "second" should be a number!');
    if(!isString(flag)) throw new TypeError('The param "flag" should be a string!');

    const h = doubleDigit(Math.floor(second / 3600));
    const m = doubleDigit(Math.floor((second - h * 3600) / 60));
    const s = doubleDigit(Math.floor(second % 60));
    return `${h}${flag}${m}${flag}${s}`;
}
