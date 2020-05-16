import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <CircularProgress />
    </div>
  )
};

export default Loader;