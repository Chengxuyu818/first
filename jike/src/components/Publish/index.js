/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-11-22 14:51:41
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-11-24 23:37:12
 * @FilePath: \react_11_16\jike\src\components\Publish\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {
    Breadcrumb,
    Button,
    Card,
    Form,
    Input,
    Radio,
    Select,
    Space,
    Upload,
    message
} from 'antd'
import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Link, useNavigate } from 'react-router'
import { getArticleById, postArticle, putArticle } from '../../api/article.js'
// import { http } from "../../util/http"
import { PlusOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router'
import { useChannel } from '../../hooks/useChannel'
import MyDraftEditor from './components/ReactQuillEditor'
import './index.css'



const { Option } = Select

const Publish = () => {
    // const [channels, setChannels] = useState([])
    const [radioType, setRadioType] = useState(0)
    // 上传图片
    const [imageList, setImageList] = useState([])

    const navigate = useNavigate()

    // 回填数据
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    // console.log(articleId, "ArticleID")
    const [form] = Form.useForm()

    useEffect(() => {
        const getArticleDetail = async () => {
            if (articleId) {
                let res = await getArticleById(articleId)
                console.log(res.data, "detail")

                //回填图片
                //1.改格式
                let type = res.data.cover.type

                // 设置表单数据
                form.setFieldsValue({
                    ...res.data,
                    type: type
                })

                //2.回填几图
                setRadioType(type)

                //3.回填图片列表
                if (res.data.cover.images.length > 0) {
                    setImageList(res.data.cover.images.map(url => {
                        return { url }
                    }))
                    // console.log(imageList, "IMAGELIST")
                }

            }
        }
        getArticleDetail()
    }, [articleId, form]);


    const { channels } = useChannel()
    const onFinish = async (formValue) => {
        console.log(formValue, "formValue")
        const { channel_id, content, title } = formValue

        // 1. 解析 content JSON 字符串
        let parsedContent;
        try {
            parsedContent = JSON.parse(content);
        } catch (e) {
            console.error('解析 content 失败:', e);
            // 如果解析失败，可以给个默认值或者提示用户
            parsedContent = { blocks: [] };
        }
        // 2. 提取所有 block 中的 text
        // 我们使用数组的 reduce 方法来高效地拼接所有文本
        const plainText = parsedContent.blocks.reduce((acc, block) => {
            // 为每个段落之间添加一个换行符，以保持原始结构
            return acc + block.text + '\n';
        }, '');
        // 3. 去除最后一个多余的换行符
        const finalText = plainText.trimEnd();
        console.log(finalText, "TTTTTTTT")


        const params = {
            channel_id,
            content: finalText,
            title,
            type: 1,
            cover: {
                type: radioType,
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                })
            }
        }
        //
        if (articleId) {
            await putArticle({ ...params, id: articleId })
            message.success('文章更新成功！');
            navigate('/article')
        } else {
            await postArticle(params)
            message.success('文章创建成功！');
        }

    }



    const onUploadChange = (info) => {
        setImageList(info.fileList)
        console.log(imageList)
    }


    const getRadioType = (e) => {
        // console.log(e.target.value)
        setRadioType(e.target.value)
    }

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: articleId ? "更新文章" : "创建文章" },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>

                            {/* {频道选择} */}
                            {channels.map(item => <Option value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>


                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={getRadioType}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>

                        {radioType !== 0 && <Upload
                            action={'http://geek.itheima.net/v1_0/upload'}
                            onChange={onUploadChange}
                            listType="picture-card"
                            maxCount={radioType}
                            showUploadList
                            name="image"
                            fileList={imageList}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}

                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                        getValueFromEvent={(value) => value}
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <MyDraftEditor />

                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish