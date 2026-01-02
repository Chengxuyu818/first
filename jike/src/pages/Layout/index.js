/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-11-22 13:51:36
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-11-22 15:42:43
 * @FilePath: \react_11_16\jike\src\pages\Layout\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {
    DiffOutlined,
    EditOutlined,
    HomeOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Popconfirm } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { fetchUserInfo , clearUserInfo} from '../../store/modules/user'
import './index.css'

const { Header, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/home',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    },
]


const GeekLayout = () => {
    const navigate = useNavigate()
    const curPath = useLocation().pathname;
    const selectedKeys = [curPath]
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.userInfo.name)
    // console.log(userInfo , "UUUUUUUUUUU")
    const getMenuKey = (config) => {
        // console.log(values, "XXXXXXX")
        let path = config.key;
        navigate(path)
    }

    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])


    const userExit = () => {
        //1.清除token和用户信息
        dispatch(clearUserInfo());
        //2.删除localstorage的user_token
        localStorage.removeItem("user_token")
        //3.跳转login页面
        navigate('/login')
    }
    
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{username}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={userExit}>
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={selectedKeys}
                        items={items}
                        onClick={getMenuKey}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>
                <Layout className="layout-content" style={{ padding: 20 }} >
                    {/* //二级路由出口 */}
                    <Outlet></Outlet>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout