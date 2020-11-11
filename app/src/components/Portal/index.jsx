import React from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends React.Component {
  modalRoot = document.getElementById('modal-root');
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
