import React, { useEffect, useState } from 'react';
import { TableList, TableListItem, Icon, Slider } from '@ohif/ui';
import './resultPanel.css';
import { ResultModificationModal } from '@ohif/ui/src/components/wediagnostixComponents/ResultModificationModal/resultModificationModal';

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

const precisionDict = ['Specific', 'Optimal', 'Sensible'];
export const ResultTable = props => {
  const setValidation = list => {
    return list.map(elem => {
      {
        return elem.isValidate === undefined
          ? { ...elem, isValidate: undefined }
          : elem;
      }
    });
  };
  const checkValidation = list => {
    let complete = true;
    list.forEach(elem => {
      if (elem.isValidate === undefined) complete = false;
    });
    return complete;
  };
  const [selectedResult, setSelectedResult] = useState({
    id: -1,
    teeth: -1,
    translation: { FR: '' },
  });
  const [aiResult, setAiResult] = useState(() => {
    console.log('test useState aiResult');
    let result = props.getAiResult();
    return setValidation(result);
    // return setValidation(testAiResult);
  });
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (checkValidation(aiResult)) {
      setShowGenerateReport(true);
      props.setValidatedResult(aiResult);
    } else setShowGenerateReport(false);
  }, [aiResult, props]);

  const validate = (isValidate, id) => {
    let tmp = [...aiResult];
    tmp.forEach(elem => {
      if (elem.id === id) elem.isValidate = isValidate;
    });
    setAiResult(tmp);
  };

  const edit = res => {
    setSelectedResult({
      id: res.id,
      teeth: res.teeth,
      translation: res.translation,
    });
    setIsModalOpen(true);
  };

  const handleValueChange = value => {
    console.log(precisionDict[parseInt(value) - 1]);
    props.setValidatedResult(aiResult);
    props.setResultPrecision(precisionDict[parseInt(value) - 1]);
    const event = new CustomEvent('resetRectangle');
    window.dispatchEvent(event);
  };

  const handleSave = modifiedResult => {
    console.log('saving change');
    const modifiedResultList = aiResult.map(result => {
      if (result.id === modifiedResult.id) {
        const tmp = {
          Zones: [],
          anatomy: [],
          id: modifiedResult.id,
          isValidate: true,
          pos: {},
          show_on_image: false,
          show_on_report: result.show_on_report,
          subtype: '-1',
          teeth: modifiedResult.teeth,
          translation: { FR: modifiedResult.translation.FR }, //TODO change the translation corresponding to the current language used by the app
          type: '',
        };
        console.log(tmp);
        return tmp;
      }
      console.log(result);
      return result;
    });
    console.log(modifiedResultList);
    setAiResult(modifiedResultList);
  };
  window.addEventListener('precisionChanged', event => {
    let res = props.getAiResult();
    setAiResult(setValidation(res));
    event.stopImmediatePropagation();
  });

  /** Add the key, value pair  {isValidate: boolean} on each elem in list**/
  // eslint-disable-next-line react/prop-types
  return (
    <div className="resultPanel">
      <TableList customHeader={<Slider onChange={handleValueChange}></Slider>}>
        {/* eslint-disable-next-line react/prop-types */}
        {aiResult.map(res => (
          // eslint-disable-next-line react/jsx-key
          <TableListItem
            itemClass={res.id === selectedResult.id ? 'Selected' : ''}
            onItemClick={event => {
              event.stopPropagation();
              if (res.id === selectedResult.id) {
                let resetEvent = new CustomEvent('resetRectangle');
                window.dispatchEvent(resetEvent);
                setSelectedResult({
                  id: -1,
                  teeth: -1,
                  translation: { FR: '' },
                });
              } else {
                let drawEvent = new CustomEvent('drawRectangle', {
                  detail: {
                    diseaseId: res.id,
                  },
                });
                window.dispatchEvent(drawEvent);
                setSelectedResult(res);
              }
            }}
            itemKey={res.id}
            itemMeta={res.teeth}
          >
            {
              <div className="resultContent">
                <div
                  className={
                    res.isValidate === undefined
                      ? res.id === selectedResult.id
                        ? 'selectedResult'
                        : 'result'
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
                        edit({ ...res });
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
                        props.setValidatedResult(aiResult);
                      }}
                    />
                    <Icon
                      name="trash"
                      className="trashButton"
                      onClick={event => {
                        event.stopPropagation();
                        console.log('refuser: ' + res.teeth);
                        validate(false, res.id);
                        props.setValidatedResult(aiResult);
                      }}
                    />
                  </div>
                </div>
              </div>
            }
          </TableListItem>
        ))}
      </TableList>
      <ResultModificationModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        handleSave={handleSave}
        selectedResult={selectedResult}
      />
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
