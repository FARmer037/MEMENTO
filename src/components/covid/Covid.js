import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Covid = () => {
    const [stats, setStats] = useState({})
    const [globalStats, setGlobalStats] = useState({
        totalConfirmedCases: 0,
        newlyConfirmedCases: 0,
        totalDeaths: 0,
        newDeaths: 0,
        totalRecoveredCases: 0,
        newlyRecoveredCases: 0
    })
    const [updatedDateTime, setUpdatedDateTime] = useState('')

    const getCovidStats = async () => {
        let config = {
            headers: {
                "Cache-Control": "no-cache",
                "Subscription-Key": ""
            }
        }

        const result = await axios.get(`/coronavirus/stats/global`, config)
        console.log(result.data)
        setStats(result.data)
        setGlobalStats({
            totalConfirmedCases: result.data.stats.totalConfirmedCases,
            newlyConfirmedCases: result.data.stats.newlyConfirmedCases,
            totalDeaths: result.data.stats.totalDeaths,
            newDeaths: result.data.stats.newDeaths,
            totalRecoveredCases: result.data.stats.totalRecoveredCases,
            newlyRecoveredCases: result.data.stats.newlyRecoveredCases
        })
        setUpdatedDateTime(result.data.updatedDateTime)
    }

    useEffect(() => {
        getCovidStats()
    }, [])

    return (
        <div>
            <h4>Get Covid Stats</h4>
            <p>Total Confirmed Cases : {globalStats.totalConfirmedCases}</p>
            <p>Newly Confirmed Cases : {globalStats.newlyConfirmedCases}</p>
            <p>Total Deaths : {globalStats.totalDeaths}</p>
            <p>New Deaths : {globalStats.newDeaths}</p>
            <p>Total Recovered Cases : {globalStats.totalRecoveredCases}</p>
            <p>Newly Recovered Cases : {globalStats.newlyRecoveredCases}</p>

            <p>Update Time : {updatedDateTime}</p>
        </div>
    )
}

export default Covid