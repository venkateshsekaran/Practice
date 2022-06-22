import React, { useState } from 'react'
import "../css/LoginSignup.css"
import logo from "../img/Logo without Background(1).png"
import { Form, Button, Spinner } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import config from "../config/config"
import Axios from "axios"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"

const SetPassword = () => {
    const history = useHistory()
    const [rightPanelActive, rightPanelActiveUpdate] = useState(false)
    const [isLoading, isLoadingUpdate] = useState(false)
    const [password, passwordUpdate] = useState('')
    const [confirmPassword, confirmPasswordUpdate] = useState('')
    const token = new URLSearchParams(useLocation().search).get('token')
    console.log(token);
    const handleSignIn = (e) => {
        e.preventDefault()
        isLoadingUpdate(true)
        const data = { setPasswords: { password, confirmPassword }, token }
        const url = `${config.BASE_API_URL}authentication/setPassword`
        console.log(data, url)
        Axios.post(url, data)
            .then((res) => {
                isLoadingUpdate(false)
                console.log(res.data)
                if (res.data.code == 200) {
                    history.push('/login-signup')
                }
                if (res.data?.message) {
                    toast(res.data?.message)
                }
            })
            .catch((err) => {
                isLoadingUpdate(false)
                console.log(err)
            })
    }
    return (
        <div className="container">
            <img className="d-block mx-auto mb-3 mt-3" src={logo} alt="UV Heal" width="390px" height="130px" />
            <Form onSubmit={handleSignIn} >
                <h1 className="text-center mt-3">Set Password </h1>
                <Form.Control className="mb-3 w-input mt-3" type="password" required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { passwordUpdate(e.target.value) }}
                />
                <Form.Control className="mb-3 w-input mt-3" type="password" required
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => { confirmPasswordUpdate(e.target.value) }}
                />
                {/* <Button className=".Button" variant="primary" type="submit">
                    SUBMIT </Button> */}
                <Button className="d-block mx-auto mt-3 mb-3" variant="primary" type="submit">
                    {isLoading ?
                        <Spinner size="sm" role="status" animation="border" />
                        : 'SUBMIT'}
                </Button>
            </Form>
        </div>
    )
}
export default SetPassword;