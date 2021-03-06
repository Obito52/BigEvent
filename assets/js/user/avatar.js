$(function () {
    //1.获取要裁剪的图片
    const $image = $('#image')
    //2.初始化裁剪区域cropper（）
    $image.cropper({
        //指定的长宽比
        aspectRatio: 1,
        //裁剪事件
        crop: function (event) {
            //裁剪区的坐标尾汁
            // console.log(event.detail.x);
            // console.log(event.detail.y);
        },
        //指定预览区域
        preview:'.img-preview'
    })

    //3.点击上传按钮
    $('#upload-btn').click(function () {
        //手动触发文件框的点击事件
        $('#file').click()
    }),

    //4.监听文件框状态改变事件 change：file ，checkbox，select
    $('#file').change(function () {
        //获取用户上传的文件列表
        console.log($(this).files);//伪数组

        //判断用户是否上传
        if (this.files.length == 0) {
            return
        }

    //把文件转换成url地址形式
        const imgUrl = URL.createObjectURL(this.files[0]) 
        console.log(imgUrl);

        //替换裁剪区图片
        $image.cropper('replace', imgUrl)
    })

    //5.点击确定，上传图片到服务器
    $('#save-btn').click(function () {
        //5.1获取裁剪后的base64格式
        const dataUrl = $image.cropper('getCroppedCanvas', {
            width: 100,
            height:100
        }).toDataURL('image/png')
        console.log(dataUrl);

//5.2手动构建查询参数
        const search = new URLSearchParams()
        //使用append（）添加一条参数
        search.append('avatar', dataUrl)
        
        //5.3发送请求
        axios.post('/my/update/avatar', search).then(res => {
            console.log(res);
            //5.4判断失败
            if (res.status !== 0) {
                return layer.msg('上传失败')
            }
            //提示
            layer.msg('上传成功')

            //更新主页面头像
            window.parent.getUserInfo()
        })

    })
})