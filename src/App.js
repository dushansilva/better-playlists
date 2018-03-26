import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color : '#fff'
}
class Aggregate extends Component {
  render() {
    return (<div style={{
      ...defaultStyle,
        width: "40%",
        display: "inline-block"
      }}>
      <h2 style={{
          ...defaultStyle,
        }}>number text</h2>
    </div>);
  }
}

class Filter extends Component {
  render() {
    return (<div style={defaultStyle}>
      <input type="text"/>

    </div>);
  }
}
class Playlists extends Component {
  render() {
    return (
    <div style={{...defaultStyle, width:"25%",display:"inline-block"}}>
      <h3>Playlist Name</h3>
      <ul>
        <li>song 1</li>
        <li>song 2</li>
        <li>song 3</li>

      </ul>
    </div>);
  }
}
class App extends Component {
  render() {
    return (
    <div className="App">
      <h1>Title</h1>
      <Aggregate/>
      <Aggregate/>
      <Filter/>
      <Playlists/>
      <Playlists/>
      <Playlists/>
      <Playlists/>

    </div>);
  }
}

export default App;
