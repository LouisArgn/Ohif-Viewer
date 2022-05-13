import React, { Component, createRef, useEffect } from 'react';

import OHIFCornerstoneViewportOverlay from './components/OHIFCornerstoneViewportOverlay';
import ConnectedCornerstoneViewport from './ConnectedCornerstoneViewport';
import OHIF from '@ohif/core';
import PropTypes from 'prop-types';
import cornerstone from 'cornerstone-core';
import checkForSRAnnotations from './tools/checkForSRAnnotations';
//import { fabric } from 'fabric';

const { StackManager } = OHIF.utils;

class OHIFCornerstoneViewport extends Component {
  state = {
    viewportData: null,
    canvasRef: null,
    Canvas: null,
  };

  static defaultProps = {
    customProps: {},
    isStackPrefetchEnabled: true,
  };

  static propTypes = {
    studies: PropTypes.object,
    displaySet: PropTypes.object,
    viewportIndex: PropTypes.number,
    children: PropTypes.node,
    customProps: PropTypes.object,
    stackPrefetch: PropTypes.object,
    isStackPrefetchEnabled: PropTypes.bool,
  };

  static id = 'OHIFCornerstoneViewport';

  static init() {
    console.log('OHIFCornerstoneViewport init()');
  }

  static destroy() {
    console.log('OHIFCornerstoneViewport destroy()');
    StackManager.clearStacks();
  }

  /**
   * Obtain the CornerstoneTools Stack for the specified display set.
   *
   * @param {Object[]} studies
   * @param {String} StudyInstanceUID
   * @param {String} displaySetInstanceUID
   * @param {String} [SOPInstanceUID]
   * @param {Number} [frameIndex=1]
   * @return {Object} CornerstoneTools Stack
   */
  static getCornerstoneStack(
    studies,
    StudyInstanceUID,
    displaySetInstanceUID,
    SOPInstanceUID,
    frameIndex = 0
  ) {
    if (!studies || !studies.length) {
      throw new Error('Studies not provided.');
    }

    if (!StudyInstanceUID) {
      throw new Error('StudyInstanceUID not provided.');
    }

    if (!displaySetInstanceUID) {
      throw new Error('StudyInstanceUID not provided.');
    }

    // Create shortcut to displaySet
    const study = studies.find(
      study => study.StudyInstanceUID === StudyInstanceUID
    );

    if (!study) {
      throw new Error('Study not found.');
    }

    const displaySet = study.displaySets.find(set => {
      return set.displaySetInstanceUID === displaySetInstanceUID;
    });

    if (!displaySet) {
      throw new Error('Display Set not found.');
    }

    // Get stack from Stack Manager
    const storedStack = StackManager.findOrCreateStack(study, displaySet);

    // Clone the stack here so we don't mutate it
    const stack = Object.assign({}, storedStack);
    stack.currentImageIdIndex = frameIndex;

    if (SOPInstanceUID) {
      const index = stack.imageIds.findIndex(imageId => {
        const imageIdSOPInstanceUID = cornerstone.metaData.get(
          'SOPInstanceUID',
          imageId
        );

        return imageIdSOPInstanceUID === SOPInstanceUID;
      });

      if (index > -1) {
        stack.currentImageIdIndex = index;
      } else {
        console.warn(
          'SOPInstanceUID provided was not found in specified DisplaySet'
        );
      }
    }

    return stack;
  }

  getViewportData = async (
    studies,
    StudyInstanceUID,
    displaySetInstanceUID,
    SOPInstanceUID,
    frameIndex
  ) => {
    let viewportData;

    const stack = OHIFCornerstoneViewport.getCornerstoneStack(
      studies,
      StudyInstanceUID,
      displaySetInstanceUID,
      SOPInstanceUID,
      frameIndex
    );

    viewportData = {
      StudyInstanceUID,
      displaySetInstanceUID,
      stack,
    };

    return viewportData;
  };

  setStateFromProps() {
    const { studies, displaySet } = this.props.viewportData;
    const {
      StudyInstanceUID,
      displaySetInstanceUID,
      sopClassUIDs,
      SOPInstanceUID,
      frameIndex,
    } = displaySet;

    if (!StudyInstanceUID || !displaySetInstanceUID) {
      return;
    }

    if (sopClassUIDs && sopClassUIDs.length > 1) {
      console.warn(
        'More than one SOPClassUID in the same series is not yet supported.'
      );
    }

    this.getViewportData(
      studies,
      StudyInstanceUID,
      displaySetInstanceUID,
      SOPInstanceUID,
      frameIndex
    ).then(viewportData => {
      this.setState({
        viewportData,
      });
    });
  }

  componentDidMount() {
    this.setStateFromProps();
  }

  componentDidUpdate(prevProps) {
    const { displaySet } = this.props.viewportData;
    const prevDisplaySet = prevProps.viewportData.displaySet;

    if (
      displaySet.displaySetInstanceUID !==
        prevDisplaySet.displaySetInstanceUID ||
      displaySet.SOPInstanceUID !== prevDisplaySet.SOPInstanceUID ||
      displaySet.frameIndex !== prevDisplaySet.frameIndex
    ) {
      const { viewportIndex } = this.props;
      checkForSRAnnotations({ displaySet, viewportIndex });
      this.setStateFromProps();
    }
    var height = document.getElementById("containerDiv").offsetHeight
    var width = document.getElementById("containerDiv").offsetWidth
    console.log('test setting width on update');
    document.getElementById("c").setAttribute("width", width.toString())
    document
      .getElementById('c')
      .setAttribute('height', height.toString());
  }

  render() {
    let childrenWithProps = null;

    if (!this.state.viewportData) {
      return null;
    }
    const { viewportIndex } = this.props;
    const { inconsistencyWarnings } = this.props.viewportData.displaySet;
    const {
      imageIds,
      currentImageIdIndex,
      // If this comes from the instance, would be a better default
      // `FrameTime` in the instance
      // frameRate = 0,
    } = this.state.viewportData.stack;

    // TODO: Does it make more sense to use Context?
    if (this.props.children && this.props.children.length) {
      childrenWithProps = this.props.children.map((child, index) => {
        return (
          child &&
          React.cloneElement(child, {
            viewportIndex: this.props.viewportIndex,
            key: index,
          })
        );
      });
    }

    const newImageHandler = ({ currentImageIdIndex, sopInstanceUid }) => {
      const { displaySet } = this.props.viewportData;
      const { StudyInstanceUID } = displaySet;

      if (currentImageIdIndex >= 0) {
        this.props.onNewImage({
          StudyInstanceUID,
          SOPInstanceUID: sopInstanceUid,
          frameIndex: currentImageIdIndex,
          activeViewportIndex: viewportIndex,
        });
      }
    };

    const warningsOverlay = props => {
      return (
        <OHIFCornerstoneViewportOverlay
          {...props}
          inconsistencyWarnings={inconsistencyWarnings}
        />
      );
    };

    /*const myCanvas = props => {
      console.log('test0');

      Canvas.setHeight(300);
      Canvas.setWidth(300);
      fabric.textureSize = 4096;
      fabric.Object.prototype.set({
        padding: 10,
        margin: 10,
      });
      console.log('test1');
      const cir = new fabric.Circle({
        left: 0,//pos.x * ratio,
        top: 0,//pos.y * ratio,
        radius: 20,//size * ratio,
        fill: 'rgba(0, 0, 0, 0)',
        hasControls: false,
        movable: false,
        selectable: false,
      });
      console.log('test2');
      Canvas.add(cir);
      return Canvas;
    };*/

    let x = 0;
    let y = 0;
    return (
      <div id="containerDiv" style={{ height: '100%', position: 'relative' }}>
        <div
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: '0px',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <canvas id="c" />
          <button
            id="circ"
            style={{
              position: 'absolute',
              left: 0}}
            onClick={() => {
              console.log(document.getElementById('containerDiv').offsetHeight);
              var canvas = document.getElementById('c');
              var ctx = canvas.getContext('2d');
              ctx.strokeStyle = 'rgb(0,175,155)';
              ctx.strokeRect(500, 500, 100, 100);
              x++;
              y++;
            }}
          >
            TEST
          </button>
        </div>
        <div
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: '0px',
          }}
        >
          <ConnectedCornerstoneViewport
            viewportIndex={viewportIndex}
            imageIds={imageIds}
            imageIdIndex={currentImageIdIndex}
            onNewImageDebounced={newImageHandler}
            onNewImageDebounceTime={300}
            viewportOverlayComponent={warningsOverlay}
            stackPrefetch={this.props.stackPrefetch}
            isStackPrefetchEnabled={this.props.isStackPrefetchEnabled}
            // ~~ Connected (From REDUX)
            // frameRate={frameRate}
            // isPlaying={false}
            // onElementEnabled={() => {}}
            // setViewportActive{() => {}}
            {...this.props.customProps}
          />
          {childrenWithProps}
        </div>
      </div>
    );
  }
}

export default OHIFCornerstoneViewport;
