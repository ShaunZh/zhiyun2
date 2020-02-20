## 开发说明

- 项目开发框架使用的是[ant design pro](https://pro.ant.design/)，ant design pro 是蚂蚁前端的中台前端解决方案，其内部使用的是 umi、ant-design 以及 dva
- 与后端交互：在`src/services`文件夹中按领域模型对 api 进行划分，
- 状态管理：使用的是 dva 进行数据管理，同时按领域模型对数据进行划分，文件存放在`src/models`中

## 注意事项

- setState 是异步更新，不是同步
- 尽量不要在 setState 中添加**回调函数**，回调函数会在 state 更新后被调用，这样破坏了 react 中对于 setState 的处理（也就是收集多次 setState 的值进行一次更新），同时，有可能导致页面出现多次渲染，在 pages/System/operator/index.tsx 中的 fetchList 有此场景，是当查询参数改变时需要调用 fetchList，没有直接通过 setState 设置查询参数并在回调函数中调用 fetchList，而是将查询参数传入 fetchList，在 fetchList 中在设置查询参数到 state 上。PS：`因为react的diff算法，应该考虑我们这样处理是否有必要？主要确认如果state中某个字段更新了，是否整个dom结点进行渲染？还是只更新依赖于该字段的dom结点？`
- 在该工程中，使用到了**国际化**，需要注意的是：在为英文设置对应的中文时（在 locales/zh-CN 文件夹下）值不能相同，例如：在 locales/zh-CN/menu.ts 中，如果设置 `{'menu.course': '课程管理','menu.course.index': '课程管理'}`则会出现报错: `Warning: Encountered two children with the same key,`，该错误非常难排查，需**特别注意**。因为在课程管理菜单中，子菜单与父菜单的名称都是课程管理，此处需要都设置为`课程管理`,为防止报错，可以在其中一个后面添加空格以示区别

## TODO

- src/pages/system/operator/index.tsx 组件在初始化时会被渲染**两次**，确认是否是由于 PageHeaderWrapper 导致的，一般应该是被渲染**一次**
