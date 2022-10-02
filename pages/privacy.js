import Link from 'next/link';
import Seo from '../components/Seo'

const privacy = () => {
    return (
        <>
            <Seo title="Pro Hack Academy - Privacy Policy" />
            <div className="container">
                <div className="row">
                    <div className="col pt-2">
                        <div className="row ">
                            <div className="col">
                                <h2 className="pt-2 text-center">
                                    <span className="header">Privacy Policy

                                    </span>
                                </h2>
                            </div>
                        </div>
                        <br />
                        <div className="card card-body rounded">
                            <p style={{padding: "5% 15%"}}>This notice discloses the privacy practices of the Pro Hack Academy Cybersecurity Training Program<br />
                            This privacy notice applies only to information collected by this website and will notify you of the following:<br />
                            <ul><li>What PII (personally identifiable information) is collected from you through our website</li>
<li>How PII is used and with whom it is shared</li>
<li>What choices are available to you regarding the use of your data</li>
<li>The security procedures in place to protect you from misuse of your information</li>
<li>How you can correct inaccurate information</li></ul>
<h3>Information Collection, Use, and Sharing</h3>
Fix-Assist is the sole owner of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. 
We will not sell or rent this information to anyone.

We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, 
other than as necessary to fulfill your request, 
e.g. to communicate with the student’s teacher.

Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.

<h3>Your Access to and Control Over Information</h3>
You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:

See what data we have about you, if any
Change/correct any data we have about you
Have us delete any data we have about you
Express any concern you have about our use of your data
<h3>Security</h3>
We take protection of your information very seriously. When you submit sensitive information via the website, your information is protected both online and offline.
Wherever we collect sensitive information, 
that information is transmitted in a secure way. You can verify this by looking for a lock icon in the address bar and looking for "https" at the 
beginning of the address of the Web page.

Only Fix-Assist personnel who need the information to perform a specific job are granted access to personally identifiable information. 
The computers/servers in which we store personally identifiable information are kept in a secure environment.

If you feel that we are not abiding by this privacy policy, you should contact us immediately via telephone at +91 8295597357 or fixassistsolution@gmail.com.
                            <br /><br /><center><Link href="/"><a style={{ textDecoration: "none", fontSize : "20px", textDecorationLine : "revert" }}>Return home</a></Link></center></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default privacy
