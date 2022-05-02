import React, { useEffect, useState } from 'react';
import { Checkbox, Divider, Button, Spinner } from '@ohif/ui';
import './analyzePanel.css';

export const Analyze = props => {
  const [examIndication, setExamIndication] = useState([]);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState(() => props.getAiResult());
  useEffect(() => {
    setIsSpinnerOpen(false);
  }, [props.isOpen]);

  window.addEventListener("resultReady", () => {
    console.log("Results are ready");
    setIsSpinnerOpen(false);
  });

  const handleReasonChange = event => {
    console.log(event.target.value);
    console.log(event.target.name);
    console.log(event.target.id);
  };
  const activateSpinner = () => {
    setIsSpinnerOpen(true);
  };
  //ipcRenderer.on('are_results_ready', async () => console.log('results ready !!!!!!!!!'));
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {isSpinnerOpen ? (
        <Spinner />
      ) : (
        <div>
          <Divider>Indication de l'examen</Divider>
          <Checkbox
            id="BD"
            label="Bilan dentaire"
            isChecked={true}
            onChange={event => handleReasonChange(event)}
            name="Bilan dentaire"
          />
          <Checkbox
            id="BDS"
            label="Bilan dents de sagesses"
            name="Bilan dents de sagesses"
            onChange={event => handleReasonChange(event)}
          />
          <Checkbox
            id="RFI"
            label="Recherche de foyers infectieux"
            name="Recherche de foyers infectieux"
            onChange={event => handleReasonChange(event)}
          />
          <Checkbox
            id="BO"
            label="Bilan orthodontique"
            name="Bilan orthodontique"
            onChange={event => handleReasonChange(event)}
          />
          <Checkbox
            id="Au"
            label="Autre"
            name="Autre"
            onChange={event => handleReasonChange(event)}
          />
          <Divider>Autorisation du patient</Divider>
          <Checkbox
            id="UC"
            label="Authoriser l'utilisation de la radio pour améliorer l'IA"
            type="switch"
            onChange={event => handleReasonChange(event)}
            name={"Authoriser l'utilisation de la radio pour améliorer l'IA"}
          />
          <div className={'center'}>
            <Button
              onClick={() => {
                activateSpinner();
                // eslint-disable-next-line react/prop-types
                console.log(props);
                props.analyze(
                  props.activeViewport.StudyInstanceUID,
                  props.studies
                );
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
};
