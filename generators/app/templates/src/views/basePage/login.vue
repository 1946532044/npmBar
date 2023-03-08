<template>
  <div class="loginWrap">
    <div class="loginBox">
      <div class="title">
        管理系统
      </div>
      <el-form label-width="100px"
               ref="form"
               :model="formData">
        <el-form-item :label="$t(`login.account`)"
                      :rules="{  required: true, message: $t(`login.account_error`), trigger: 'blur'}"
                      prop="name">
          <el-input v-model="formData.name"
                    ref="accountBox"
                    @keyup.native.enter="loginBtn"
                    :placeholder="$t(`login.account_error`)"></el-input>
        </el-form-item>
        <el-form-item :label="$t(`login.password`)"
                      prop="pwd"
                      :rules="{  required: true, message: $t(`login.password_error`), trigger: 'blur'}">
          <el-input v-model="formData.pwd"
                    @keyup.native.enter="loginBtn"
                    type="password"
                    :placeholder="$t(`login.password_error`)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     :loading="loading"
                     @click="loginBtn"
                     style="width:100%">{{$t(`login.login`)}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import * as api from '@/api/basePage/login.js'
export default {
  data () {
    return {
      formData: {
      },
      loading: false,
      i: 0,
    }
  },

  mounted () {
    this.$refs.accountBox.focus()
  },
  methods: {
    test () {
      this.i++
      if (this.i % 2 === 1) {
        this.$i18n.locale = 'ja'
      } else {
        this.$i18n.locale = 'zn'
      }
    },
    loginBtn () {
      this.$refs.form.validate(v => {
        if (v) {
          this.loading = true
          api.loginIn().then(res => {
            console.log(res);


          }).finally(() => {
            this.$message.success('登录成功')
            this.$router.push({
              name: 'baseMain',
              path: '/baseMain'
            })
            this.loading = false
          })
        }
      })

    }
  }

}
</script>

<style lang="scss" scoped>
.loginWrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #1a2939;
  .title {
    text-indent: 100px;
    text-align: center;
    font-size: 20px;
    line-height: 30px;
    color: rgb(231, 231, 231);
    margin-bottom: 10px;
  }
  .loginBox {
    width: 30vw;
    min-width: 400px;
    max-width: 480px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /deep/ .el-form-item__label {
      color: #fff;
    }
  }
}
</style>