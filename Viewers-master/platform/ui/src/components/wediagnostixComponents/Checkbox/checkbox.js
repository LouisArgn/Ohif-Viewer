import React, { Component } from 'react';
import './checkbox.css';

export class Checkbox extends Component {
  state = {
    isChecked: false,
    label: '',
  };
  constructor(props) {
    super(props);
    this.state.label = props.label;
    this.state.isChecked = props.isChecked;
  }
  toggleCheckboxChange(event) {
    this.setState(({ isChecked }) => ({
      isChecked: !isChecked,
    }));

    this.props.onChange(event);
  }
  render() {
    const {
      id,
      label,
      type,
      hasError,
      name,
    } = this.props;
    const checkboxClassname = `
      m-checkbox
      ${type === 'switch' && 'm-checkbox--switch'}
      ${hasError && 'm-checkbox--has-error'}
    `;

    const inputClassname = `
      m-checkbox__input
      ${type === 'switch' && 'm-checkbox--switch__input'}
      ${hasError && 'm-checkbox--has-error__input'}
    `;

    const labelClassname = `
      m-checkbox__label
      ${type === 'switch' && 'm-checkbox--switch__label'}
    `;

    return (
      <div className={checkboxClassname}>
        <input
          type="checkbox"
          className={inputClassname}
          ref={el => (this.selector = el)}
          id={id}
          checked={this.state.isChecked}
          onChange={ (event) => this.toggleCheckboxChange(event) }
          name={name}
        />
        <label className={labelClassname} htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
}
