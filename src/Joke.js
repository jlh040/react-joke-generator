import React from "react";
import "./Joke.css";

class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  /**
   * when the user clicks the thumbs up, add one vote to the joke
   * with the id on this joke instance
   */
  upVote() {
    this.props.vote(this.props.id, +1);
  }

  /**
   * when the user clicks the thumbs down, remove one vote from the joke
   * with the id on this joke instance
   */
  downVote() {
    this.props.vote(this.props.id, -1);
  }

  /* render a joke */
  render() {
    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={this.upVote}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={this.downVote}>
            <i className="fas fa-thumbs-down" />
          </button>

          {this.props.votes}
        </div>

        <div className="Joke-text">{this.props.text}</div>
      </div>
    )
  }
}

export default Joke;
