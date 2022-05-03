import React, { useEffect, useState } from 'react';
import { TableList, TableListItem, Icon } from '@ohif/ui';
import './resultPanel.css';

export const ResultTable = props => {
  const [aiResult, setAiResult] = useState(props.getAiResult());
  // eslint-disable-next-line react/prop-types
  return (
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
              <div>{res.translation.FR}</div>
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
                    }}
                  />
                  <Icon
                    name="trash"
                    className="trashButton"
                    onClick={event => {
                      event.stopPropagation();
                      console.log('refuser: ' + res.teeth);
                    }}
                  />
                </div>
              </div>
            </div>
          }
        </TableListItem>
      ))}
    </TableList>
  );
};
