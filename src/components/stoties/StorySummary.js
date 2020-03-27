import React from 'react'

const StorySummary = (props) => {
    return (
        <div className='card z-depth-0 project-summary'>
            <div className='card-content grey-text text-darken-3'>
                <span className='card-title'>{props.title}</span>
                <p>Posted by {props.author}</p>
                <p className='grey-text'>{props.createAt}</p>
            </div>
        </div>
    )
}

export default StorySummary