/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-11-23 11:00:24
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-11-23 11:13:52
 * @FilePath: \react_11_16\jike\src\config\chartData.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEchar
 */
export const option = {
    "week": {
        title: {
            text: "一周满意度"
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    },
    "frame": {
        title: {
            text: "框架使用度"
        },
        xAxis: {
            type: 'category',
            data: ['Vue', 'react', 'angular']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150],
                type: 'bar'
            }
        ]
    },
}




