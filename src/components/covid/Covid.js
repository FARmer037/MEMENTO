import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Covid = () => {
    const [globalStats, setGlobalStats] = useState({
        totalConfirmedCases: 0,
        newlyConfirmedCases: 0,
        totalDeaths: 0,
        newDeaths: 0,
        totalRecoveredCases: 0,
        newlyRecoveredCases: 0
    })
    const [updatedDateTime, setUpdatedDateTime] = useState('')
    const [search, setSearch] = useState('')
    const [country, setCountry] = useState('global')
    const url = `/coronavirus/stats/${country}`

    const chooseCountry = () => {
        search === '' ? setCountry('global') : setCountry(search)
    }

    const getCovidStats = async () => {
        let config = {
            headers: {
                "Cache-Control": "no-cache",
                "Subscription-Key": ""
            }
        }

        const result = await axios.get(url, config)
        console.log(result.data.stats.breakdowns[0].location)
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
    }, [country])

    return (
        <div>
            <h4>Get Covid Stats</h4>

            <input style={{ width: '50%' }} type='text' name='search' placeholder='e.g., US, JP, TH' onChange={e => setSearch(e.target.value)} />
            <button className="waves-effect waves-light btn" onClick={chooseCountry}>search</button>

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