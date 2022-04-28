import React, { Component } from 'react';
import { Checkbox, Divider, Button } from '@ohif/ui';
import './analyzePanel.css';
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
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Divider>Indication de l'examen</Divider>
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
        <Divider>Authorisation du patient</Divider>
        <Checkbox
          id="UC"
          label="Authoriser l'utilisation de la radio pour améliorer l'IA"
          type="switch"
          onChange={event => this.handleReasonChange(event)}
          name={"Authoriser l'utilisation de la radio pour améliorer l'IA"}
        />
        <div className={'center'}>
          <Button
            onClick={() => {
              // eslint-disable-next-line react/prop-types
              this.props.analyze(
                this.props.activeViewport.StudyInstanceUID,
                this.props.studies
              );
            }}
          >
            TEST
          </Button>
          {/*<RoundedButtonGroup
            options={[
              {
                value: 'Analyze',
                icon: 'eye',
                bottomLabel: 'Analyze',
              },
            ]}
            value={'analyze'}
            onValueChanged={() => {
              // eslint-disable-next-line react/prop-types
              this.props.analyze(
                this.props.activeViewport.StudyInstanceUID,
                this.props.studies
              );
            }}
          />*/}
        </div>
      </div>
    );
  }
}
