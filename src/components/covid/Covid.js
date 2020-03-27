import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Covid.css'
import CovidCard from './CovidCard'
import { SUBSCRIPTION_KEY } from '../../environment'

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
    const [countryCode, setCountryCode] = useState('global')
    const [countries, setCountries] = useState([])

    const url = `/coronavirus/stats/${countryCode}`

    const getCovidStats = async () => {
        let config = {
            headers: {
                "Cache-Control": "no-cache",
                "Subscription-Key": SUBSCRIPTION_KEY
            }
        }

        const result = await axios.get(url, config)
        // console.log(result.data)
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

    const getCountryCode = async () => {
        const result = await axios.get(`http://restcountries.eu/rest/v2/`)
        // console.log(result.data)
        setCountries(result.data)
    }

    const chooseCountry = () => {
        const country = countries.filter(c => c.name === search);
        // console.log(...c)
        covertToCountryCode(...country)
    }

    const covertToCountryCode = (country) => {
        // console.log(c.alpha2Code)
        search === '' ? setCountryCode('global') : setCountryCode(country.alpha2Code)
    }

    useEffect(() => {
        getCovidStats()
        getCountryCode()
    }, [countryCode])

    return (
        <div className='covid-container'>
            <h4>Get Covid Stats</h4>
            <div className='search'>
                <input style={{ width: '50%' }} type='text' name='search' placeholder='e.g., US, JP, TH' onChange={e => setSearch(e.target.value)} />
                <button className="waves-effect waves-light btn" onClick={chooseCountry}>search</button>
            </div>

            <div className='show-stats'>
                <CovidCard title='Total Confirmed Cases' value={globalStats.totalConfirmedCases} />
                <CovidCard title='Newly Confirmed Cases' value={globalStats.newlyConfirmedCases} />
                <CovidCard title='Total Deaths' value={globalStats.totalDeaths} />
                <CovidCard title='New Deaths' value={globalStats.newDeaths} />
                <CovidCard title='Total Recovered Cases' value={globalStats.totalRecoveredCases} />
                <CovidCard title='Newly Recovered Cases' value={globalStats.newlyRecoveredCases} />
            </div>

            <p>Update Time : {updatedDateTime}</p>
        </div>
    )
}

export default Covid