$(function () {
//从layui中提取form表单模块
    // var form = layui.form
    const { form, layer}= layui                                                                                                   

    //1.点击链接切换表单
    $('.link a').click(function () {
        $('.layui-form').toggle()
    })

    //2.校验表单项
    form.verify({
        pass: [
            / ^\w{6,12}$/,
            '密码只能6到12位之间'
        ],
        samePass: function (value) {
            //value表示表单值
            if (value !== $('#pass').value())
               { return '两次输入密码不一致'
            }
        }
    })
    //3.实现注册功能
    $('.reg-form').submit(function (e) {
        e.preventDefault()

        //发送ajax
        axios.post('/api/reguser', $(this).serialize())
            .then(res => {
                console.log(res);
                //校验失败
                if(res.status !==0) return layer.msg('注册失败')
            })
        //自动跳转
        layer.msg('注册成功!')
        $('.login-form a').click()
    })

})
//4.实现登录功能
$('.login-form').submit(function (e) {
    e.preventDefault()
    
    //发送  ajax
    axios.post('/api/login', $(this).serialize())
        .then(res => {
            console.log(res);
            //校验请求失败
            if (res.status!==0) return layer.msy('登陆失败')
      
            //登陆成功后 首先把token（个人身份凭证，令牌）保存本地存储
            localStorage.setItem('token', res.token)
            
            //提示登录成功
            layer.msg('登陆成功')

            //跳转
            location.href='#'
    })
})