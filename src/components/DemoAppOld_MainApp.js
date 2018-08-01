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
    this.willUpdate =
      nextProps.demoProp !== this.props.demoProp ||
      nextState.demoStateValue !== this.state.demoStateValue;
    return this.willUpdate;
  }

  errorThrower = () => {
    throw new Error('Oh NO!');
  };

  render() {
    const { throwError, runDebugger } = this.props;
    const { initialized, mounted } = this.state;
    if (throwError) {
      this.errorThrower();
    }
    if (runDebugger) {
      // debugger;
    }
    return (
      <section>
        <h1>Demo of shouldComponentUpdate problem</h1>
        <div>
          {initialized ? (
            <p>We are initialized</p>
          ) : (
            <p>Waiting for initialization</p>
          )}
          {mounted ? (
            <p>We are mounted</p>
          ) : (
            <p>We are not mounted due to shouldComponentUpdate</p>
          )}
        </div>
      </section>
    );
  }
}

export default DemoApp;
