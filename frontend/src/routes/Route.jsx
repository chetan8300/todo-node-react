import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// COMPONENTS
import MainLayout from './../components/MainLayout';

// ROUTING COMPONENTS
import { protectedRoutes, openRoutes } from './RoutesList';

class Routes extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <Switch>
        {openRoutes.map((route, index) => (
          <Route
            key={`openRoutes-${index}`}
            path={route.path}
            exact={route.exact}
            component={(propsComponent) => {
              const RouteComponent = withRouter((withRouterProps) => {
                return <route.component {...propsComponent} {...withRouterProps} />
              });
              return <RouteComponent />;
            }}
          />
        ))}
        {!isAuthenticated ?
          <Redirect to="/login" />
          :
          protectedRoutes.map((route, index) => (
            <Route
              key={`protectedRoutes-${index}`}
              path={route.path}
              exact={route.exact}
              component={(propsComponent) => {
                const RouteComponent = withRouter((withRouterProps) => {
                  return (
                    <MainLayout {...propsComponent} {...withRouterProps}>
                      <route.component {...propsComponent} {...withRouterProps} />
                    </MainLayout>
                  )
                });
                return <RouteComponent />;
              }}
            />
          ))
        }
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Login.isAuthenticated
})

export default withRouter(connect(mapStateToProps, null)(Routes));
