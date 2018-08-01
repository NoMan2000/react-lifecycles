// @flow
import React from 'react';
import logMethods from './../utilities/lifeCycleHooks';

type Props = {
  children?: React$Node
};
type State = {};

class ParentOld extends React.Component<Props, State> {
  static displayName = 'ParentOld';
  state = {};

  /**
   * If you uncomment this out, React will get mad.
   */

  // getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
  //   logMethods(
  //     ParentOld.displayName,
  //     'getSnapshotBeforeUpdate',
  //     prevProps,
  //     prevState
  //   );
  //   return 'some stuff';
  // }

  componentWillMount() {
    logMethods(ParentOld.displayName, 'componentWillMount');
  }

  componentDidMount() {
    logMethods(ParentOld.displayName, 'componentDidMount');
  }

  componentDidCatch(error, info) {
    logMethods(ParentOld.displayName, 'componentDidCatch', error, info);
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    logMethods(
      ParentOld.displayName,
      'componentWillUpdate',
      nextProps,
      nextState
    );
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    logMethods(
      ParentOld.displayName,
      'shouldComponentUpdate',
      nextProps,
      nextState
    );
    return true;
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapshot: *) {
    logMethods(
      ParentOld.displayName,
      'componentDidUpdate',
      prevProps,
      prevState,
      snapshot
    );
  }

  render() {
    if (this.props.children) {
      return <section className="parent-old">{this.props.children}</section>;
    }
    return (
      <section className="parent-old">
        <h2>No Children</h2>
      </section>
    );
  }
}

export default ParentOld;
