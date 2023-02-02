import { Navigate } from "react-router-dom";

function PrivateRoute(props) {
    if ("...") {
        return props.children;
    }
    return <Navigate to="/" />;
}

export default PrivateRoute;







/*
gpt:-------------
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('isLoggedIn') ? (
            <Component {...props} />
            ) : (
            <Redirect to="/login" />
            )
        }
    />
);
export default PrivateRoute;


use:---
import { Route, Switch } from 'react-router-dom';
<Switch>
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
</Switch>
*/