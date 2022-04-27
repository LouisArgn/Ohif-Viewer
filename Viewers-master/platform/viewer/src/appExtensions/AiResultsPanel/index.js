import React from 'react';
import { ResultTable } from './ResultTable.js';

export default {
  /**
   * Only required propperty. Should be a unique value across all extensions.
   */
  id: 'results-table',
  get version() {
    return window.version;
  },

  getPanelModule({ servicesManager, commandsManager }) {
    // const { UINotificationService, UIDialogService } = servicesManager.services;

    const ExtendedConnectedResultTable = props => (
      // eslint-disable-next-line react/prop-types
      <ResultTable getAiResult={props.getAiResult} />
    );

    return {
      menuOptions: [
        {
          icon: 'list',
          label: 'Results',
          target: 'result-panel',
        },
      ],
      components: [
        {
          id: 'result-panel',
          component: ExtendedConnectedResultTable,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },
};
