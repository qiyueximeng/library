/**
 * 判断数据是否为 number 类型
 * NaN 也判定为非 number 类型
 * @param { any } val - 需要判断的数据
 * @returns { boolean } - 判断结果
 */
export const isNumber = val => typeof val === 'number' && !Number.isNaN(val)

/**
 * 判断数据是否为 string 类型
 * @param { any } val - 需要判断的数据
 * @returns { boolean } - 判断结果
 */
export const isString = val => typeof val === 'string'

/**
 * 判断数据类型是否为 undefined
 * @param { any } val - 需要判断的数据
 * @returns { boolean } - 判断结果
 */
export const isUndef = val => val === void 0

/**
 * 判断数据类型是否非 undefined
 * @param { any } val - 需要判断的数据
 * @returns { boolean } - 判断结果
 */
export const isDef = val => val !== void 0

/**
 * 数据类型校验
 * 对指定数据进行类型校验，返回校验结果
 * @param { * } target - 需要进行类型校验的数据
 * @param { string } genre - 期望的数据类型字符串
 * @returns { boolean } - 校验的结果
 */
export const checkType = (target, genre) => Object.prototype.toString.call(target).slice(8, -1) === genre

/**
 * 获取数据类型
 * @param { any } value - 需要获取数据类型的数据
 * @returns { string } - 指定数据类型的字符串
 */
export const getRawType = value => Object.prototype.toString.call(value).slice(8, -1)