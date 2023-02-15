import React from 'react';

export const SmartItemCard = ({
  smartColor,
  smartImg,
  smartTitle,
  smartText,
  smartOnClickOn,
  smartOnClickOff,
}) => {
  return (
    <div>
      <div className="card mx-2 my-2">
        <img
          style={{ width: '330px', height: '350px' }}
          className="card-img-top"
          src={`${smartImg}`}
          alt={`${smartTitle}`}
        />
        <div style={{ backgroundColor: `${smartColor}`}} className="card-body">
          <h4 className="card-title">{smartTitle}</h4>
          <p className="card-text">{smartText}</p>
          <div className="container">
            <div>
              <button className="btn btn-primary" onClick={smartOnClickOn}>
                On
              </button>
            </div>
            <button
              className="btn btn-danger mt-2 mb-2"
              onClick={smartOnClickOff}
            >
              Off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
