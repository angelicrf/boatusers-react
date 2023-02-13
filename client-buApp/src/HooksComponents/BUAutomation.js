import React, { useState, useEffect } from 'react';
import UserName from '../FuncComponents/UserName';
import BUNavBar from '../FuncComponents/BUNavBar';
//import { pairBLDevice } from '../JS/bluetoothData'
import { getDhellyDeviceStatus, changeSwitchSttus } from '../JS/shellyApi';

export default function BUAutomation() {
  const [thisValue, setThisValue] = useState('Default');

  const turnOnSwitchProcess = () => {
    changeSwitchSttus('083AF200732c', 'on');
    setThisValue('ON');
  };
  const turnoffSwitchProcess = () => {
    changeSwitchSttus('083AF200732c', 'off');
    setThisValue('OFF');
  };
  return (
    <div>
      <BUNavBar />
      <div>Automation</div>
      <UserName />
      <div
        style={{ width: '360px' }}
        className="container border border-4 border-dark"
      >
        <div className="card">
          <img
            style={{ width: '330px', height: '350px' }}
            className="card-img-top"
            src="https://www.blackwiredesigns.com/wp-content/uploads/ShellyPlugUS.jpg"
            alt="Title"
          />
          <div style={{ backgroundColor: 'lime' }} className="card-body">
            <h4 className="card-title">Shelly Switch</h4>
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
                onClick={turnoffSwitchProcess}
              >
                Off
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
