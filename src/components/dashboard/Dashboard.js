import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Timeline, Typography, Empty, Button, Row, Col } from 'antd'
import { ClockCircleOutlined, DownloadOutlined } from '@ant-design/icons'
import { firestore } from '../../index'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const { Title } = Typography;

const Dashboard = () => {
    const stories = useSelector(state => state.story)
    const dispatch = useDispatch()

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

    const showData = () => {
        if (stories && stories.length) {
            return (
                <Row>
                    <Col span={16} offset={4}>
                        <Timeline mode='left' style={{ margin: '20px 0px' }}>
                            {
                                stories.map((story, index) => (
                                    <Timeline.Item key={index} dot={<ClockCircleOutlined onClick={() => console.log(index + 1)} style={{ fontSize: '16px' }} />} label={story.date}>
                                        <Title level={4}>{story.task}</Title>
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
