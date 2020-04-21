import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Covid.css'
import CovidCard from './CovidCard'
import { SUBSCRIPTION_KEY } from '../../environment'
import { Row, Col, Typography, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Autocomplete from 'react-autocomplete'

const { Title } = Typography;

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
        setCountries(result.data)
    }

    const chooseCountry = () => {
        const country = countries.filter(c => c.name === search);
        covertToCountryCode(...country)
    }

    const covertToCountryCode = (country) => {
        !country || search === '' ? setCountryCode('global') : setCountryCode(country.alpha2Code)
    }

    const renderMovieTitle = (state, val) => {
        return (
            state.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
        );
    }

    const showLabel = () => {
        if (search) 
            return search
        else
            return 'Glabal'
    }

    useEffect(() => {
        getCovidStats()
        getCountryCode()
    }, [countryCode])

    return (
        <>
            <Row>
                <Col span={12} offset={6} >
                    <Title style={{ textAlign: 'center', margin: '20px 0' }}>Covid-19 Stats</Title>
                    <div className='search-box'>
                        <dvi className='autocomplete-wrapper'>
                            <Autocomplete
                                value={search}
                                items={countries}
                                getItemValue={item => item.name}
                                shouldItemRender={renderMovieTitle}
                                renderMenu={item => (
                                    <div className="dropdown">
                                        {item}
                                    </div>
                                )}
                                renderItem={(item, isHighlighted) =>
                                    <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                                        {item.name}
                                    </div>
                                }
                                onChange={(event, val) => setSearch(val)}
                                onSelect={val => setSearch(val)}
                            />
                        </dvi>
                        <Button type="primary" icon={<SearchOutlined />} onClick={chooseCountry}>
                            Search
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6}>
                    <Title level={2} type="secondary" style={{ textAlign: 'center', margin: '20px 0' }}>- {showLabel()} -</Title>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6} >
                    <div className='show-stats'>
                        <CovidCard title='Total Confirmed Cases' value={globalStats.totalConfirmedCases} />
                        <CovidCard title='Newly Confirmed Cases' value={globalStats.newlyConfirmedCases} />
                        <CovidCard title='Total Deaths' value={globalStats.totalDeaths} />
                        <CovidCard title='Newly Deaths' value={globalStats.newDeaths} />
                        <CovidCard title='Total Recovered Cases' value={globalStats.totalRecoveredCases} />
                        <CovidCard title='Newly Recovered Cases' value={globalStats.newlyRecoveredCases} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6} style={{ textAlign: 'center' }}>
                    <p>Update Time : {updatedDateTime}</p>
                </Col>
            </Row>
        </>
    )
}

export default Covid