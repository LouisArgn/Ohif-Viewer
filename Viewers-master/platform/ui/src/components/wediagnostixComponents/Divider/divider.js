import React, { useState } from 'react';
import './divider.css';
export const Divider = props => {
  const [size, setSize] = useState(props.size ? props.size : 'm');
  const [title, setTitle] = useState(props.children);

  const containerClassname = `container-${size}`;
  const borderClassname = `border-${size}`;
  return (
    <div className={containerClassname}>
      <div className={borderClassname} />
      <span className="content">{title}</span>
      <div className={borderClassname} />
    </div>
  );
};
