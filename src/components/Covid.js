import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Covid = () => {
    const getCovidStats = async () => {
        let config = {
            headers: {
                "Cache-Control": "no-cache",
                "Subscription-Key": "0e142d3ec4bb4a78af9dbe7285b44170"
            }
        }

        const result = await axios.get(`/coronavirus/stats/global`, config)
        console.log(result.data)
    }

    useEffect(() => {
        getCovidStats()
    }, [])

    return (
        <div>
            <h4>Get Covid Stats</h4>
        </div>
    )
}

export default Covid