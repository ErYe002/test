# Kede.Minprogram

可得小程序，完整版，包含 APP、M站所有功能

## 运行方式

```
# 安装依赖
npm i

# 运行项目
npm run dev
```
> 运行之后可以看到根目录多了一个`dist`文件夹，里面还有一个`wx`子文件夹

**打开微信开发者工具，选择项目根目录，非`dist目录`，导入项目即可**

## 注意事项

1. 新增的页面需要重新`npm run dev`来进行编译
2. 组件的html修改需要重新`npm run dev`来进行编辑

## 所用框架：mpvue，用到的比较重要的组件包：vuex
1. [查看vue使用文档](https://cn.vuejs.org/index.html)
2. [查看mpvue使用文档](http://mpvue.com/mpvue/quickstart.html)
3. [查看vuex使用文档](https://vuex.vuejs.org/)