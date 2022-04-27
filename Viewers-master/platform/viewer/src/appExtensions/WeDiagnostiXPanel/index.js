import React from 'react';
import { ResultTable } from '../AiResultsPanel/ResultTable.js';
import { Analyze } from '../AnalyzePanel/Analyze.js';

export default {
  id: 'wediagnostix-table',
  get version() {
    return window.version;
  },
  getPanelModule({ servicesManager, commandsManager }) {
    const ExtendedConnectedResultTable = props => (
      <ResultTable getAiResult={props.getAiResult} />
    );
    const ExtendedConnectedAnalyzePanel = props => <Analyze props={props} />;
    return {
      menuOptions: [
        {
          icon: 'list',
          label: 'Analyze',
          target: 'analyze-panel',
        },
        {
          icon: 'list',
          label: 'Results',
          target: 'results-panel',
        },
      ],
      components: [
        {
          id: 'results-panel',
          component: ExtendedConnectedResultTable,
        },
        {
          id: 'analyze-panel',
          component: ExtendedConnectedAnalyzePanel,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },
};