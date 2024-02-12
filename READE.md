这是一个web前端开发的项目规范
<!-- 如何启动项目的简介 README.md -->

<!-- 初始化项目配置(步骤) -->

1. src文件夹，主要存在当前项目的源码(未压缩，未打包)
2. dist文件夹，主要是打包之后出现的
3. README.md文件，开发者自己去写启动项目的简介;
4. 初始化当前项目的git仓库配置 git init
5. 关联远程仓库  git remote add origin xxx
6. .gitignore文件,功能是排除上传仓库文件
7. npm init 初始化npm配置文件(记录node依赖文件)
8. npm install eslint -D (安装eslint工具)
9. npm init @eslint/config 手动执行eslint配置
10. 检测eslint是否生效，eslint xx.js
11. npm install prettier -D (安装prettier工具)
12. 检测prettier是否生效 npx prettier --write src/.
13. 手动添加 .prettierrc.json设置配置
14. eslint prettier 配置相互兼容,安装一下2个插件
```js
// 关闭所有可能干扰Perttier的ESlint规则
eslint-config-prettier
//将Prettier规则转换为ESlint的规则
eslint-plugin-prettier
```

15. 配合git hooks 去限制提交规范(代码规范、commit规范),husky工具
16. pnpm install @commitlint/cli @commitlint/config-conventional -D 限制提交格式(commit)