import axios from '@/utils/request.js'
// 获取seller
export function loginIn () {
  return axios.request({
    method: 'post',
    url: '/api/typical/add/case/data',
  })
}
