# nathan
git init

git add README.md

git commit -m"首次提交"

git remote add origin https://github.com/icxcczed/nathan.git

git push -u origin master 


# git
- 克隆代码

  git clone 仓库地址

- 添加代码到暂存区 (临时区域)

  git add 文件路径 (指定文件提交)
  git add . (全部文件提交)

- 添加备注 (将暂存区的内容添加到本地仓库)

  git commit -m "feat:登录页面制作完成"
  git commit -m "fix:登录页面修复"
  git commit -m "css:登录页面样式修改"

- 检测 git 当前状态

  git status

- 推送到远程仓库 (线上仓库)

  git push

- 更新远程分支信息

  git fetch origin

- 查看本地分支

  git branch (查看本地分支)
  git branch -a (查看所有分支, 本地和线上)
  git branch -r (查看远程分支, 线上)

- 创建本地分支

  git branch 分支名 (xxx/功能)

- 切换分支 (自动检测本地和远程分支)

  git checkout 分支名

- 创建并切换分支

  git checkout -b 分支名

- 拉取代码 (有可能某个提前提交最新代码)

  git pull

- 合并代码 (更新功能)

  git merge 将要合并的分支名

- 解决合并冲突问题

```txt
(1) 先到本地检测冲突的内容, 切换到合并的文件 pull 最新代;
(2) 编辑有冲突文件, 根据需求保留当前或者是传入的代码
(3) git三步流程
```

- git 合并冲突

```txt
(1) 多个分支合并到一个分支中, 两个分支修改了同一个文件, 不管修改什么地方都会冲突;
(2) 多个分支修改了同一个文件名的时候
```

- git 版本回退

```txt
(1) 查看commit提交日志, git log, 找到对应的commit 哈希版本号, 使用wq退出日志
(2) git log --oneline 简版日志信息
(3) 指定版本回退 git reset --hard 目标哈希版本号
(4) git push -f 强制推送 (因为使用git push当前本地版本比远程的仓库要旧, 报错提示会让你pull)
```

- git stash

