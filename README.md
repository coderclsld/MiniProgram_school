### school-小程序端

#### 介绍

这是我和我的三个小伙伴一起做的一个项目校园社交平台的小程序端代码，

校园社交平台是一个可以发表问题、回答问题、对回答进行评论，对每个回答、每个问题、每个评论都精确到用户的个人信息的社区，

通过每一个设定的入口链接到每个用户的个人信息页面，可对每个用户的回答问题情况、发表问题情况进行查看，

对每个用户进行一对一的即时聊天，实现社区模式+聊天应用模式的完美结合。

![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/090310_5e52878d_5688172.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/090317_93a2d621_5688172.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/090332_818820b0_5688172.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/090339_757c0e4d_5688172.png "屏幕截图.png")

![输入图片说明](https://images.gitee.com/uploads/images/2021/0706/090404_edf17acb_5688172.png "屏幕截图.png")

#### 软件架构

使用多个组件递归的方式实现评论的渲染，

利用微信小程序对websocket连接的支持实现了一套小程序运行期间对会话进行创建、销毁的方案，

实现对基于Vue的viewUI库进行改造后嵌入原生微信小程序，

对聊天信息和用户信息进行本地缓存实现聊天记录的缓存。

后端仓库连接：https://gitee.com/clsld/school-back-end/edit/
