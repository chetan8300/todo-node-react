import React, { useEffect } from "react";

// For redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../redux/Notification/Actions.js';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = (props) => {
  const { isNew, type, message, changeFlagAction } = props;

  useEffect(() => {
    if(isNew) {
      setTimeout(() => {
        changeFlagAction();
      }, 6000);
    }
  }, [isNew, changeFlagAction])

  return (
    isNew ?
      <Snackbar open={isNew} autoHideDuration={6000} onClose={changeFlagAction}>
        <Alert onClose={changeFlagAction} severity={type}>
          {message}
        </Alert>
      </Snackbar>
      :
      <></>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.Notification
  };
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
