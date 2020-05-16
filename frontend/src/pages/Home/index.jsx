import React, { useEffect } from 'react';

// For redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './../../redux/Home/Actions';
import { setHeaderNameAction } from '../../redux/MainLayout/Actions';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Formik, Form } from 'formik';

import Loader from '../../components/Loader';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: 900,
    alignSelf: 'flex-end'
  },
  table: {
    minWidth: 650,
  },
}));

const Home = (props) => {
  const {
    todos,
    setHeaderNameAction,
    isLoading,
    resetDashboardAction,
    fetchAllTodosAction,
    addTodoAction,
    deleteTodoAction,
    updateTodoAction,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    setHeaderNameAction('Todos');
    fetchAllTodosAction();
    return () => {
      resetDashboardAction();
    }
  }, [setHeaderNameAction, resetDashboardAction, fetchAllTodosAction]);

  const handleCreateTodo = (values) => {
    addTodoAction(values);
  }

  const handleDeleteTodo = payload => {
    deleteTodoAction(payload);
  }

  const handleUpdateTodo = payload => {
    updateTodoAction(payload)
  }

  return (
    <Container maxWidth="lg">
      <Breadcrumbs className="mb-4" separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Typography className="text-dark font-weight-bold breadcrumb-active" color="textPrimary">Todos</Typography>
      </Breadcrumbs>
      {isLoading ?
        <Loader />
        :
        <div>
          <Formik
            enableReinitialize
            initialValues={{
              task: '',
            }}
            onSubmit={(values, { resetForm }) => {
              handleCreateTodo(values);
              resetForm({ task: '' })
            }}
          >
            {(renderProps) => {
              const { values: formValues, touched, errors } = renderProps;
              return (
                <Form className="d-flex align-items-center">
                  <TextField
                    label="Task"
                    margin="normal"
                    fullWidth
                    id="task"
                    name="task"
                    required={true}
                    value={formValues.task}
                    onChange={e => renderProps.setFieldValue('task', e.target.value)}
                    helperText={touched.task && errors.task}
                    error={touched.task && errors.task ? true : false}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <TableContainer component={Paper} className="mt-3">
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 250 }}>Date</TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map(todo => {
                  return (
                    <TableRow key={todo.id}>
                      <TableCell>
                        {todo.createdAt}
                      </TableCell>
                      <TableCell>{todo.task}</TableCell>
                      <TableCell>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                          <Select
                            value={todo.status}
                            onChange={(e) => {
                              handleUpdateTodo({ id: todo.id, task: todo.task, status: e.target.value })
                            }}
                            label="Status"
                          >
                            <MenuItem value={'ToDo'}>ToDo</MenuItem>
                            <MenuItem value={'Doing'}>Doing</MenuItem>
                            <MenuItem value={'Done'}>Done</MenuItem>
                            <MenuItem value={'Blocked'}>Blocked</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="delete" onClick={() => handleDeleteTodo({ id: todo.id })}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </Container>
  )
}

const mapStateToProps = (state) => ({
  ...state.Home
})

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ ...Actions, setHeaderNameAction }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
