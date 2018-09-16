import axios from 'axios'

export const submitExam = (obj) => {
  return axios.request({
    url: 'api/exam/examineeSubmit',
    data: obj,
    method: 'post'
  })
}
