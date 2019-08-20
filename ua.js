const ua = window.navigator.userAgent.toLowerCase()

export const isWeiXin = ua.match(/MicroMessenger/i) == 'micromessenger'
export const isWeiXinOrQQ = isWeiXin || ua.match(/\sqq/i)
export const isAlipay = ua.match(/AlipayClient/i) == 'alipayclient'

export const isIOS = !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)
export const iOSVersion = (() => {
    let version = null
    if(isIOS) {
        const verinfo = ua.match(/os [\d._]*/gi)
        version = parseInt((verinfo + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.'))
    }
    return version
})()
export const isIphoneX = isIOS && window.screen.height >= 780

export const isAndroid = ua.indexOf('android') > -1
export const androidVersion = (() => {
    let version = null
    if (isAndroid) {
        const v_info = ua.match(/android [\d._]+/gi)
        version = (v_info + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.')
        version = parseInt(version.split('.')[0])
    }
    return version
})()

export const isMobile = ua.match(/mobile/i)
