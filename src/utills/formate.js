
export default function(timeStamp, showTime = false) {
    const time = new Date(+timeStamp)
    const year = time.getFullYear()
    const month = (time.getMonth() + 1).toString().padStart(2, '0')
    const day = (time.getDate()).toString().padStart(2, '0')
    let str = `${year}-${month}-${day}`
    if (showTime) {
        str += ' '
        const hour = (time.getHours()).toString().padStart(2, '0')
        const minute = (time.getMinutes()).toString().padStart(2, '0')
        const second = (time.getSeconds()).toString().padStart(2, '0')
        str += `${hour}:${minute}:${second}`
    }
    return str
}