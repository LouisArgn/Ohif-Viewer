import React, { Component } from 'react';
import { ToolbarButton, Checkbox } from '@ohif/ui';

export class Analyze extends Component {
  static defaultProps = {
    examIndications: [],
  };
  constructor(props) {
    super(props);
    console.log(props);
  }

  handleReasonChange(event) {
    console.log(event.target.value);
    console.log(event.target.name);
    console.log(event.target.id);
  }

  render() {
    // eslint-disable-next-line react/react-in-jsx-scope
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <ToolbarButton label={'Analyze'} icon={'eye'} />
        </div>
        <div>
          <Checkbox
            id="BD"
            label="Bilan dentaire"
            isChecked={true}
            onChange={event => this.handleReasonChange(event)}
            name="Bilan dentaire"
          />
          <Checkbox
            id="BDS"
            label="Bilan dents de sagesses"
            name="Bilan dents de sagesses"
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="RFI"
            label="Recherche de foyers infectieux"
            name="Recherche de foyers infectieux"
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="BO"
            label="Bilan orthodontique"
            name="Bilan orthodontique"
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="Au"
            label="Autre"
            name="Autre"
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="UC"
            label="User consent"
            type="switch"
            onChange={event => this.handleReasonChange(event)}
          />
        </div>

        <div>
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
      </div>
    );
  }
}
