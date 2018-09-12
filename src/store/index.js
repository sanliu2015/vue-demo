import Vue from 'vue'
import Vuex from 'vuex'
import {examTime, examList} from '../data/examData1'
import {examTime2, examList2} from '../data/examData2'
import mutations from './mutation'

Vue.use(Vuex)

const state = {
    //当前题目索引
    currendIndex: 0,
    //题目列表
    examList: [],
    //保存的答案
    saveAnswer: [],
    //考试时长
    time: 0,
    //花费的时间
    useTime: '',
    //当前试卷ID
    examId: 0,
    examInfo: {
      id : 0,
      name: '',
      startTime: '',
      longMinute: 0
    },
    examinee: {},
    qustions: []

};


export default new Vuex.Store({
	state,
    mutations
})
