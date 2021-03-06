import React, { Component } from 'react';
import { metadata, utils } from '@ohif/core';

import ConnectedViewer from './ConnectedViewer.js';
import PropTypes from 'prop-types';
import App, { extensionManager } from './../App.js';
import Dropzone from 'react-dropzone';
import filesToStudies from '../lib/filesToStudies';
import './ViewerLocalFileData.css';
import { withTranslation } from 'react-i18next';

const { OHIFStudyMetadata } = metadata;
const { studyMetadataManager } = utils;

const dropZoneLinkDialog = (onDrop, i18n, dir) => {
  return (
    <Dropzone onDrop={onDrop} noDrag>
      {({ getRootProps, getInputProps }) => (
        <span {...getRootProps()} className="link-dialog">
          {dir ? (
            <span>
              {i18n('Load folders')}
              <input
                {...getInputProps()}
                webkitdirectory="true"
                mozdirectory="true"
              />
            </span>
          ) : (
            <span>
              {i18n('Load files')}
              <input {...getInputProps()} />
            </span>
          )}
        </span>
      )}
    </Dropzone>
  );
};

const linksDialogMessage = (onDrop, i18n) => {
  return (
    <>
      {i18n('Or click to ')}
      {dropZoneLinkDialog(onDrop, i18n)}
      {i18n(' or ')}
      {dropZoneLinkDialog(onDrop, i18n, true)}
      {i18n(' from dialog')}
    </>
  );
};

class ViewerLocalFileData extends Component {
  static propTypes = {
    studies: PropTypes.array,
  };

  state = {
    studies: null,
    loading: false,
    error: null,
    fileList: null,
  };

  updateStudies = studies => {
    // Render the viewer when the data is ready
    studyMetadataManager.purge();

    // Map studies to new format, update metadata manager?
    const updatedStudies = studies.map(study => {
      const studyMetadata = new OHIFStudyMetadata(
        study,
        study.StudyInstanceUID
      );
      const sopClassHandlerModules =
        extensionManager.modules['sopClassHandlerModule'];

      study.displaySets =
        study.displaySets ||
        studyMetadata.createDisplaySets(sopClassHandlerModules);

      studyMetadata.forEachDisplaySet(displayset => {
        displayset.localFile = true;
      });

      studyMetadataManager.add(studyMetadata);

      return study;
    });

    this.setState({
      studies: updatedStudies,
    });
  };

  onDrop = async acceptedFiles => {
    this.setState({ loading: false, fileList: acceptedFiles });

    const studies = await filesToStudies(acceptedFiles);
    const updatedStudies = this.updateStudies(studies);

    if (!updatedStudies) {
      return;
    }
    if (this.props.selectedUID && updatedStudies[0]) {
      this.props.selectedUID(
        updatedStudies[0].StudyInstanceUID,
        this.state.studies
      );
    }
    this.setState({ studies: updatedStudies, loading: false });
  };

  componentDidMount() {
    this.setState({ studies: null, loading: false });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.fileLists !== this.state.fileList) {
      if (this.state.studies) this.setState({ studies: null });
      else this.onDrop(this.props.fileList);
    }
  }

  render() {
    if (this.state.error) {
      return <div>Error: {JSON.stringify(this.state.error)}</div>;
    }
    return (
      <Dropzone onDrop={this.onDrop} noClick>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ width: '100%', height: '100%' }}>
            {this.state.studies ? (
              <ConnectedViewer
                selectedUID={this.props.selectedUID}
                analyze={this.props.analyze}
                getAiResult={this.props.getAiResult}
                setResultPrecision={this.props.setResultPrecision}
                setValidatedResult={this.props.setValidatedResult}
                setReportReason={this.props.setReportReason}
                generateReport={this.props.generateReport}
                isLoggedIn={this.props.isLoggedIn}
                convert={this.props.convert}
                openAlertModal={this.props.openAlertModal}
                studies={this.state.studies}
                studyInstanceUIDs={
                  this.state.studies &&
                  this.state.studies.map(a => a.StudyInstanceUID)
                }
              />
            ) : (
              <div className={'drag-drop-instructions'}>
                <div className={'drag-drop-contents'}>
                  {this.state.loading ? (
                    <h3>{this.props.t('Loading...')}</h3>
                  ) : (
                    <>
                      <h3>
                        {this.props.t(
                          'Drag and Drop DICOM files here to load them in the Viewer'
                        )}
                      </h3>
                      <h4>{linksDialogMessage(this.onDrop, this.props.t)}</h4>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
    );
  }
}
export default withTranslation('Common')(ViewerLocalFileData);
