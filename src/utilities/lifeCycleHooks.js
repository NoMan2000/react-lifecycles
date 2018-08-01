// @flow
import unique from 'lodash/uniq';

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

const mountLifeCyclesRenderPhase = [
  'constructor',
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'getDerivedStateFromProps',
  'render'
];
const mountLifeCyclesCommitPhase = ['componentDidMount'];
const mountLifeCycles = mountLifeCyclesRenderPhase.concat(
  mountLifeCyclesCommitPhase
);

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

const updatingPreCommitLifeCycles = ['getSnapshotBeforeUpdate'];

const updatingCommitLifeCycles = ['componentDidUpdate'];

const updatingLifeCycles = updatingRenderLifeCycles.concat(
  updatingPreCommitLifeCycles,
  updatingCommitLifeCycles
);

const unmountLifeCycles = ['componentWillUnmount'];

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
