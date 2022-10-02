import InnerNavbar from "../components/InnerNavbar";
import ProgressData from "../components/ProgressData";
import ProgressLoading from '../components/ProgressLoading';
import useSWR from "swr";
import Seo from "../components/Seo";

const fetcher = () => fetch(`${process.env.NEXT_PUBLIC_URL}/api/user_progress`, {
    method: "POST",
    credentials: 'include'
}).then((res) => res.json());

const progress = () => {
    const { data, error } = useSWR("/user_progress", fetcher, { dedupingInterval: 40000 });
    if (data) {
        if (!data.Errors) {
            return (
                <>
                    <Seo title="Pro Hack Academy - Progress" />
                    <InnerNavbar />
                    <ProgressData data={data} />
                </>
            )
        } else if (data.Errors === "Not Approved") {
            return (<>{location.replace('/notapproved')} <center><h1>Not Approved By Admin</h1></center></>)
        }else {
            return (<>{location.replace('/logout')} <center><h1>Redirecting...</h1></center></>)
        }
    }
    else {
        return (
            <>
                <Seo title="Pro Hack Academy - Progress" />
                <InnerNavbar />
                <ProgressLoading />
            </>
        )
    }
}

export default progress
