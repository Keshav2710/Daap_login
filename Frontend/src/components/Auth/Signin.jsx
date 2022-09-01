import React, { useState, useEffect, useRef } from 'react';
import styles from "./Signin.module.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ethers } from "ethers";
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom';

import axiosConfig from '../../utils/axiosConfig';


const Signin = () => {

    let navigate = useNavigate();

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    // const contract = new ethers.Contract(
    //     "0x9fBD6F53526dC4AC158a7e98031f68E59B249C6e",
    //     Artifact.abi,
    //     signer
    // )

    const [account, setAccount] = useState("");
    const [isAccountThere, setIsAccountThere] = useState(false);

    const nameElement = useRef()
    const emailElement = useRef()
    const dobElement = useRef()
    const accountElement = useRef()

    const [cookies, setCookie] = useCookies(['access_token'])

    const getAccountAddress = async () => {
        const add = await provider.listAccounts()
        //console.log(process.env.BACKEND_URL)
        let data = {
            "account": add[0]
        }

        axiosConfig.post('checkaccounts',
            data,
            {
                'Content-Type': 'application/json',
            })
            .then(res => {
                console.log(res.data)
                if (res.data.account == add[0]) {
                    setIsAccountThere(true)
                } else {
                    setIsAccountThere(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        setAccount(add[0])
    }

    useEffect(() => {
        if (window.ethereum) {
            provider.send("eth_requestAccounts", [])
            getAccountAddress()
        } else {
            alert("Install Metamask")
        }
    },[isAccountThere])

    const getToken = (event) => {
        event.preventDefault();
        let account = accountElement.current.value
        let data = {
            "account": account
        }
        axiosConfig.post('token',
            data,
            {
                'Content-Type': 'application/json',
            })
            .then(res => {
                setCookie("access_token", res.data.access_token)
                if (cookies.access_token) {
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const onRegister = (event) => {
        event.preventDefault();
        let name = nameElement.current.value
        let email = emailElement.current.value
        let dob = dobElement.current.value
        let account = accountElement.current.value

        if (name == "" && name.lenght < 3) {
            alert("name is empty or length is than 3")
        } else {
            let data = {
                "accounts": account,
                "name": name,
                "email": email,
                "DOB": dob
            }
            axiosConfig.post('register',
                data,
                {
                    'Content-Type': 'application/json',
                })
                .then(res => {
                    if (res.data._id) {
                        setIsAccountThere(true)
                        alert("user successfully registerd")
                    } else {
                        setIsAccountThere(false)
                        alert("error happned")
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    return (
        <div className={styles.main}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        {/* {console.log(isAccountThere, account)} */}
                        <div className={`card ${styles.card}`}>
                            {
                                isAccountThere ?
                                    <div className="card-body">
                                        <h2 className="card-title">Is This Your Account</h2>
                                        <Form onSubmit={getToken}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Account</Form.Label>
                                                <Form.Control type="text" readOnly value={account} ref={accountElement} />
                                            </Form.Group>
                                            <Button variant="primary" type="submit">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                                </svg>
                                            </Button>
                                        </Form>
                                    </div>
                                    :
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            Register Your Wallet
                                        </h2>
                                        <Form onSubmit={onRegister}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Account</Form.Label>
                                                <Form.Control type="text" readOnly value={account} ref={accountElement} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="name" ref={nameElement} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="name@tcs.com" ref={emailElement} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>DOB</Form.Label>
                                                <Form.Control type="date" placeholder="date of birth" ref={dobElement} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="Check me out" />
                                            </Form.Group>
                                            <Button variant="primary" type="submit">
                                                Register
                                            </Button>
                                        </Form>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
