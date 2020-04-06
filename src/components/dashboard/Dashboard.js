import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Timeline, Typography } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import { firestore } from '../../index'

const { Title } = Typography;

const Dashboard = () => {
    const stories = useSelector(state => state.story)
    const dispatch = useDispatch()

    const retriveData = () => {
        firestore.collection("stories").onSnapshot((snapshot) => {
            let newStory = snapshot.docs.map(d => {
                // console.log(d.data())
                const {id, task, location, date, startTime, endTime} = d.data()
                // console.log(id, task, location, date, startTime, endTime)
                return {id, task, location, date, startTime, endTime}
            })
            // console.log('new', newStory)
            dispatch({ type: 'GET_STORY', stories: newStory })
        })
    }

    useEffect(() => {
        retriveData()
    }, [])

    return (
        <Timeline mode='left' style={{ margin: '20px 0px' }}>
            {
                stories.map(story => (
                    <Timeline.Item dot={<ClockCircleOutlined onClick={() => console.log('clicked')} style={{ fontSize: '16px' }} />} label={story.date}>
                        <Title level={4}>{story.task}</Title>
                        <p>{story.location}</p>
                        <p>{story.startTime} to {story.endTime}</p>
                    </Timeline.Item>
                ))
            }
        </Timeline>
    )
}

export default Dashboard
