import { useState, createRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const reset_password = (props) => {
    const code = props.code;
    const [creads, setcreads] = useState({ newpassword: "", confirm_password: "" });
    const [errors, seterrors] = useState({});
    const [spin, setspin] = useState(false);
    const recaptchaRef = createRef();
    const check_strong_password = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const handleChange = (e) => {
        setcreads({ ...creads, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        seterrors({});
        const recaptchaValue = { recaptcha: recaptchaRef.current.getValue() };
        const final_data = { ...recaptchaValue, ...creads };
        if (final_data.newpassword === 0 || final_data.confirm_password === 0) {
            seterrors({ error: "SOME FIELDS ARE EMPTY" });
            return;
        }
        if (final_data.newpassword !== final_data.confirm_password) {
            seterrors({ password: "PASSWORDS MUST MATCH" });
            return;
        }
        if (final_data.recaptcha === 0) {
            seterrors({ recaptcha: "INVALID RECAPTCHA VALUE" });
            return;
        }
        if (!check_strong_password.test(final_data.newpassword)) {
            seterrors({ strong: "PASSWORD IS NOT STRONG" });
            return;
        }
        if (Object.keys(errors).length === 0) {
            setspin(true);
            recaptchaRef.current.reset();
            try {
                const code_array = code.split("___");
                const [userId, resetString] = code_array;
                const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/resetpassword`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId,
                        resetString,
                        newPassword: final_data.newpassword,
                        recaptcha: final_data.recaptcha
                    })
                })
                const res = await result.json();
                setspin(false);
                setcreads({ newpassword: "", confirm_password: "" });
                if (res.Success) {
                    toast.success(res.Success);
                } else {
                    toast.error(res.Errors);
                }
            } catch {
                return
            }
        }
        return;
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col pt-2">
                        <br />
                        <div className="row ">
                            <div className="col">
                                <h2 className="pt-2 text-center">
                                    <span className="header">Password Reset

                                    </span>
                                </h2>
                            </div>
                        </div>
                        <br />
                        <div className="card card-body rounded text-center mx-5" style={{backgroundColor: "#181821", borderColor: "#181821"}}>
                            <div className="modal-dialog">
                                <div className="modal-content p-2" style={{ marginRight: "200px" }}>
                                    <div className="modal-body rounded">
                                        <form method='POST' onSubmit={handleSubmit}>
                                            {
                                                Object.keys(errors).length !== 0 ?
                                                    <div className="form-group mb-3">
                                                        <div className="response rounded p-2">
                                                            <ul id="response-list">
                                                                <li className="text-center align">{errors.error}</li>
                                                                <li className="text-center align">{errors.password}</li>
                                                                <li className="text-center align">{errors.recaptcha}</li>
                                                                <li className="text-center align">{errors.strong}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    : ""
                                            }
                                            <div className="form-group">
                                                <input autoComplete="off" className="form-control mb-3" name="newpassword" placeholder="PASSWORD" required type="password" onChange={handleChange} value={creads.newpassword} />
                                            </div>
                                            <div className="form-group">
                                                <input autoComplete="off" className="form-control mb-3" name="confirm_password" placeholder="CONFIRM PASSWORD" required type="password" onChange={handleChange} value={creads.confirm_password} />
                                            </div>
                                            <div className="form-group">
                                                <ReCAPTCHA name="googlerecaptchakey" className="g-recaptcha mb-3" sitekey={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY} theme='dark' ref={recaptchaRef} />
                                            </div>
                                            <button type="submit" className="btn btn-block load-btns loader">
                                                {
                                                    spin ? <i id='spin' className="fas fa-circle-notch fa-spin"></i> : <span className="align">Submit</span>
                                                }
                                            </button>
                                            <div className="text-center pt-3">
                                                <a id="forgot-link" href="/">Go to home?</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
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
        </>
    )
}

export async function getServerSideProps(context) {
    const code = context.query.code;
    if (code.length < 30) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return { props: { code: code } };
}

export default reset_password
