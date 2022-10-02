import Link from 'next/link'
import { useState, createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Joinmodal = () => {
    const [joincreads, setjoincreads] = useState({ username: "", email: "", password: "" });
    const [joinerrors, setjoinerrors] = useState({});
    const [joinspin, setjoinspin] = useState(false);
    const joinrecaptchaRef = createRef();

    const joinhandleChange = (e) => {
        setjoincreads({ ...joincreads, [e.target.name]: e.target.value });
    }

    // Validate The Register Form
    const validate_login_form = (items) => {
        setjoinerrors({});
        const errors = {};
        const check_email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const check_strong_password = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!items.username) {
            errors.username = "ENTER A VALID USERNAME";
        }if(items.username.length > 20){
            errors.username = "Username can't be longer than 20 charaters";
        }
        if (!items.email || !check_email_regex.test(items.email)) {
            errors.email = "ENTER A VALID EMAIL";
        }
        if (!items.password || !check_strong_password.test(items.password)) {
            errors.password = "ENTER A STRONG PASSWORD";
        }
        if (!items.joinrecaptcha) {
            errors.joinrecaptcha = "INVALID RECAPTCHA VALUE";
        }
        if(Object.keys(errors).length > 0){
            return errors;
        }
        return true;
    }

    const handleJoinSubmit = async (e) => {
        e.preventDefault();
        const joinrecaptchaValue = { joinrecaptcha: joinrecaptchaRef.current.getValue() };
        const join_final_data = { ...joinrecaptchaValue, ...joincreads };
        let validate_result = validate_login_form(join_final_data);
        if (validate_result === true) {
            setjoinspin(true);
            // console.log(join_final_data);
            joinrecaptchaRef.current.reset();
            try {
                const join_result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/join`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(join_final_data)
                })
                const join_res = await join_result.json();
                setjoincreads({ username: "", email: "", password: "" })
                setjoinspin(false);
                if (join_res.message === "Success") {
                    toast.success("Successfully Registered Check Your Email To Verify");
                } else {
                    toast.error(join_res.Errors);
                }
            } catch {
                return
            }
        }else{
            setjoinerrors(validate_result);
            return
        }
    }
    return (
        <div id="joinModal" className="modal fade modal-center" tabIndex="-1" role="dialog" aria-hidden="true" aria-labelledby="joinModal">
            <div className="modal-dialog">
                <div className="modal-content p-2">
                    <div className="modal-body rounded">
                        <form onSubmit={handleJoinSubmit} method='POST' >
                            {
                                Object.keys(joinerrors).length !== 0 ?
                                    <div className="form-group mb-3">
                                        <div className="response rounded p-2">
                                            <ul id="response-list">
                                                <li className="text-center align">{joinerrors.username}</li>
                                                <li className="text-center align">{joinerrors.email}</li>
                                                <li className="text-center align">{joinerrors.password}</li>
                                                <li className="text-center align">{joinerrors.joinrecaptcha}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    : ""
                            }
                            <div className="form-group">
                                <input className="form-control mb-3" id="register-username" name="username" placeholder="USERNAME" required type="text" onChange={joinhandleChange} value={joincreads.username} />
                            </div>
                            <div className="form-group">
                                <input className="form-control mb-3" id="register-email" name="email" placeholder="EMAIL" required type="text" onChange={joinhandleChange} value={joincreads.email} />
                            </div>
                            <div className="form-group">
                                <input autoComplete="off" className="form-control mb-3" id="register-password" name="password" placeholder="PASSWORD" required type="password" onChange={joinhandleChange} value={joincreads.password} />
                            </div>
                            <div className="form-group">
                                <ReCAPTCHA name="joingooglerecaptchakey" className="g-recaptcha mb-3" sitekey={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY} theme='dark' ref={joinrecaptchaRef} />
                            </div>
                            <div className="form-group text-center mb-3" id="privacy">
                                <Link className="pb-3" href="/privacy"><a style={{ fontSize: "12px", color: "#f9f9f9", textDecoration: "none", letterSpacing: "0px", textTransform: "capitalize" }}>By registering, you agree to our privacy policy</a></Link>
                            </div>
                            <button type="submit" className="btn btn-block load-btns loader">
                                {
                                    joinspin ? <i id='spin' className="fas fa-circle-notch fa-spin"></i> : <span className="align">Submit</span>
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme='dark'
            />
        </div>
    )
}

export default Joinmodal
