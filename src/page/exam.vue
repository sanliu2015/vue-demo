<template>
  <div class="exam">
    <div class="header">
      <p class="title">考试试题</p>
      <p class="describe">
        <span>考试日期: {{currentDate}}</span>
        <span>时长: {{time}}分钟</span>
      </p>
    </div>
    <section v-for="(item, index) in questions" v-show="index === currendIndex">
      <label>{{ index + 1 }}. <span>{{item.title}} ({{item.score}}分)</span></label>
      <div class="item-options" v-if="Array.isArray(item.answer)">
        <CheckboxGroup v-model="checkedValue" @on-change="changeCheckboxAnswer">
          <Checkbox v-for="(option, listIndex) in item.options" :label="option.optionId" :key="option.optionId"><span v-html="option.content"></span></Checkbox>
        </CheckboxGroup>
      </div>
      <div v-else class="item-options">
        <RadioGroup v-model="selectedValue" @on-change="changeCurrentAnswer">
          <Radio v-for="(option, listIndex) in item.options" :label="option.optionId" :key="option.optionId"><span v-html="option.content"></span></Radio>
        </RadioGroup>
      </div>
    </section>
    <div class="time-count-wrap">距离考试结束还有：{{restTime}}</div>
    <div class="buttons-group">
      <Button type="error" size="large" @click.native="prevItem" :disabled="currendIndex<1 && currendIndex != questions.length-1">上一题</Button>
      <Button type="error" size="large" @click.native="nextItem" v-if="currendIndex != questions.length-1">下一题</Button>
      <Button type="error" size="large" @click.native="handleSubmit" v-if="currendIndex == questions.length-1">提交试卷</Button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getNumberPrefix, getCurrentDate} from '../utils/common'
  import {submitExam} from '../api/exam'

  export default {
    data () {
      return {
        currentDate: getCurrentDate(),
        selectedValue: "", //选中的答案
        checkedValue: [], // 多选题选择的答案
        //初始化时间戳
        currentTime: new Date().getTime(),
        restTime: "",
        timer: ""
      }
    },
    watch: {
      $route (to) {
      }
    },
    mounted () {
      this.countTime();
      // console.log(this.questionList)
    },
    computed: {
      questions() {
        const vm = this;
        return vm.$store.state.questions;
      },
      time() {
        const vm = this;
        return vm.$store.state.examInfo.longMinute;
      },
      ...mapState([
        'currendIndex',
        'saveAnswer'
      ])
    },
    methods: {
      ...mapMutations([
        'NEXT_ITEM',
        'PREV_ITEM',
        'USE_TIME',
        'EXAM_ID'
      ]),
      //下一题
      nextItem() {
        if(!this.selectedValue && this.checkedValue.length === 0){
          this.$Message.warning('请先选择答案！');
          return;
        }
        this.selectedValue = "";
        this.checkedValue = [];
        this.NEXT_ITEM();
        this.getCurrentAnswer();
      },
      //上一题
      prevItem() {
        this.PREV_ITEM();
        this.getCurrentAnswer();
      },
      //提交答案
      handleSubmit() {
        if(!this.selectedValue && this.checkedValue.length === 0){
          this.$Message.warning('请先选择答案！');
          return;
        }
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定要交卷吗？</p>',
          onOk: () => {
            var vm = this;
            var totalScore = 0.0;
            var result = [];
            vm.$store.state.questions.forEach(function(item, index){
              var answerObj = {};
              answerObj.questionId = item.questionId;
              answerObj.selectAnswer = vm.saveAnswer[index];
              result.push(answerObj);
              if (Array.isArray(vm.saveAnswer[index]) && Array.isArray(item.answer)) {
                if (vm.saveAnswer[index].length === item.answer.length
                  && vm.saveAnswer[index].sort().every(function(v,i) { return v === item.answer[i]})) {  // 全部正确
                  totalScore += item.score;
                } else {
                  let errorFlag = false;
                  for (let i = 0; i < vm.saveAnswer[index].length; i++) {
                    if (item.answer.indexOf(vm.saveAnswer[index][i]) === -1) {
                      errorFlag = true;
                      break;
                    }
                  }
                  if (!errorFlag) {
                    totalScore += item.score/2;
                  }
                }
              } else {
                if(item.answer === vm.saveAnswer[index]) {
                  totalScore += item.score;
                }
              }
            });
            // const scores = [100 ,90, 80, 60, 40, 20],
            //   tips = [
            //     '哇，为何你这么秀！！',
            //     '表现超棒，继续加油！',
            //     'good,还有很大空间！',
            //     '请您再接再厉！！！',
            //     '请继续加油亲！！！',
            //     'What are you弄啥嘞！'
            //   ];
            // let resultTips = "";
            // if(totalScore <= scores[5]) {
            //   resultTips = tips[5];
            // } if(totalScore <= scores[4]) {
            //   resultTips = tips[4];
            // } if(totalScore <= scores[3]) {
            //   resultTips = tips[3];
            // } if(totalScore <= scores[2]) {
            //   resultTips = tips[2];
            // } if(this.getScore <= scores[1]) {
            //   resultTips = tips[1];
            // } if(totalScore <= scores[0]) {
            //   resultTips = tips[0];
            // }
            // this.EXAM_ID(this.$route.query.id);
            // this.USE_TIME(new Date().getTime() - this.currentTime);
            clearTimeout(this.timer);
            // this.$router.push({name: 'Result', params: {getScore: totalScore, resultTips: resultTips}});
            var submitObj = {};
            submitObj.score = totalScore;
            submitObj.answer = JSON.stringify(result);
            submitObj.examId = this.$store.state.examInfo.id;
            submitObj.examineeId = this.$store.state.examinee.id;
            submitExam(submitObj).then((res) => {
              if (res.data.code ===0) {
                this.$Message.success({
                  content: '提交成功，页面将于5秒后跳到首页！',
                  duration:5,
                  onClose: ()=>{
                    this.$router.push({ path: '/exam/'+ this.$store.state.examInfo.id});
                  }
                });
              } else {
                this.$Message.error(res.data.msg);
              }
            }).catch(err => {
              this.$Message.error(err);
              this.loading = false;
            });
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel');
          }
        });
      },
      //更改当前题目的答案
      changeCurrentAnswer() {
        this.saveAnswer[this.currendIndex] = this.selectedValue;
      },
      changeCheckboxAnswer() {
        this.saveAnswer[this.currendIndex] = this.checkedValue;
      },
      //获取当前题目填写的答案
      getCurrentAnswer() {
        const currentAnswer = this.saveAnswer[this.currendIndex];
        if (currentAnswer !== undefined) {
          if (Array.isArray(currentAnswer)) {
            this.checkedValue = currentAnswer;
          } else {
            this.selectedValue = currentAnswer;
          }
        }
      },
      //倒计时
      countTime() {
        const vm = this,
          endTime = vm.time * 60 * 1000 + vm.currentTime,
          currentTime = new Date().getTime(),
          restTime = endTime - currentTime,
          hours = getNumberPrefix(parseInt(restTime / (1000 * 60 * 60) % 24, 10)),
          minutes = getNumberPrefix(parseInt(restTime / (1000 * 60) % 60, 10)),
          seconds = getNumberPrefix(parseInt(restTime / 1000 % 60, 10));
        vm.restTime = `${hours}:${minutes}:${seconds}`;
        vm.timer = setTimeout(function(){
          if(restTime > 0){
            vm.countTime();
          }else if(restTime <= 0){
            clearTimeout(vm.timer);
            vm.$Message.warning("交卷时间已到，系统将帮您自动交卷");
            setTimeout(() => {
              vm.handleSubmit();
            }, 2000)
          }
        }, 1000);
      }
    }
  }
