import InnerNavbar from "../components/InnerNavbar";
import Seo from "../components/Seo";
import Feedback from '../components/Feedback';
import useSWR from "swr";

const fetcher = async () => await fetch(`${process.env.NEXT_PUBLIC_URL}/api/check_auth`, {
  method: "GET",
  credentials: 'include'
}).then((res) => res.json());

const feedback = () => {
  const { data, error } = useSWR("/check_auth", fetcher, { dedupingInterval: 50000 });
  if (data) {
    if (data.Success) {
      return (<><Seo title="Pro Hack Academy - Feedback" /><InnerNavbar /><Feedback /></>)
    } else if (data.Errors === "Not Approved") {
      return (<>{location.replace('/notapproved')} <center><h1>Not Approved By Admin</h1></center></>)
    }else{
      return (<>{location.replace('/logout')} <center><h1>Redirecting...</h1></center></>)
    }
  }else{
    return(
      <></>
    )
  }
}

export default feedback