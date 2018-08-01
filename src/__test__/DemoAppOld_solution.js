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
  hasError: boolean
};

class DemoApp extends React.Component<Props, State> {
  testProperty: string;
  propsChanged: boolean;
  willUpdate: boolean;
  hasUpdated: boolean;
  stateChanged: boolean;
  interval: ?IntervalID;

  constructor(props: Props) {
    super(props);
    this.state = {
      initialized: true,
      mounted: false,
      demoStateValue: '',
      hasError: false
    };
    this.testProperty = '';
    this.propsChanged = false;
    this.stateChanged = false;
    this.willUpdate = false;
    this.hasUpdated = false;
    this.interval = setInterval(() => {
      // no op
    }, 4000);
  }
  componentDidMount() {
    this.setState({
      mounted: true
    });
  }
  componentWillMount() {
    this.testProperty = 'test';
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.demoProp !== this.props.demoProp) {
      this.propsChanged = true;
    }
  }
  componentWillUpdate(nextProps: Props, nextState: State) {
    // Since we already handled the props, we need to handle state.
    if (nextState.demoStateValue !== this.state.demoStateValue) {
      this.stateChanged = true;
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    this.hasUpdated = true;
    this.willUpdate = false;
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
      nextState.initialized !== this.state.initialized;
    return this.willUpdate;
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = null;
  }

  errorThrower = () => {
    throw new Error('Oh NO!');
  };

  render() {
    return null;
  }
}

export default DemoApp;
