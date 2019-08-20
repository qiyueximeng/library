import { ø } from './default'
import { checkType } from './check'

// 移动
const yd_reg = /(^1((34)|(35)|(36)|(37)|(38)|(39)|(47)|(50)|(51)|(52)|(57)|(58)|(59)|(78)|(82)|(83)|(84)|(87)|(88)|(98))\d{8}$)|(^1705\d{7}$)/
// 联通
const lt_reg = /(^1((30)|(31)|(32)|(55)|(56)|(45)|(85)|(86)|(76)|(75)|(70)|(71)|(66)|(67))\d{8}$)|(^1709\d{7}$)/
// 电信
const dx_reg = /(^1((33)|(53)|(73)|(77)|(80)|(81)|(89)|(91)|(99))\d{8}$)|(^1(70[012])[0-9]{7}$)/

// 校验规则
const RULES = {
    unEmpty(value, errMsg) {
        if(value === '' || value == null) return errMsg
    },
    minLength(value, length, errMsg) {
        if(value.length < length) return errMsg
    },
    mobile(value, errMsg) {
        if(!(yd_reg.test(phone) || lt_reg.test(phone) || dx_reg.test(phone))) return errMsg
    },
    email(value, errMsg) {
        if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) return errMsg
    },
    unEmoji(value, errMsg) {
        if(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/.test(value)) return errMsg
    }
}

// 校验器
export default class Validator {
    constructor() {
        this.cache = []
    }

    add(value, rules, errMsg) {
        if(checkType(rules, 'Array')) {
            rules.forEach(item => {
                let ary = item.rule.split(':')
                this.cache.push(function() {
                    const strategy = ary.shift()
                    const msg = item.errMsg
                    ary.unshift(value)
                    ary.push(msg)
                    return RULES[ strategy ].apply(ø, ary)
                })
            })
        }
        if(checkType(rules, 'String')) {
            let ary = rules.split(':')
            this.cache.push(function() {
                const strategy = ary.shift()
                ary.unshift(value)
                ary.push(errMsg)
                return RULES[ strategy ].apply(ø, ary)
            })
        }
    }

    start() {
        for(let i = 0, len = this.cache.length; i < len; i++) {
            const result = this.cache[i]()
            if(result) return result
        }
    }
}
