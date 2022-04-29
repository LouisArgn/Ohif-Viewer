import React, { Component } from 'react';
import './spinner.css';
import { Icon } from '../../../index';

export class Spinner extends Component {
  render() {
    return (
      <div className="spinnerDiv">
        <div className="loader" />
        <Icon name={'wediagnostiX'} className="wediagLoader" />
        <div className="background_logo" />
      </div>
    );
  }
}
