// @flow
import unique from 'lodash/uniq';

/**
 * Constructor is the only place where you should assign this.state directly.
 * In all other methods, you need to use this.setState() instead.
 * Avoid introducing any side-effects or subscriptions in the constructor.
 * For those use cases, use componentDidMount() instead.
 */

const propsOnly = ['constructor'];
const nullComponents = [
  'componentDidMount',
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'render',
  'componentWillUnmount'
];
const propsAndState = ['getDerivedStateFromProps'];
const prevPropsAndPrevState = ['getSnapshotBeforeUpdate'];
const errorAndInfo = ['componentDidCatch'];
const nextProps = [
  'UNSAFE_componentWillReceiveProps',
  'componentWillReceiveProps'
];
const nextPropsAndNextState = [
  'UNSAFE_componentWillUpdate',
  'componentWillUpdate',
  'shouldComponentUpdate'
];
const prevPropsPrevStateSnapshot = ['componentDidUpdate'];

/**
 * componentWillMount is the only lifecycle hook called on server rendering.
 * You may call setState() immediately in
 * componentDidUpdate() but note that it must be wrapped
 * in a condition.
 * Also componentDidUpdate will not be called if componentShouldUpdate returns false.
 * If your component implements the getSnapshotBeforeUpdate() lifecycle (which is rare),
 * the value it returns will be passed as a third “snapshot” parameter to
 * componentDidUpdate(). Otherwise this parameter will be undefined.
 *
 * During the render phase, it's pure and has no side effects.
 * Can be paused, aborted or restarted by React.
 * Note that this is why getDerivedStateFromProps is required to return a new state
 * rather than modifying it.
 */
const mountLifeCyclesRenderPhase = [
  'constructor',
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'getDerivedStateFromProps',
  'render'
];
/**
 * Commit phase
 * Can work with DOM, run side effects, schedule updates.
 * Can call setState safely.
 */
const mountLifeCyclesCommitPhase = ['componentDidMount'];
const mountLifeCycles = mountLifeCyclesRenderPhase.concat(
  mountLifeCyclesCommitPhase
);

/**
 * The updating phase is after something has been mounted.
 * Note that getDerivedStateFromProps is called twice, both during mount and during update.
 * shouldComponentUpdate is a boolean that, if false is returned, will stop the lifecycle from updating.
 * componentWillReceiveProps and getDerivedStateFromProps exists for only one purpose.
 * It enables a component to update its internal state as the result of changes in props.
 */
const updatingRenderLifeCycles = [
  'componentWillReceiveProps',
  'UNSAFE_componentWillReceiveProps',
  'componentWillUpdate',
  'UNSAFE_componentWillUpdate',
  'getDerivedStateFromProps',
  'shouldComponentUpdate',
  'render',
  'setState'
];
/**
 * During the pre-commit phase, you can read the DOM.
 * getSnapshotBeforeUpdate is the replacement for componentWillUpdate.
 * Note: getSnapshotBeforeUpdate will stop any of the deprecated lifecycle events from running
 */
const updatingPreCommitLifeCycles = ['getSnapshotBeforeUpdate'];

const updatingCommitLifeCycles = ['componentDidUpdate'];

const updatingLifeCycles = updatingRenderLifeCycles.concat(
  updatingPreCommitLifeCycles,
  updatingCommitLifeCycles
);

/**
 * There is no componentDidUnmount call.
 */
const unmountLifeCycles = ['componentWillUnmount'];

/**
 * Since a few methods are used in other places, deduplicate them first.
 */
export const methodsToLog = unique(
  mountLifeCycles.concat(updatingLifeCycles, unmountLifeCycles)
);

const logMethods = (displayName: string, method: string, ...args: *) => {
  console.groupCollapsed(`${displayName} called ${method}`);
  console.log(`The method: ${method}`);

  if (nextProps.indexOf(method) !== -1) {
    console.log('nextProps', args[0]);
  }

  if (nextPropsAndNextState.indexOf(method) !== -1) {
    console.log('nextProps', args[0]);
    console.log('nextState', args[1]);
  }

  if (prevPropsAndPrevState.indexOf(method) !== -1) {
    console.log('prevProps', args[0]);
    console.log('prevState', args[1]);
  }

  if (prevPropsPrevStateSnapshot.indexOf(method) !== -1) {
    console.log('prevProps', args[0]);
    console.log('prevState', args[1]);
    console.log('snapShot', args[2]);
  }

  if (propsAndState.indexOf(method) !== -1) {
    console.log('props', args[0]);
    console.log('state', args[1]);
  }

  if (errorAndInfo.indexOf(method) !== -1) {
    console.log('error', args[0]);
    console.log('info', args[1]);
  }

  if (propsOnly.indexOf(method) !== -1) {
    console.log('props', args[0]);
  }

  if (nullComponents.indexOf(method) !== -1) {
    console.log('No parameters method called');
  }

  console.groupEnd();
};

export default logMethods;
