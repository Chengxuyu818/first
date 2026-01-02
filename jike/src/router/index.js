/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-11-21 23:31:54
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-11-26 16:27:30
 * @FilePath: \react_11_16\jike\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import {
    createBrowserRouter,
} from "react-router";
// import Article from "../components/Article";
import { AuthRoute } from "../components/AuthRoute";
// import Home from "../components/Home";
// import Publish from "../components/Publish";
// import Layout from "../pages/Layout";
// import Login from "../pages/Login";
import { lazy, Suspense } from "react";

const Home = lazy(() => import('@/components/Home'));
const Publish = lazy(() => import('@/components/Publish'));
const Layout = lazy(() => import('@/pages/Layout'));
const Article = lazy(() => import('@/components/Article'));
const Login = lazy(() => import('@/pages/Login'));
// const AuthRoute = lazy(() => import('@/components/Article'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute><Layout></Layout></AuthRoute>,
        children: [
            {
                index: true, // 关键：将此路由标记为索引路由
                element: <Suspense fallback={'.........'} > <Home></Home></Suspense> // 默认渲染的组件
            },
            {
                path: "home",
                element: <Suspense fallback={'.........'} ><Home></Home></Suspense>
            },
            {
                path: "article",
                element: <Suspense fallback={'.........'} ><Article></Article></Suspense>
            },
            {
                path: "publish",
                element: <Suspense fallback={'.........'} ><Publish></Publish></Suspense>
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
]);

export default router