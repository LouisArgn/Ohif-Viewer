import React, { Component } from 'react';
import './divider.css';
export class Divider extends Component {
  state = {
    title: '',
    size: 'm',
  };
  constructor(props) {
    super(props);
    this.state.title = props.children;
    this.state.size = props.size ? props.size : 'm';
    console.log(this.state);
  }
  render() {
    const containerClassname = `container-${this.state.size}`;
    const borderClassname = `border-${this.state.size}`;
    return (
      <div className={containerClassname}>
        <div className={borderClassname} />
        <span className="content">{this.state.title}</span>
        <div className={borderClassname} />
      </div>
    );
  }
}
