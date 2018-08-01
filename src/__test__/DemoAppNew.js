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
  propsChanged: boolean
};

let demoProp = false;
let propsChanged = false;
let testProperty = '';
let demoStateValue = '';
let stateChanged = false;

class DemoApp extends React.Component<Props, State> {
  willUpdate: boolean;
  hasUpdated: boolean;
  interval: ?IntervalID;

  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {}

  static getDerivedStateFromProps(nextProps: Props, nextState: State) {}

  componentDidUpdate(prevProps: Props, prevState: State) {}
  /**
   * ShouldcomponentUpdate has one big gotcha.
   * If you add new properties or state and don't update the return
   * value, you can have hard to track down bugs.
   */
  shouldComponentUpdate(nextProps: Props, nextState: State) {}

  componentWillUnmount() {}

  render() {
    return null;
  }
}

export default {
  DemoApp,
  demoProp,
  propsChanged,
  testProperty
};
