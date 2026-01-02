/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-11-22 13:09:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-11-22 15:42:20
 * @FilePath: \react_11_16\jike\src\store\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSlice } from "@reduxjs/toolkit";
// import { http } from "../../util/http.js";
import { userLogin ,getUserInfo } from "../../api/user.js";

const userStore = createSlice({
    name: "user",
    initialState: {
        token: localStorage.getItem("user_token") || '',
        userInfo: {}
    },
    reducers: {
        setToken(state, actions) {
            state.token = actions.payload;
            localStorage.setItem("user_token", actions.payload)
        },
        setUserInfo(state, actions) {
            state.userInfo = actions.payload;
        },

        clearUserInfo(state, actions) {
            state.userInfo = {}
            state.token = ''
        },
    }
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions
const reducer = userStore.reducer;

//异步获取部分
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await userLogin(loginForm)
        dispatch(setToken(res.data.token))

    }
}


const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getUserInfo()
        dispatch(setUserInfo(res.data))
    }
}
// const postUserList = (data) => {
//     return async (dispatch) => {
//         const result = await axios.post("http://localhost:3008/ka", data);
//         //拿到后台数据就调用dispatch函数提交actions
//         dispatch(addUser(result.data));

//     }
// }


export { clearUserInfo, fetchLogin, fetchUserInfo, setToken };
export default reducer