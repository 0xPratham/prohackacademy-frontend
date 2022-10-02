import { useCallback, useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale-extreme.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ReactCanvasConfetti from "react-canvas-confetti";

const Compact_number_formatter = new Intl.NumberFormat(undefined, { notation: "compact", })

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function getAnimationSettings(angle, originX) {
  return {
    particleCount: 2,
    angle,
    spread: 55,
    origin: { x: originX },
    colors: ["#83d8ae", "#1f1f2b"],
  };
}

const DashBoardData = (props) => {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let challenge_name = e.target[0].name;
    let challenge_flag = e.target[0].value;
    if (challenge_name.length > 0 && challenge_flag.length > 0) {
      const verify_result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/solve`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            challenge_name,
            challenge_flag,
          }),
        }
      );
      const solve_result = await verify_result.json();
      if (solve_result.Success === true) {
        setLoading(false);
        startAnimation();
        setInterval(() => pauseAnimation(), 3000);
        props.mutate("/dashboard");
      } else if (solve_result.Wrong) {
        setLoading(false);
        toast.error(solve_result.Wrong);
      } else {
        setLoading(false);
        location.replace("/notapproved");
      }
    } else {
      setLoading(false);
      toast.error("Flag Is Required");
    }
  };

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);
  if (props.data) {
    return (
      <>
        <div className="container" style={{ marginTop: "60px" }}>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <h2 className="pt-2 text-center">
                    <span className="header">Dashboard</span>
                  </h2>
                </div>
              </div>
              <div
                className="container-fluid p-0 d-none d-md-block"
                style={{ width: "85%" }}
              >
                <div className="row">
                  <div className="col p-1 d-flex">
                    <div
                      style={{ background: "#1f1f2b" }}
                      className="card card-body rounded justify-content-center"
                    >
                      <div className="row align-items-center">
                        <div className="col-3">
                          <i className="icon pe-7s-display1"></i>
                        </div>
                        <div className="col-9 text-center">
                          <h4>
                            {Compact_number_formatter.format(Object.keys(props?.data?.challenges_list)?.length)}
                          </h4>
                          <span className="text-uppercase card-size">
                            Total Challenges
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col p-1 d-flex">
                    <div
                      style={{ background: "#1f1f2b" }}
                      className="card card-body rounded justify-content-center"
                    >
                      <div className="row align-items-center">
                        <div className="col-3">
                          <i className="icon pe-7s-users"></i>
                        </div>
                        <div className="col-9 text-center">
                          <h4>{Compact_number_formatter.format(props?.data?.user_count)}</h4>
                          <span className="text-uppercase card-size">
                            Total Users
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col p-1 d-flex">
                    <div
                      style={{ background: "#1f1f2b" }}
                      className="card card-body rounded justify-content-center"
                    >
                      <div className="row align-items-center">
                        <div className="col-3">
                          <i className="icon pe-7s-check"></i>
                        </div>
                        <div className="col-9 text-center">
                          <h4 id="total-solves">{Compact_number_formatter.format(props?.data?.total_solves)}</h4>
                          <span className="text-uppercase card-size">
                            Total Solves
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ "--bs-gutter-x": "-10.5rem" }}>
                <div className="col p-1 mb-2">
                  <div className="accordion">
                    {props?.data?.challenges_category?.map((category, key) => {
                      let challenges_count = 0;
                      for (
                        var i = 0;
                        i < props.data.challenges_list.length;
                        i++
                      ) {
                        if (
                          props.data.challenges_list[i].challenge_category ===
                          category.name
                        ) {
                          challenges_count++;
                        }
                      }
                      return (
                        <div
                          className="card"
                          key={key}
                          style={{ background: "#1f1f2b" }}
                        >
                          <div
                            className="card-header"
                            id="heading-9"
                            style={{ padding: "0.75rem 1.25rem" }}
                          >
                            <h5 className="mb-0">
                              <a
                                style={{ textDecoration: "none" }}
                                role="button"
                                data-bs-toggle="collapse"
                                href={`#${category?.name}`}
                                aria-expanded="false"
                                aria-controls={category?.name}
                              >
                                <span className="align-middle rounded p-1 badge-header">
                                  <span className="align">
                                    {challenges_count} challenges
                                  </span>
                                </span>
                                <span className="align-middle type-header">
                                  <span className="align">
                                    {" "}
                                    {category?.name}
                                  </span>
                                </span>
                              </a>
                            </h5>
                          </div>
                          <div id={category?.name} className="collapse">
                            <div className="card-body load-challenge" type="9">
                              {props.data.challenges_list.map(
                                (challenge, challenge_list_key) => {
                                  if (
                                    challenge.challenge_category ===
                                    category.name
                                  ) {
                                    let solved = false;
                                    if (props.data.user_solve_list.length > 0) {
                                      for (var key in props.data
                                        .user_solve_list) {
                                        if (
                                          props.data.user_solve_list[key]
                                            .challenge_name ===
                                          challenge.challenge_name &&
                                          props.data.user_solve_list[key]
                                            .challenge_category ===
                                          category.name
                                        ) {
                                          solved = true;
                                        }
                                      }
                                    }
                                    return (
                                      <div
                                        id="accordion-c45"
                                        key={challenge_list_key}
                                      >
                                        <div className="card chall-card mb-0 rounded-0">
                                          <div
                                            className="card-header rounded-0 orange-left p-2 "
                                            id="heading-c45"
                                          >
                                            <h5 className="mb-0 light">
                                              <a
                                                style={{
                                                  textDecoration: "none",
                                                  fontSize: "12px",
                                                }}
                                                className="collapsed"
                                                role="button"
                                                data-bs-toggle="collapse"
                                                href={`#${challenge?.challenge_name?.replaceAll(
                                                  " ",
                                                  ""
                                                )}`}
                                                id="chall45-flag-header"
                                                aria-expanded="false"
                                                aria-controls={challenge?.challenge_name?.replaceAll(
                                                  " ",
                                                  ""
                                                )}
                                              >
                                                {solved ? (
                                                  <span
                                                    style={{
                                                      marginRight: "10px",
                                                    }}
                                                    className="align-middle rounded p-1 badge-solved mr-2"
                                                  >
                                                    <span className="align">
                                                      <i className="solved-icon pe-7s-flag"></i>
                                                      Solved
                                                    </span>
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                                <span
                                                  style={{
                                                    marginRight: "10px",
                                                  }}
                                                  className="align-middle rounded p-1 badge-chall mr-2"
                                                >
                                                  <span className="align">
                                                    {challenge?.points} points
                                                  </span>
                                                </span>
                                                <span
                                                  style={{
                                                    marginRight: "10px",
                                                  }}
                                                  className="align-middle rounded p-1 badge-chall mr-2"
                                                >
                                                  <span className="align">
                                                    Rated {`->`} {challenge?.difficulty}
                                                  </span>
                                                </span>
                                                <span className="align-middle chall-header">
                                                  <span className="align">
                                                    {" "}
                                                    {
                                                      challenge?.challenge_name
                                                    }{" "}
                                                  </span>
                                                </span>
                                              </a>
                                            </h5>
                                          </div>
                                          <div
                                            id={challenge?.challenge_name.replaceAll(
                                              " ",
                                              ""
                                            )}
                                            className="collapse"
                                          >
                                            <div className="card-body">
                                              <div className="row">
                                                <div className="col-9">
                                                  <div className="p-2 h-100 chall-blurb light">
                                                    <div className="mb-2">
                                                      <Tippy
                                                        theme="dark"
                                                        animation="scale-extreme"
                                                        content="CHALLENGE ADDED"
                                                      >
                                                        <span
                                                          style={{
                                                            marginRight: "8px",
                                                          }}
                                                          className="align-middle rounded p-1 badge-solved mr-2"
                                                        >
                                                          <span className="align">
                                                            <i className="stat-icon pe-7s-timer"></i>
                                                            {`${new Date(
                                                              challenge?.date
                                                            )?.toLocaleString(
                                                              "en-US",
                                                              {
                                                                timeZone:
                                                                  "Asia/Kolkata",
                                                              }
                                                            )}`}
                                                          </span>
                                                        </span>
                                                      </Tippy>
                                                      {challenge?.first_solve ? (
                                                        <Tippy
                                                          theme="dark"
                                                          animation="scale-extreme"
                                                          content="FIRST SOLVER"
                                                        >
                                                          <span
                                                            style={{
                                                              marginRight:
                                                                "8px",
                                                            }}
                                                            className="align-middle rounded p-1 badge-solved mr-2"
                                                          >
                                                            <span className="align">
                                                              <i className="stat-icon pe-7s-check"></i>
                                                              <span>
                                                                {" "}
                                                                {
                                                                  challenge?.first_solve
                                                                }{" "}
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </Tippy>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </div>{" "}
                                                    {challenge?.description}
                                                  </div>
                                                </div>
                                                <div className="col-3 pl-0">
                                                  <div className="input-group">
                                                    {challenge?.download_link ? (
                                                      <a
                                                        className="btn btn-block hidden-border chall-input"
                                                        role="button"
                                                        href={
                                                          challenge?.download_link
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                      >
                                                        {" "}
                                                        DOWNLOAD CHALLENGE{" "}
                                                      </a>
                                                    ) : (
                                                      ""
                                                    )}
                                                    {solved ? (
                                                      <div className="input-group input-group-hide disabled">
                                                        <input
                                                          className="form-control chall-input mt-2 no-round-right hidden-border text-center flag-input"
                                                          placeholder="SOLVED"
                                                          type="text"
                                                        />
                                                        <div className="input-group-append">
                                                          <button
                                                            className="btn btn-block hidden-border mt-2 chall-input loader"
                                                            type="submit"
                                                          >
                                                            <span className="align">
                                                              <i className="flag-icon pe-7s-flag"></i>
                                                            </span>
                                                          </button>
                                                        </div>
                                                      </div>
                                                    ) : (
                                                      <form
                                                        onSubmit={handleSubmit}
                                                        method="POST"
                                                        className="input-group"
                                                      >
                                                        <div className="input-group input-group-hide ">
                                                          <input
                                                            className="form-control chall-input mt-2 no-round-right hidden-border text-center flag-input"
                                                            name={
                                                              challenge?.challenge_name
                                                            }
                                                            placeholder="FLAG"
                                                            type="text"
                                                            required
                                                          />
                                                          <div className="input-group-append">
                                                            <button
                                                              className="btn btn-block hidden-border mt-2 chall-input loader"
                                                              type="submit"
                                                            >
                                                              <span className="align">
                                                                {loading ? (
                                                                  <i
                                                                    id="spin"
                                                                    className="fas fa-circle-notch fa-spin"
                                                                  ></i>
                                                                ) : (
                                                                  <i className="flag-icon pe-7s-play"></i>
                                                                )}
                                                              </span>
                                                            </button>
                                                          </div>
                                                        </div>
                                                      </form>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
          theme="dark"
        />
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      </>
    );
  } else {
    return <h1 style={{ color: "white" }}>No</h1>;
  }
};

export default DashBoardData;