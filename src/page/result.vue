<template>
  <div class="exam-result">
    <div class="scores-container">
      <div class="">
        <header class="scores">{{this.$route.params.getScore}}分</header>
        <label class="result-tips">{{this.$route.params.resultTips}}</label>
      </div>
    </div>
  </div>
</template>

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
