import Seo from '../components/Seo';

const maintenance = (props) => {
  return (<>
    <Seo title="Pro Hack Academy - Maintenance" />
    <section className="min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        <div className="row align-items-center justify-content-center justify-content-lg-between">
          <div className="col-12 col-sm-9 col-md-8 col-lg-5 mb-5 mb-lg-0"><img className="img-fluid" src="/maintenance.png" alt="boy illustration" /></div>
          <div className="col-sm-12 col-lg-6">
            <div className="text-center text-lg-left">
              <h1 className="display-5">We're undergoing a bit of scheduled maintenance</h1>
              <p className="lead my-4">Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment</p>
              <p>
                Regards {`->`} <span style={{ color: "#83d8ae" }}>Pro Hack Academy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export async function getServerSideProps(context) {
  if (process.env.MAINTENANCE_MODE !== 'true') {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }
  return { props: { status: 'ok' } };
}

export default maintenance