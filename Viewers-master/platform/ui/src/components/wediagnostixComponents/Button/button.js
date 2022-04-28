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
          console.log('test button on click');
          console.log(this.props);
          this.props.onClick();
        }}
      >
        {this.props.children}
      </button>
    );
  }
}
