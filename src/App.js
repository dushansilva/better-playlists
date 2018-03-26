import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string'

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
          {
            name: 'song1',
            duration: 123
          }, {
            name: 'song2',
            duration: 123
          }
        ]
      }, {
        name: "weekly awe",
        songs: [
          {
            name: 'song3',
            duration: 123
          }, {
            name: 'song4',
            duration: 123
          }
        ]
      }, {
        name: "fav3",
        songs: [
          {
            name: 'song5',
            duration: 123
          }, {
            name: 'song6',
            duration: 123
          }
        ]
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
        {this.props.playlists.length}
        playlists</h2>
    </div>);
  }
}

class HoursCounter extends Component {
  render() {

    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (<div style={{
        ...defaultStyle,
        width: "40%",
        display: "inline-block"
      }}>
      <h2 style={{
          ...defaultStyle
        }}>
        {totalDuration}
        hours</h2>
    </div>);
  }
}

class Filter extends Component {
  render() {
    return (<div style={defaultStyle}>
      <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)}/>

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
      <img src={playlist.imageUrl} style={{width:"60px"}}/>
      <h3>{playlist.name}</h3>
      <ul>
        {playlist.songs.map(song => <li>{song.name}</li>)}

      </ul>
    </div>);
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token

    if (!accessToken)
      return;

    fetch('https://api.Spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json()).then(data => this.setState({
        user: {
          name: data.display_name
        }
    }))

    fetch('https://api.Spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json()).then(data => this.setState({

        playlists: data.items.map(item => {
          console.log(data.items)
          return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: []
        }
      })
    }))
  }
  render() {

    let playlistToRender = this.state.user &&
    this.state.playlists
      ? this.state.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()))
      : []

    return (<div className="App">
      {
        this.state.user
          ? <div>
              <h1 style={defaultStyle}>
                {this.state.user.name}
                playlist
              </h1>
              <PlaylistCounter playlists={playlistToRender}/>
              <HoursCounter playlists={playlistToRender}/>

              <Filter onTextChange={text => this.setState({filterString: text})}/>
              {playlistToRender.map(playlist => <Playlists playlist={playlist}/>)}
            </div>
          : <button onClick={() => window.location = 'http://localhost:8888/login'} style={{
                padding: '20px',
                'font-size' : '50px',
                'margin-top' : '20px'
              }}>
              Sign in with Spotify</button>
      }
    </div>)
  }
}

export default App;
