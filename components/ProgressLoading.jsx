const ProgressData = () => {
    return (
        <>
            <div className="container" style={{ marginTop: "60px", maxWidth: "1130px" }}>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <h2 className="pt-2 text-center">
                                    <span className="header"> Username </span>
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-1 d-none d-md-block">
                                <div className="card card-body rounded p-2">
                                    <div className="row align-items-center">
                                        <div className="col text-center my-auto">
                                            <div className="avatar-container d-flex">
                                                <i className="fas fa-circle skeleton avatar-large mx-auto my-auto d-block" style={{ fontSize: "70px" }}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-1 d-none d-md-block">
                                <div className="card card-body rounded p-2">
                                    <div className="row align-items-center">
                                        <div className="col text-center my-auto">
                                            <div className="avatar-container d-flex">
                                                <i className="fas fa-circle skeleton avatar-large mx-auto my-auto d-block" style={{ fontSize: "70px" }}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-1 d-none d-md-block">
                                <div className="card card-body rounded p-2">
                                    <div className="row align-items-center">
                                        <div className="col text-center my-auto">
                                            <div className="avatar-container d-flex">
                                                <div className="col-5 pt-1">
                                                    <i className="fas fa-circle skeleton" style={{ fontSize: "70px" }}></i>
                                                </div>
                                                <div className="col-5 text-center" style={{ marginTop: "-8px" }}>
                                                    <div className="skeleton skeleton-text mt-4" style={{ marginLeft: "20px" }}></div>
                                                    <div className="skeleton skeleton-text mt-4" style={{ marginLeft: "20px" }}></div>
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
                                            <div className="avatar-container d-flex">
                                                <div className="col-5 pt-1">
                                                    <i className="fas fa-circle skeleton" style={{ fontSize: "70px" }}></i>
                                                </div>
                                                <div className="col-5 text-center" style={{ marginTop: "-8px" }}>
                                                    <div className="skeleton skeleton-text mt-4" style={{ marginLeft: "20px" }}></div>
                                                    <div className="skeleton skeleton-text mt-4" style={{ marginLeft: "20px" }}></div>
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
                            <div className="skeleton skeleton-text" style={{ width: "100%" }}></div>
                            <br />
                            <div className="skeleton skeleton-text" ></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProgressData;