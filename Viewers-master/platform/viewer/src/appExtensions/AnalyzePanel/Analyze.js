import React, { Component } from 'react';
import { Checkbox, Divider, Button, Spinner } from '@ohif/ui';
import './analyzePanel.css';
export class Analyze extends Component {
  constructor(props) {
    super(props);
    this.state = { examIndication: [], spinner: false };
  }
  handleReasonChange(event) {
    console.log(event.target.value);
    console.log(event.target.name);
    console.log(event.target.id);
  }
  activateSpinner() {
    this.setState({ spinner: true });
    console.log(this.state);
  }
  render() {
    // eslint-disable-next-line react/react-in-jsx-scope
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.state.spinner ? (
          <Spinner />
        ) : (
          <div>
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
            <Divider>Autorisation du patient</Divider>
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
                  this.activateSpinner();
                  // eslint-disable-next-line react/prop-types
                  /*this.props.props.analyze(
      this.props.props.activeViewport.StudyInstanceUID,
      this.props.props.studies
    );*/
                }}
              >
                Analyze
              </Button>
            </div>
          </div>
        )}
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
    );
  }
}
