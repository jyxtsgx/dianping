# dianping

### API

**商户类型**

- 获取
    - url : /admin/shoptype
    - method : get/post
    - return :
        - _id : 商户类型ID
        - name : 商户类型名称

- 添加
    - url : /admin/shoptype/add
    - method : post
    - params :
        - name : 要添加的商户类型名称（必传）
    - return :
        - 失败 :
            1 : 请输入商户类型名称
            2 : 添加失败 - 已经存在该分类了
            3 : 添加失败
        - 成功 : (返回添加后的数据)
            - _id : 商户类型ID
            - name : 商户类型名称

- 编辑
    - url : /admin/shoptype/edit
    - method : post
    - params :
        - id : 要修改商户类型的id（必传）
        - name : 新的商户类型的名称（必传）
    - return :
        - 失败 :
            1 : 要修改的商户类型名称不能为空
            2 : 已经存在相同名称的商户类型了
            3 : 要修改的商户类型不存在
        - 成功 : (返回修改后的数据)
            - _id : 商户类型ID
            - name : 商户类型名称

- 删除
    - url : /admin/shoptype/delete
    - method : get/post
    - params :
        - id : 要删除的id（必传），支持批量删除，多个id之间使用英文半角逗号分隔
    - return :
        - 失败 :
            1 : 请传入ID
            2 : 删除失败，没有删除任何数据
        - 成功 : (返回删除后的数据条数)
            - deletedCount : 删除后的数据条数


**商户**

- 获取
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

- 添加
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
            1 : 商家名称或类型不能为空
            2 : 不存在的商家类型
            3 : 添加失败
        - 成功 : (返回添加后的数据)
            - _id : 商户ID
            - name : 商户名称
            - cover : 商家头图
            - type : 商户类型ID
            - phone : 商户电话
            - address : 商户地址
            - description : 商户简介

- 编辑
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
            1 : 商家名称或类型不能为空
            2 : 商家不存在
            3 : 更新失败
        - 成功 : (返回修改后的数据)
            - _id : 商户ID
            - name : 商户名称
            - cover : 商家头图
            - type : 商户类型ID
            - phone : 商户电话
            - address : 商户地址
            - description : 商户简介

- 删除
    - url : /admin/shop/delete
    - method : get/post
    - params :
        - id : 要删除的id（必传），支持批量删除，多个id之间使用英文半角逗号分隔
    - return :
        - 失败 :
            1 : 请传入ID
            2 : 删除失败，没有删除任何数据
        - 成功 : (返回删除后的数据条数)
            - deletedCount : 删除后的数据条数

- 上传封面
    - url : /admin/shop/cover
    - method : post
    - params :
        - id : 商户ID
        - cover : 要上传的图片
    - return :
        - 失败：
            1 : 商家不存在
            2 : 上传失败
            3 : 上传成功，但是更新数据失败了
        - 成功 : 返回上传封面的商家信息
            - _id : 商户ID
            - name : 商户名称
            - cover : 商家头图
            - type : 商户类型ID
            - phone : 商户电话
            - address : 商户地址
            - description : 商户简介
