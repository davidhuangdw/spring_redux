import React from 'react';

const ErrorMessages = ({errors=[]}) => {
  return (
    <div>
      {errors.map(err =>
        <div key={err} style={{color:"red"}}> {err} </div>
      )}
    </div>
  );
};

export default ErrorMessages;