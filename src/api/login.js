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

export const shuffleArr = (arr)=> {
  var i = arr.length, t, j;
  while (i) {
    j = Math.floor(Math.random() * i--); //!!!
    t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return arr;
}
