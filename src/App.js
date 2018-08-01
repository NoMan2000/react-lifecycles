import React, { Component } from 'react';
import './App.css';
import Parent from './components/Parent';
import ParentOld from './components/ParentOld';
import Child from './components/Child';
import ComplexParent from './components/ComplexParent';

class App extends Component {
  state = {};
  static displayName = 'MainApp';
  render() {
    return (
      // <React.StrictMode>
      <main className="App">
        <Parent>
          <ParentOld>
            <Child />
          </ParentOld>
        </Parent>
        <ComplexParent />
      </main>
      // </React.StrictMode>
    );
  }
}

export default App;
