// @flow
import React from 'react';
type Props = {
  children: React$Node
};
type State = {
  error: ?Error,
  errorInfo: ?{
    componentStack: string
  }
};
class ErrorComponent extends React.Component<Props, State> {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorComponent;
