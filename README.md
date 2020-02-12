## 开发说明

- 项目开发框架使用的是[ant design pro](https://pro.ant.design/)，ant design pro 是蚂蚁前端的中台前端解决方案，其内部使用的是 umi、ant-design 以及 dva
- 与后端交互：在`src/services`文件夹中按领域模型对 api 进行划分，
- 状态管理：使用的是 dva 进行数据管理，同时按领域模型对数据进行划分，文件存放在`src/models`中

## TODO

- src/pages/System/operator/index.tsx 组件在初始化时会被渲染**两次**，确认是否是由于 PageHeaderWrapper 导致的，一般应该是被渲染**一次**
