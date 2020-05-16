import React from 'react';

// For redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './../../redux/Login/Actions';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Document Head Manager
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';

import Notification from './../../components/Notification';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${process.env.REACT_APP_BASE_PATH}/media/background.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter email'),
  password: Yup.string().required('Please enter a password').min(8).max(255),
});

const Login = (props) => {
  const { isAuthenticated, hasError, errorMessage, handleLoginRequestAction } = props;
  const classes = useStyles();

  const handleFormSubmit = (values) => {
    handleLoginRequestAction(values);
  }

  return (
    isAuthenticated ?
      <Redirect to="/" />
      :
      <Container className="my-4" component="main" style={{ minHeight: 'calc(100vh -  596px)' }} maxWidth="sm">
        <Notification />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login | {process.env.REACT_APP_NAME}</title>
        </Helmet>
        <Breadcrumbs className="mt-4" separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link to="/" className="MuiTypography-root MuiLink-root MuiTypography-colorInherit">
            Home
          </Link>
          <Typography className="text-dark font-weight-bold" color="textPrimary">Login</Typography>
        </Breadcrumbs>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {hasError &&
            <Alert className="mt-3 w-100" severity="error">{errorMessage}</Alert>
          }
          <Formik
            enableReinitialize
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleFormSubmit}
            validationSchema={LoginValidationSchema}
          >
            {(renderProps) => {
              const { values: formValues, touched, errors } = renderProps;
              return (
                <Form className={classes.form}>
                  <TextField
                    label="Email"
                    style={{ width: '100%' }}
                    margin="normal"
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formValues.email}
                    onChange={e => renderProps.setFieldValue('email', e.target.value)}
                    helperText={touched.email ? errors.email : ''}
                    error={touched.email && errors.email ? true : false}
                  />
                  <TextField
                    label="Password"
                    style={{ width: '100%' }}
                    margin="normal"
                    fullWidth
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    InputProps={{
                      type: 'password',
                    }}
                    value={formValues.password}
                    onChange={e => renderProps.setFieldValue('password', e.target.value)}
                    helperText={touched.password ? errors.password : ''}
                    error={touched.password && errors.password ? true : false}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link to="/register">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Container>
  );
}

const mapStateToProps = (state) => ({
  ...state.Login
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

