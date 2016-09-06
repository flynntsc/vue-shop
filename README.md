# Installation

nodejs 6.2.2+

```
npm i nodemon -g
```
```
npm i
```

# Tools

- [cmder](https://github.com/cmderdev/cmder) Win系统cmd工具推荐
- [Vuejs Snippets](https://packagecontrol.io/packages/Vuejs%20Snippets) vue语句片段
- [Vue Syntax Highlight](https://packagecontrol.io/packages/Vue%20Syntax%20Highlight) vue语法高亮


# Start

```
npm run mock
```

再新开个进程运行

```
npm run dev
```

运行完毕，访问[localhost:8080](localhost:8080)开始开发

# Documents

- [Vuejs官网](http://cn.vuejs.org/)
- [UI框架-Vux](https://github.com/airyland/vux)

# Regular

```
// css
.vux-* vux独有，
.v-* 每个view页面独有,仅限scoped下使用
.g-*、m-*、f-*等不受限制，可复用，但尽量少使用
```

# EXP

- API最初就该由前/后端任一方确定下来（偏向后端），以免由虚拟接口切到真实接口再次全面更改（80%不可用）
- 接口说明必须文档！！，至少规则要写下来，保证统一规则，出问题了方知谁出错，方便协作/妥协。
- 接口无用属性太多，极为不方便查找所需


# Pages

- 首页index：广告图、分类菜单及链接、猜你喜欢、所有产品的链接
- 商品搜索search：
