/*
 * @Author: LiYu ly19863208695@qq.com
 * @Date: 2026-01-02 16:09:22
 * @LastEditors: LiYu ly19863208695@qq.com
 * @LastEditTime: 2026-01-02 22:18:55
 * @FilePath: \react_12_30\jike\src\pages\Login\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import logo from '@/assets/logo.png'
import { Button, Card, Form, Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchLogin } from '../../store/modules/user'
import './index.css'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        // console.log(values)
        //拿到token后跳转页面
        await dispatch(fetchLogin(values))
        navigate('/');
        message.success("用户登陆成功")
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form validateTrigger="onBlur" onFinish={onFinish}>
                    <Form.Item
                        name="mobile"
                        rules={[
                            { required: true, message: '请输入手机号' }
                            , { pattern: /^1[3-9]\d{9}$/, message: '格式错误' }]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[{ required: true, message: '请输入验证码' }]}
                    >
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login