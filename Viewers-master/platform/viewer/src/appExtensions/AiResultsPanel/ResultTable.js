import React, { useState } from 'react';
import { TableList, TableListItem, Icon } from '@ohif/ui';
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

  const [aiResult, setAiResult] = useState(() =>
    setValidation(testAiResult /*props.getAiResult()*/)
  );

  const validate = (isValidate, id) => {
    let tmp = [...aiResult];
    tmp.forEach(elem => {
      if (elem.id === id) elem.isValidate = isValidate;
    });
    setAiResult(tmp);
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
      <div>
        <button onClick={() => console.log('mes grosse voeapfig')}>TEST</button>
      </div>
    </div>
  );
};
