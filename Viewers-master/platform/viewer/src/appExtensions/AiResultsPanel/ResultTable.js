import React, { useEffect, useState } from 'react';
import { TableList, TableListItem } from '@ohif/ui';

export const ResultTable = props => {
  const [aiResult, setAiResult] = useState(props.getAiResult());
  // eslint-disable-next-line react/prop-types
  return (
    <TableList>
      {/* eslint-disable-next-line react/prop-types */}
      {aiResult.map(res => (
        // eslint-disable-next-line react/jsx-key
        <TableListItem
          onItemClick={() => console.log('ok boy')}
          itemKey={res.id}
          itemMeta={res.teeth}
        >
          {res.translation.FR}
        </TableListItem>
      ))}
    </TableList>
  );
};
