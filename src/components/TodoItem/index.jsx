import React from 'react';
import css from 'react-css-modules';

import { connect } from 'react-redux';
import * as actions from 'actions';

import styles from './index.scss';

@connect(
  state => state,
  {
    put: actions.put,
    del: actions.del,
  }
)
@css(styles)
export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
  }
  componentWillReceiveProps(props) {
    this.state = {
      text: this.props.text,
    };
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }
  render() {
    const {
      put,
      del,
      id,
    } = this.props;
    return (<div styleName="container">
      <input value={this.state.text} onChange={this.handleChange} />
      <div styleName="controls">
        <button onClick={e => put(id, this.state.text)}>保存</button>
        <button onClick={e => del(id)}>删除</button>
      </div>
    </div>);
  }
}
