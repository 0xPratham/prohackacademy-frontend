import Link from 'next/link';
import Seo from '../components/Seo';

const error404 = () => {
    return (
        <>
            <Seo title="Pro Hack Academy - Page Not Found" />
            <div className="container">
                <div className="row">
                    <div className="col pt-2">
                        <div className="row ">
                            <div className="col">
                                <h2 className="pt-2 text-center">
                                    <span className="header">Page Not Found

                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className="card card-body rounded text-center">
                            <p>Hmm.. That&#39;s a 404.</p>
                            <p>Are you trying to hack us again?</p>
                            <Link href="/"><a>Return home to try again</a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default error404
