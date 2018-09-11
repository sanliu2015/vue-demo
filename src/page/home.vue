<template>
    <div class="home-page">
      <Form ref="loginForm" :model="loginForm" :rules="loginRules" :label-width="80" class="card-box login-form">
        <FormItem label="姓名" prop="name">
          <Input v-model="loginForm.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="工号" prop="number">
          <Input v-model="loginForm.number" placeholder="请输入工号"></Input>
        </FormItem>
        <FormItem label="部门" prop="department">
          <Input v-model="loginForm.department" placeholder="请输入部门"></Input>
        </FormItem>
      </Form>
      <div class="button-group">
        <Button type="primary" @click="handleLogin('')">开始考试</Button>
      </div>
        <!--<div class="button-group">
            <span><router-link :to="{name: 'exam1', query: {id: 1}}">考试试题一</router-link></span>
        </div>-->
    </div>
</template>
<script>
    import { loginByExaminee } from "@/api/login";
    export default {
      data () {
        return {
          loginForm: {
            name: '',
            number: '',
            department: '',
            examId: 1
          },
          loginRules: {
            name: [
              { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            number: [
              { required: true, message: '工号不能为空', trigger: 'blur' }
            ],
            department: [
              { required: true, message: '部门不能为空', trigger: 'blur' }
            ]
          }
        }
      },
      mounted() {
        console.log(this.$route.params.id);
      },
      methods: {
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.loading = true;
              console.log(this.loginForm);
              loginByExaminee(this.loginForm).then((res) => {
                console.log(res);
                this.$Message.success('登录成功');
                this.loading = false;
                // this.$router.push({ path: '/' });
              }).catch(err => {
                this.$message.error(err);
                this.loading = false;
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>
<style scoped>
    .home-page{
        height: 100%;
        width: 100%;
        /*background: url(../assets/4.jpg) no-repeat;*/
        background-size: 100%;
    }
    .button-group{
        padding: 0px 15px;
        position: relative;
        transform: translateY(-50%);
        top: 50%;
    }
    .button-group span{
        display: block;
        margin-bottom: 15px;
        width: 100%;
        height: 40px;
        border-radius: 6px;
        color: #656b79;
        background-color: #f6f8fa;
        box-shadow: 0 0 1px #b8bbbf;
    }
    .button-group span a{
        line-height: 40px;
        color: #656b79;
        display: block;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 60px auto;
    }
</style>
