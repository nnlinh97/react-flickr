import React, { Component } from 'react';

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    onMouseEnter = (e) => {
        e.preventDefault();
        this.setState({
            hover: true
        });
    }

    onMouseLeave = (e) => {
        e.preventDefault();
        this.setState({
            hover: false
        });
    }

    render() {
        let photo = this.props;
        let info = '';
        if (this.state.hover) {
            info = (
                <div className="interaction-view">
                    <div className="photo-list-photo-interaction">
                        <a className="overlay"> </a>
                        <div className="interaction-bar">
                            <div className="text">
                                <a className="title">{photo.title}</a>
                                <a className="attribution">by {photo.ownername} - {photo.views} views</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="photo-view" style={photo.style} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                {info}
                <img src={photo.src} alt={photo.title} />
            </div>
        );
    }
}

export default Photo;