import React, { useEffect } from 'react'
import { firestore } from '../../index'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Input, Button, DatePicker, TimePicker, Typography } from 'antd';
import moment from 'moment'
import { useHistory } from 'react-router-dom';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 17 },
}

const tailLayout = {
    wrapperCol: { offset: 11, span: 12 },
}

const { Title } = Typography;

const CreateStory = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const form = useSelector(state => state.form)
    const stories = useSelector(state => state.story)

    const retriveData = () => {
        firestore.collection("stories").onSnapshot((snapshot) => {
            let newStory = snapshot.docs.map(d => {
                // console.log(d.data())
                const { id, task, location, date, startTime, endTime } = d.data()
                // console.log(id, task, location, date, startTime, endTime)
                return { id, task, location, date, startTime, endTime }
            })
            // console.log('new', newStory)
            dispatch({ type: 'GET_STORY', stories: newStory })
        })
    }

    const onFinish = () => {
        let id = stories.length === 0 ? 1 : stories[stories.length - 1].id + 1

        firestore.collection("stories").doc(id + '').set({
            task: form.task,
            location: form.location,
            date: form.date,
            startTime: form.startTime,
            endTime: form.endTime
        })

        history.push('/')
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const changeDate = (date, dateString) => {
        // console.log(dateString);
        dispatch({ type: 'CHANGE_DATE', date: dateString })
    }
    const changeStartTime = (date, timeString) => {
        // console.log(timeString);
        dispatch({ type: 'CHANGE_START_TIME', startTime: timeString })
    }
    const changeEndtTime = (date, timeString) => {
        // console.log(timeString);
        dispatch({ type: 'CHANGE_END_TIME', endTime: timeString })
    }

    useEffect(() => {
        retriveData()
    }, [])

    return (
        <Row>
            <Col span={16} offset={4}>
                <Title style={{ textAlign: 'center', margin: '20px 0' }}>Create Story</Title>
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

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default CreateStory
