import React, { useState } from 'react'
import "../css/LoginSignup.css"
import logo from "../img/Logo without Background(1).png"
import { Form, Button, Spinner } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import config from "../config/config"
import Axios from "axios"
import { toast } from "react-toastify"

const VerifyEmail = () => {
    const history = useHistory()
    const [rightPanelActive, rightPanelActiveUpdate] = useState(false)
    const [isLoading, isLoadingUpdate] = useState(false)
    const [email, emailUpdate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        isLoadingUpdate(true)
        const data = { email }
        const url = `${config.BASE_API_URL}authentication/sendEmailToForgotPassword`
        console.log(data, url)
        Axios.post(url, data)
            .then((res) => {
                console.log(res.data)
                isLoadingUpdate(false)
                if (res.data.code == 200) {
                    toast(res.data.message)
                    history.push('/login-signup')
                }
            })
            .catch((err) => {
                isLoadingUpdate(false)
                console.log(err)
            })

    }
    return (
        <>
            <div className="container">
                <img className="d-block mx-auto mb-3 mt-3"
                    src={logo} alt="UV Heal" width="390px" height="130px" />

                <Form onSubmit={handleSubmit} >
                    <h1 className="text-center mt-3"> UV Heal </h1>
                    <p className="text-center mt-3 mb-3">Forget Password  </p>

                    <Form.Control className="mb-3 w-input mt-3" type="email" required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { emailUpdate(e.target.value) }}
                    />

                    <Button className="d-block mx-auto mt-3 mb-3" variant="primary" type="submit">
                        {isLoading ?
                            <Spinner size="sm" role="status" animation="border" />
                            : 'Submit'}
                    </Button>
                </Form>
                <Button className="d-block mx-auto mt-3 mb-3"
                    onClick={() => { history.push("/login-signup") }} id="signUp" > Sign In </Button>

            </div>
        </>
    )
}
export default VerifyEmail;