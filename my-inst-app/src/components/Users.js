import React from 'react';
import User from './User';


export default function Users(){
  return(
    <div className="right">
      <User 
          src="https://pp.userapi.com/c637418/v637418898/b9fe/wjquRLnPCEI.jpg"
          alt="tony"
          name="tony_stark"
        />
      <div className="users__block">
        <User 
            src="https://pp.userapi.com/c637418/v637418898/b9fe/wjquRLnPCEI.jpg"
            alt="tony"
            name="tony_stark"
            min
          />
          <User 
          src="https://pp.userapi.com/c637418/v637418898/b9fe/wjquRLnPCEI.jpg"
          alt="tony"
          name="tony_stark"
          min
        />
        <User 
          src="https://pp.userapi.com/c637418/v637418898/b9fe/wjquRLnPCEI.jpg"
          alt="tony"
          name="tony_stark"
          min
        />
        <User 
          src="https://pp.userapi.com/c637418/v637418898/b9fe/wjquRLnPCEI.jpg"
          alt="tony"
          name="tony_stark"
          min
        />
      </div>
    </div>
  )
}