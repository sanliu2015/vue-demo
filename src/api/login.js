import axios from 'axios'

export const loginByExaminee = (obj) => {
  return axios.request({
    url: 'api/loginByExaminee',
    data: obj,
    method: 'post'
  })
}

export const getExamInfo = (examId) => {
  return axios.request({
    url: 'api/exam/'+examId,
    method: 'get'
  })
}
