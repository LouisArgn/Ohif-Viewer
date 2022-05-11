import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { OHIFModal } from '../../ohifModal';
import './resultModificationModal.css';

export const ResultModificationModal = props => {
  const [modifiedResult, setModifiedResult] = useState(props.selectedResult);
  useEffect(() => setModifiedResult(props.selectedResult), [
    props.isModalOpen,
    props.selectedResult,
  ]);
  return (
    <OHIFModal
      title="Modify result"
      shouldCloseOnEsc={true}
      closeButton={true}
      isOpen={props.isModalOpen}
      onClose={() => props.setIsModalOpen(false)}
      style={{ overflow: 'unset', width: '60vw' }}
    >
      <div style={{ display: 'flex', margin: '10px' }}>
        <label style={{ margin: '10px' }}>Dent Zones</label>
        <input
          defaultValue={modifiedResult.teeth}
          className="editInput"
          title="teeth"
          name="Dent / Zones"
          onChange={event => {
            let res = { ...modifiedResult };
            res.teeth = event.target.value;
            setModifiedResult(res);
          }}
        />
      </div>
      <div style={{ display: 'flex', margin: '10px' }}>
        <label style={{ margin: '10px' }}>Description</label>
        <input
          defaultValue={modifiedResult.translation.FR}
          className="editInput"
          title="description"
          name="Description"
          onChange={event => {
            setModifiedResult({ id: modifiedResult.id, teeth: modifiedResult.teeth, translation:{FR:event.target.value} });
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          margin: '20px',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={() => {
            props.handleSave(modifiedResult);
            props.setIsModalOpen(false);
          }}
        >
          {' '}
          Sauvegarder{' '}
        </Button>
      </div>
    </OHIFModal>
  );
};
