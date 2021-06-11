import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header';
import Events from './components/Events/events';
import Signup from './components/Signup/signup';
import Login from './components/Login/login';
import Content from './components/Home/home';
import Footer from './components/footer';
import Quiz from './components/Quiz/quiz';
import OnlineCompiler from './components/OnlineCompiler/onlinecompiler';
import EventDetails from './components/EvenDetails/eventdetails';
import UserDetails from './components/UserDetails/userdetails';
import ForgotPassword from './components/ResetPassword/forgotpassword';
import ResetPassword from './components/ResetPassword/resetpassword';
import UpdatePassword from './components/ResetPassword/updatepassword';
import UpdateUserDetails from './components/UpdateUserDetails';
import AdminDashboard from './admin/AdminDashboard/admindashboard';
import ManageEvents from './admin/ManageEvents/manageevents';
import ManageRegistrations from './admin/ManageRegistrations/manageregistrations';
import ManageAttendances from './admin/ManageAttendance/manageattendance';
import RegisteredUsersTable from './admin/ManageRegistrations/registreduserstable';
import MarkAttendance from './admin/ManageAttendance/markattendance';
import AddEvent from './admin/example/example'
import ScrollToTop from './components/scrolltotop';

import PrivateRoute from './Auth/PrivateRoutes';
import AdminRoute from './Auth/AdminRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {
  return (
    <Router >
      <div className="App">
        <ToastContainer hideProgressBar />
        <Header />
        <Switch>
            <Route path="/" exact component={Content} />
            <Route path="/events" exact component={Events} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/user/reset-password" exact component={ForgotPassword} />
            <Route exact path="/reset/:token" component={ResetPassword} />
            <PrivateRoute path="/user/update-password" exact component={UpdatePassword} />
            <PrivateRoute path="/user/profile" exact component={UserDetails} />
            <PrivateRoute path="/user/updateprofile" exact component={UpdateUserDetails} />
            <PrivateRoute path="/quiz/:id" exact component={Quiz} />
            <PrivateRoute path="/compiler" exact component={OnlineCompiler} />
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
            <AdminRoute path="/admin/events" exact component={ManageEvents} />
            <AdminRoute path="/admin/create/event" exact component={AddEvent} />
            <AdminRoute path="/admin/event/update/:id" exact component={AddEvent} />
            <AdminRoute path="/admin/registrations" exact component={ManageRegistrations} />
            <AdminRoute path="/admin/attendances" exact component={ManageAttendances} />
            <AdminRoute path="/admin/:id/registeredusers" exact component={RegisteredUsersTable} />
            <AdminRoute path="/admin/:id/markattendance" exact component={MarkAttendance} />
            <ScrollToTop><PrivateRoute path="/event/:id" exact component={EventDetails} /></ScrollToTop>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;

