import React, { useState, useEffect } from 'react';
import UserName from '../FuncComponents/UserName';
import BUNavBar from '../FuncComponents/BUNavBar';
import BUSpinner from '../FuncComponents/BUSpinner';
import { pairBLDevice } from '../JS/bluetoothData';
import { getDhellyDeviceStatus, changeSwitchStatus } from '../JS/shellyApi';

export default function BUAutomation() {
  const [thisValue, setThisValue] = useState('Default');
  const [thisBulbValue, setThisBulbValue] = useState('Default');
  const [isBleBtnClicked, setIsBleBtnClicked] = useState(false);
  const [thisBLEValue, setThisBLEValue] = useState(false);
  const [isErrConnection, setIsErrConnection] = useState(false);

  const turnOnSwitchProcess = () => {
    changeSwitchStatus('083AF200732c', 'on');
    setThisValue('ON');
  };
  const turnoffSwitchProcess = () => {
    changeSwitchStatus('083AF200732c', 'off');
    setThisValue('OFF');
  };
  const turnOnBulbProcess = () => {
    // under construction
    //changeBulbStatus('d16fc7', 'on');
    setThisBulbValue('ON');
  };
  const turnoffBulbProcess = () => {
    //under construnction
    //changeBulbStatus('d16fc7', 'off');
    setThisBulbValue('OFF');
  };
  const getBLEData = async () => {
    try {
      setIsErrConnection(false);
      setThisBLEValue(false);
      setIsBleBtnClicked(true);
      let bleValue = await pairBLDevice();
      console.log('thisBleValue' + bleValue);
      if (bleValue == undefined) {
        setThisBLEValue(true);
      }
    } catch (error) {
      console.log('FromBLEErr ', error);
      setIsErrConnection(true);
      setThisBLEValue(false);
      setIsBleBtnClicked(false);
      alert(
        "Connection issue found...Either \n no shelly device found or connected or \n the administrator didn't set the bluetooth on the device"
      );
    }
  };
  return (
    <div>
      <BUNavBar />
      <div>Automation</div>
      <UserName />
      <div className="container border border-3 rounded border-dark mt-2 mb-2">
        <h3 className="text-danger">Bluetooth Section:</h3>
        <h4>Pair My Shelly Plug</h4>
        <button className="btn btn-info mb-2 mt-2" onClick={getBLEData}>
          Pair -Turn On
        </button>{' '}
        {thisBLEValue ? (
          <div className="text-danger">
            Paired Device is Turned On {thisBLEValue}
          </div>
        ) : isBleBtnClicked && !thisBLEValue && !isErrConnection ? (
          <BUSpinner />
        ) : null}
      </div>
      <div className="container border border-4 border-dark rounded">
        <div className="row">
          <h3 className="text-info">Automation Section:</h3>
          <div className="card col-sm mx-2 my-2">
            <img
              style={{ width: '330px', height: '350px' }}
              className="card-img-top"
              src="https://www.blackwiredesigns.com/wp-content/uploads/ShellyPlugUS.jpg"
              alt="Title"
            />
            <div style={{ backgroundColor: 'lime' }} className="card-body">
              <h4 className="card-title">Shelly Plug</h4>
              <p className="card-text">Switch is {thisValue}</p>
              <div className="container">
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={turnOnSwitchProcess}
                  >
                    On
                  </button>
                </div>
                <button
                  className="btn btn-danger mt-2 mb-2"
                  onClick={turnOnSwitchProcess}
                >
                  Off
                </button>
              </div>
            </div>
          </div>

          <div className="card col-sm mx-2 my-2">
            <img
              style={{ width: '330px', height: '350px' }}
              className="card-img-top"
              src="https://cdn.shopify.com/s/files/1/0665/9211/2889/products/Shelly_DUO_US-1.jpg?v=1668034132&width=600"
              alt="Title"
            />
            <div style={{ backgroundColor: 'beige' }} className="card-body">
              <h4 className="card-title">Shelly Smart Bulb</h4>
              <p className="card-text">Bulb is {thisValue}</p>
              <div className="container">
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={turnOnBulbProcess}
                  >
                    On
                  </button>
                </div>
                <button
                  className="btn btn-danger mt-2 mb-2"
                  onClick={turnoffBulbProcess}
                >
                  Off
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
