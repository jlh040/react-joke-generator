import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {jokes: []};
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  static defaultProps = {
    numJokesToGet: 10
  }

  /* when the page first loads and this component first mounts, fill up the jokes array */
  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  /**
   * when the user clicks the button for new jokes, and this component re-renders,
   * fill up the jokes array 
   */
  componentDidUpdate() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  /**
   * fill up a new array with jokes until it has numJokesToGet jokes,
   * then update the state with this new array
   */
  async getJokes() {
    let j = [...this.state.jokes];
    let seenJokes = new Set();
    try {
      while (j.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setState({jokes: j});
    } catch (e) {
      console.log(e);
    }
  }

  /* empty joke list and then call getJokes */

  generateNewJokes() {
    this.setState({jokes: []});
  }

  /* change vote for this id by delta (+1 or -1) */

  vote(id, delta) {
    this.setState(state => ({
      jokes: state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    }))
  }

  /* render: either loading spinner or list of sorted jokes. */

  render() {
    const { jokes } = this.state;
    if (jokes.length) {
      let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
    
      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>
    
          {sortedJokes.map(j => (
            <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
          ))}
        </div>
      );
    };

    return null;
  }
}

export default JokeList;
