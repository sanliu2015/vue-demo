import axios from '@/libs/api.request'

export const loginByExaminee = (obj) => {
  return axios.request({
    url: 'loginByExaminee',
    data: obj,
    method: 'post'
  })
}
