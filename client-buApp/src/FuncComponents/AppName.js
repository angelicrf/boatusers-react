import { useEffect, useState } from 'react'
import { BUContext } from '../Store/ContextProvider'
import React, { Component } from 'react'

export default function APPName({ changeSetName }) {
  let { appName, changeName } = BUContext()
  const postData = (thisData) => {
    fetch('http://localhost:5000/api/map/data', {
      body: JSON.stringify({ thisData }),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // *manual, follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
      .then(function (response) {
        return response.json() // parses json
      })
      .then(function (myJson) {
        console.log(myJson)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    let thisValue = changeSetName
    console.log(`${thisValue}`)
    changeName(thisValue)
    postData(thisValue)
  }, [])

  return appName ? <div>{appName}</div> : <div>No name</div>
}
