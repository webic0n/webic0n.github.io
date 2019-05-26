import React, {Component} from 'react';
import User from './User';

export default class Post extends Component{
  render(){
    return(
      <div className="post">
        <User 
          src="https://pp.userapi.com/c637418/v637418898/b9fe/wjquRLnPCEI.jpg"
          alt="tony"
          name="tony_stark"
          min
        />
        <img src={this.props.src} alt={this.props.alt}></img>
        <div className="post__name">
          account
        </div>
        <div className="post__descr">
          safasfa ansfabkfbakf asfasfkabfa qweqca
        </div>
      </div>
    )
  }
}