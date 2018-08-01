// @flow
import React from 'react';
import logMethods from './../utilities/lifeCycleHooks';

type Props = {
  children?: React$Node
};
type State = {};

class Parent extends React.Component<Props, State> {
  static displayName = 'Parent';
  state = {};

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    logMethods(
      Parent.displayName,
      'getSnapshotBeforeUpdate',
      prevProps,
      prevState
    );
    return null;
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: *) {
    logMethods(
      Parent.displayName,
      'componentDidUpdate',
      prevProps,
      prevState,
      snapshot
    );
  }
  componentDidMount() {
    logMethods(Parent.displayName, 'componentDidMount');
  }

  static getDerivedStateFromProps(nextProps: Props, nextState: State) {
    logMethods(
      Parent.displayName,
      'getDerivedStateFromProps',
      nextProps,
      nextState
    );
    return null; // no state update.
  }

  componentDidCatch(error, info) {
    logMethods(Parent.displayName, 'componentDidCatch', error, info);
    debugger;
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    logMethods(
      Parent.displayName,
      'shouldComponentUpdate',
      nextProps,
      nextState
    );
    return true;
  }

  render() {
    logMethods(Parent.displayName, 'render');
    if (this.props.children) {
      return <section className="parent">{this.props.children}</section>;
    }
    return (
      <section className="parent">
        <h2>Empty</h2>
      </section>
    );
  }
}

export default Parent;
