import axios from 'axios'

export const loginByExaminee = (obj) => {
  return axios.request({
    url: 'api/loginByExaminee',
    data: obj,
    method: 'post'
  })
}
