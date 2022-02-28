# Website Collection
## Introduction
本项目是基于`nodejs`的网页收藏工具，前端使用`layui`框架，后端使用`koa2`框架，前端通过`ajax`向后端发起数据请求（GET/POST）。

## Usage
- 进入`models`目录：
  - 使用`node create_table.js`命令创建数据库和数据表（网站信息、子页面信息、网站分类信息、用户信息）；
  - 使用`node create_user_info.js username password`命令创建用户名和密码，注意将username和password替换为自己的用户名和密码即可；
- 进入项目根目录：
  - 使用`node app.js`运行项目
- 在浏览器端使用`http://ip:3000`访问项目主页


## Bug & Todo
- 表 website_info(website_title, website_url, website_class_1, website_class_2, website_detail) 和表 website_class_info(website_class_child, website_class_abbrativation, website_class_parent, website_class_detail) 设计错误，修改website_class_info的class字段不会影响website_info的class数据，
这导致对网站分类的修改删除对网站数据不能产生影响，因为分类数据在website_info中是早已写好的

