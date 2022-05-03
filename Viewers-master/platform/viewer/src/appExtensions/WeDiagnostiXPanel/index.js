import React from 'react';
import { ResultTable } from '../AiResultsPanel/ResultTable.js';
import { Analyze } from '../AnalyzePanel/Analyze.js';
import App from '../../App';

export default {
  id: 'wediagnostix-table',
  get version() {
    return window.version;
  },
  getPanelModule({ servicesManager, commandsManager }) {
    const ExtendedConnectedResultTable = props => (
      <ResultTable
        getAiResult={props.getAiResult}
        setValidatedResult={props.setValidatedResult}
        generateReport={props.generateReport}
      />
    );
    const ExtendedConnectedAnalyzePanel = props => <Analyze {...props} />;
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
