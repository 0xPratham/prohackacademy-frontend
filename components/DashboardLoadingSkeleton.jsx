const DashboardLoadingSkeleton = () => {
    return (
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
                                    style={{ background: "rgb(31, 31, 43)" }}
                                    className="card card-body rounded justify-content-center"
                                >
                                    <div className="row align-items-center">
                                        <div className="col-3">
                                            <i className="fas fa-circle skeleton" style={{ fontSize: "70px" }}></i>
                                        </div>
                                        <div className="col-9 text-center">
                                            <div className="skeleton skeleton-text" style={{ marginLeft: "10px" }}></div>
                                            <br />
                                            <div className="skeleton skeleton-text" style={{ marginLeft: "10px" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-1 d-flex">
                                <div
                                    style={{ background: "rgb(31, 31, 43)" }}
                                    className="card card-body rounded justify-content-center"
                                >
                                    <div className="row align-items-center">
                                        <div className="col-3">
                                            <i className="fas fa-circle skeleton" style={{ fontSize: "70px" }}></i>
                                        </div>
                                        <div className="col-9 text-center">
                                            <div className="skeleton skeleton-text" style={{ marginLeft: "10px" }}></div>
                                            <br />
                                            <div className="skeleton skeleton-text" style={{ marginLeft: "10px" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col p-1 d-flex">
                                <div
                                    style={{ background: "rgb(31, 31, 43)" }}
                                    className="card card-body rounded justify-content-center"
                                >
                                    <div className="row align-items-center">
                                        <div className="col-3">
                                            <i className="fas fa-circle skeleton" style={{ fontSize: "70px" }}></i>
                                        </div>
                                        <div className="col-9 text-center">
                                            <div className="skeleton skeleton-text" style={{ marginLeft: "10px" }}></div>
                                            <br />
                                            <div className="skeleton skeleton-text" style={{ marginLeft: "10px" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ "--bs-gutter-x": "-10.5rem" }}>
                        <div className="col p-1 mb-2">
                            <div className="accordion">
                                <div className="card" style={{ background: "rgb(31, 31, 43)" }}>
                                    <div
                                        className="card-header"
                                        id="heading-9"
                                        style={{ padding: "0.75rem 1.25rem" }}
                                    >
                                        <div className="skeleton skeleton-text" style={{ marginLeft: "10px", marginBottom: "0.50rem" }}></div>
                                        <div className="skeleton skeleton-text" style={{ marginLeft: "10px" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ "--bs-gutter-x": "-10.5rem" }}>
                        <div className="col p-1 mb-2">
                            <div className="accordion">
                                <div className="card" style={{ background: "rgb(31, 31, 43)" }}>
                                    <div
                                        className="card-header"
                                        id="heading-9"
                                        style={{ padding: "0.75rem 1.25rem" }}
                                    >
                                        <div className="skeleton skeleton-text" style={{ marginLeft: "10px", marginBottom: "0.50rem" }}></div>
                                        <div className="skeleton skeleton-text" style={{ marginLeft: "10px" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ "--bs-gutter-x": "-10.5rem" }}>
                        <div className="col p-1 mb-2">
                            <div className="accordion">
                                <div className="card" style={{ background: "rgb(31, 31, 43)" }}>
                                    <div
                                        className="card-header"
                                        id="heading-9"
                                        style={{ padding: "0.75rem 1.25rem" }}
                                    >
                                        <div className="skeleton skeleton-text" style={{ marginLeft: "10px", marginBottom: "0.50rem" }}></div>
                                        <div className="skeleton skeleton-text" style={{ marginLeft: "10px" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLoadingSkeleton;
