
import { useEffect, useState } from 'react'
import { getChannels } from '../api/article'


//获取频道列表
export function useChannel() {
    const [channels, setChannels] = useState([])

    useEffect(() => {
        const getChannelList = async () => {
            try {
                const res = await getChannels()
                if (res.data) {
                    console.log(res.data, "CHANNELS FROM API"); // 在设置状态之前打印
                    setChannels(res.data.channels);
                }
            } catch (error) {
                console.error("Failed to fetch channels:", error);
            }
        }
        getChannelList();
        // console.log(channels, "CHANNELS")
    }, []);

    return {channels}
}
