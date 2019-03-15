import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      text: '',
      correct: false,
      error: false,
      streak: 0
    }

    this.startingForm = React.createRef();

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleChangePassword = e => this.setState({ password: e.target.value });

  handleChangeText = e => {
    const text = e.target.value;
    const password = this.state.password;
    const correct = text === password;
    const error = !password.startsWith(text);
    const streak = correct ? this.state.streak + 1
                 : error ? 0 : this.state.streak;

    this.setState({
      text: text,
      correct: (text === '') ? false : correct,
      error: error,
      streak: streak
    });
  }

  handleEnter = e => {
    if (e.key !== 'Enter') return null;
    
    this.setState({
      text: '',
      correct: false,
      error: false
    });
  }

  componentDidMount() {
    this.startingForm.current.focus();
  }

  textBoxStyle() {
    const green = '#5cb85c';
    const red = '#d9534f';

    const style = color => {
      return {
        backgroundColor: color + '80',
        borderColor: color,
        boxShadow: '0 0 20px ' + color
      }
    }

    if (this.state.correct)
      return style(green);
    if (this.state.error)
      return style(red);
  }

  render() {
    return (
      <div className="App">
        <h1>Password Memory Tool</h1>
        <ul id="instructions">
          <li>Enter your password in the top box.</li>
          <li>Practice rote memorization in the bottom box.</li>
          <li id="red-text">Red means you made a boo-boo.</li>
          <li id="green-text">Green means you got it right.</li>
          <li>Press enter to reset the bottom box.</li>
        </ul>
        <input
          id="password"
          value={this.state.password}
          onChange={e => this.handleChangePassword(e)}
          ref={this.startingForm}
          />
        <input
          id="text"
          style={this.textBoxStyle()}
          value={this.state.text}
          onChange={e => this.handleChangeText(e)}
          onKeyPress={e => this.handleEnter(e)}
          />
        <p>Current streak: {this.state.streak}</p>
      </div>
    );
  }
}

export default App;
