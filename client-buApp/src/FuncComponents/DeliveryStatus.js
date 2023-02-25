import React, { useEffect, useState } from 'react'

const DeliveryStatus = () => {
  const [progessbarValue, setProgressbarValue] = useState(0)
  const [progressMsg, setProgresMsg] = useState('')
  const [deliveryMsg, setDeliveryMsg] = useState('')
  const [progessBtn, setProgressBtn] = useState(false)
  const [buFacilityName, setBuFacilityName] = useState('')
  const [audio, setAudio] = useState(new Audio(''))

  useEffect(() => {
    if (buFacilityName !== undefined && progessBtn) {
      updateProgressbarValue(mockData, buFacilityName)
      setProgressBtn(false)
    }
    if (audio.src !== 'http://localhost:3000/Cart') {
      console.log(audio.src)
      audio.play()
      setAudio(new Audio(''))
    }
  }, [buFacilityName, progessBtn])

  // mongodb database based on the facilities lat and long and user destination
  const mockData = [
    {
      boatUsersFacilities: [
        'Fort Lauderdale',
        'Boca Raton',
        'West Palm Beach',
        'Miami',
      ],
    },
  ]
  const submitProgress = (e) => {
    e.preventDefault()
    console.log(buFacilityName)
    setProgressBtn(true)
  }
  const updateProgressbarValue = (thisMockData, thisFacilityName) => {
    let thisValue = 1
    if (thisMockData) {
      thisMockData[0].boatUsersFacilities.map((md, i) => {
        if (md.toLowerCase() == buFacilityName.toLowerCase()) {
          switch (thisFacilityName) {
            case 'miami':
              setAudio(
                new Audio(
                  'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg',
                ),
              )
              setProgressbarValue(thisValue * 10 * 10)
              setDeliveryMsg('Package left the Facility')
              setProgresMsg('Ordered')
              break
            case 'boca raton':
              setAudio(
                new Audio(
                  'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg',
                ),
              )
              setProgressbarValue(thisValue * 15 * 10)
              setDeliveryMsg('Package arrived at a carrier facility')
              setProgresMsg('Shipped')
              break
            case 'fort lauderdale':
              setAudio(
                new Audio(
                  'https://actions.google.com/sounds/v1/cartoon/clown_slide_sound_effects.ogg',
                ),
              )
              setProgressbarValue(thisValue * 20 * 10)
              setDeliveryMsg(
                'Package transfered to another facility to delivery',
              )
              setProgresMsg('Out for delivery')
              break
            case 'west palm beach':
              setAudio(
                new Audio(
                  'https://actions.google.com/sounds/v1/cartoon/slap_with_glove.ogg',
                ),
              )
              setProgressbarValue(thisValue * 25 * 10)
              setDeliveryMsg('Package delivered')
              setProgresMsg('Delivered')
              break
            default:
              break
          }
        }
      })
    }
  }

  return (
    <div>
      <div className='blockquote-footer mt-3'>
        <span>&copy;</span> 2023 All Rights Reserved by{' '}
        <span className='text-danger'>
          {' '}
          <cite title='Boat Users'>BoatUsers</cite>
        </span>
      </div>
      <div className='container bg-info rounded mt-2 mb-2'>
        <p>Enter one of these locations: 'Fort Lauderdale',</p>
        <p> 'Boca Raton', 'West Palm Beach', 'Miami'</p>
        <div>
          <form onSubmit={submitProgress} name='signin_form'>
            <input
              type='text'
              value={buFacilityName}
              required
              placeholder='facility name'
              onChange={(e) => setBuFacilityName(e.target.value)}
            />
            <button
              style={{ float: 'right', width: '125px' }}
              className='btn btn-primary'
              type='submit'
            >
              Search
            </button>
          </form>
        </div>
        <div className='py-2'>
          Delivery Status:
          <div className='progress'>
            <div
              className='progress-bar progress-bar-striped progress-bar-animated'
              role='progressbar'
              aria-valuenow={progessbarValue}
              aria-valuemin='0'
              aria-valuemax='100'
              style={{ width: `${progessbarValue}px` }}
            >
              {progressMsg}
            </div>
          </div>
        </div>
        {deliveryMsg !== '' ? (
          <div>
            <div className='text-danger fw-bold'>{deliveryMsg}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default DeliveryStatus
