import React from 'react';
import './spinner.css';
import { Icon } from '../../../index';

export const Spinner = props => {
  return (
    <div className="spinnerDiv">
      <div className="loader" />
      <Icon name={'wediagnostiX'} className="wediagLoader" />
      <div className="background_logo" />
    </div>
  );
};
