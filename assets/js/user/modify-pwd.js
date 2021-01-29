// 修改密码模块
$(function () {
    const  {form,layer } =layui

//1.表单验证
form.verify({
    pass: [
        /^\w{6,12}$/,
        '密码只能6到12位之间'
    ],
    confirmPass: function (value) {
        //value表示表单值
        if (value !== $('#pass').val()) {
            return '两次输入密码不一致'
        }
    }
})
     //3.提交修改
    $('.base-info-form').submit(function (e) {
        e.preventDefault()

         //发送ajax
         axios.post('/my/updatepwd', $(this).serialize())
         .then(res => {
             console.log(res);
             //校验失败
             if (res.status !== 0) {
                 return layer.msg('提交失败')
             }
             //成功提示
             layer.msg('成功')

     })
 })

    
    
    

    


    
})