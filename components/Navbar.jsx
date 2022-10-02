const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand sticky-top">
                <div className="collapse navbar-collapse over">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a id="OpenLoginModal" className="nav-link upper mt-2 mr-3 spaced-double rounded mx-2" data-bs-toggle="modal" data-bs-target="#loginModal" data-backdrop="false" href="#">Login</a>
                        </li>
                        <li className="nav-item">
                            <a id="OpenJoinModal" className="nav-link upper mt-2 spaced-double rounded mx-2" href="#" data-bs-toggle="modal" data-bs-target="#joinModal">Join</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
