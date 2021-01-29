$(function () {

    const { form, layer } = layui
    
    //1.页面一加载就获取我们的用户信息
    function initUserInfo() {
        axios.get('/my/userinfo').then(res => {
            //校验获取失败
            if (res.status !== 0) {
                return layer.msg('请求失败')
            }
            //渲染信息
            console.log(res.data);
            const { data} =res
            //给表单赋值
            form.val ('edit-userinfo', data)
        })
    }
    initUserInfo()

//2.验证表单
    form.verify({
        nick: [
            /^\S{1,10}$/,
            '昵称长度必须在1-6之间'
        ]
    })

    //3.提交修改
    $('.base-info-form').submit(function (e) {
        e.preventDefault()

        //发送ajax
        axios.post('/my/userinfo', $(this).serialize())
            .then(res => {
                console.log(res);
                //校验失败
                if (res.status !== 0) {
                    return layer.msg('提交失败')
                }
                //成功提示
                layer.msg('成功')
                //更新用户信息
                // console.log(window.parent.document.querySelector('.nickname'));
window.parent. getUserInfo()
        })
    })
    //4.重置功能
    $('#reset-btn').click(function (e) {
        e.preventDefault()
        //重新渲染用户
        initUserInfo()
    })
})