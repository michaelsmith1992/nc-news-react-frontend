import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { postArticles } from '../utils/request';
import Errors from './Errors';

class ArticleAdder extends React.Component {
  state = {
    show: false,
    name: null,
    body: '',
    title: '',
    topic: '',
    validationErrorBody: false,
    validationErrorTitle: false,
    validationErrorTopic: false,
    topics: [],
    errors: null,
  };
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
        <Button variant="primary" id="add-article" onClick={this.handleToggle}>
          Add a new Article
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleToggle}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add a new Article:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  onChange={this.handleChange}
                ></input>
              </div>
              {this.state.validationErrorTitle ? (
                <div className="alert alert-danger">Title field is empty!</div>
              ) : null}
              <div className="form-group">
                <label htmlFor="topic"> Topic:</label>
                <select
                  name="topic"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.props.topic !== null ? this.props.topic : ''}
                >
                  <option value="">Select Topic</option>
                  {this.state.topics.map((topic) => {
                    return (
                      <option key={topic.slug} value={topic.slug}>
                        {topic.slug}
                      </option>
                    );
                  })}
                </select>
              </div>
              {this.state.validationErrorTopic ? (
                <div className="alert alert-danger">Select a topic</div>
              ) : null}
              <div className="form-group">
                <label htmlFor="body">Article:</label>
                <textarea
                  rows="6"
                  type="text"
                  className="form-control"
                  placeholder="Article"
                  name="body"
                  onChange={this.handleChange}
                ></textarea>
              </div>
              {this.state.validationErrorBody ? (
                <div className="alert alert-danger">
                  Article field is empty!
                </div>
              ) : null}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleToggle}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Add Article
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  async componentDidMount() {
    this.setState({
      topics: this.props.topics,
      topic: this.props.topic ? this.props.topic : '',
    });
  }
  handleSubmit = async () => {
    try {
      if (
        this.state.body === '' ||
        this.state.title === '' ||
        this.state.topic === ''
      ) {
        this.handleValidation();
      } else {
        const comments = await postArticles(
          this.state.title,
          this.state.body,
          this.state.topic,
          this.context.user.user.username,
          0
        );
        this.handleToggle();
        this.props.handleUpdate(comments);
        this.setState({ validationError: false });
      }
    } catch (error) {
      this.setState({ errors: error });
    }
  };

  handleValidation = () => {
    const validationErrorBody = this.state.body === '';
    const validationErrorTitle = this.state.title === '';
    const validationErrorTopic = this.state.topic === '';
    this.setState({
      validationErrorBody,
      validationErrorTitle,
      validationErrorTopic,
    });
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

export default ArticleAdder;
