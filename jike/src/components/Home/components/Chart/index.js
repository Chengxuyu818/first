import * as echarts from 'echarts';
import { useEffect } from 'react';

const Chart = (props) => {
    // console.log(props.props , "props")

    useEffect(() => {
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        props && myChart.setOption(props.props);
    }, [props])
    return (
        <div id="main" style={{ width: "500px", height: "400px" }}></div>
    )
}

export default Chart