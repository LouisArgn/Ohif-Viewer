import React, { useEffect, useState } from 'react';
import { ResultTable } from '../AiResultsPanel/ResultTable.js';
import { Analyze } from '../AnalyzePanel/Analyze.js';

export default {
  id: 'wediagnostix-table',
  get version() {
    return window.version;
  },
  getPanelModule({ servicesManager, commandsManager }) {
    const ExtendedConnectedWediagnostixTable = props => {
      const [showResult, setShowResult] = useState(true);
      useEffect(() => {
        if (props.isOpen === false) setShowResult(false);
      }, [props.isOpen]);
      window.addEventListener('resultReady', () => {
        console.log('Change panel');
        setShowResult(true);
      });
      return showResult ? (
        <ResultTable
          getAiResult={props.getAiResult}
          setValidatedResult={props.setValidatedResult}
          generateReport={props.generateReport}
        />
      ) : (
        <Analyze {...props} />
      );
    };
    //const ExtendedConnectedAnalyzePanel = props => <Analyze {...props} />;
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
          component: ExtendedConnectedWediagnostixTable,
        },
      ],
      defaultContext: ['VIEWER'],
    };
  },
};
