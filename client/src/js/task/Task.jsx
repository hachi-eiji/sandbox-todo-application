import React from 'react';
import ReactDOM from 'react-dom';
import {binds, postJSON} from '../common/util';

class Task extends React.Component {
  constructor(props) {
    super(props);
    const handleMethodName = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(name => {
      return name.startsWith('handle');
    });
    binds(this, ...handleMethodName);
    this.state = {
      editTitle: false,
      title: this.props.title,
      titleUpdated: false,
      editDueDate: false,
      dueDate: this.props.due_date,
      dueDateUpdated: false
    };
  }

  handleDeleteTask(e) {
    e.preventDefault();
    postJSON('/tasks/' + this.props.id, {}, {method: 'DELETE'})
      .then(res => {
        this.props.handleDeleteRow(this.props.index);
        this.props.handleShowAlert('success', '削除しました');
      })
      .catch(e => {
        this.props.handleShowAlert('warning', 'エラーが発生しました');
      });
  }

  // doneイベント
  handleDone(e) {
    postJSON('/tasks/' + this.props.id, {done: true}, {method: 'PUT'})
      .then(res => {
        this.props.handleDeleteRow(this.props.index);
        this.props.handleShowAlert('success', '完了しました');
      })
      .catch(e => {
        this.props.handleShowAlert('warning', 'エラーが発生しました');
      })
  }

  handleStartEdit() {
    this.setState(() => {
      return {editTitle: true};
    }, () => {
      ReactDOM.findDOMNode(this.refs.editTitle).focus();
    });
  }

  handleEditTitle(e) {
    this.setState({title: e.target.value});
  }

  handleBlurTitle(e) {
    postJSON(`/tasks/${this.props.id}`, {title: e.target.value}, {method: 'PUT'})
      .then(res => {
        this.setState({editTitle: false, titleUpdated: true});
      })
      .catch(e => {

      });
  }

  handleStartEditDueDate() {
    this.setState(() => {
      return {editDueDate: true};
    }, () => {
      ReactDOM.findDOMNode(this.refs.editDueDate).focus();
    });
  }

  handleEditDueDate(e) {
    this.setState({dueDate: e.target.value});
  }

  handleBlurDueDate(e) {
    postJSON(`/tasks/${this.props.id}`, {dueDate: e.target.value}, {method: 'PUT'})
      .then(res => {
        this.setState({editDueDate: false, dueDateUpdated: true});
      })
      .catch(e => {

      });
  }

  render() {
    return (
      <tr>
        <td>
          <label className="radio-inline">
            <input type="radio" name="done" onChange={this.handleDone}/>
          </label>
        </td>
        <td>
          { this.state.editTitle ? (
            <input type="text" value={this.state.title}
                   onChange={this.handleEditTitle}
                   onBlur={this.handleBlurTitle}
                   ref="editTitle"
            />
          ) : (
            <span onClick={this.handleStartEdit}>
              {this.state.title}
              {this.state.titleUpdated && <i className="glyphicon glyphicon-ok"/>}
            </span>
          )}
        </td>
        <td>
          {
            this.state.editDueDate ? (
              <input type="date" value={this.state.dueDate} onChange={this.handleEditDueDate}
                     onBlur={this.handleBlurDueDate} ref="editDueDate"/>
            ) : (
              <span onClick={this.handleStartEditDueDate}>
                {this.state.dueDate}
                {this.state.dueDateUpdated && <i className="glyphicon glyphicon-ok"/>}
              </span>
            )
          }
        </td>
        <th>
          <button className="btn btn-danger" onClick={this.handleDeleteTask}>削除</button>
        </th>
      </tr>
    );
  }
}
Task.propTypes = {
  id: React.PropTypes.number.isRequired,
  index: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  due_date: React.PropTypes.string,
  handleDeleteRow: React.PropTypes.func,
  handleShowAlert: React.PropTypes.func
};
export default Task
