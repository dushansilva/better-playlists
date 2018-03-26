import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#fff'
}

let fakeServerData = {
  user: {
    name: 'Dushan ',
    playlists: [
      {
        name: "fav",
        songs: [
          {name:'song1', duration:123},
          {name:'song2', duration:123}
        ]
      }, {
        name: "fav2",
        songs: [{name:'song3', duration:123},{name:'song4', duration:123} ]
      }, {
        name: "fav3",
        songs: [{name:'song5', duration:123},{name:'song6', duration:123} ]
      }

    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (<div style={{
        ...defaultStyle,
        width: "40%",
        display: "inline-block"
      }}>
      <h2 style={{
          ...defaultStyle
        }}>
        {this.props.playlists.length} playlists</h2>
    </div>);
  }
}

class HoursCounter extends Component {
  render() {

    let allSongs = this.props.playlists.reduce((songs,eachPlaylist) =>{
      return songs.concat(eachPlaylist.songs)
    } ,[])
    let totalDuration = allSongs.reduce((sum,eachSong) =>{
      return sum + eachSong.duration
    },0)
    return (<div style={{
        ...defaultStyle,
        width: "40%",
        display: "inline-block"
      }}>
      <h2 style={{
          ...defaultStyle
        }}>
        {totalDuration} hours</h2>
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
    let playlist = this.props.playlist
    return (<div style={{
        ...defaultStyle,
        width: "25%",
        display: "inline-block"
      }}>
      <h3>{playlist.name}</h3>
      <ul>
        {playlist.songs.map(song =>
          <li>{song.name}</li>
        )}


      </ul>
    </div>);
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: {}
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 2000)
  }
  render() {
    return (<div className="App">{
        this.state.serverData.user ?
         <div>
            <h1 style={defaultStyle}>
              {this.state.serverData.user.name}
              Title
            </h1>

            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter/>

            {
              this.state.serverData.user.playlists.map(playlist =>
                <Playlists playlist={playlist}/>
              )
            }
          </div> : <h1 style={defaultStyle}>loading</h1>
      }
    </div>)
  }
}

export default App;
