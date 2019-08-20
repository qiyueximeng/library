/**
 * 不打开浏览器新窗口通过 js 下载文件
 * @param { string } downloadUrl - 文件下载地址
 */
export function downLoadFile(downloadUrl) {
    var iframe = document.createElement("iframe")
    iframe.src = downloadUrl
    iframe.style.display = "none"
    document.body.appendChild(iframe)
}