/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-11-23 11:24:51
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-11-23 11:32:39
 * @FilePath: \react_11_16\jike\src\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from ".././util/http"

//用户登录
function userLogin(formData) {
    return http({
        url: '/authorizations',
        method: "POST",
        data: formData
    })
}

function getUserInfo() {
    return http({
        url: '/user/profile',
        method: "GET"
    })
}

export { getUserInfo, userLogin }
