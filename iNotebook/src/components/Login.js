import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.token);
            history.push("/");
            props.showAlert("Logged in", "success")


        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <section className="vh-100" >

            <div className="container  h-100" onSubmit={handleSubmit}>
                <div className="row d-flex justify-content-center align-items-center h-100">

                    <div className="col-12 col-md-8 col-lg-6 col-xl-5 card bg-dark text-white shadow-lg rounded" style={{ borderRadius: "1rem", width: "32rem" }}>
                        <div className=" p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5 ">

                                <h2 className="fw-bold mb-2 text-uppercase">Login to continue</h2>
                                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                                    </div>

                                    <button className="btn btn-outline-light btn-lg px-5 my-3" type="submit" >Login</button>

                                </form>

                            </div>

                            <div>
                                <p className="mb-0">Don't have an account? <Link to="/Signup" className="text-white-50 fw-bold">Sign Up</Link></p>
                            </div>

                        </div>
                    </div>
                </div>
            </div></section>


    )
}

export default Login