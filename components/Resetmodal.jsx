import { useState, createRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Resetmodal = () => {
    const [resetcreads, setresetcreads] = useState({ reset_email: "" });
    const [reseterrors, setreseterrors] = useState({});
    const recaptchaRef = createRef();
    const [resetspin, setresetspin] = useState(false);
    const handleChange = (e) => {
        setresetcreads({ ...resetcreads, [e.target.name]: e.target.value });
    }
    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setreseterrors({});
        const recaptchaValue = { resetrecaptcha: recaptchaRef.current.getValue() };
        const final_data = { ...recaptchaValue, ...resetcreads };
        const check_email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!final_data.reset_email || !check_email_regex.test(final_data.reset_email)) {
            setreseterrors({ email_error: "ENTER A VALID EMAIL" });
            return;
        }
        if (!final_data.resetrecaptcha) {
            setreseterrors({ recaptcha: "INVALID RECAPTCHA VALUE" });
            return
        }
        if (Object.keys(reseterrors).length === 0) {
            setresetspin(true);
            recaptchaRef.current.reset();
            // console.log(final_data);
            try {
                const reset_result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/resetpasswordlink`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: final_data.reset_email,
                        resetrecaptcha: final_data.resetrecaptcha
                    })
                })
                const reset_res = await reset_result.json()
                setresetcreads({ reset_email: "" })
                setresetspin(false)
                if (reset_res.msg) {
                    toast.success(reset_res.msg);
                } else {
                    toast.error(reset_res.error);
                }
            } catch {
                return
            }
        }
    }
    return (
        <div id="resetModal" className="modal fade modal-center" tabIndex="-1" role="dialog" aria-hidden="true" aria-labelledby="resetModal">
            <div className="modal-dialog">
                <div className="modal-content p-2">
                    <div className="modal-body rounded">
                        <form onSubmit={handleResetSubmit} method="post">
                            {
                                Object.keys(reseterrors).length !== 0 ?
                                    <div className="form-group mb-3">
                                        <div className="response rounded p-2">
                                            <ul id="response-list">
                                                <li className="text-center align">{reseterrors.email_error}</li>
                                                <li className="text-center align">{reseterrors.recaptcha}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    : ""
                            }
                            <div className="form-group">
                                <input className="form-control mb-3" id="reset-email" name="reset_email" placeholder="EMAIL" required type="text" onChange={handleChange} value={resetcreads.reset_email} />
                            </div>
                            <div className="form-group">
                                <ReCAPTCHA name="resetgooglerecaptchakey" className="g-recaptcha mb-3" sitekey={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY} theme='dark' ref={recaptchaRef} />
                            </div>
                            <button type="submit" className="btn btn-block load-btns loader">
                                {
                                    resetspin ? <i id='spin' className="fas fa-circle-notch fa-spin"></i> : <span className="align">Submit</span>
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

export default Resetmodal
