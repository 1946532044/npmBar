<template>
  <div class="baseMain">

    <div class="baseMainLeftBox"
         :style="menuIsFold?` `:`width:20px`">
      <div :class="{leftBoxContent:true,menuIsFold:!menuIsFold}">
        <div class="userInfoBox">
          <div class="userContent">
            <div class="userInfoAndExit">
              <span>超级管理员</span>
            </div>
            <div class="currentTimeBox">
              {{currentDateTime}}

            </div>

          </div>
          <div class="taskAndLine">
            <div class="tagetBox">
              <i class="fa fa-tasks"></i>
              <span>我的任务&emsp;</span>
            </div>
            <div class="tagetBox">
              <i class="fa fa-line-chart"></i>
              <span>我的流程&emsp;</span>

            </div>
            <div class="tagetBox">
              <i class="fa fa-window-restore"></i>
              <span>已处理任务</span>
            </div>

          </div>

        </div>
        <div class="menuBoxWrap">
          <MenuBox />
        </div>
      </div>
      <div class="foldMenuAside">
        <div>
          <i class="el-icon-s-unfold"
             @click="$store.commit('baseMain/SET_MENU_IS_FOLF',!menuIsFold)"></i>
        </div>
        <div>
          <i class="el-icon-switch-button"
             @click="exitBtn"></i>
        </div>

      </div>

    </div>

    <div class="baseMainRightBox">
      <div class="baseMainRightBoxTop">
        <div>
          <el-tag v-for="(bread,index) in breadNavigation"
                  :class="{isActive:bread.path === $route.path}"
                  @click="$router.push({path:bread.path})"
                  :key="index">
            <span>{{bread.name}}</span>
            <i class="el-icon-close"
               @click.stop="deleteCurrentBread(bread)"></i>
          </el-tag>
        </div>

      </div>
      <div class="baseMainContentBox">
        <router-view class="router-view"></router-view>
      </div>
    </div>

  </div>

</template>

<script>
import dynamicRouter from '@/router/dynamicRouter.js'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      currentDateTime: '',
      currentTimeId: null,
    }
  },
  created () {
    this.currentTimeInit()
    this.menuInit()
  },
  methods: {
    // 删除导航条逻辑处理
    deleteCurrentBread (bread) {
      if (bread.path === '/welcome' && this.breadNavigation.length === 1) return
      let breadPosition = this.breadNavigation.findIndex(v => v.path === bread.path)
      if (breadPosition === 0) {
        if (this.breadNavigation.length === 1) {
          this.$router.push({ path: 'welcome' })
        } else {
          if (this.$route.path === bread.path) {
            this.$router.push(this.breadNavigation[1])
          }
        }
      } else {
        // 选中
        if (this.$route.path === bread.path) {
          if (this.breadNavigation.length - 1 === breadPosition) {
            this.$router.push(this.breadNavigation[breadPosition - 1])
          } else {
            this.$router.push(this.breadNavigation[breadPosition + 1])
          }
        }
      }
      this.$store.commit('baseMain/SET_BREAD_NAVIGATION', this.breadNavigation.filter(v => v.path !== bread.path))
    },
    currentTimeInit () {
      clearInterval(this.currentTimeId)
      this.currentDateTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
      this.currentTimeId = setInterval(() => {
        this.currentDateTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')

      }, 1000);
    },
    menuInit () {
      this.$store.commit('baseMain/SET_MENU_ARR', [...dynamicRouter])
    },
    exitBtn () {
      this.$confirm('即将退出该操作系统，是否确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        this.$router.push({ path: '/' })
        window.sessionStorage.clear()
        this.$store.commit('baseMain/SET_BREAD_NAVIGATION', [])
      }).catch(() => {
      });
    }
  },
  components: {
    MenuBox: () => import('./components/MenuBox')
  },
  computed: {
    ...mapState('baseMain', ['breadNavigation', 'menuIsFold'])
  },
  watch: {
    $route: {
      handler (val) {
        if (!this.breadNavigation.some(v => v.name === val.name && v.path === val.path)) {
          let newBreadArr = [...this.breadNavigation]
          if (newBreadArr.length > 4) {
            newBreadArr.splice(0, 1)
          }
          this.$store.commit('baseMain/SET_BREAD_NAVIGATION', [...newBreadArr, { name: val.name, path: val.path }])
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.baseMain {
  display: flex;
  height: 100vh;
  overflow: hidden;
  .baseMainLeftBox {
    display: flex;
    background: #28323b;
    transition: all 0.8s;
    .leftBoxContent {
      background: #28323b;
      height: 100%;
      box-sizing: border-box;
      transition: all 0.8s;
      transform-origin: 0 0;
      width: 220px;

      &.menuIsFold {
        transform: rotateY(90deg);
        width: 0;
      }
      .userInfoBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        box-sizing: border-box;
        padding-top: 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.26);
        .userContent {
          color: rgb(238, 237, 237);
          text-align: center;
          .userInfoAndExit {
          }
          .currentTimeBox {
            font-size: 12px;
            line-height: 30px;
          }
        }
        .taskAndLine {
          text-align: center;
          line-height: 40px;
          width: 100%;
          color: #fff;
          .tagetBox {
            cursor: pointer;
            transition: all 0.3s;
            font-size: 14px;
            i {
              margin-right: 4px;
            }
            &:hover {
              background: #20282f;
              color: rgb(255, 208, 75);
            }
          }
        }
      }

      .menuBoxWrap {
        height: calc(100% - 200px);
        overflow: hidden;
      }
    }
    .foldMenuAside {
      box-sizing: border-box;
      width: 20px;
      height: 100%;
      background: #28323b;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4px;
      i {
        font-size: 18px;
        cursor: pointer;
        margin-bottom: 4px;
        color: #fff;
        &:hover {
          color: red;
          transition: color 0.5s;
        }
      }
    }
  }
  .baseMainRightBox {
    flex: 1;
    transition: all 0.8s;

    height: 100%;
    overflow: hidden;
    .baseMainRightBoxTop {
      height: 50px;
      background: #28323b;

      box-shadow: 0 2px 4px rgb(165, 165, 165);
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 4px;
      .el-tag {
        border-radius: 0;
        cursor: pointer;
        display: inline-block;
        padding-left: 10px;
        background: #28323b;
        border: 1px solid #ccc;
        padding-right: 10px;
        text-align: center;
        margin-right: 2px;
        transition: all 0.4s;
        color: #ccc;
        &.isActive {
          background: #28323b;
          border-color: #409eff;
          color: #409eff;
        }
        .el-icon-close:hover {
          transition: transform 0.3s;
          transform: scale(1.4);
        }
      }
    }
    .baseMainContentBox {
      box-sizing: border-box;
      height: calc(100% - 50px);
      overflow: hidden;
      .router-view {
        padding: 8px;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
      }
    }
  }
}
</style>