import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { TableList, TableListItem, Icon, OHIFModal } from '@ohif/ui';
import makeAnimated from 'react-select/animated';
import './resultPanel.css';

const testAiResult = [
  {
    id: 1,
    teeth: 28,
    translation: { FR: 'Carrie de merde' },
  },
  {
    id: 2,
    teeth: 27,
    translation: { FR: 'Dents incluse dans une armoire' },
  },
  {
    id: 3,
    teeth: 42,
    translation: { FR: "Carte de l'afrique de l'ouest a l'echelle 1/10000eme" },
  },
  {
    id: 4,
    teeth: 18,
    translation: { FR: 'Une dents mais moche' },
  },
];
export const ResultTable = props => {
  const setValidation = list => {
    return list.map(elem => {
      return { ...elem, isValidate: undefined };
    });
  };
  const checkValidation = list => {
    let complete = true;
    list.forEach(elem => {
      if (elem.isValidate === undefined) complete = false;
    });
    return complete;
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: 'blue',
      padding: 20,
    }),
    control: (_, { selectProps: { width } }) => ({
      width: width,
      backgroundColor: 'unset',
    }),
    container: (provided, state) => ({
      ...provided,
      width: '100vw',
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const animatedComponents = makeAnimated();
  const [selectedOption, setSelectedOption] = useState(null);
  const [aiResult, setAiResult] = useState(() =>
    setValidation(testAiResult /* props.getAiResult()*/)
  );
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (checkValidation(aiResult)) {
      setShowGenerateReport(true);
      props.setValidatedResult(aiResult);
    }
  }, [aiResult, props]);

  const validate = (isValidate, id) => {
    let tmp = [...aiResult];
    tmp.forEach(elem => {
      if (elem.id === id) elem.isValidate = isValidate;
    });
    setAiResult(tmp);
  };

  const edit = id => {
    setIsModalOpen(true);
  };

  /** Add the key, value pair  {isValidate: boolean} on each elem in list**/

  // eslint-disable-next-line react/prop-types
  return (
    <div className="resultPanel">
      <TableList>
        {/* eslint-disable-next-line react/prop-types */}
        {aiResult.map(res => (
          // eslint-disable-next-line react/jsx-key
          <TableListItem
            onItemClick={event => {
              event.stopPropagation();
              console.log('ok boy: ' + res.teeth);
            }}
            itemKey={res.id}
            itemMeta={res.teeth}
          >
            {
              <div className="resultContent">
                <div
                  className={
                    res.isValidate === undefined
                      ? 'result'
                      : res.isValidate
                      ? 'validResult'
                      : 'invalidResult'
                  }
                >
                  {res.translation.FR}
                </div>
                <div className="buttonDiv">
                  <div className="editDiv">
                    <Icon
                      name="edit"
                      className="editButton"
                      onClick={event => {
                        event.stopPropagation();
                        console.log('edit' + res.teeth);
                        edit(res.id);
                      }}
                    />
                  </div>
                  <div className="validationDiv">
                    <Icon
                      name="check-circle-o"
                      className="validationButton"
                      onClick={event => {
                        event.stopPropagation();
                        console.log('valider: ' + res.teeth);
                        validate(true, res.id);
                      }}
                    />
                    <Icon
                      name="trash"
                      className="trashButton"
                      onClick={event => {
                        event.stopPropagation();
                        console.log('refuser: ' + res.teeth);
                        validate(false, res.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            }
          </TableListItem>
        ))}
      </TableList>
      <OHIFModal
        title="Modify result"
        shouldCloseOnEsc={true}
        closeButton={true}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        style={{ overflow: 'unset', width: '60vw' }}
      >
        <div style={{ display: 'flex', margin: '10px', width: '50%' }}>
          <label style={{ margin: '10px' }}>Dent / Zones</label>
          <Select
            style={customStyles}
            closeMenuOnSelect={false}
            isMulti
            value={selectedOption}
            onChange={(value)=>setSelectedOption(value)}
            options={options}
            components={animatedComponents}
          />
        </div>
        <div style={{ display: 'flex', margin: '10px', width: '75%' }}>
          <label style={{ margin: '10px' }}>Description</label>
          <input
            style={{ backgroundColor: 'transparent' }}
            title="teeth"
            name="Dent"
          />
        </div>
      </OHIFModal>
      {showGenerateReport ? (
        <div className="generateReport">
          <button
            className="generateReportButton"
            onClick={() => props.generateReport()}
          >
            {' '}
            Generer le rapport{' '}
          </button>
        </div>
      ) : null}
    </div>
  );
};
