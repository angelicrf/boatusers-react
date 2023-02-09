import Spinner from 'react-bootstrap/Spinner';
import React, { Component } from 'react';

export default function BUSpinner() {

    return (
        <Spinner animation="border" role="status">
            <span style={{ display: 'none' }}>Loading...</span>
        </Spinner>
    );
}
