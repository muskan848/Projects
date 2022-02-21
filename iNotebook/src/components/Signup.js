import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });

        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.token);
            history.push("/");
            props.showAlert("Account created successfully", "success")

        }
        else if (localStorage.getItem('token')) {
            props.showAlert("User with this email already exits", "danger");
        }
        else {
            props.showAlert("Invalid details", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div >
            <div className="container " >
                <div className=" d-flex justify-content-center align-items-center ">
                    <div className="col-lg-12 col-xl-11">
                        <div className=" text-black bg-white shadow-lg rounded" style={{ borderRadius: "25px", marginTop: "2rem" }}>
                            <div className=" p-md-5" >
                                <div className="row justify-content-center" >
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input type="text" placeholder="Your Name" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email Address</label>
                                                <input type="email" placeholder="Your Email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" placeholder="Password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="cpassword" className="form-label">Comfirm Password</label>
                                                <input type="password" placeholder="Confirm Your Password " className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" minLength={5} required />
                                            </div>


                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup