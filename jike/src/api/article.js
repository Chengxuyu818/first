/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-11-23 22:55:06
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-11-24 20:24:17
 * @FilePath: \react_11_16\jike\src\api\article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from ".././util/http"

//拿到文章分类（频道）
function getChannels() {
    return http({
        url: '/channels',
        method: "GET"
    })
}

//添加文章
function postArticle(data) {
    return http({
        url: '/mp/articles?draft=false',
        method: "POST",
        data
    })
}


//获取文章
function getArticles(params) {
    console.log(params, 'params')
    return http({
        url: '/mp/articles',
        method: "GET",
        params
    })
}

//删除文章
function deleteArticle(id) {
    return http({
        url: `/mp/articles/${id}`,
        method: "DELETE"
    })
}


//拿到特定文章信息
function getArticleById(id) {
    return http({
        url: `/mp/articles/${id}`,
        method: "GET"
    })
}


//添加文章
function putArticle(data) {
    return http({
        url: `/mp/articles/${data.id}?draft=false`,
        method: "PUT",
        data
    })
}
export { deleteArticle, getArticleById, getArticles, getChannels, postArticle, putArticle }

