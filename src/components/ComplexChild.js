// @flow
import React from 'react';
import logMethods from './../utilities/lifeCycleHooks';

type Props = {
  randomNumber: number
};

type State = {
  stateRandomNumber: number
};

class ComplexChild extends React.Component<Props, State> {
  static displayName = 'ComplexChild';

  state = {
    stateRandomNumber: 0
  };

  componentWillReceiveProps(nextProps: props) {
    logMethods(
      ComplexChild.displayName,
      'componentWillReceiveProps',
      nextProps
    );
    const initializer = new Uint32Array(nextProps.randomNumber);
    const stateRandomNumber = window.crypto.getRandomValues(initializer);
    this.setState({ stateRandomNumber });
  }

  componentWillUnmount() {
    logMethods(ComplexChild.displayName, 'componentWillUnmount');
  }

  render() {
    const { randomNumber } = this.props;
    const { stateRandomNumber } = this.state;
    logMethods(ComplexChild.displayName, 'render');
    return (
      <section>
        <h2>The Random Number from props is {randomNumber}</h2>
        <h2>The Random Number from state is {stateRandomNumber}</h2>
      </section>
    );
  }
}

export default ComplexChild;
