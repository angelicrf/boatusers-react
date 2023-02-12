export async function pairBLDevice() {
  console.log('paired')
  navigator.bluetooth
    .requestDevice({
      acceptAllDevices: true,
      optionalServices: ['battery_service'],
    })
    .then((device) => {
      console.log(JSON.stringify(device))
      device.addEventListener('gattserverdisconnected', onDisconnected)
      //return device.gatt.connect()
    })
    /*     .then((server) => server.getPrimaryService('heart_rate'))
    .then((service) => service.getCharacteristic('heart_rate_measurement'))
    .then((characteristic) => characteristic.startNotifications())
    .then((characteristic) => {
      characteristic.addEventListener(
        'characteristicvaluechanged',
        handleCharacteristicValueChanged,
      )
      console.log('Notifications have been started.')
    }) */
    .catch((error) => {
      console.error(error)
    })
}
function handleCharacteristicValueChanged(event) {
  const value = event.target.value
  console.log('Received Notification' + value)
}
function onDisconnected(event) {
  const device = event.target
  console.log(`Device ${device.name} is disconnected.`)
}
