import moment from 'moment'

// 快速转换时间格式,默认初始时间格式为'YYYYMMDDHHmmss'
const formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  const result = moment(time, 'YYYYMMDDHHmmss').format(format)
  return time ? result : time
}

const formatDate = (time, format = 'YYYY-MM-DD') => {
  const result = moment(time, 'YYYYMMDD').format(format)
  return time ? result : time
}

export default {
  formatTime,
  formatDate
}
