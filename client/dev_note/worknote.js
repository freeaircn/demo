/**
1 用户管理
  1 注册
    1 模拟框架的icon组件，新增logo组件，插入svg图片。
      新加组件，是因为icon组件样式设定了width属性，还不会怎么将样式属性也作为组件属性
      在webpack base config 中，增加下面的模块定义
      {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [resolve('src/logos')],
            options: {
              symbolId: 'logo-[name]'
            }
          },

    2 调整页面样式
      去掉container的Position: fixed属性（窗口大小变化滚动条无效）
      去掉form的Position: absolute属性（使元素的位置与文档流无关，定位的元素和其他元素重叠）

    3 表单-1 手机号用于注册；表单-2 用户信息，填写两份表单.
      使用回调方式，使用字符串的正则表达式校验；
      change与blur差别：用户没有输入任何内容，而输入框失去焦点，页面不会出现校验提示。

    4 鼠标离开手机号/邮箱表单项，满足校验条件后，将手机号/邮箱发送给后端，检查该是否已被注册。
      使用@blur事件：
      <el-input v-model="form1.userphone" name="userphone" type="text" placeholder="手机号" clearable @blur="checkInfo('phone')" />

      回调：回调函数传入参数，区分检查手机号，或邮箱地址
        checkInfo(infoItem) {
          switch (infoItem) {
            case 'phone':

      vue使用ref访问子组件，即给form-item定义ref=xxx，通过this.$refs.xxx或this.$refs['xxx']访问子组件
      this.$refs.xxx.method()

    5 创建用户信息数据库表
      2019-03-06
      数据库表使用开源包中的表，后续根据实际需要调整。
      2019-03-22
      用户的部门组织关系划分成多张表，设置外键约束，保证完整性。
      新增get user info方法，从关联的table获取信息。
      // TODO:

    6 激活方式：邮件。
      2019-03-11
      1 注册页面第一步submit，后端验证通过，完成登记，后端发送激活邮件
      2 注册页面第二步submit
        第一步注册用户成功后，后端返回userid，前端当前页面组件缓存userid，第二步提交userinfo时，携带上userid，方便后端更改数据库
      3 注册页面第三步sbumit，按钮响应函数中，路由至login页面
      // TODO:
      1 用户信息完善标志

  2 登录
    1 去掉session，增加Token
      2019-03-16
      1 已引入JWT包
      // TODO:
      1 [issue] 数据库表尝试次数，残留非注册用户尝试登录记录，缺少clear处理
      2 [issue] 用户未激活，用户名和密码正确登录，没有increase login尝试次数
        修改方法：login方法，密码验证通过，识别用户未激活，return 前，increase login尝试次数

    2 HTTP Request Header 字段携带token
      2019-03-16
      token放置于前端请求哪个字段：axios.interceptors.request请求拦截器中，当本地存有token时，将token放在request header的X-Token字段。

  3 账号激活
    1 激活方法
      2019-03-20
      register方法 - deactivate() - logged_in()的影响：logged_in方法检查session，采用了token，不涉及session，所以不影响其他流程。

    2 激活结果页面
      2019-03-20
      页面传入base_url
      1 用户请求发送了多封激活邮件，每个邮件里的激活code不一样，只有最后一个code保存于DB中，当用户打开失效的激活链接，激活页面给出“激活链接已过期，重新发送激活邮件”，并提供跳转链接。
      2 激活成功，提供链接至"登录页面"。
      3 已经激活提示，并提供链接至"登录页面"。

    3 发送激活email页面
      1 前端post 用户手机号和邮箱。
      2 后端核查手机号和邮箱是否未同一用户，以手机号检索。
        同一用户，核查用户激活状态，未激活，则发送激活邮件，反馈发送结果。
        不同用户，反馈信息至客户端。
      3 激活邮件正文，写入时间戳。
      4 用户填写的邮件地址不存在，163邮件服务端给email-send方法返回成功，163邮件服务端会发送“退信”邮件，CI 无法识别该场景，都认为发送成功。
      2019-03-21
      5 邮件发送后，页面提供登录邮件的链接
        使用window 跳转至指定外网链接：window.location.replace(this.mailServerUrl)，当前识别163，126，qq邮箱后缀
      // TODO：
      1 需不需要“激活失效时间”，若超过时效时间，后台怎么处理？

  4 忘记密码&修改密码
    // TODO：

  5 用户信息更改
    // TODO：
    修改邮箱
    修改手机号
    其他

  6 注销：相反的处理，确保去掉用户相关的信息，涉及权限等

  7 token流程：
    1 login成功后，用cookie存储token，同时token存储于vuex中。且在request header中填写token if exsit。
    2019-03-16

*/
