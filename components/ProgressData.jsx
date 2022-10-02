import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';
import ReactCountryFlag from "react-country-flag"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';

const Compact_number_formatter = new Intl.NumberFormat(undefined)

function get_avatar(name) {
    let svg = createAvatar(style, {
        seed: name,
        dataUri: true,
    });
    return svg;
}

function odd_or_even(no) {
    if (no % 2 == 0) {
        return true
    }
    else {
        return false
    }
}

const ProgressData = (props) => {
    return (
        <>
            <div className="container" style={{ marginTop: "60px", maxWidth: "1130px" }}>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <h2 className="pt-2 text-center">
                                    <span className="header"> {props?.data?.username} </span>
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-1 d-none d-md-block">
                                <div className="card card-body rounded p-2">
                                    <div className="row align-items-center">
                                        <div className="col text-center my-auto">
                                            <div className="avatar-container d-flex">
                                                <img src={get_avatar(props?.data?.username)} className="avatar-large mx-auto my-auto d-block" alt="User Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-1 d-none d-md-block">
                                <div className="card card-body rounded p-2">
                                    <div className="row align-items-center">
                                        <div className="col text-center my-auto">
                                            <Tippy theme="dark" animation="scale-extreme" content="INDIA">
                                                <div className="avatar-container d-flex">
                                                    <ReactCountryFlag className="avatar-large mx-auto my-auto d-block" countryCode="IN" svg style={{ width: '4.5rem', height: '4.5rem', }} />
                                                </div>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-1 d-none d-md-block">
                                <div className="card card-body rounded p-2">
                                    <div className="row align-items-center">
                                        <div className="col text-center my-auto">
                                            <div className="avatar-container d-flex pt-2">
                                                <div className="col-5 pt-1">
                                                    <i className="icon pe-7s-graph2 avatar-large mx-auto my-auto d-block"></i>
                                                </div>
                                                <div className="col-5 text-center">
                                                    <h4>{Compact_number_formatter.format(props?.data?.points)}</h4>
                                                    <span className="card-size text-uppercase">Points</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-1 d-none d-md-block">
                                <div className="card card-body rounded p-2">
                                    <div className="row align-items-center">
                                        <div className="col text-center my-auto">
                                            <div className="avatar-container d-flex pt-2">
                                                <div className="col-5 pt-1">
                                                    <i className="icon pe-7s-flag avatar-large mx-auto my-auto d-block"></i>
                                                </div>
                                                <div className="col-5 text-center">
                                                    <h4>{Compact_number_formatter.format(props?.data.challenge_solve_list?.length)}</h4>
                                                    <span className="card-size text-uppercase">Solves</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-1 d-none d-md-block">
                                <div className="card card-body rounded p-2">
                                    <div className="row align-items-center">
                                        <div className="col text-center my-auto">
                                            <div className="avatar-container d-flex pt-2">
                                                <div className="col-5 pt-1">
                                                    <i className="icon pe-7s-medal avatar-large mx-auto my-auto d-block"></i>
                                                </div>
                                                <div className="col-5 text-center">
                                                    <h4>{Compact_number_formatter.format(props?.data?.place)}</h4>
                                                    <span className="card-size text-uppercase">Rank</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <h2 className="pt-2 text-center">
                                    <span className="header"> Solves </span>
                                </h2>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col p-1">
                                <ul className="timeline">
                                    {
                                        props?.data.challenge_solve_list?.length > 0 ?
                                            props?.data.challenge_solve_list?.map((solve_list_data, key) => {
                                                return (
                                                    <li key={key} className={odd_or_even(key) ? "timeline-inverted" : ""}>
                                                        <div className="timeline-badge">
                                                            <i className="timeline-icon pe-7s-check"></i>
                                                        </div>
                                                        <div className="timeline-panel rounded p-1">
                                                            <div className="timeline-heading height-align">
                                                                <div className="timeline-title">
                                                                    <span className="align-middle rounded p-1 badge-timeline ml-1 text-uppercase"><span className="align">{solve_list_data?.challenge_category}</span></span>
                                                                    <span style={{ marginLeft: "10px" }} className="align text-uppercase">{solve_list_data?.challenge_name}</span>
                                                                    <small style={{ marginRight: "10px" }} className="text-muted pull-right height-align text-uppercase"><span className="align"> {`${new Date(solve_list_data?.date).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })}`}</span></small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                            : <h4 style={{textAlign : "center"}}>You don't solve any challenge yet :(</h4>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProgressData;
