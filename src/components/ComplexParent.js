// @flow
import React from 'react';
import logMethods from './../utilities/lifeCycleHooks';
import ComplexChild from './ComplexChild';

type Props = {};
type State = {
  randomNumber: number,
  displayChild: boolean
};

class ComplexParent extends React.Component<Props, State> {
  static displayName = 'ComplexParent';
  state = {
    randomNumber: 0,
    displayChild: true
  };
  interval = undefined;
  componentDidMount() {
    logMethods(ComplexParent.displayName, 'componentDidMount');
  }
  createRandomNumber = () => {
    return Math.floor(Math.random() * (10 + 1));
  };
  startTimer = () => {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.setState({
          randomNumber: this.createRandomNumber()
        });
      }, 1000);
    }
  };
  clearTimer = () => {
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = undefined;
    }
  };
  toggleChildComponent = () => {
    this.setState(prevState => {
      const displayChild = !prevState.displayChild;
      if (!displayChild) {
        this.clearTimer();
      }
      return { displayChild };
    });
  };

  render() {
    logMethods(ComplexParent.displayName, 'render');
    const { randomNumber, displayChild } = this.state;
    return (
      <section className="complex-parent">
        <h2>Timer Component</h2>
        {displayChild && <ComplexChild randomNumber={randomNumber} />}
        <button onClick={this.startTimer}>Start Timer</button>
        <button onClick={this.clearTimer}>Stop Timer</button>
        <button onClick={this.toggleChildComponent}>Show/Hide Child</button>
      </section>
    );
  }
}

export default ComplexParent;
