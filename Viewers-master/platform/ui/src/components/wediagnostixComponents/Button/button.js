import React, { Component } from 'react';
import './button.css';

export class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        className={'rounded'}
        onClick={() => {
          console.log(this.props);
          this.props.onClick();
        }}
      >
        Analyser
      </button>
    );
  }
}
