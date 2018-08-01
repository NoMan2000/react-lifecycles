// @flow
import React from 'react';
import logMethods from './../utilities/lifeCycleHooks';

type Props = {};
type State = {
  isClicked: boolean
};

class Child extends React.Component<Props, State> {
  static displayName = 'Child';
  state = {
    isClicked: false
  };

  generateBoolean = () => {
    return Math.random() > 0.5;
  };

  componentDidMount() {
    logMethods(Child.displayName, 'componentDidMount');
    if (this.generateBoolean()) {
      this.setState({
        isClicked: true
      });
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    logMethods(
      Child.displayName,
      'shouldComponentUpdate',
      nextProps,
      nextState
    );
    return nextState.isClicked !== this.state.isClicked;
  }

  switchClicked = () => {
    this.setState((prevState: State) => {
      return { isClicked: !prevState.isClicked };
    });
  };

  setIsClickedFalse = () => {
    this.setState({ isClicked: false });
  };

  setIsClickedTrue = () => {
    this.setState({ isClicked: true });
  };

  render() {
    logMethods(Child.displayName, 'render');
    const { isClicked } = this.state;
    return (
      <section className="child App-header">
        <div>The value of isClicked is {isClicked ? 'true' : 'false'}</div>
        <h2>Child Component</h2>
        <button onClick={this.switchClicked}>Change isClicked</button>
        <button onClick={this.setIsClickedFalse}>
          Set isClicked to <code>false</code>
        </button>
        <button onClick={this.setIsClickedTrue}>
          Set isClicked to <code>true</code>
        </button>
      </section>
    );
  }
}

export default Child;
