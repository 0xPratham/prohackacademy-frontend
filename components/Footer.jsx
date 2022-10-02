import React from 'react'

const Footer = () => {
    return (
        <>
            <section className="section gray-bg section-break-small">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <a className="clickable" href="https://twitter.com/ProHackAcademy"><i className="fab fa-twitter pt-2 mr-3 fs15 mx-2"></i></a>
                            <a className="clickable" href="https://telegram.me/fixassist"><i className="fab fa-telegram pt-2 mr-3 fs15 mx-2"></i></a>
                            <a className="clickable" href="mailto:fixassistsolution@gmail.com?Subject=FixAssist"><i className="fas fa-envelope pt-2 mr-3 fs15 mx-2"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer
