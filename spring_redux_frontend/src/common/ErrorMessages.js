import React from 'react';

const style = {color:"red"};

const ErrorMessages = ({errors}) => {
  if(!errors) errors = [];
  errors = [].concat(errors).map(e=>e);
  return (
    <div>
      {errors.map(err =>
        <div key={err} style={style}> {err} </div>
      )}
    </div>
  );
};

export default ErrorMessages;