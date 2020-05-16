import {
  HomePage,
  LoginPage,
  RegisterPage,
  ChangePasswordPage,
} from './../pages';

export const openRoutes = [
  {
    path: '/login',
    name: 'Login',
    exact: true,
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    exact: true,
    component: RegisterPage
  }
];

export const protectedRoutes = [
  {
    path: '/',
    name: 'Todos Page',
    exact: true,
    component: HomePage
  },
  {
    path: '/change-password',
    name: 'Change Password',
    exact: true,
    component: ChangePasswordPage
  },
];