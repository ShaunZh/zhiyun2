## 开发说明

- 项目开发框架使用的是[ant design pro](https://pro.ant.design/)，ant design pro 是蚂蚁前端的中台前端解决方案，其内部使用的是 umi、ant-design 以及 dva
- 与后端交互：在`src/services`文件夹中按领域模型对 api 进行划分，
- 状态管理：使用的是 dva 进行数据管理，同时按领域模型对数据进行划分，文件存放在`src/models`中
- 页面相关的请求可以直接放到页面下，保证其相关性，避免频繁切换文件夹

## 注意事项

- setState 是异步更新，不是同步
- 尽量不要在 setState 中添加**回调函数**，回调函数会在 state 更新后被调用，这样破坏了 react 中对于 setState 的处理（也就是收集多次 setState 的值进行一次更新），同时，有可能导致页面出现多次渲染，在 pages/System/operator/index.tsx 中的 fetchList 有此场景，是当查询参数改变时需要调用 fetchList，没有直接通过 setState 设置查询参数并在回调函数中调用 fetchList，而是将查询参数传入 fetchList，在 fetchList 中在设置查询参数到 state 上。PS：`因为react的diff算法，应该考虑我们这样处理是否有必要？主要确认如果state中某个字段更新了，是否整个dom结点进行渲染？还是只更新依赖于该字段的dom结点？`
- 在该工程中，使用到了**国际化**，需要注意的是：在为英文设置对应的中文时（在 locales/zh-CN 文件夹下）值不能相同，例如：在 locales/zh-CN/menu.ts 中，如果设置 `{'menu.course': '课程管理','menu.course.index': '课程管理'}`则会出现报错: `Warning: Encountered two children with the same key,`，该错误非常难排查，需**特别注意**。因为在课程管理菜单中，子菜单与父菜单的名称都是课程管理，此处需要都设置为`课程管理`,为防止报错，可以在其中一个后面添加空格以示区别
- 在 data.d.ts 文件中使用`export enum` 导出`enum`声明，然后在其他文件中`import`后使用`enum`时出现报错，错误是 ts-loader 报出来的，**将 enum 从 data.d.ts 中删除** 或者 **在其他文件中不适用 enum 中定义的字段** ，则错误消失，暂时不确定是什么原因导致，具体代码如下：

  ```js
     // data.d.ts
     export enum ETableType {
      masterAdmin = '0', // 总管理
      admin = '1',
      teacher = '2',
      student = '3', // 学员
      courseware = '4', // 课件
      discuss = '5', // 提问与讨论
    }

    // liveBlock.tsx
    import {ETableType} from '../data.d.ts'
    // .......
    const [type, setType] = useState<ETableType>(ETableType.masterAdmin); // 将此处的ETableType.masterAdmin删除后错误消失
    // .......
  ```

  有可能是 typescript 对于 enum 的处理方式有关，typescript 将`export enum ETableType{...}`转换为如下 js 格式：

  ```js
  export var ETableType;
  (function(ETableType) {
    ETableType['masterAdmin'] = '0';
    ETableType['admin'] = '1';
    ETableType['teacher'] = '2';
    ETableType['student'] = '3';
    ETableType['courseware'] = '4';
    ETableType['discuss'] = '5';
  })(ETableType || (ETableType = {}));
  ```

  而对于`export interface ...`的处理则完全不同，在[typescript playground](http://www.typescriptlang.org/play/index.html)中，无法查看到对`export interface ...`转换为 js 后的代码，因此，判断是否跟 typescript 的处理方式有关

## TODO

- src/pages/system/operator/index.tsx 组件在初始化时会被渲染**两次**，确认是否是由于 PageHeaderWrapper 导致的，一般应该是被渲染**一次**
- 该框架中引入了 moment.js，该包体积超过 200KB，即使 gzip 后也达到了 60KB，尝试使用其他方式实现，将其从项目中移除
- 确认在函数组件中，使用 useState 定义一个对象数组`const [list, setList] = useState<Array<ITableColumn>>([])`，当使用直接更新对象数组中的某个元素对象的属性，如`list[0].name='update name'; setList(list)`时，实际接收 list 的组件并未重新渲染，但是通过`setList([...list])`时，组价会重新渲染， 确认这种操作是否有性能问题
