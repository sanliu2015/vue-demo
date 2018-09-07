<template>
  <div class="exam-result">
    <div class="scores-container">
      <div class="">
        <header class="scores">{{getScore}}分</header>
        <label class="result-tips">{{resultTips}}</label>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    data () {
      return {
        //答错的题
        errorExam: [],
        //对部分题
        halfExam: [],
        //答对的题
        sureExam: [],
        //总分
        totalScore: 0.0,
        //得分
        getScore: 0.0,
        resultTips: "",
        examList: []
      }
    },
    computed:mapState([
      'saveAnswer',
      'useTime',
      'examId'
    ]),
    mounted () {
      const vm = this;
      vm.examList = vm.$store.state.examList[this.examId - 1] || [];
      vm.getSureAnswer();
    },
    methods: {
      getSureAnswer() {
        var vm = this;
        // if(vm.examList.length !== vm.saveAnswer.length){
        //     vm.$Message.error({
        //         content: '系统错误，请稍后重试',
        //         duration: 3
        //     });
        //     return;
        // }
        vm.examList.forEach(function(item, index){
          vm.totalScore += parseInt(item.score);
          if (Array.isArray(vm.saveAnswer[index]) && Array.isArray(item.answer)) {
            if (vm.saveAnswer[index].length === item.answer.length
              && vm.saveAnswer[index].every(function(v,i) { return v === item.answer[i]})) {  // 全部正确
              vm.sureExam.push(item);
              vm.getScore += item.score;
            } else {
              let errorFlag = false;
              for (let i = 0; i < vm.saveAnswer[index].length; i++) {
                if (item.answer.indexOf(vm.saveAnswer[index][i]) === -1) {
                  errorFlag = true;
                  break;
                }
              }
              if (!errorFlag) {
                vm.getScore += item.score/2;
                vm.halfExam.push(item);
              } else {
                vm.errorExam.push(item);
              }
            }
          } else {
            if(item.answer === vm.saveAnswer[index]) {
              vm.sureExam.push(item);
              vm.getScore += item.score;
            } else {
              vm.errorExam.push(item);
            }
          }
        });

        vm.setResultTips();
        // console.log(this.useTime);
        // console.log("答对题:" + vm.sureExam.length + "对一半题:" + vm.halfExam.length);
      },
      setResultTips() {
        const scores = [100 ,90, 80, 60, 40, 20],
          tips = [
            '哇，为何你这么秀！！',
            '表现超棒，继续加油！',
            'good,还有很大空间！',
            '请您再接再厉！！！',
            '请继续加油亲！！！',
            'What are you弄啥嘞！'
          ];
        if(this.getScore <= scores[5]) {
          this.resultTips = tips[5];
          return;
        }
        if(this.getScore <= scores[4]) {
          this.resultTips = tips[4];
          return;
        }
        if(this.getScore <= scores[3]) {
          this.resultTips = tips[3];
          return;
        }
        if(this.getScore <= scores[2]) {
          this.resultTips = tips[2];
          return;
        }
        if(this.getScore <= scores[1]) {
          this.resultTips = tips[1];
          return;
        }
        if(this.getScore <= scores[0]) {
          this.resultTips = tips[0];
        }
      }
    }
  }
</script>

<style scoped>
  .exam-result{
    height: 100%;
    width: 100%;
    background: url(../assets/4.jpg) no-repeat;
    background-size: 100%;
  }
  .scores-container{
    background: url(../assets/5.png) no-repeat;
    background-size: 100%;
    width: 14rem;
    height: 14rem;
    margin: 0 auto;
    position: relative;
  }
  .scores-container .scores{
    position: absolute;
    width: 100%;
    text-indent: 1.3rem;
    top: 6.5rem;
    font-size: 1.4rem;
    font-weight: bolder;
    color: #412318;
    text-align: center;
  }
  .result-tips{
    position: absolute;
    width: 90%;
    margin: 0 auto;
    display: block;
    top: 9rem;
    color: #3e2415;
    font-size: 1.1rem;
    left: 1rem;
    text-align: center;
  }
</style>
