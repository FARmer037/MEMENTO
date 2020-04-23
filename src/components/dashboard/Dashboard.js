import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Timeline, Typography, Empty, Button, Row, Col, Drawer, Form, Input, DatePicker, TimePicker, Popover, Modal } from 'antd'
import { ClockCircleOutlined, DownloadOutlined } from '@ant-design/icons'
import { firestore } from '../../index'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import moment from 'moment'

const { Title } = Typography;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 17 },
}

const Dashboard = () => {
    const stories = useSelector(state => state.story)
    const form = useSelector(state => state.form)
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState(0)

    const retriveData = () => {
        firestore.collection("stories").onSnapshot((snapshot) => {
            let newStory = snapshot.docs.map(d => {
                const { id, task, location, date, startTime, endTime } = d.data()
                return { id, task, location, date, startTime, endTime }
            })
            dispatch({ type: 'GET_STORY', stories: newStory })
        })
    }

    const generatePdf = () => {
        const head = Object.keys(stories[0])
        const body = stories.map(story => {
            const values = Object.keys(story).map(key => {
                return story[key];
            })
            return values
        })

        const doc = new jsPDF()
        doc.autoTable({
            head: [head],
            body: body
        })
        doc.save('Timeline.pdf')
    }

    const onFinish = () => {
        firestore.collection("stories").doc(id + '').set({
            id,
            task: form.task,
            location: form.location,
            date: form.date,
            startTime: form.startTime,
            endTime: form.endTime
        })
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setVisible(false)
        }, 2000)
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }

    const changeDate = (date, dateString) => {
        dispatch({ type: 'CHANGE_DATE', date: dateString })
    }
    const changeStartTime = (date, timeString) => {
        dispatch({ type: 'CHANGE_START_TIME', startTime: timeString })
    }
    const changeEndtTime = (date, timeString) => {
        dispatch({ type: 'CHANGE_END_TIME', endTime: timeString })
    }

    const setid = id => {
        setId(id)
        showModal()
    }

    const deleteTask = () => {
        firestore.collection("stories").doc(id + '').delete()
        setVisible(false)
    }

    const showModal = () => {
        setVisible(true)
    }

    const handleOk = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setVisible(false)
        }, 3000)
    }

    const handleCancel = () => {
        console.log(id)
        setVisible(false)
    }

    const showData = () => {
        if (stories && stories.length) {
            return (
                <Row>
                    <Col span={16} offset={4}>
                        <Timeline mode='left' style={{ margin: '20px 0px' }}>
                            {
                                stories.map((story, index) => (
                                    <Timeline.Item key={index} dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />} label={story.date}>
                                        <Title style={{ cursor: 'pointer' }} level={4} onClick={() => setid(story.id)}>{story.task}</Title>
                                        <p>{story.location}</p>
                                        <p>{story.startTime} to {story.endTime}</p>
                                    </Timeline.Item>
                                ))
                            }
                        </Timeline>
                    </Col>
                    <Col style={{ margin: '20px 0px' }} span={2} offset={2}>
                        <Button onClick={generatePdf} type="primary" icon={<DownloadOutlined />} size='large'>
                            Generate PDF
                        </Button>
                    </Col>
                    <Modal
                        visible={visible}
                        title="Manage Story"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" type="primary" danger onClick={deleteTask}>
                                Delete
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={onFinish}>
                                Edit
                            </Button>,
                        ]}
                    >
                        <Form
                            {...layout}
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Task"
                                name="task"
                                rules={[{ required: true, message: 'Please input a task!' }]}
                            >
                                <Input onChange={e => dispatch({ type: 'CHANGE_TASK', task: e.target.value })} />
                            </Form.Item>

                            <Form.Item
                                label="Location"
                                name="location"
                                rules={[{ required: true, message: 'Please input a task!' }]}
                            >
                                <Input onChange={e => dispatch({ type: 'CHANGE_LOCATION', location: e.target.value })} />
                            </Form.Item>

                            <Form.Item
                                label="Date"
                                name="date"
                                rules={[{ required: true, message: 'Please input date!' }]}
                            >
                                <DatePicker style={{ width: '100%' }} onChange={changeDate} />
                            </Form.Item>

                            <Form.Item
                                label="Start Time"
                                name="start-time"
                                rules={[{ required: true, message: 'Please input date!' }]}
                            >
                                <TimePicker style={{ width: '100%' }} onChange={changeStartTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                            </Form.Item>

                            <Form.Item
                                label="End Time"
                                name="end-time"
                                rules={[{ required: true, message: 'Please input date!' }]}
                            >
                                <TimePicker style={{ width: '100%' }} onChange={changeEndtTime} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Row>
            )
        } else {
            return (
                <Empty style={{ marginTop: '100px' }} />
            )
        }
    }

    useEffect(() => {
        retriveData()
    }, [])

    return (
        showData()
    )
}

export default Dashboard