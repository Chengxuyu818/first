/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-11-22 14:51:41
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-11-24 21:17:11
 * @FilePath: \react_11_16\jike\src\components\Article\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Breadcrumb, Button, Card, DatePicker, Form, Popconfirm, Radio, Select, Table } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Link } from 'react-router'
// 导入资源
import img404 from '@/assets/error.png'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Space, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { deleteArticle, getArticles } from '../../api/article'
import { useChannel } from '../../hooks/useChannel'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const [articleList, setArticleList] = useState([])
    const [articleCount, setArticleCount] = useState(0);
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page: 3,
        per_page: 4
    })
    const { channels } = useChannel()

    const navigate = useNavigate()

    useEffect(() => {
        async function getArticleList() {
            const res = await getArticles(reqData);

            // console.log(reqData, "RRRRRR")
            // console.log(res.data, "ZZZZZZ")
            setArticleList(res.data.results)
            setArticleCount(res.data.total_count)
        }

        getArticleList()
    }, [reqData])

    // 准备列数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => status[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />

                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => onConfirm(data)}

                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    const status = {
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="success">审核通过</Tag>
    }

    // 筛选文章列表
    const onFinish = async (formValue) => {
        console.log(formValue, "FFFFFF")
        // 1. 准备参数
        // const { channel_id, date, status } = formValue
        setReqData({
            ...reqData,
            channel_id: formValue.channel_id,
            status: formValue.status,
            begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
            end_pubdate: formValue.date[1].format('YYYY-MM-DD'),
        })
        // console.log(formValue.date[0].format('YYYY-MM-DD'), formValue.date[1].format('YYYY-MM-DD'), "FFFFFF")

    }

    //确认删除文章
    const onConfirm = async (data) => {
        console.log("删除", data)
        const articleId = data.id
        await deleteArticle(articleId);
        setReqData({ ...reqData })
    }

    //分页
    const changePage = (page) => {
        console.log(page.current, 'Count');

        setReqData({
            ...reqData,
            page: page.current
        })
    }
    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '文章列表' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={onFinish}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            defaultValue="lucy"
                            style={{ width: 120 }}
                        >
                            {channels.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}


                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* //表格区域 */}
            <Card title={`根据筛选条件共查询到 ${articleCount} 条结果：`}>
                <Table rowKey="id" columns={columns} dataSource={articleList} pagination={
                    {
                        total: articleCount, // 关键：总条数（参数名改为 total）,
                        pageSize: reqData.per_page
                    }
                } onChange={changePage} />
            </Card>
        </div>
    )
}

export default Article