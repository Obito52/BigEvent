axios.defaults.baseURL = 'http://api-breakingnews-web.itheima.net'

// 添加全局请求拦截器
axios.interceptors.request.use(function (config) {
  console.log('--发送 ajax 请求前', config);
  
    // 在发送请求之前做些什么
  
  //在发送请求前判断是否有/my的请求路径
  //如果有，手动添加headers请求头

//   1.startsWith
//   2.正则表达式 /^\/my/.text()
//   3.indexOf('/my')==0


  console.log(config.url);
    //获取本地存储的令牌
  var token = localStorage.getItem('token') || ''
  if (config.url.indexOf('/my')==0) {
    config.headers.Authorization = token 
  }


    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加全局响应拦截器
axios.interceptors.response.use(function (response) {
  console.log('--接收 ajax 响应前', response);
  
  const { status, message } = response.data;

  //先判断身份验证是否成功
  if (message == '身份验证失败！' && status == 1) {
     //清除本地存储的token
     localStorage.removeItem('token')
  
     //localStorage.setItem('token','')
     //跳转到登录页面
     location.href='../home/login.html'
   
  }
    
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });