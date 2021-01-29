//从layui中提取
    const {layer}=layui

    //1.获取用户的个人信息
    function getUserInfo() {
      
        //发送ajax请求
        axios.get('/my/userinfo',) .then(res => {
            console.log(res);
            //校验请求失败
            if (res.status !== 0) {
                return layer.msg('请求失败')
            }
            const { data } = res
            //渲染用户信息
            //1.获取用户名
            const name = data.nickname || data.username
            //2.渲染昵称
            $('.nickname').text(`欢迎 ${name}`)
            //3.渲染头像
            if (data.user_pic) {
                $('.avatar').prop('src', data.user_pic).show()
                $('.text-avatar').hide()
            } else {
                $('.text-avatar').text(name[0].toUpperCase()).show()
                $('.avatar').hide()
            }
        })
    }
    getUserInfo()

    //2.点击退出
    $('#logout').click(function () {
        //请求接口
        //1.清除本地存储的 token令牌
        localStorage.removeItem('token')
          //2.跳转到登录页
        location.href='../home/login.html'
    })