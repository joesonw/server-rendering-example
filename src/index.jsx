import React from 'react';
import css from 'react-css-modules';
import { connect } from 'react-redux';
import * as actions from 'actions';

import TodoItem from 'components/TodoItem';
import styles from './index.scss';

@connect(({ todos }) => ({ todos }),
  { post: actions.post }
)
@css(styles)
export default class Index extends React.Component {
  state = {
    text: '',
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }
  render() {
    const {
      text,
    } = this.state;
    const {
      todos,
      post,
    } = this.props;
    return (<div styleName="container">
      <div styleName="input-box">
        <input
          value={text}
          onChange={this.handleChange}
        />
        <button
          onClick={e => {
            post(this.state.text);
          }}
        >提交</button>
      </div>
      <div styleName="items">
        {todos.map(todo =>
          <TodoItem id={todo.id} key={todo.id} text={todo.text} />
        )}
      </div>
    </div>);
  }
}
