import InnerNavbar from "../components/InnerNavbar";
import DashboardLoadingSkeleton from "../components/DashboardLoadingSkeleton";
import DashBoardData from "../components/DashBoardData";
import useSWR, { mutate } from "swr";
import Seo from "../components/Seo";

const fetcher = async () => await fetch(`${process.env.NEXT_PUBLIC_URL}/api/fetchchallenges`, {
    method: "POST",
    credentials: 'include'
}).then((res) => res.json());

const available_data = (data) => {
    if (data) {
        if (Object.keys(data).length > 0) {
            return true
        }
    }
    return false;
}

const dashboard = () => {
    const { data, error } = useSWR("/dashboard", fetcher, { dedupingInterval: 40000 });
    if (available_data(data)) {
        if (!data.Errors) {
            return (<><Seo title="Pro Hack Academy - Dashboard" /><InnerNavbar /><DashBoardData data={data} mutate={mutate} /></>);
        } else if (data.Errors === "Not Approved") {
            return (<>{location.replace('/notapproved')} <center><h1>Not Approved By Admin</h1></center></>)
        }else {
            return (<>{location.replace('/logout')} <center><h1>Redirecting...</h1></center></>)
        }
    } else {
        return (
            <>
                <Seo title="Pro Hack Academy - Dashboard" />
                <InnerNavbar />
                <DashboardLoadingSkeleton />
            </>
        )
    }
};

export default dashboard;