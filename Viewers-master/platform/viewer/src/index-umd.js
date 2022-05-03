/**
 * Entry point index.js for UMD packaging
 */
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import OHIFVTKExtension from '@ohif/extension-vtk';

function installViewer(
  config,
  containerId = 'root',
  callback,
  selectedUID = (uid, list) => {},
  analyze = uid => {},
  getAiResult = () => {},
  setValidatedResult = validatedResult => {},
  setReportReason = reason => {},
  generateReport = () => {},
  fileList = undefined
) {
  const container = document.getElementById(containerId);

  const defaultExtensions = [OHIFVTKExtension];
  if (!container) {
    throw new Error(
      "No root element found to install viewer. Please add a <div> with the id 'root', or pass a DOM element into the installViewer function."
    );
  }
  return ReactDOM.render(
    <App
      config={config}
      defaultExtensions={defaultExtensions}
      selectedUID={selectedUID}
      analyze={analyze}
      getAiResult={getAiResult}
      setValidatedResult={setValidatedResult}
      setReportReason={setReportReason}
      generateReport={generateReport}
    />,
    container,
    callback
  );
}

export { App, installViewer };
