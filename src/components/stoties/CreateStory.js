import React, { useState } from 'react'
import { firestore } from '../../index'

const CreateStory = () => {
    const [title, setTitle] = useState('')
    const [story, setStory] = useState('')
    const [author, setAuthor] = useState('FARmer037')

    const handleSubmit = e => {
        e.preventDefault()
        firestore.collection("stories").doc().set({ title, story, author, createAt: new Date() })
        setTitle('')
        setStory('')
    }

    return (
        <div className='container'>
            <form className='white' onSubmit={handleSubmit}>
                <h5 className='grey-text text-darken-3'>Create new stroy</h5>
                <div className='input-field'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='input-field'>
                    <label htmlFor='story'>Story</label>
                    <textarea id='story' className='materialize-textarea' value={story} onChange={e => setStory(e.target.value)} />
                </div>
                <div className='input-field'>
                    <button className='btn z-depth-0'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateStory
