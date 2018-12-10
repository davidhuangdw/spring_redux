import React from 'react';

const style = {color:"red"};

const ErrorMessages = ({errors}) => {
  if(!errors) errors = [];
  return (
    <div>
      {errors.filter(e => e).map(err =>
        <div key={err} style={style}> {err} </div>
      )}
    </div>
  );
};

export default ErrorMessages;