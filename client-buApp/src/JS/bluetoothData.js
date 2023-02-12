export async function pairBLDevice() {
  console.log('paired');
  navigator.bluetooth
    .requestDevice({
      acceptAllDevices: true,
      optionalServices: [
        'battery_service',
        'device_information',
        '0000fe07-0000-1000-8000-00805f9b34fb',
      ],
    })
    .then((device) => {
      console.log(JSON.stringify(device.name));
      //device.addEventListener('gattserverdisconnected', onDisconnected);
      //service 0000fe07-0000-1000-8000-00805f9b34fb
      //charcteristic c44f42b1-f5cf-479b-b515-9f1bb0099c98 write
      //charcteristic c44f42b1-f5cf-479b-b515-9f1bb0099c99 read
      // characteristic c44f42b1-f5cf-479b-b515-9f1bb0099c99 notify-read
      //under
      // descriptor 00002902-0000-1000-8000-00805f9b34fb read-write

      return device.gatt.connect();
    })
    // .then((server) => server.getPrimaryServices())
    .then(
      (thisService) =>
        thisService.getPrimaryService('0000fe07-0000-1000-8000-00805f9b34fb') //00001801-0000-1000-8000-00805f9b34f
    )
    .then(
      (service) =>
        service.getCharacteristic('c44f42b1-f5cf-479b-b515-9f1bb0099c99') //00002a05-0000-1000-8000-00805f9b34fb
    )
    .then((characteristic) => characteristic.startNotifications())
    .then((characteristic) => {
      characteristic.writeValueWithoutResponse(new Uint8Array([0x00000001]));
      characteristic.addEventListener(
        'characteristicvaluechanged',
        handleCharacteristicValueChanged
      );
      setTimeout(() => {
        characteristic.readValue();
      }, 10000);
    })
    .then((_) => {
      console.log('Energy expended has been reset.');
    })
    .catch((error) => {
      console.error(error);
    });
}
function handleCharacteristicValueChanged(event) {
  console.log('Received Value Notification');
  console.log(`Received notification value: ${event.target.value.getUint8(0)}`);
}

function onDisconnected(event) {
  const device = event.target;
  console.log(`Device ${device.name} is disconnected.`);
}
