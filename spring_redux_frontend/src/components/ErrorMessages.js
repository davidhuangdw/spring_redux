import React from 'react';

const ErrorMessages = ({errors}) => {
  if(!errors) errors = [];
  return (
    <div>
      {errors.filter(e => e).map(err =>
        <div key={err} style={{color:"red"}}> {err} </div>
      )}
    </div>
  );
};

export default ErrorMessages;