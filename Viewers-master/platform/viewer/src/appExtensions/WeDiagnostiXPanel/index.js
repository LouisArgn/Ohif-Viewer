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
      const [showResult, setShowResult] = useState(false);
      useEffect(() => {
        if (props.isOpen === false) setShowResult(false);
      }, [props.isOpen]);
      window.addEventListener('resultReady', (event) => {
        console.log('Change panel');
        setShowResult(true);
        event.stopImmediatePropagation();
      });
      return showResult ? (
        <ResultTable
          getAiResult={props.getAiResult}
          setValidatedResult={props.setValidatedResult}
          generateReport={props.generateReport}
          setResultPrecision={props.setResultPrecision}
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
