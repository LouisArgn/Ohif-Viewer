import React from 'react';
import { Analyze } from './Analyze.js';

export default {
  id: 'analyze-table',
  get version() {
    return window.version;
  },

  getPanelModule({ servicesManager, commandsManager }) {
    //const { UINotificationService, UIDialogService } = servicesManager.services;
    const ExtendedConnectedAnalyzePanel = props => (
      // eslint-disable-next-line react/prop-types
      <Analyze analyze={props.analyze} />
    );

    return {
      menuOptions: [
        {
          icon: 'list',
          label: 'Analyze',
          target: 'analyze-panel',
        },
      ],
      components: [
        {
          id: 'analyze-panel',
          component: ExtendedConnectedAnalyzePanel,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },
};
