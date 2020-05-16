import axios from "axios";
import { hasToken, getSession,  } from './session';
// import Auth from './Auth';

const METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
}

const BASEURL = process.env.REACT_APP_API_URL;

// CHECK BELOW FOR SAMPLE DATA TO BE PASSED
class Api {
    isLoggedIn = false;

    constructor() {
        this.baseURL = BASEURL;
        this.isAlreadyFetchingAccessToken = false;
        this.getAuthenticationInfo();
    }

    getAuthenticationInfo() {
        if (hasToken()) {
            this.isLoggedIn = true;
            this.accessToken = getSession();
        }
    }

    // URL FOR API
    // REFER SAMPLE JSON AT BOTTOM FOR DATA VALUES
    get(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.GET, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.POST, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    put(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.PUT, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    delete(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.DELETE, url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    api(method, url, data) {
        this.getAuthenticationInfo();
        return new Promise((resolve, reject) => {
            let axiosConfig = {};
            axiosConfig.method = method;

            axiosConfig.url = this.baseURL + url;

            axiosConfig.headers = this.setHeaders(data);
            if (data) {
                if (data.params) axiosConfig.params = data.params;

                if (data.data) axiosConfig.data = data.data;
            }

            axios(axiosConfig)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response) {
                        console.log('ERROR', error.response);
                        reject(error.response.data);
                    }
                });
        });
    }

    setHeaders(data) {
        let headers = {};
        headers['accept-language'] = 'en';
        headers['Content-Type'] = 'application/json';

        if (data) {
            if (data.isMultipart) {
                headers['Content-Type'] = 'multipart/form-data';
            }

            if (data.headers) {
                for (var key in data.headers) {
                    if (data.headers.hasOwnProperty(key)) {
                        headers[key] = data.headers[key];
                    }
                }
            }
        }

        if (this.isLoggedIn !== false && !(data && data.skipAuth)) {
            headers['Authorization'] = 'Bearer ' + this.accessToken;
        }

        return headers;
    }
}

// SAMPLE DATA JSON
/* let sample_data = {

    // ADDITIONAL HEADERS IF REQUIRED
    headers :{
        'Content-type'  : 'xx-urlencode',
    },

    // IF USER ID AND TOKEN SHOULDN'T BE PASSED IN HEADERS (USER FOR AFTER LOGIN API)
    // DEFAULT : FALSE;
    skipAuth    : false,

    // IF Default error handling needs to be overridden
    // DEFAULT : FALSE;
    skipErrorHandling    : false,

    // FOR SENDING FILES OR FORM DATA REQUEST
    isMultipart : true,

    // `PARAMS` ARE THE URL PARAMETERS TO BE SENT WITH THE REQUEST
    params : {
        user_id     : 10,
        name        : "lorem",
        page        : 3,
        sort_by     : 'name'
    },

    // POST DATA
    data : {
        firstName   : 'Lorem',
        lastName    : 'Ipsum'
    },
} */

export default Api;