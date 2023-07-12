// 判断上中晚时间
export const getHour = () => {
  let message = ''
  let hours = new Date().getHours()
  if (hours < 2) {
    message = '凌晨'
  } else if (hours < 9) {
    message = '上午'
  } else if (hours < 14) {
    message = '中午'
  } else if (hours < 18) {
    message = '下午'
  } else if (hours < 24) {
    message = '晚上'
  }
  return message
}
