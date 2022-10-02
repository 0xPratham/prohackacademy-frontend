import Link from "next/link";
import { useRouter } from 'next/router';

const InnerNavbar = () => {
    const router = useRouter();
    return (
        <>
            <nav className="navbar navbar-expand nav-style">
                <div className="container" style={{ maxWidth: "1190px" }}>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav nav-fill w-100">
                            <li
                                className="nav-item"
                                style={{ fontWeight: "400", lineHeight: "1.5" }}
                            >
                                <Link href="/dashboard">
                                    <a
                                        style={{ textTransform: "uppercase" }}
                                        className={`nav-link ${router.asPath === "/dashboard" ? "active rounded" : ""}`}
                                    >
                                        <span className="align">Dashboard</span>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                style={{ fontWeight: "400", lineHeight: "1.5" }}
                            >
                                <Link href="/scoreboard">
                                    <a
                                        style={{ textTransform: "uppercase" }}
                                        className={`nav-link ${router.asPath === "/scoreboard" ? "active rounded" : ""}`}
                                    >
                                        <span className="align">Scoreboard</span>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                style={{ fontWeight: "400", lineHeight: "1.5" }}
                            >
                                <Link href="/progress">
                                    <a
                                        style={{ textTransform: "uppercase" }}
                                        className={`nav-link ${router.asPath === "/progress" ? "active rounded" : ""}`}
                                    >
                                        <span className="align">Progress</span>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className="nav-item"
                                style={{ fontWeight: "400", lineHeight: "1.5" }}
                            >
                                <Link href="/feedback">
                                    <a
                                        style={{ textTransform: "uppercase" }}
                                        className={`nav-link ${router.asPath === "/feedback" ? "active rounded" : ""}`}
                                    >
                                        <span className="align">Feedback</span>
                                    </a>
                                </Link>
                            </li>

                            <li
                                className="nav-item"
                                style={{ fontWeight: "400", lineHeight: "1.5" }}
                            >
                                <Link href="/logout">
                                    <a
                                        style={{ textTransform: "uppercase" }}
                                        className="nav-link"
                                    >
                                        <span className="align">Logout</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default InnerNavbar
