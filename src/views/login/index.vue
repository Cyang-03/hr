<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
          <!-- <img src="@/assets/common/login-logo.png" alt=""> -->
          <span>iHRM</span> 后台登录系统
        </h3>
        <p />
      </div>

      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button class="loginBtn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <!-- 显示登录提示文本 -->
      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    // 自定义校验规则函数
    const validateMobile = (rule, value, callback) => { // 手机号校验规则
      // if (!validMobile(value)) {
      //   callback(new Error('手机号格式不正确'))
      // } else {
      //   callback()
      // }
      validMobile(value) ? callback() : callback(new Error('手机号格式不正确'))
    }
    return {
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', message: '手机号不能为空' }, {
          validator: validateMobile, trigger: 'blur'
        }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }, {
          trigger: 'blur', min: 6, max: 16, message: '密码长度为6-16位之间'
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['user/login']),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async isOK => {
        if (isOK) {
          try {
            this.loading = true
            // 只有校验通过了 我们才去调用action
            await this['user/login'](this.loginForm)
            // 应该登录成功之后
            // async标记的函数实际上一个promise对象
            // await下面的代码 都是成功执行的代码
            this.$router.push('/')
          } catch (error) {
            console.log(error)
          } finally {
            //  不论执行try 还是catch  都去关闭转圈
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray: #5f6162;  // 将输入框颜色改成灰色
$cursor: rgb(110, 108, 108);

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  // background-image: url('~@/assets/common/login-yy.jpg');
  // background-position: center;
  background: url('~@/assets/common/login-yy.jpg') no-repeat;
  background-size: cover;

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    // border: 1px solid rgba(0, 0, 0, 0.4);
    border-bottom: 2px solid #e3e3e3;
    background: rgba(255, 255, 255, 0.8); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
    margin-bottom: 45px;
  }
  .el-form-item__error { //错误信息背景色
  color: rgb(247, 82, 82)
  }
  .loginBtn { // 登录按钮样式
  // background: rgba(15, 14, 14, 0.8);
  background: linear-gradient(to top right, #861a72, #0b429f);
  height: 56px;
  border-radius: 6px;
  line-height: 32px;
  font-size: 22px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  // position: relative;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    // top: 260px;
    top: 52%;
    transform: translate(0, -50%);
    width: 520px;
    max-width: 100%;
    padding: 0 60px;
    margin-left: 50px;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #a8a8a8;
    margin-bottom: 10px;
    text-align: center;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-bottom: 65px;

    .title {
      font-size: 36px;
      color: #0e127c;
      // margin: 0px auto 40px auto;
      // text-align: center;
      font-weight: bold;
      span {
        padding: 9px 0;
        border-bottom: 3px solid #0e127c;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .el-button--primary {
    border: none
  }
}
</style>
