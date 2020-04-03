import React, { useState } from 'react'
import { firestore } from '../../index'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Input, Button, DatePicker, TimePicker, Typography } from 'antd';
import moment from 'moment'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 17 },
}

const tailLayout = {
    wrapperCol: { offset: 11, span: 12 },
}

const { Title } = Typography;

const CreateStory = () => {
    const [author, setAuthor] = useState('FARmer037')

    const dispatch = useDispatch()
    const form = useSelector(state => state.form)

    const handleSubmit = e => {
        e.preventDefault()
        firestore.collection("stories").doc().set({ title: form.title, story: form.story, author, createAt: new Date() })
        dispatch({ type: 'RESET_TITLE', title: '' })
        dispatch({ type: 'RESET_STORY', story: '' })
    }

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (date, dateString) => {
        console.log(dateString);
    }

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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name="location"
                        rules={[{ required: true, message: 'Please input a task!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please input date!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} onChange={onChange} />
                    </Form.Item>

                    <Form.Item
                        label="Start Time"
                        name="start-time"
                        rules={[{ required: true, message: 'Please input date!' }]}
                    >
                        <TimePicker style={{ width: '100%' }} onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    </Form.Item>

                    <Form.Item
                        label="End Time"
                        name="end-time"
                        rules={[{ required: true, message: 'Please input date!' }]}
                    >
                        <TimePicker style={{ width: '100%' }} onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
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
