import React from 'react'

const StoryDetails = (props) => {
    const id = props.match.params.id

    return (
        <div className='container section project-details'>
            <div className='card z-depth-0'>
                <div className='card-content'>
                    <span className='card-title'>Project Title - {id}</span>
                    <p>Incididunt mollit cillum id nostrud do fugiat eu sint consequat aute Lorem nulla officia. Consectetur reprehenderit exercitation consequat enim id laboris voluptate. Culpa ad aute et ex dolore velit exercitation aliquip magna culpa sint reprehenderit ipsum non. Pariatur minim fugiat incididunt excepteur excepteur tempor incididunt ex irure incididunt do culpa laboris do.</p>
                </div>
                <div className='card-action gret lighten-4 grey-text'>
                    <div>Posted by FARmer037</div>
                    <div>18th March, 2am</div>
                </div>
            </div>
        </div>
    )
}

export default StoryDetails