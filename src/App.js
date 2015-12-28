import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      photoAdded: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.togglePhoto = this.togglePhoto.bind(this);
    this.remainingChars = this.remainingChars.bind(this);
  }

  render() {
    const styles = {
      form: {
        padding: 10,
        width: 600,
      },
      tweetBttn: {
        float: 'right',
      },
      photoBttn: {
        float: 'right',
      },
      chars: {
        color: this.remainingChars() < 0 ? 'red' : 'black',
      },
    };
    return (
      <div style={styles.form} className='ui form container'>
        <div className='field'>
          {this.overflowAlert()}
          <textarea
            onChange={this.handleChange}
            rows='4'>
          </textarea><br />
        </div>
        <span style={styles.chars} >{this.remainingChars()}</span>
        <button
          style={styles.tweetBttn}
          className={(this.state.text.length > 0 || this.state.photoAdded) ? 'ui submit button blue' : 'disabled ui submit button blue'}
          type='submit'
          >
          Tweet
        </button>
        <button
          style={styles.photoBttn}
          className='ui submit button basic'
          onClick={this.togglePhoto}
          >
          {this.state.photoAdded ? '√ Photo Added' : 'Add Photo'}
        </button>
      </div>
    );
  }

  overflowAlert() {
    let beforeOverflowText;
    let overflowText;

    if (this.state.photoAdded) {
      beforeOverflowText = this.state.text.substring(140 - 23 - 10, 140 - 23);
      overflowText = this.state.text.substring(140 - 23);
    } else {
      beforeOverflowText = this.state.text.substring(140 - 10, 140);
      overflowText = this.state.text.substring(140);
    }

    if (this.remainingChars() < 0) {
      return (
        <div className='ui negative message'>
          <div className='header'>
            Oops! Something went wrong..
          </div>
          <p>You went over the maximum allowed characters: " ...{beforeOverflowText}<strong>{overflowText}</strong>"</p>
        </div>
      );
    };
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  togglePhoto(e) {
    this.setState({
      photoAdded: !this.state.photoAdded,
    });
  }

  remainingChars() {
    if (this.state.photoAdded)
      return 140 - 23 - this.state.text.length;
    else
      return 140 - this.state.text.length;
  }
}

export default App;
