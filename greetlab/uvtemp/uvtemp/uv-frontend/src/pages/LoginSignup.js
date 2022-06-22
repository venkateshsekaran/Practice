import React, { useState } from 'react'
import "../css/Login.css"
import logo from "../img/Logo without Background(1).png"
import { Form, Button, Spinner } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import config from "../config/config"
import Axios from "axios"
import { toast } from "react-toastify"

const LoginSignup = () => {
  const history = useHistory()
  const [rightPanelActive, rightPanelActiveUpdate] = useState(false)
  const [isLoading, isLoadingUpdate] = useState(false)
  const [signInEmail, signInEmailUpdate] = useState('')
  const [signInPassword, signInPasswordUpdate] = useState('')

  const handleSignIn = (e) => {
    e.preventDefault()
    isLoadingUpdate(true)
    const data = { email: signInEmail, password: signInPassword }
    const url = `${config.BASE_API_URL}authentication/login`
    Axios.post(url, data)
      .then((res) => {
        isLoadingUpdate(false)
        console.log(res.data)
        if (res.data?.message) {
          toast(res.data?.message)
        }
        if (res.data.code == 200) {
          localStorage.setItem('token', res.data?.token)
          if (res.data.user.userType == "client") {
            localStorage.setItem('clientId', res.data.user?.clientId)
            history.push('/dashboard')
          } else {
            history.push('/admin-dashboard')
          }
        }
      })
      .catch((err) => {
        isLoadingUpdate(false)
        console.log(err)
      })
  }
  return (
    <div className="container" >
      <img className="d-block mx-auto mb-3 mt-3" src={logo} alt="UV Heal" width="390px" height="130px" />
      <Form onSubmit={handleSignIn} >
        <h1 className="text-center mt-3">SIGN IN</h1>
        <Form.Control className="mb-3 w-input mt-3" type="email" required
          placeholder="Email"
          value={signInEmail}
          onChange={(e) => { signInEmailUpdate(e.target.value) }}
        />
        <Form.Control className="mb-3 w-input mt-3" type="password" required
          placeholder="Password"
          value={signInPassword}
          onChange={(e) => { signInPasswordUpdate(e.target.value) }}
        />
        <Link className="d-block text-center mb-3 mt-3" to="/verify-email">Forgot Password?</Link>
        <Button className="d-block mx-auto mt-3 mb-3" variant="primary" type="submit">
          {isLoading ?
            <Spinner size="sm" role="status" animation="border" />
            : 'SIGN IN'}
        </Button>
      </Form>
    </div>
  )
}
export default LoginSignup;