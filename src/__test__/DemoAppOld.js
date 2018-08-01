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
  }
  componentDidMount() {}
  componentWillMount() {}
  componentWillReceiveProps(nextProps: Props) {}
  componentWillUpdate(nextProps: Props, nextState: State) {}

  componentDidUpdate(prevProps: Props, prevState: State) {}
  /**
   * ShouldcomponentUpdate has one big gotcha.
   * If you add new properties or state and don't update the return
   * value, you can have hard to track down bugs.
   */
  shouldComponentUpdate(nextProps: Props, nextState: State) {}

  componentWillUnmount() {}

  errorThrower = () => {
    throw new Error('Oh NO!');
  };

  render() {
    return null;
  }
}

export default DemoApp;
