const Generator = require("yeoman-generator")

module.exports = class extends Generator {
    prompting() {
        return this.prompt([{
            type: "input",
            name: "name",
            message: "Your project name",
            default: this.appname
        }]).then(projName => {
            this.projName = projName
        })
    }
    writing() {
        let templates = [

            ".browserslistrc",
            ".env",
            ".env.development",
            ".env.production",
            ".eslintrc.js",
            ".gitignore",
            ".jshintrc",
            "babel.config.js",
            "jsconfig.json",
            "package.json",
            "package-lock.json",
            "README.md",
            "vue.config.js",
            "yarn.lock",
            "public/favicon.png",
            "public/index.html",
            "src/api/basePage/login.js",
            "src/assets/logo.png",
            "src/common/css/element/index.scss",

            "src/common/css/element/el-input.scss",
            "src/common/css/element/el-dialog.scss",
            "src/common/css/element/el-message.scss",
            "src/common/css/element/el-radio.scss",
            "src/common/css/element/el-table.scss",
            "src/common/css/element/el.button.scss",
            "src/common/css/global.scss",
            "src/components/ElLoadingButton/ElLoadingButton.vue",
            "src/components/ElLoadingButton/readme.md",
            "src/components/SvgIcon/index.vue",
            "src/icons/svg/404.svg",
            "src/icons/svg/craft.svg",
            "src/icons/svg/line.svg",
            "src/icons/svg/print.svg",
            "src/icons/svg/sign-on.svg",
            "src/icons/svg/standard-craft.svg",
            "src/icons/svg/work-number.svg",
            "src/icons/svg/work-steps.svg",
            "src/icons/index.js",
            "src/icons/svgo.yml",
            "src/lang/login/loginEn.js",
            "src/lang/login/loginZn.js",
            "src/lang/index.js",
            "src/plugins/el-bigdata-table/src/style.css",
            "src/plugins/el-bigdata-table/src/table-body.extend.js",
            "src/plugins/el-bigdata-table/src/table.mixins.js",
            "src/plugins/el-bigdata-table/src/virtual-table-body-render.js",
            "src/plugins/el-bigdata-table/index.js",
            "src/plugins/el-bigdata-table/package.json",
            "src/plugins/el-bigdata-table/README.md",
            "src/plugins/font-awesome-4.7.0/css/font-awesome.css",
            "src/plugins/font-awesome-4.7.0/css/font-awesome.min.css",
            "src/plugins/font-awesome-4.7.0/fonts/fontawesome-webfont.eot",
            "src/plugins/font-awesome-4.7.0/fonts/fontawesome-webfont.svg",
            "src/plugins/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf",
            "src/plugins/font-awesome-4.7.0/fonts/fontawesome-webfont.woff",
            "src/plugins/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2",
            "src/plugins/font-awesome-4.7.0/fonts/FontAwesome.otf",
            "src/plugins/font-awesome-4.7.0/less/animated.less",
            "src/plugins/font-awesome-4.7.0/less/bordered-pulled.less",
            "src/plugins/font-awesome-4.7.0/less/core.less",
            "src/plugins/font-awesome-4.7.0/less/fixed-width.less",
            "src/plugins/font-awesome-4.7.0/less/font-awesome.less",
            "src/plugins/font-awesome-4.7.0/less/larger.less",
            "src/plugins/font-awesome-4.7.0/less/list.less",
            "src/plugins/font-awesome-4.7.0/less/mixins.less",
            "src/plugins/font-awesome-4.7.0/less/path.less",
            "src/plugins/font-awesome-4.7.0/less/rotated-flipped.less",
            "src/plugins/font-awesome-4.7.0/less/screen-reader.less",
            "src/plugins/font-awesome-4.7.0/less/stacked.less",
            "src/plugins/font-awesome-4.7.0/less/variables.less",
            "src/plugins/font-awesome-4.7.0/scss/_animated.scss",
            "src/plugins/font-awesome-4.7.0/scss/_bordered-pulled.scss",
            "src/plugins/font-awesome-4.7.0/scss/_core.scss",
            "src/plugins/font-awesome-4.7.0/scss/_fixed-width.scss",
            "src/plugins/font-awesome-4.7.0/scss/_icons.scss",
            "src/plugins/font-awesome-4.7.0/scss/_larger.scss",
            "src/plugins/font-awesome-4.7.0/scss/_list.scss",
            "src/plugins/font-awesome-4.7.0/scss/_mixins.scss",
            "src/plugins/font-awesome-4.7.0/scss/_path.scss",
            "src/plugins/font-awesome-4.7.0/scss/_rotated-flipped.scss",
            "src/plugins/font-awesome-4.7.0/scss/_screen-reader.scss",
            "src/plugins/font-awesome-4.7.0/scss/_stacked.scss",
            "src/plugins/font-awesome-4.7.0/scss/_variables.scss",
            "src/plugins/font-awesome-4.7.0/scss/font-awesome.scss",
            "src/plugins/font-awesome-4.7.0/HELP-US-OUT.txt",
            "src/router/baseRouter.js",
            "src/router/dynamicRouter.js",
            "src/router/index.js",
            "src/router/routerGuard.js",
            "src/store/modules/baseMain.js",
            "src/store/index.js",
            "src/utils/dragDialog.js",
            "src/utils/filter.js",
            "src/utils/request.js",
            "src/views/basePage/components/MenuBox.vue",
            "src/views/basePage/components/MenuContent.vue",
            "src/views/basePage/baseMain.vue",
            "src/views/basePage/login.vue",
            "src/views/basePage/notFoundPage.vue",
            "src/views/basePage/welcome.vue",
            "src/App.vue",
            "src/index.js",
            "src/main.js",
























        ]
        console.log(this.projName,);
        templates.forEach(item => {
            this.fs.copyTpl(this.templatePath(item), this.destinationPath(item), { name: this.projName.name })
        })
    }
}