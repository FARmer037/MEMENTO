import React, { useState } from 'react'
import { firestore } from '../../index'
import { useDispatch, useSelector } from 'react-redux'

const CreateStory = () => {
    const [author, setAuthor] = useState('FARmer037')

    const dispatch = useDispatch()
    const form = useSelector(state => state.form)
    const story = useSelector(state => state.story)

    const handleSubmit = e => {
        e.preventDefault()
        firestore.collection("stories").doc().set({ title: form.title, story: form.story, author, createAt: new Date() })
        dispatch({ type: 'RESET_TITLE', title: '' })
        dispatch({ type: 'RESET_STORY', story: '' })
    }

    return (
        <div className='container'>
            <form className='white' onSubmit={handleSubmit}>
                <h5 className='grey-text text-darken-3'>Create new stroy</h5>
                <div className='input-field'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' value={form.title} onChange={e => dispatch({ type: 'CHANGE_TITLE', title: e.target.value })} />
                </div>
                <div className='input-field'>
                    <label htmlFor='story'>Story</label>
                    <textarea id='story' className='materialize-textarea' value={form.story} onChange={e => dispatch({ type: 'CHANGE_STORY', story: e.target.value })} />
                </div>
                <div className='input-field'>
                    <button className='btn z-depth-0'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateStory
