import React, { Component, useEffect } from 'react';

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
    originalHeight: -1,
    originalWidth: -1,
    containerHeight: -1,
    containerWidth: -1,
    diseasesPosReady: false,
    diseasesPos: [],
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
    this.setState({ dimensionsReady: false });
    console.log(this.props);
    console.log(this.state);
    window.addEventListener('setDimensions', event => {
      console.log('setDimensions');
      console.log(event);
      this.setState({
        originalHeight: event.detail.height,
        originalWidth: event.detail.width,
      });
    });
    window.addEventListener('setResultCoordinates', event => {
      console.log("let's get some image dimensions");
      console.log(event);
      this.setState({ diseasesPosReady: true });
      this.setState({ diseasesPos: event.detail });
    });
  }
  setDimensions() {
    let containerHeight = document.getElementById('containerDiv').offsetHeight;
    let containerWidth = document.getElementById('containerDiv').offsetWidth;
    let canvasHeight = document.getElementById('c').offsetHeight;
    let canvasWidth = document.getElementById('c').offsetWidth;
    console.log('setDimensions function');
    console.log(containerWidth);
    console.log(containerHeight);
    console.log(canvasHeight);
    console.log(canvasWidth);
    if (containerHeight !== canvasHeight || containerWidth !== canvasWidth) {
      console.log('sizeChanging');
      document
        .getElementById('c')
        .setAttribute('width', containerWidth.toString());
      document
        .getElementById('c')
        .setAttribute('height', containerHeight.toString());
      var canvas = document.getElementById('c');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.setState({
        containerHeight: containerHeight,
        containerWidth: containerWidth,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
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
    if (document.getElementById('containerDiv')) {
      const resize_ob = new ResizeObserver((entries) => {
        // since we are observing only a single element, so we access the first element in entries array
        let rect = entries[0].contentRect;

        // current width & height
        let width = rect.width;
        let height = rect.height;

        console.log("Current Width : " + width);
        console.log("Current Height : " + height);
        this.setDimensions();
      });
      resize_ob.observe(document.querySelector('#containerDiv'));
    }
  }

  handleClick() {
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var height = document.getElementById('containerDiv').offsetHeight;
    var width = document.getElementById('containerDiv').offsetWidth;
    ctx.strokeStyle = 'rgb(0,175,155)';
    console.log(this.state.diseasesPos);
    console.log(this.state.diseasesPosReady);
    ctx.strokeRect(0, 0, 100, 100);

    if (!this.state.diseasesPosReady) {
      var center = { x: width / 2, y: height / 2 };
      ctx.beginPath();
      ctx.arc(center.x, center.y, 5, 0, 2 * Math.PI);
      ctx.stroke();
    } else {
      let ratio =
        this.state.originalWidth > this.state.containerWidth
          ? Math.max(
              this.state.originalWidth / this.state.containerWidth,
              this.state.originalHeight / this.state.containerHeight
            )
          : Math.max(
              this.state.containerWidth / this.state.originalWidth,
              this.state.containerHeight / this.state.originalHeight
            );
      let offsetWidth =
        (this.state.containerWidth - this.state.originalWidth / ratio) / 2;
      let offsetHeight =
        (this.state.containerHeight - this.state.originalHeight / ratio) / 2;
      this.state.diseasesPos.forEach(pos => {
        console.log(pos);
        ctx.strokeRect(
          pos.pos.x / ratio + offsetWidth,
          pos.pos.y / ratio + offsetHeight,
          pos.pos.width / ratio,
          pos.pos.height / ratio
        );
      });
    }
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
    return (
      <div id="containerDiv" style={{ height: '100%', position: 'relative' }}>
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
              pointerEvents: 'all',
              position: 'absolute',
              left: 0,
            }}
            onClick={() => this.handleClick()}
          >
            DRAW CENTER
          </button>
        </div>
      </div>
    );
  }
}

export default OHIFCornerstoneViewport;
