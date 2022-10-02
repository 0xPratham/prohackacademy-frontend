import InnerNavbar from "../components/InnerNavbar";
import ScoreBoardData from "../components/ScoreBoardData";
import ScoreBoardLoading from '../components/ScoreBoardLoading';
import useSWR from "swr";
import Seo from "../components/Seo";

const fetcher = () => fetch(`${process.env.NEXT_PUBLIC_URL}/api/fetchscore`, {
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

const scoreboard = () => {
    const { data, error } = useSWR("/fetchscore", fetcher, { dedupingInterval: 40000 });
    if (available_data(data)) {
        if (!data.Errors) {
            return (<><Seo title="Pro Hack Academy - Scoreboard" /><InnerNavbar /><ScoreBoardData data={data} /></>);
        } else if (data.Errors === "Not Approved") {
            return (<>{location.replace('/notapproved')} <center><h1>Not Approved By Admin</h1></center></>)
        }else {
            return (<>{location.replace('/logout')} <center><h1>Redirecting...</h1></center></>)
        }
    } else {
        return (
            <>
                <Seo title="Pro Hack Academy - Scoreboard" />
                <InnerNavbar />
                <ScoreBoardLoading />
            </>
        )
    }
};

export default scoreboard;
