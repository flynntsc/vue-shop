```
{
    "hot-pros": {
        "EXPLAIN": "首页热销产品",
        "ARGUMENT":"销售量（sort=0）",
        "res": 200,
        "rows": [{
            "image": "http://temp.im/100",
            "name": "叶文产品名称",
            "price": 3439
        }]
    }
}
```

- hot-pros

接口url请求地址，并统一加前缀 `/app/`

请求参数个数统一使用?number=个数

```
// 例子
$.ajax({
    url: '/app/hot-pros?number=12&sort=0',
})
```

- EXPLAIN

纯属说明解释作用，接口无需添加

- ARGUMENT

参数说明

- res

返回状态，如200、500

- rows

具体数据

***

- [首页](http://10.1.6.80:8088/hczd-club/app/shopping/index.htm)
- [主页新品](http://10.1.6.80:8088/hczd-club/app/shopping/new_products.htm)
- [商品搜索关键词](http://10.1.6.80:8088/hczd-club/app/shopping/productKeySearch.htm) ?keyWords=
- [店铺搜索关键词](http://10.1.6.80:8088/hczd-club/app/shopping/storeKeySearch.htm)?keyWords=
- [店铺页面](http://10.1.6.80:8088/hczd-club/app/shopping/storeList.htm)?keyWords=
