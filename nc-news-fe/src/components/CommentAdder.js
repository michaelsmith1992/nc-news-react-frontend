import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { postComments } from '../utils/request';
import Errors from './Errors';
import UserContext from '../UserContext';

class CommentAdder extends React.Component {
  state = {
    show: false,
    name: null,
    body: '',
    validationError: false,
    errors: null,
  };
  static contextType = UserContext;

  render() {
    if (this.state.errors)
      return (
        <Errors
          status={this.state.errors.response.status}
          msg={this.state.errors.response.data.msg}
        />
      );
    return (
      <>
        <Button variant="primary" onClick={this.handleToggle}>
          Add a new comment
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleToggle}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add a new Comment:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="body">Comment:</label>
                <textarea
                  rows="6"
                  type="text"
                  placeholder="Comment"
                  name="body"
                  className="form-control"
                  onChange={this.handleChange}
                ></textarea>
              </div>
              {this.state.validationError ? (
                <div className="alert alert-danger">
                  Comment field is empty!
                </div>
              ) : null}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleToggle}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Add Comment
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  handleSubmit = async () => {
    try {
      if (this.state.body === '') {
        this.setState({ validationError: true });
      } else {
        const comments = await postComments(
          this.props.id,
          this.context.user.user.username,
          this.state.body
        );
        this.handleToggle();
        this.props.handleUpdate(comments.comment);
        this.setState({ validationError: false });
      }
    } catch (error) {
      this.setState({ errors: error });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleToggle = () => {
    this.setState((curVal) => {
      return { show: !curVal.show };
    });
  };
}

export default CommentAdder;
