import React, { useEffect, useState } from 'react'
import StorySummary from './StorySummary'
import { firestore } from '../../index'
import moment from 'moment'

const StoryList = () => {
    const [stories, setStories] = useState([])

    const retriveData = () => {
        firestore.collection("stories").onSnapshot((snapshot) => {
            let newStory = snapshot.docs.map(d => {
                // console.log(d.data())
                const { title, author, createAt } = d.data()
                console.log(author, createAt, title)
                return { title, author, createAt: moment(d.data().createAt.toDate()).format('LLL') }
            })
            setStories(newStory)
        })
    }

    useEffect(() => {
        retriveData()
    }, [])

    return (
        <div className='project-list section'>
            {
                stories.map((story, index) => (
                    <StorySummary key={index} title={story.title} author={story.author} createAt={story.createAt} />
                ))
            }
        </div>
    )
}

export default StoryList
