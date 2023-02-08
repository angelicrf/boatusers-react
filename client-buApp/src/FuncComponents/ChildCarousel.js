import Carousel from 'react-bootstrap/Carousel';
import { forwardRef } from 'react';
import React, { Component } from 'react';

const ChildCarousel = forwardRef(({ buElement, buIndex }, ref) => (
    <>
        <Carousel.Item ref={ref}>
            <img
                className="d-block w-100 h-50"
                src={`${buElement}`}
                alt={`${buIndex} Slide`}
                style={{ maxHeight: '550px' }}
            />
            <Carousel.Caption>
                <h3>{`${buIndex} Lable`}</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum. {buIndex}</p>
            </Carousel.Caption>

        </Carousel.Item>
    </>
))
export default ChildCarousel