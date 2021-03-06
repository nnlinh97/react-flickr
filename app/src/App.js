import React, { Component } from 'react';
import justifiedLayout from 'justified-layout';
import connectAPI from './utils/connectAPI';
import * as Config from './constant/Config';
import './App.css';
import Photo from './components/Photo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPhotos: [],
      geometry: null,
      nextPage: 1,
      firstLoading: true
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
    connectAPI(this.state.nextPage, 'GET', null).then((res) => {
      let photos = res.data.photos.photo;
      let totalPages = res.data.photos.pages;
      this.setState({
        listPhotos: photos,
        geometry: justifiedLayout(this.createBoxes([...this.state.listPhotos, ...photos]), Config.CSS),
        nextPage: this.state.nextPage + 1 > totalPages ? false : this.state.nextPage + 1,
        firstLoading: false
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  onLoadMore() {
    this.setState({
      isLoading: true
    });
    connectAPI(this.state.nextPage, 'GET', null).then((res) => {

      let photos = res.data.photos.photo;
      let totalPages = res.data.photos.pages;
      this.setState({
        listPhotos: [...this.state.listPhotos, ...photos],
        geometry: justifiedLayout(this.createBoxes([...this.state.listPhotos, ...photos]), Config.CSS),
        nextPage: this.state.nextPage + 1 > totalPages ? false : this.state.nextPage + 1,
        isLoading: false
      });
    });
  }

  handleOnScroll = () => {
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 300;
    if (scrolledToBottom && this.state.nextPage && !this.state.isLoading) {
      this.onLoadMore();
    }
  }

  createBoxes = (data) => {
    return data.map((item) => {
      return { width: parseInt(item.width_s, 10), height: parseInt(item.height_s, 10) }
    });
  }

  render() {
    let photos = this.state.listPhotos.map((photo, index) => {
      return (
        <Photo
          key={index}
          style={this.state.geometry.boxes[index]}
          title={photo.title}
          ownername={photo.ownername}
          views={photo.views}
          src={photo.url_s}
        />
      );
    });
    return (
      <div className="container">
        <div className="main fluid-centered">
          <div className="view photo-list-view" style={this.state.geometry ? { height: this.state.geometry.containerHeight } : {}}>
            {photos}
          </div>
          <div className={this.state.isLoading ? "bottom-loading show" : "bottom-loading"}>
            <h4><b><i>Loading...</i></b></h4>
          </div>
        </div>
        <div className={this.state.firstLoading ? "loading show" : "loading"}>
          <h4><b><i>Loading...</i></b></h4>
        </div>
      </div>

    );
  }
}

export default App;
