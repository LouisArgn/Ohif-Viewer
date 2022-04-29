import React, { useState } from 'react';
import './checkbox.css';

export const Checkbox = props => {
  const [label, setLabel] = useState(props.label);
  const [isChecked, setChecked] = useState(props.isChecked);
  const [selector, setSelector] = useState();

  const toggleCheckboxChange = event => {
    setChecked(!isChecked);
    props.onChange(event);
  };
  const { id, type, hasError, name } = props;
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
        ref={el => setSelector(el)}
        id={id}
        checked={isChecked}
        onChange={event => toggleCheckboxChange(event)}
        name={name}
      />
      <label className={labelClassname} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
