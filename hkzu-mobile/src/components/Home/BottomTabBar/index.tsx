/*
 * @Author: LiYu ly19863208695@qq.com
 * @Date: 2026-01-02 17:06:35
 * @LastEditors: LiYu ly19863208695@qq.com
 * @LastEditTime: 2026-01-02 21:57:52
 * @FilePath: \react_12_30\hkzu-mobile\src\components\TabBar\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    SearchOutline,
    UnorderedListOutline,
    UserOutline
} from 'antd-mobile-icons'
import {
    useLocation,
    useNavigate
} from 'react-router-dom'



const BottomTabBar = () => {
    const Navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location

    const setRouteActive = (value: string) => {
        Navigate(value)
    }

    const tabs = [
        {
            key: '/home',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: '/cityList',
            title: '找房',
            icon: <SearchOutline />,
        },
        {
            key: '/ziXun',
            title: '资讯',
            icon: <UnorderedListOutline />,
        },
        {
            key: '/my',
            title: '我的',
            icon: <UserOutline />,
        },

    ]

    return (
        <TabBar
            style={{
                position: 'fixed', // 固定定位
                bottom: 0, // 贴紧底部
                width: '100%', // 占满屏幕宽度
                background: '#fff', // 背景色（可选，避免透明）
            }}
            activeKey={pathname} onChange={value => setRouteActive(value)}>
            {
                tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))
            }
        </TabBar >
    )
}

export default BottomTabBar
