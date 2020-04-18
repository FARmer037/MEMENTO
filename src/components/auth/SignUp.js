import React, { useState } from 'react'
import { Row, Col, Form, Input, Button, Typography } from 'antd'
import fire from '../../firebase/fire'

const { Title } = Typography

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
}

const tailLayout = {
    wrapperCol: { offset: 11, span: 12 },
}

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFinish = values => {
        // console.log('Success:', values);

        fire.auth().createUserWithEmailAndPassword(email, password).then(u => {
            console.log(u)
        }).catch(err => {
            console.log(err)
        })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row>
            <Col span={16} offset={4} >
                <Title style={{ textAlign: 'center', margin: '20px 0' }}>Sign Up</Title>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input onChange={e => setEmail(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password onChange={e => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default SignUp
