import React from "react"
import './css/App.css'
import { Switch, Route, BrowserRouter } from "react-router-dom"

import LoginSignup from './pages/LoginSignup'
import SetPassword from './pages/SetPassword'
import ForgetPassword from './pages/ForgetPassword'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
import RealTimeReports from './pages/RealTimeReports'
import LampOfLife from './pages/LampOfLife'
import DiStatus from './pages/DiStatus'

import AdminDashboard from "./pages/AdminDashboard"
import ClientTable from "./pages/ClientTable"
import LampTable from "./pages/LampTable"
import DriverTable from "./pages/DriverTable"
import UVHealModel from "./pages/UVHealModel"
import GatewayPage from "./pages/GatewayPage"
import ClientList from "./pages/ClientList"
import DriverList from "./pages/DriverList"
import LampList from "./pages/LampList"
import GatewayList from "./pages/GatewayList"
import ControllerList from "./pages/ControllerList"
import ControllerTable from "./pages/ControllerTable"
import UVHealModelList from "./pages/UVHealModelList"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginSignup} />
          <Route exact path="/login-signup" component={LoginSignup} />
          <Route exact path="/forgot-password" component={ForgetPassword} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route exact path="/verify-email" component={VerifyEmail} />
          <Route exact path="/set-password" component={SetPassword} />

          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/real-time-reports" component={RealTimeReports} />
          <Route exact path="/lamp-of-life" component={LampOfLife} />
          <Route exact path="/di-status" component={DiStatus} />

          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/client-table" component={ClientTable} />
          <Route exact path="/lamp-table" component={LampTable} />
          <Route exact path="/driver-table" component={DriverTable} />
          <Route exact path="/uvheal-model" component={UVHealModel} />
          <Route exact path="/gateway" component={GatewayPage} />
          <Route exact path="/controller-table" component={ControllerTable} />

          <Route exact path="/client-list" component={ClientList} />
          <Route exact path="/lamp-list" component={LampList} />
          <Route exact path="/driver-list" component={DriverList} />
          <Route exact path="/uvheal-model-list" component={GatewayList} />
          <Route exact path="/gateway-list" component={GatewayList} />
          <Route exact path="/controller-list" component={ControllerList} />
          <Route exact path="/uvhealmodel-list" component={UVHealModelList} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
