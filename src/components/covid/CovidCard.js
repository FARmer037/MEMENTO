import React from 'react'
import './CovidCard.css'

const CovidCard = (props) => {
    const {title, value} = props
    return (
        <div className='covid-card'>
            <div className='title'>{title}</div>
            <div className='value'>{value}</div>
        </div>
    )
}

export default CovidCard
