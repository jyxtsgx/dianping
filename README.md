# API

## 前台

### 用户

- **注册**

- url : /user/reg
- method : post
- params :
    - username : 要注册的用户名（必传，3-20个字符之间）
    - password : 要注册的密码（必传，不少于3个字符）
    - repassword : 重复密码（必传，需要和password一致）
- return :
    - 失败 :
        - 1 : 用户在3到20个字符之间
        - 2 : 密码长度不能小于3个字符
        - 3 : 两次输入密码不一致
        - 4 : 用户名已经被注册了
        - 5 : 注册失败
        - 100 : 你已经登录了，请先退出
    - 成功 :  (注册的用户信息)
        - _id : 用户注册的id
        - username : 用户名
        - 同时会发送cookie : userinfo，包含 _id和username的JSON字符串

- **登录**

- url : /user/login
- method : post
- params :
    - username : 要注册的用户名（必传，3-20个字符之间）
    - password : 要注册的密码（必传，不少于3个字符）
- return :
    - 失败 :
        - 1 : 用户不存在
        - 2 : 密码不正确
        - 100 : 你已经登录了，请先退出
    - 成功 :  (登录的用户信息)
        - _id : 用户注册的id
        - username : 用户名
        - 同时会发送cookie : userinfo，包含 _id和username的JSON字符串

- **退出**

- url : /user/login
- method : get/post
- return :
    - 失败 :
        - 10 : 你还没有登录
    - 成功 :  (当前退出登录的用户信息)
        - _id : 用户注册的id
        - username : 用户名
        - 同时会清空cookie

- **上传用户头像**

- url : /user/avatar
- method : post
- params :
    - avatar : 要上传的图片
- return :
    - 失败 :
        - 1 : 用户不存在
        - 2 : 上传失败
        - 3 : 上传成功，但是更新数据失败了
        - 10 : 你还没有登录
    - 成功 :  (当前退出登录的用户信息)
        - _id : 用户注册的id
        - username : 用户名
        - 同时会清空cookie

## 后台

### 商户类型

- **获取**
    - url : /admin/shoptype
    - method : get/post
    - return :
        - _id : 商户类型ID
        - name : 商户类型名称

- **添加**
    - url : /admin/shoptype/add
    - method : post
    - params :
        - name : 要添加的商户类型名称（必传）
    - return :
        - 失败 :
            - 1 : 请输入商户类型名称
            - 2 : 添加失败 - 已经存在该分类了
            - 3 : 添加失败
        - 成功 : (返回添加后的数据)
            - _id : 商户类型ID
            - name : 商户类型名称

- **编辑**
    - url : /admin/shoptype/edit
    - method : post
    - params :
        - id : 要修改商户类型的id（必传）
        - name : 新的商户类型的名称（必传）
    - return :
        - 失败 :
            - 1 : 要修改的商户类型名称不能为空
            - 2 : 已经存在相同名称的商户类型了
            - 3 : 要修改的商户类型不存在
        - 成功 : (返回修改后的数据)
            - _id : 商户类型ID
            - name : 商户类型名称

- **删除**
    - url : /admin/shoptype/delete
    - method : get/post
    - params :
        - id : 要删除的id（必传），支持批量删除，多个id之间使用英文半角逗号分隔
    - return :
        - 失败 :
            - 1 : 请传入ID
            - 2 : 删除失败，没有删除任何数据
        - 成功 : (返回删除后的数据条数)
            - deletedCount : 删除后的数据条数


### 商户

- **获取**
    - url : /admin/shop
    - method : get/post
    - return : Array
        - _id : 商户ID
        - name : 商户名称
        - cover : 商家头图
        - type :
            - _id : 类型ID
            - name : 商家类型名称
        - phone : 商户电话
        - address : 商户地址
        - description : 商户简介

- **添加**
    - url : /admin/shop/add
    - method : post
    - params :
        - name : 商户名称（必传）
        - type : 商户类型ID（必传）
        - phone : 商户电话
        - address : 商户地址
        - description : 商户简介
    - return :
        - 失败 :
            - 1 : 商家名称或类型不能为空
            - 2 : 不存在的商家类型
            - 3 : 添加失败
        - 成功 : (返回添加后的数据)
            - _id : 商户ID
            - name : 商户名称
            - cover : 商家头图
            - type : 商户类型ID
            - phone : 商户电话
            - address : 商户地址
            - description : 商户简介
            - gallery : 相册