</script>

<style>
  .exam{
    width: 100%;
    height: 100%;
    font-size: 1rem;
  }
  .exam .header,
  .exam section,
  .time-count-wrap
  {
    padding: 15px;
    text-align: left;
  }
  .exam .header
  {
    border-bottom: 9px solid #ccc;
  }
  .header .describe,
  .time-count-wrap
  {
    font-size: 0.8rem;
    color: rgba(135, 134, 136, 0.84);
  }
  .header .describe span:nth-child(2){
    float: right;
  }
  .exam section{
    border-left: 5px solid red;
    background: url(../assets/3.jpg) 100% 100%;;
  }
  section .ivu-radio-group label{
    display: block;
    padding: 7px 0px;
    white-space: normal;
  }
  section .ivu-checkbox-group label{
    display: block;
    padding: 7px 0px;
    white-space: normal;
  }
  .buttons-group{
    padding: 30px 0px;
  }
  .buttons-group button{
    padding-left: 25px;
    padding-right: 25px;
    margin-left: 5px;
  }
  .ivu-radio-wrapper{
    font-size: 0.9rem;
  }
  .ivu-checkbox-wrapper{
    font-size: 0.9rem;
  }
  span.ivu-radio+*{
    position: relative;
    left: 20px;
  }
  span.ivu-checkbox+*{
    position: relative;
    left: 20px;
  }
  .item-options .ivu-radio{
    position: absolute!important;
  }
  .item-options .ivu-checkbox{
    position: absolute!important;
    line-height: 1.75;
  }
</style>
