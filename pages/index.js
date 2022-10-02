import Footer from "../components/Footer";
import Joinmodal from "../components/Joinmodal";
import Loginnodals from "../components/Loginmodals";
import Resetmodal from "../components/Resetmodal";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import useSWR from "swr";
import Script from "next/script";

const fetcher = async () => await fetch(`${process.env.NEXT_PUBLIC_URL}/api/check_auth`, {
  method: "GET",
  credentials: 'include'
}).then((res) => res.json());

export default function Home(props) {
  const { data, error } = useSWR("/home_page_auth", fetcher, { dedupingInterval: 30000 });
  if (data) {
    if (data.Errors === "Not Approved") {
      window.location.replace("/notapproved");
    } else if (data.Success) {
      window.location.replace("/dashboard");
    }
  }
  return (
    <>
      <Seo title="Pro Hack Academy" />
      <div id="particles-js"></div>
      <Navbar />
      <section className="section gray-bg is-sloped slope-right slope-gray section-min-height d-flex align-items-center ">
        <div className="container over">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center mb-5">
              <img data-bs-aos="flip-left" className="logo p-1 m-3" src="/logo.png" alt="Fix-Assist" />
              <h1 data-bs-aos="fade-up" className="spaced-full fw6 fs3 upper">
                welcome to<br />
                <span className="orange-text">C</span>
                apture <span className="orange-text">T</span>
                he <span className="orange-text">F</span>
                lag<br />hacking environment<br />
                <p className="promotion">by <span className="orange-text">fix</span>-assist</p>

              </h1>
              <div data-bs-aos="fade-up" className="bb w-25 center mt-3"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section gray-bg-secondary  section-break ">
        <div className="container">
          <div className="row justify-content-center">
            <div data-bs-aos="fade-right" className="col-md-4 text-center br d-flex justify-content-center align-items-center over">
              <h1 className="fw6 upper spaced-half">Ready to hack?</h1>
            </div>
            <div className="col-md-8 over" data-bs-aos="fade-left">
              <p className="spaced-half fw2 fs135 text-center raj">Capture The Flag (CTF) competitions challenge you to solve problems and earn flags.
              </p>
              <p className="spaced-half fw2 fs135 text-center raj">To solve a challenge, you need to hack your way to the flag.
              </p>
              <p className="spaced-half fw2 fs135 mb-0 text-center raj">Pro Hack Academy is a continuous learning environment by Fix-Assist.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div data-bs-aos="fade-right" className="col-md-4 text-center br d-flex justify-content-center align-items-center over">
              <h1 className="fw6 upper spaced-half">Learn by doing!</h1>
            </div>
            <div className="col-md-8 over" data-bs-aos="fade-left">
              <p className="spaced-half fw2 fs135 text-center raj">Challenges are directly accessible from the platform. no VPN or setup required.
              </p>
              <p className="spaced-half fw2 fs135 mb-0 text-center raj">New challenges are added in every week, to enable you to continuously Learn, Hack and Improve.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Loginnodals />
      <Joinmodal />
      <Resetmodal />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"></script>
      <Script src="/js/main.js" strategy='afterInteractive'></Script>
    </>
  )
}