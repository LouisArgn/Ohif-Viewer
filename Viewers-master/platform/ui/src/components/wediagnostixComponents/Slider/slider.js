import React from 'react';
import './slider.css';

export const Slider = props => {
  return (
    <div className="divSlider">
      <input
        id="slider"
        className="slider"
        defaultValue="0"
        type="range"
        min="1"
        max="3"
        step="1"
        onChange={event => {
          /*document.getElementById(
            'slider'
          ).style.background = `linear-gradient(to right, var(--default-color) 0%, rgb(236,61,61) ${((event
            .target.value -
            1) /
            (3 - 1)) *
            100}%, #DEE2E6 ${((event.target.value - 1) / (3 - 1)) *
            100}%, #DEE2E6 100%)`;*/
          props.onChange(event.target.value);
        }}
      />

      <div className="tags">
        <p>Specifique</p>
        <p>Optimal</p>
        <p>Sensible</p>
      </div>
    </div>
  );
};
