export function changeSwitchSttus(thisId, thisStat) {
  //083AF200732c
  //d16fc7
  var formdata = new FormData();
  formdata.append('id', `${thisId}`);
  formdata.append(
    'auth_key',
    'MTI1ZTUxdWlk313324368034E660810695C659D04F94E5270FA0EBF9E26F8FD9E027EC4310CE61A996667BB70DE8'
  );
  formdata.append('turn', `${thisStat}`);
  formdata.append('channel', '0');

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(
    'https://shelly-48-eu.shelly.cloud/device/relay/control',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
}

export function getDhellyDeviceStatus(thisId) {
  //083AF200732c
  //d16fc7
  var formdata = new FormData();
  formdata.append('id', `${thisId}`);
  formdata.append(
    'auth_key',
    'MTI1ZTUxdWlk313324368034E660810695C659D04F94E5270FA0EBF9E26F8FD9E027EC4310CE61A996667BB70DE8'
  );

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch('https://shelly-48-eu.shelly.cloud/device/status', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
}
