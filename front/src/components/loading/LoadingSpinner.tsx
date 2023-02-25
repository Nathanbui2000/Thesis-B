import React from 'react';
import "./LoandingScreen.css"
const LoadingSpinner = () => {
  return (
    <div className="loading-circle">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Saving Data, Please Wait...</span>
        </div>
    </div>
    );
};

export default LoadingSpinner;
