import React, { Component } from 'react';
import { ToolbarButton } from '@ohif/ui';

export class Analyze extends Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    // eslint-disable-next-line react/react-in-jsx-scope
    return (
      <div>
        <ToolbarButton label={'Analyze'} icon={'eye'} />
        <button
          onClick={() =>
            this.props.props.analyze(
              this.props.props.activeViewport.StudyInstanceUID,
              this.props.props.studies
            )
          }
        >
          Analyze
        </button>
      </div>
    );
  }
}
