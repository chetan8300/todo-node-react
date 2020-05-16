import jwtDecode from 'jwt-decode';

export const persistSession = (token) => localStorage.setItem('authentication-token', token);

export const deleteSession = () => localStorage.removeItem('authentication-token');

export const getSession = () => localStorage.getItem('authentication-token');

export const hasToken = () => {
  const authToken = getSession();
  if (authToken && authToken !== '') {
    try {
      const decodedToken = authToken ? jwtDecode(authToken) : false;
      const currentTimestamp = new Date().getTime();
      const tokenExpTime = decodedToken.exp * 1000;
      if(currentTimestamp > tokenExpTime) {
        deleteSession();
      }
      return decodedToken && tokenExpTime > currentTimestamp;
    } catch (err) {
      return false;
    }
  }
  return false;
};

export const getUserData = () => {
  const authToken = getSession();
  if (authToken && authToken !== '') {
    try {
      const decodedToken = authToken ? jwtDecode(authToken) : false;
      return decodedToken ? { id: decodedToken.id, email: decodedToken.email } : undefined;
    } catch (err) {
      return undefined;
    }
  }
  return undefined;
}