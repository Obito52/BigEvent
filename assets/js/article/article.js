$(function () {
    const {form }=layui  
//定义弹出层索引
    let index
    //1.从服务器获取文章列表数据，并渲染到页面
    getCateList()
    function getCateList() {
        axios.get(`/my/article/cates`).then(res => {
            console.log(res);
            //1.2发送请求
            if (res.status !== 0) {
                return layer.msg('请求失败')
            }
            //1.3请求成功
            //1.4使用模板引擎渲染页面，1.引入插件2.准备模板 3.调用模板
            const htmIStr = template('tpl', res)
            // console.log(htmIStr);

            //1.5把字符串渲染到tbody主表格中
            $('tbody').html(htmIStr)
        })
    }
    //2.点击添加
    $('.add-btn').click(function () {
       index= layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('.add-form-container').html(),
            area: ['500px', '300px']
        });
        
    })
    //3.监听添加表单的提交事件
    //坑：注意这个表单点击之后再添加的，后创建的元素绑定统一使用事件委托
    $(document).on('submit', '.add-form', function (e) {

        e.preventDefault()

        //3.1发送请求，把表单数据提交到服务器
        axios.post(`/my/article/addcates`, $(this).serialize()).then(res => {
            console.log(res);
        //判断失败
            if (res.status !== 0) {
                return layer.msg('提交失败')
            }
         //3.3成功
            layer.close(index)
            //3.4更新外层分类表格数据，重新调用渲染
            getCateList()
        })
    })
    $(document).on('click', '.edit-btn', function () {
        
            // console.log(123);
            index = layer.open({
                type: 1,
                title: '修改文章分类',
                content: $('.edit-form-container').html(),
                area: ['500px', '300px']
            })
            // //4.2获取自定义属性的值
            console.log($(this).data('id'));
            const id = $(this).data('id')
            
            //4.1发送请求到服务器
            axios.get(`/my/article/cates/${id}`).then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                //4.4对编辑表单进行赋值
                form.val('edit-form',res.data)
            })
        })
    //5.监听编辑的表单
    $(document).on('submit', '.edit-form', function (e) {
            e.preventDefault()

            axios.post('/my/article/updatecate', $(this).serialize()).then(res => {
                console.log(res);
                
                //5.2更新失败
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                    
                }
                 //3.3成功
        layer.close(index)
        //3.4更新外层分类表格数据，重新调用渲染
        getCateList()
          })
    })
    $(document).on('click', '.del-btn', function (e) {
        e.preventDefault()
        const id = $(this).data('id')
        axios.get(`/my/article/deletecate/${id}`).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败')
            }
            getCateList()
})

    })
})