import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  addMarker,
  displayMap,
  findMyLocation,
  markedPlaces,
  searchLocation,
  directionSetUp,
  convertNametoLongLat,
} from '../JS/mapData'
import React, { Component } from 'react'
import UserName from '../FuncComponents/UserName'

export default function BUMap() {
  const [thisData, setThisData] = useState('')
  const [isClicked, setIsClicked] = useState('')
  const [isMarkersData, setIsMarkersData] = useState(false)
  const [isSearchMarkerData, setIsSearchMarkerData] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')

  const buNavigate = useNavigate()

  useEffect(() => {
    console.log(
      `useEffetSearchMarker ${isSearchMarkerData} and useEffectMarkers ${isMarkersData} `,
    )
    if (isSearchMarkerData || isMarkersData) {
      let thisUrl = ''
      isSearchMarkerData
        ? (thisUrl = 'http://localhost:5000/api/map/marker/data')
        : isMarkersData
        ? (thisUrl = 'http://localhost:5000/api/map/markers/data')
        : (thisUrl = '')
      // condition to identidy the search and all markers
      if (thisUrl !== '') {
        fetch(`${thisUrl}`, {
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'content-type': 'application/json',
          },
          method: 'GET',
          mode: 'cors',
          redirect: 'follow',
          referrer: 'no-referrer',
        })
          .then(function (response) {
            return response.json()
          })
          .then(function (myJson) {
            console.log(`fromget ${JSON.stringify(myJson)}`)
            if (!myJson.err) {
              console.log('entered')
              myJson.success.map((d) => {
                buNavigate('/MapLocInfo', {
                  state: {
                    locName: d.markerName,
                    locId: d.markerId,
                    locCenter: d.markerCenter,
                    locImg: d.markerLocImg,
                  },
                })
              })
            }
          })
          .catch((err) => console.log(err))
      }
    }
  }, [isSearchMarkerData, isMarkersData])
  const getSearchInputValue = (event) => {
    event.preventDefault()
    console.log(searchInputValue)
  }
  const handleOnChangeValue = (event) => {
    event.persist()
    setSearchInputValue(event.target.value)
  }
  const getDataValue = () => {
    fetch('http://localhost:5000/api/map/data', {
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        myJson.success.map((d) => setThisData(d.thisData))
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <UserName />
      <button
        type='button'
        className='btn btn-primary'
        onClick={() => setIsClicked(true)}
      >
        Get Data
      </button>

      {isClicked ? getDataValue() : <div>Not Clicked</div>}
      {thisData !== null ? <div>{thisData}</div> : <div>Not Data</div>}

      <div id='buMap' style={{ width: 400, height: 300 }}></div>
      <button
        type='button'
        className='btn btn-primary'
        onClick={async () => {
          let resultData = await searchLocation()
          if (resultData) setIsSearchMarkerData(true)
        }}
      >
        Display Map
      </button>
      <div className='mt-2 mb-2'>
        <button
          type='button'
          className='btn btn-danger'
          onClick={async () => {
            let resultMarketData = await markedPlaces()
            if (resultMarketData) setIsMarkersData(true)
          }}
        >
          Display Markers
        </button>
      </div>
      <form className='mt-3 needs-validation' onSubmit={getSearchInputValue}>
        <label>Search:</label>
        <br />
        <div className='row d-flex justify-content-center'>
          <input
            className='col-md-6'
            type='text'
            value={searchInputValue}
            onChange={handleOnChangeValue}
            required
          />
        </div>
        <div className='row d-flex justify-content-center mt-2'>
          <input
            className='btn btn-danger col-md-4'
            type='submit'
            value='Submit'
          />
        </div>
      </form>
      <div className='mt-2'>
        <button
          type='button'
          className='btn btn-info'
          onClick={async () => {
            let arrayCenter = await convertNametoLongLat(searchInputValue)
            console.log(arrayCenter)
          }}
        >
          Test Convert
        </button>
      </div>
    </div>
  )
}
