import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import StorySummary from './StorySummary'
import { firestore } from '../../index'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

const StoryList = () => {
    const stories = useSelector(state => state.story)
    const dispatch = useDispatch()

    const retriveData = () => {
        firestore.collection("stories").onSnapshot((snapshot) => {
            let newStory = snapshot.docs.map(d => {
                // console.log(d.data())
                const { title, story, author, createAt } = d.data()
                console.log(author, story, createAt, title)
                return { title, story, author, createAt: moment(d.data().createAt.toDate()).format('LLL') }
            })
            console.log('new', newStory)
            dispatch({ type: 'GET_STORY', stories: newStory })
        })
    }

    useEffect(() => {
        retriveData()
    }, [])

    return (
        <div className='project-list section'>
            {
                stories.map((story, index) => (
                    <Link to={'/story/' + story.title}>
                        <StorySummary key={index} title={story.title} author={story.author} createAt={story.createAt} />
                    </Link>
                ))
            }
        </div>
    )
}

export default StoryList
