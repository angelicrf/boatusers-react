export async function pairBLDevice() {
  let thisData = await runBLEProcess();
}
const createDelay = () => {
  return new Promise((resolve) => setTimeout(resolve, 10000));
};
async function connectBLEDevice() {
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
    device.addEventListener('gattserverdisconnected', onDisconnected);
    return device.gatt.connect();
  }
}
async function runBLEProcess() {
  return new Promise(async (resolve, reject) => {
    try {
      let server = await connectBLEDevice();
      if (server) {
        console.log('connected...');
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
          await characteristic.startNotifications();
          await characteristic.addEventListener(
            'characteristicvaluechanged',
            handleCharacteristicValueChanged
          );
          try {
            await writeCharacteristic.writeValue(new Uint8Array([]));
            try {
              await characteristic.readValue();
            } catch (error) {
              console.log('ReadEmptyValueErr ', error.message);
            }
          } catch (error) {
            console.log('EmptyValueErr ', error.message);
          }
          createDelay();
          try {
            await writeCharacteristic.writeValue(new Uint8Array([0x01]));
            try {
              await characteristic.readValue();
            } catch (error) {
              console.log('ReadFirstValueErr ', error.message);
            }
          } catch (error) {
            console.log('FirstValueErr ', error.message);
          }
          createDelay();
          try {
            await writeCharacteristic.writeValue(new Uint8Array([0x01]));
          } catch (error) {
            console.log('SecondValueErr ', error.message);
            try {
              await characteristic.readValue();
            } catch (error) {
              console.log('ReadSecondValueErr ', error.message);
              setTimeout(() => {
                console.log('enteredtoresolve..');
                resolve();
              }, 30000);
            }
          }
        }
      }
    } catch (error) {
      console.log('ConnectionErr', error.message);
      reject(error.message);
    }
  });
}
function handleCharacteristicValueChanged(event) {
  console.log(
    `Received notification valueOne: ${event.target.value.getUint8(0)}`
  );
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
