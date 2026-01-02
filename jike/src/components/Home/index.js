/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-11-22 14:51:41
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-11-23 11:19:32
 * @FilePath: \react_11_16\jike\src\components\Home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { option } from "@/config/chartData";
import Chart from './components/Chart';

const Home = () => {



    return (
        <div><Chart props={option.frame}></Chart> </div>
    )
}

export default Home