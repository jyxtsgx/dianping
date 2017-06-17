# dianping

### API

**商户类型**

- 获取
    - url : /admin/shoptype
    - method : get/post

- 添加
    - url : /admin/shoptype/add
    - method : post
    - parmas
        - name : 要添加的商户类型名称（必传）

- 编辑
    - url : /admin/shoptype/edit
    - method : post
    - parmas
        - id : 要修改商户类型的id（必传）
        - name : 新的商户类型的名称（必传）

- 删除
    - url : /admin/shoptype/delete
    - method : get/post
    - parmas
        - id : 要删除的id（必传），支持批量删除，多个id之间使用英文半角逗号分隔
