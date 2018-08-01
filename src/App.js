import React, { Component } from 'react';
import './App.css';
import Parent from './components/Parent';
import ParentOld from './components/ParentOld';
import Child from './components/Child';
import ComplexParent from './components/ComplexParent';
import DemoApp from './components/DemoAppOld_MainApp';
import DemoAppNew from './components/DemoAppNew_MainApp';
import ErrorComponent from './components/ErrorComponent';

const { NODE_ENV } = process.env;

const throwError = NODE_ENV === 'production';

class App extends Component {
  state = {};
  static displayName = 'MainApp';
  render() {
    return (
      // <React.StrictMode>
      <main className="App">
        <ErrorComponent>
          <Parent>
            <ParentOld>
              <Child />
            </ParentOld>
          </Parent>
          <ComplexParent />
          <DemoApp runDebugger={true} throwError={throwError} />
          <DemoAppNew />
        </ErrorComponent>
      </main>
      // </React.StrictMode>
    );
  }
}

export default App;
