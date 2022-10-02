import Seo from '../components/Seo';
import { useState } from 'react';
import Styles from '../styles/feedback.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Feedback = () => {
    const [feedback_data, setfeedback_data] = useState({ difficulty: "", experience: "", play_more: "", overall_experience: "", suggestion: "" });
    const [spin, setspin] = useState(false);
    const [error, seterror] = useState("");

    const handleChange = (e) => {
        setfeedback_data({ ...feedback_data, [e.target.name]: e.target.value });
    }

    const validate = (data) => {
        if (!data.difficulty) {
            return "All Fields Are Required"
        } else if (!data.experience) {
            return "All Fields Are Required"
        } else if (!data.play_more) {
            return "All Fields Are Required"
        } else if (!data.overall_experience) {
            return "All Fields Are Required"
        }
        let suggestion = data.suggestion;
        const after_replace_data = suggestion.replace(/\s/g, '')
        if (after_replace_data.toString().length < 5) {
            return "Plz Add Some Little Bit suggestion";
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        seterror("");
        const validate_data = validate(feedback_data)
        if (validate_data !== true) {
            seterror(validate_data);
            return;
        }
        console.log(feedback_data);
        try {
            setspin(true)
            const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/feedback`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    difficulty: feedback_data.difficulty,
                    experience: feedback_data.experience,
                    play_more: feedback_data.play_more,
                    overall_experience: feedback_data.overall_experience,
                    suggestion: feedback_data.suggestion
                })
            })
            const res = await result.json()
            setspin(false)
            setfeedback_data({ difficulty: "", experience: "", play_more: "", overall_experience: "", suggestion: "" })
            if (res.Success) {
                toast.success(res.Success)
            } else {
                toast.error(res.Errors)
            }
        } catch {
            return
        }
    }
    return (
        <>
            <Seo title="Pro Hack Academy - Feedback" />
            <div className="container" id='feedback'>
                <div className="row">
                    <div className="col pt-2">
                        <div className="row ">
                            <div className="col">
                                <h2 className="pt-5 text-center">
                                    <span className="header">Feedback

                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className="card card-body rounded text-center mx-5" style={{backgroundColor: "#181821", borderColor: "#181821"}}>
                            <div className="modal-dialog">
                                <div className="modal-content p-2" style={{ marginRight: "200px" }}>
                                    <div className="modal-body rounded">
                                        <form method='POST' onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                                            {
                                                error.length > 0 ?
                                                    <div className="form-group mb-3">
                                                        <div className="response rounded p-2">
                                                            <ul id="response-list">
                                                                <li className="text-center align">{error}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    : ""
                                            }
                                            <div className="form-group">
                                                <label style={{fontSize : "15px"}} className='pb-2'>How was the difficulty level of Challenges?</label>
                                                <div className={Styles.radio_container}>
                                                    <input className={Styles.radio_button} type="radio" name="difficulty" id="easy" value="easy" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="easy">easy</label>
                                                    <input className={Styles.radio_button} type="radio" name="difficulty" id="medium" value="medium" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="medium">medium</label>
                                                    <input className={Styles.radio_button} type="radio" name="difficulty" id="hard" value="hard" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="hard">hard</label>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label style={{fontSize : "15px"}} className='pb-2'>How is the user experience of website?</label>
                                                <div className={Styles.radio_container}>
                                                    <input className={Styles.radio_button} type="radio" name="experience" id="good" value="good" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="good">good</label>
                                                    <input className={Styles.radio_button} type="radio" name="experience" id="smooth" value="smooth" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="smooth">smooth</label>
                                                    <input className={Styles.radio_button} type="radio" name="experience" id="excellent" value="excellent" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="excellent">excellent</label>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label style={{fontSize : "15px"}} className='pb-2'>Would you like to play more such Challenges?</label>
                                                <div className={Styles.radio_container}>
                                                    <input className={Styles.radio_button} type="radio" name="play_more" id="nope" value="nope" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="nope">nope</label>
                                                    <input className={Styles.radio_button} type="radio" name="play_more" id="yup" value="yup" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="yup">yup</label>
                                                    <input className={Styles.radio_button} type="radio" name="play_more" id="definitely" value="definitely" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="definitely">definitely</label>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label style={{fontSize : "15px"}} className='pb-2'>How was the overall user experience?</label>
                                                <div className={Styles.radio_container}>
                                                    <input className={Styles.radio_button} type="radio" name="overall_experience" id="nice" value="nice" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="nice">nice</label>
                                                    <input className={Styles.radio_button} type="radio" name="overall_experience" id="great" value="great" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="great">great</label>
                                                    <input className={Styles.radio_button} type="radio" name="overall_experience" id="super" value="super" onChange={handleChange} />
                                                    <label className={Styles.radio_label} htmlFor="super">super</label>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="form-group">
                                                <label style={{fontSize : "15px"}} className='pb-2'>Any suggestions?</label>
                                                <textarea className={Styles.text_area} name="suggestion" cols="44" rows="6" onChange={handleChange} value={feedback_data.suggestion} />
                                            </div>
                                            <br />
                                            <button type="submit" className="btn btn-block load-btns loader">
                                                {
                                                    spin ? <i id='spin' className="fas fa-circle-notch fa-spin"></i> : <span className="align">Submit</span>
                                                }
                                            </button>
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

export default Feedback