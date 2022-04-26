import React, { Component } from 'react';
import { TableList, TableListItem } from '@ohif/ui';

export class ResultTable extends Component {
  static defaultProps = {
    AiResult: [],
  };
  // eslint-disable-next-line react/prop-types
  constructor(props) {
    // eslint-disable-next-line no-console
    super(props);
    // eslint-disable-next-line react/prop-types
    this.Airesult = this.props.getAiResult();
  }
  render() {
    return (
      <TableList>
        {/* eslint-disable-next-line react/prop-types */}
        {this.props.getAiResult().map(res => (
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
  }
}
