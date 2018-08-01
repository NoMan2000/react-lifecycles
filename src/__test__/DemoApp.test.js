import React from 'react';
import DemoApp from './DemoApp';
import { mount } from 'enzyme';

const createMount = (props = {}) => {
  return mount(<DemoApp {...props} />);
};

describe('Demo App LifeCycle Tests', () => {
  it('Should be able to construct initial state', () => {
    const app = createMount();
    expect(app.state('initialized')).toBe(true);
  });
});
