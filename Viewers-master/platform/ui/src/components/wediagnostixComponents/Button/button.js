import React from 'react';
import './button.css';

export const Button = props => {
  return (
    <button
      className={'rounded'}
      onClick={() => {
        console.log('test button on click');
        console.log(props);
        props.onClick();
      }}
    >
      {props.children}
    </button>
  );
};
