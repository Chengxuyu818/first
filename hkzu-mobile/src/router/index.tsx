/*
 * @Author: LiYu ly19863208695@qq.com
 * @Date: 2026-01-02 16:30:40
 * @LastEditors: LiYu ly19863208695@qq.com
 * @LastEditTime: 2026-01-02 21:42:43
 * @FilePath: \react_12_30\hkzu-mobile\src\router\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { lazy } from "react";
import {
    createBrowserRouter,
} from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import BottomTabBar from '../components/Home/BottomTabBar';



const Home = lazy(() => import('@/pages/Home'));
const CityList = lazy(() => import('@/pages/cityList'));
const My = lazy(() => import('@/pages/my'));
const ZiXun = lazy(() => import('@/pages/ziXun'));
// 布局组件：包裹 TabBar + 路由出口（所有 Tab 页面的公共布局）
// eslint-disable-next-line react-refresh/only-export-components
const TabLayout = () => {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* 路由出口：渲染当前匹配的 Tab 页面 */}
            <Outlet />
            {/* 底部 TabBar */}
            <BottomTabBar />
        </div>
    )
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <TabLayout></TabLayout>,
        children: [
            // 默认路由：访问 / 时跳转到 /home
            { path: '', element: <Navigate to="/home" /> },
            // Tab 对应的子路由
            { path: 'home', element: <Home /> },
            { path: 'cityList', element: <CityList /> },
            { path: 'ziXun', element: <ZiXun /> },
            { path: 'my', element: <My/> },
        ],
    },
    {
        path: "/cityList",
        element: <CityList></CityList>
    },
    // 核心：404 重定向（* 匹配所有未定义的路径）
    { path: "*", element: <Navigate to="/home" replace={true} /> },

]);

export default router