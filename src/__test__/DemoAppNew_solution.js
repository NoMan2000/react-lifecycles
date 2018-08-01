// @flow
import React from 'react';

type Props = {
  demoProp: boolean,
  throwError?: boolean,
  runDebugger?: boolean
};
type State = {
  initialized: boolean,
  mounted: boolean,
  demoStateValue: string,
  hasError: boolean,
  propsChanged: boolean,
  snapshotResult: string
};

let demoProp = false;
let propsChanged = false;
let testProperty = '';
let demoStateValue = '';
let stateChanged = false;

class DemoApp extends React.Component<Props, State> {
  willUpdate: boolean = false;
  hasUpdated: boolean = false;
  interval: ?IntervalID = setInterval(() => {
    // no op
  }, 4000);
  snapshotResult: * = 'foo';

  state = {
    initialized: true,
    mounted: false,
    demoStateValue: '',
    hasError: false,
    propsChanged: false,
    stateChanged: false,
    snapshotResult: this.snapshotResult
  };

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  static getDerivedStateFromProps(nextProps: Props, nextState: State) {
    if (!testProperty) {
      testProperty = 'test';
    }
    if (nextProps.demoProp !== demoProp) {
      propsChanged = true;
      demoProp = nextProps.demoProp;
      return {
        propsChanged,
        testProperty,
        stateChanged: false
      };
    } else if (nextState.demoStateValue !== demoStateValue) {
      demoStateValue = nextState.demoStateValue;
      return {
        propsChanged: false,
        testProperty,
        stateChanged: true
      };
    } else {
      return {
        propsChanged: false,
        stateChanged: false,
        testProperty
      };
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshotResult?: *) {
    this.hasUpdated = true;
    this.willUpdate = false;
    if (snapshotResult) {
      this.snapshotResult = snapshotResult;
    }
  }
  /**
   * ShouldcomponentUpdate has one big gotcha.
   * If you add new properties or state and don't update the return
   * value, you can have hard to track down bugs.
   */
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    this.hasUpdated = false;
    this.willUpdate =
      nextProps.demoProp !== this.props.demoProp ||
      nextState.demoStateValue !== this.state.demoStateValue ||
      nextState.mounted !== this.state.mounted ||
      nextState.initialized !== this.state.initialized ||
      nextState.snapshotResult !== this.state.snapshotResult;
    return this.willUpdate;
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = null;
  }

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    if (prevState.snapshotResult !== this.state.snapshotResult) {
      return `${prevState.snapshotResult} ${this.state.snapshotResult}`;
    }
    return null;
  }

  render() {
    const { snapshotResult } = this.state;
    return <h1>{snapshotResult}</h1>;
  }
}

export default {
  DemoApp,
  demoProp,
  propsChanged,
  testProperty
};
