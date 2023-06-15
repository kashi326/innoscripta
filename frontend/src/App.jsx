import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import ErrorPage from "./components/errors.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import './index.css'
import 'antd/dist/reset.css';
import Home from "./pages/Home";
import useUsersStore from "./stores/users";
import PropTypes from "prop-types";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth redirectTo="/login">
            <Home />
        </RequireAuth>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}
function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = useUsersStore((state)=>state.isAuthenticated);
    return isAuthenticated() ? children : <Navigate to={redirectTo} />;
}

RequireAuth.propTypes = {
    children: PropTypes.elementType.isRequired,
    redirectTo: PropTypes.string.isRequired,
};
export default App
