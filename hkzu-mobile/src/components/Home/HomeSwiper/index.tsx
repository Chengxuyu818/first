/*
 * @Author: LiYu ly19863208695@qq.com
 * @Date: 2026-01-02 22:18:56
 * @LastEditors: LiYu ly19863208695@qq.com
 * @LastEditTime: 2026-01-02 23:51:09
 * @FilePath: \react_12_30\hkzu-mobile\src\components\Home\HomeSwiper\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// import { http } from "@/utils/http"
import { Swiper } from 'antd-mobile'
import axios from "axios"
import { useEffect, useState, type JSX } from 'react'
// import "./index.css"


const HomeSwiper = (): JSX.Element => {
    const [swiperData, setSwiperData] = useState([])

    useEffect(() => {
        const getSwipers = async () => {
            // console.log("XXXXXXXXX")
            try {
                const res = await axios.get("http://localhost:8080/home/swiper");
                console.log(res.data.body)
                setSwiperData(res.data.body)
            } catch (err) {
                console.log(err)
            }
        }

        getSwipers()
    }, [])

    // const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']
    const items = swiperData.map((item) => (
        <Swiper.Item key={item.id}>
            <div
                style={{
                    height: '100%', // 继承 Swiper 的 200px 高度
                    width: '100%',  // 占满 Swiper 宽度
                    display: 'flex', // 可选：让内容居中（优化体验）
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    color: '#333'
                }}
            >
                {item.imgSrc}
            </div>
        </Swiper.Item>
    ))

    return (
        <>
            <Swiper
                style={{
                    height: '200px'
                }}
                loop
                autoplay
                onIndexChange={i => {
                    console.log(i, 'onIndexChange1')
                }}
            >
                {items}
            </Swiper>
        </>
    )
}

export default HomeSwiper