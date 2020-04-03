import React from 'react'
import { useSelector } from 'react-redux'

const StoryDetails = (props) => {
    const id = props.match.params.id

    const stories = useSelector(state => state.story)

    const storyDetail = stories.filter(story => story.title === id)
    const detail = storyDetail[0]

    console.log("detal", detail)

    return (
        <div className='container section project-details'>
            <div className='card z-depth-0'>
                <div className='card-content'>
                    <span className='card-title'>{id}</span>
                    <p>{detail.story}</p>
                </div>
                <div className='card-action gret lighten-4 grey-text'>
                    <div>Posted by {detail.author}</div>
                    <div>{detail.createAt}</div>
                </div>
            </div>
        </div>
    )
}

export default StoryDetails