import { useState, createRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useRouter } from 'next/router';

const Modals = () => {
    const router = useRouter();
    const [logincreads, setlogincreads] = useState({ loginusername: "", loginpassword: "" });
    const [loginerrors, setloginerrors] = useState({});
    const [spin, setspin] = useState(false);
    const recaptchaRef = createRef();

    const handleChange = (e) => {
        setlogincreads({ ...logincreads, [e.target.name]: e.target.value });
    }

    // Validate The Login Form
    const validate_login_form = (items) => {
        setloginerrors({});
        const errors = {};
        if (!items.loginusername) {
            errors.username = "ENTER A VALID USERNAME";
        }
        if (!items.loginpassword) {
            errors.password = "ENTER A VALID PASSWORD";
        }
        if (items.loginrecaptcha.length === 0) {
            errors.recaptcha = "INVALID RECAPTCHA VALUE";
        }
        return errors;
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const recaptchaValue = { loginrecaptcha: recaptchaRef.current.getValue() };
        const final_data = { ...recaptchaValue, ...logincreads };
        setloginerrors(validate_login_form(final_data));
        if (Object.keys(loginerrors).length === 0) {
            setspin(true);
            recaptchaRef.current.reset();
            try {
                const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        recaptcha: final_data.loginrecaptcha,
                        username: final_data.loginusername,
                        password: final_data.loginpassword
                    })
                })
                const res = await result.json();
                setspin(false);
                setlogincreads({ loginusername: "", loginpassword: "" });
                if (res.Success) {
                    toast.success("Redirecting...");
                    location.replace('/dashboard');
                } else {
                    toast.error(res.Errors);
                }
            } catch {
                return
            }
        }
    }

    return (
        <div id="loginModal" className="modal fade modal-center" tabIndex="-1" role="dialog" aria-hidden="true" aria-labelledby="loginModal">
            <div className="modal-dialog">
                <div className="modal-content p-2">
                    <div className="modal-body rounded">
                        <form onSubmit={handleLoginSubmit}>
                            {
                                Object.keys(loginerrors).length !== 0 ?
                                    <div className="form-group mb-3">
                                        <div className="response rounded p-2">
                                            <ul id="response-list">
                                                <li className="text-center align">{loginerrors.username}</li>
                                                <li className="text-center align">{loginerrors.password}</li>
                                                <li className="text-center align">{loginerrors.recaptcha}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    : ""
                            }
                            <div className="form-group">
                                <input className="form-control mb-3" id="login-username" name="loginusername" placeholder="USERNAME" required type="text" onChange={handleChange} value={logincreads.loginusername} />
                            </div>
                            <div className="form-group">
                                <input autoComplete="off" className="form-control mb-3" id="login-password" name="loginpassword" placeholder="PASSWORD" required type="password" onChange={handleChange} value={logincreads.loginpassword} />
                            </div>
                            <div className="form-group">
                                <ReCAPTCHA name="logingooglerecaptchakey" className="g-recaptcha mb-3" sitekey={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY} theme='dark' ref={recaptchaRef} />
                            </div>
                            <button type="submit" className="btn btn-block load-btns loader">
                                {
                                    spin ? <i id='spin' className="fas fa-circle-notch fa-spin"></i> : <span className="align">Submit</span>
                                }
                            </button>
                            <div className="text-center pt-3">
                                <a data-bs-toggle="modal" data-bs-target="#resetModal" id="forgot-link" href="#">Forgot your password?</a>
                            </div>
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

export default Modals
