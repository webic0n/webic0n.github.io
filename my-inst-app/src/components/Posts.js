import React, {Component} from 'react';
import Post from './Post';

export default class Posts extends Component{
  render(){
    return (
      <div className="left">
        <Post alt="nature" src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fscottmendelson%2Ffiles%2F2019%2F04%2Fscreencapture-file-C-Users-JckNa-OneDrive-Desktop-b-avengersendgame-horizontal-friday-17793-04d92fbf-webp-2019-04-23-08_14_14.jpg"/>
        <Post alt="nature" src="https://cdn3.movieweb.com/i/article/jg5LbBHvooXk1sDJR3X6QdMPFrqHfw/798:50/Avengers-4-New-Marketing-Strategy-Marvel.jpg"/>
      </div>
    )
  }
}