import React from 'react'
import Notification from './Notification'
import StoryList from '../stoties/StoryList'

const Dashboard = (props) => {
    const { story } = props
    return (
        <div className='dashboard container'>
            <div className='row'>
                <div className='col s12 m6'>
                    <StoryList stories={story} />
                </div>
                <div className='col s12 m5 offset-m1'>
                    <Notification />
                </div>
            </div>
        </div>
    )
}

export default Dashboard