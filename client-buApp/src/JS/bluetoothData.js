export async function pairBLDevice() {
  let thisData = await runBLEProcess();
}
async function runBLEProcess() {
  // //083AF200732c
  let device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: [
      'battery_service',
      'device_information',
      '5f6d4f53-5f52-5043-5f53-56435f49445f',
    ],
  });
  if (device) {
    console.log(device.name);
    await device.addEventListener('gattserverdisconnected', onDisconnected);
    let server = await device.gatt.connect();
    if (server) {
      let service = await server.getPrimaryService(
        '5f6d4f53-5f52-5043-5f53-56435f49445f'
      );
      let characteristic = await service.getCharacteristic(
        '5f6d4f53-5f52-5043-5f72-785f63746c5f'
      );
      let writeCharacteristic = await service.getCharacteristic(
        '5f6d4f53-5f52-5043-5f64-6174615f5f5f'
      );
      if (characteristic && writeCharacteristic) {
        await writeCharacteristic.writeValue(new Uint8Array([]));
        await writeCharacteristic.writeValue(new Uint8Array([0x00000001]));
        console.log(characteristic.properties);
        await characteristic.startNotifications();
        await characteristic.addEventListener(
          'characteristicvaluechanged',
          handleCharacteristicValueChanged
        );
        await characteristic.readValue();
        let descriptor = await characteristic.getDescriptor(
          '00002902-0000-1000-8000-00805f9b34fb'
        );
        console.log(descriptor);
        let descValue = await descriptor.readValue();
        if (descValue) {
          const decoder = new TextDecoder('utf-8');
          console.log(
            `User Description: ${decoder.decode(descValue)}`,
            descriptor.characteristic.properties.write
          );
          await descriptor.writeValue(new Uint8Array([0x00]));
          await descriptor.writeValue(new Uint8Array([0x0000]));
        }
        console.log(writeCharacteristic.properties);

        await characteristic.readValue();
      }
    }
  }
}
function handleCharacteristicValueChanged(event) {
  console.log(`Received notification value: ${event.target.value.getUint8(0)}`);
  try {
    if (event.target.value.getUint8(1)) {
      console.log(
        `Received notification value: ${event.target.value.getUint8(1)}`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}

function onDisconnected(event) {
  const device = event.target;
  console.log(`Device ${device.name} is disconnected.`);
}
