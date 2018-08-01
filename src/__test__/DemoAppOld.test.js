import React from 'react';
// import DemoApp from './DemoAppOld';
import DemoApp from './DemoAppOld_solution';
import ErrorComponent from './../components/ErrorComponent';
import { mount, shallow, render } from 'enzyme';

const createMount = (props = {}, options = {}) => {
  return mount(<DemoApp {...props} />, options);
};

const createShallow = (props = {}, options = {}) => {
  return shallow(<DemoApp {...props} />, options);
};

describe('Demo App LifeCycle Tests', () => {
  it('Should be able to construct initial state', () => {
    const app = createMount();
    expect(app.state('initialized')).toBe(true);
  });

  it('Should be able to update state without calling didMount', () => {
    const app = createShallow(
      {},
      {
        disableLifecycleMethods: true
      }
    );
    const instance = app.instance();
    expect(instance.testProperty).toBe('test');
  });

  it('Should change the state when mounted', () => {
    const app = createMount();
    expect(app.state('mounted')).toBe(true);
  });

  it('Should not update the state when a prop is the same and update it when different', () => {
    const app = createMount({ demoProp: true });
    app.setProps({ demoProp: true });
    const instance = app.instance();
    expect(instance.propsChanged).toBe(false);
    app.setProps({ demoProp: false });
    expect(instance.propsChanged).toBe(true);
  });

  it('Should update the hasChanged value when it gets called', () => {
    const app = createShallow(
      {},
      {
        disableLifecycleMethods: true
      }
    );
    const instance = app.instance();
    expect(instance.stateChanged).toBe(false);
    app.setState({ demoStateValue: 'new demo' });
    expect(instance.stateChanged).toBe(true);
  });

  it('Should update the willUpdate and hasUpdated properties when componentDidUpdate is called', () => {
    const app = createMount({ demoProp: true });
    const instance = app.instance();
    app.setProps({ demoProp: true });
    expect(instance.hasUpdated).toBe(false);
    expect(instance.willUpdate).toBe(false);
    instance.willUpdate = true;
    expect(instance.willUpdate).toBe(true);
    app.setProps({ demoProp: false });
    expect(instance.hasUpdated).toBe(true);
    expect(instance.willUpdate).toBe(false);
  });
  it('Should handle any teardown necessary when unmounting', () => {
    const app = createMount();
    const instance = app.instance();
    expect(typeof instance.interval).toBe('number');
    app.unmount();
    expect(instance.interval).toBe(null);
  });
});