- **编辑**
    - url : /admin/shop/edit
    - method : post
    - params :
        - _id : 商家ID（必传）
        - name : 商户名称（必传）
        - type : 商户类型ID（必传）
        - phone : 商户电话
        - address : 商户地址
        - description : 商户简介
    - return :
        - 失败 :
            - 1 : 商家名称或类型不能为空
            - 2 : 商家不存在
            - 3 : 更新失败
        - 成功 : (返回修改后的数据)
            - _id : 商户ID
            - name : 商户名称
            - cover : 商家头图
            - type : 商户类型ID
            - phone : 商户电话
            - address : 商户地址
            - description : 商户简介
            - gallery : 相册

- **删除**
    - url : /admin/shop/delete
    - method : get/post
    - params :
        - id : 要删除的id（必传），支持批量删除，多个id之间使用英文半角逗号分隔
    - return :
        - 失败 :
            - 1 : 请传入ID
            - 2 : 删除失败，没有删除任何数据
        - 成功 : (返回删除后的数据条数)
            - deletedCount : 删除后的数据条数

- **上传封面**
    - url : /admin/shop/cover
    - method : post
    - params :
        - id : 商户ID
        - cover : 要上传的图片
    - return :
        - 失败：
            - 1 : 商家不存在
            - 2 : 上传失败
            - 3 : 上传成功，但是更新数据失败了
        - 成功 : 返回上传封面的商家信息
            - _id : 商户ID
            - name : 商户名称
            - cover : 商家头图
            - type : 商户类型ID
            - phone : 商户电话
            - address : 商户地址
            - description : 商户简介
            - gallery : 相册

- **商家相册上传**
    - url : /admin/shop/gallery
    - method : post
    - params :
        - id : 商户ID
        - description : 图片简介
        - pic : 要上传的图片
    - return :
        - 失败：
            - 1 : 商家不存在
            - 2 : 上传失败
            - 3 : 上传成功，但是更新数据失败了
        - 成功 : 返回上传封面的商家信息
            - _id : 商户ID
            - name : 商户名称
            - cover : 商家头图
            - type : 商户类型ID
            - phone : 商户电话
            - address : 商户地址
            - description : 商户简介
            - gallery : 相册

- **商家相册删除**
    - url : /admin/shop/gallery/delete
    - method : get/post
    - params :
        - id : 商户ID
        - gid : 要删除的图片index，多个index可以使用逗号分隔
    - return :
        - 失败：
            - 1 : 请传入商户ID
            - 2 : 不存在该商家信息
            - 3 : 删除失败
        - 成功 : 返回上传封面的商家信息
            - _id : 商户ID
            - name : 商户名称
            - cover : 商家头图
            - type : 商户类型ID
            - phone : 商户电话
            - address : 商户地址
            - description : 商户简介
            - gallery : 相册

### 商品

- **获取**
    - url : /admin/goods
    - method : get/post
    - return : Array
        - _id : 商品ID
        - name : 商品名称
        - shop :
            - _id : 商家ID
            - name : 商家名称
        - gallery: Array
            - _id : 图片ID
            - name : 图片名称
            - url : 图片URL
            - cover : 是否为封面

- **添加**
    - url : /admin/goods/add
    - method : post
    - params :
        - name : 商品名称（必传）
        - shop : 商品所属商家ID（必传）
    - return :
        - 失败 :
            - 1 : 商品名称或商家不能为空
            - 2 : 不存在的商家
            - 3 : 添加失败
        - 成功 : (返回添加后的数据)
            - _id : 商品ID
            - name : 商品名称
            - shop : 商品所属商家
            - cover : 封面

- **编辑**
    - url : /admin/goods/edit
    - method : post
    - params :
        - _id : 商品ID（必传）
        - name : 商品名称（必传）
        - shop : 商品所属商家ID（必传）
    - return :
        - 失败 :
            - 1 : 商品名称或商家不能为空
            - 2 : 指定商品不存在
            - 3 : 更新失败
        - 成功 : (返回修改后的数据)
            - _id : 商品ID
            - name : 商品名称
            - shop : 商品所属商家
            - cover : 封面

- **删除**
    - url : /admin/goods/delete
    - method : get/post
    - params :
        - id : 要删除的id（必传），支持批量删除，多个id之间使用英文半角逗号分隔
    - return :
        - 失败 :
            - 1 : 请传入ID
            - 2 : 删除失败，没有删除任何数据
        - 成功 : (返回删除后的数据条数)
            - deletedCount : 删除后的数据条数

- **上传封面**
    - url : /admin/goods/cover
    - method : post
    - params :
        - id : 商品ID
        - cover : 要上传的图片
    - return :
        - 失败：
            - 1 : 商品不存在
            - 2 : 上传失败
            - 3 : 上传成功，但是更新数据失败了
        - 成功 : 返回上传封面的商品信息
            - _id : 商品ID
            - name : 商品名称
            - cover : 商品封面地址
