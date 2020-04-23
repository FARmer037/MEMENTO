import React, { useState } from 'react'
import { Row, Col, Form, Input, Button, Typography, message } from 'antd'
import fire from '../../firebase/fire'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const { Title } = Typography

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
}

const tailLayout = {
    wrapperCol: { offset: 11, span: 12 },
}

const facebookBtnLayout = {
    wrapperCol: { offset: 6, span: 12 },
}

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ]
    };

    const onFinish = () => {
        fire.auth().signInWithEmailAndPassword(email, password).then(u => {
            console.log(u)
        }).catch(err => {
            console.log(err)
            message.error(err.message);
        })

    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row>
            <Col span={16} offset={4} >
                <Title style={{ textAlign: 'center', margin: '20px 0' }}>Sign In</Title>
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
                            Sign In
                        </Button>
                    </Form.Item>

                    <Form.Item {...facebookBtnLayout} >
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default SignIn
