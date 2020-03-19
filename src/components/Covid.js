import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Covid = () => {
    const [covidStats, setCovidStats] = useState({})

    const getCovidStats = async () => {
        // let config = {
        //     headers: {
        //         "Cache-Control": "no-cache",
        //         "Subscription-Key": "0e142d3ec4bb4a78af9dbe7285b44170"
        //     }
        // }

        // const result = await axios.get(`https://api.smartable.ai/coronavirus/stats/global`, config)
        // console.log(result)

        const result = await axios.get(`https://corona.lmao.ninja/all`)
        console.log(result.data)
        setCovidStats(result.data)
    }

    useEffect(() => {
        getCovidStats()
    }, [])

    return (
        <div>
            <h4>Get Covid Stats</h4>
            <p>Case: {covidStats.cases}</p>
            <p>Deaths: {covidStats.deaths}</p>
            <p>Recovered: {covidStats.recovered}</p>
        </div>
    )
}

export default Covid