import InnerNavbar from "../../components/InnerNavbar";
import ProgressData from "../../components/Userprogress";
import ProgressLoading from '../../components/Userprogressloading';
import Nousernamefound from '../../components/Nousernamefound';
import useSWR from "swr";
import Seo from "../../components/Seo";
import { useRouter } from 'next/router';

const fetcher = username => username !== "undefined" ? fetch(`${process.env.NEXT_PUBLIC_URL}/api/fetch_user`, {
    method: "POST",
    credentials: 'include',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        fetch_username: username,
    }),
}).then((res) => res.json()) : "";

const progress = () => {
    const router = useRouter();
    const { username } = router.query;
    const { data, error } = useSWR(`${username}`, fetcher, { dedupingInterval: 50000, revalidateOnFocus: false, });
    if (data) {
        if (data.Success) {
            return (
                <>
                    <Seo title="Pro Hack Academy - Progress" />
                    <InnerNavbar />
                    <ProgressData data={data} />
                </>
            )
        } else if (data.Errors === "Not Approved") {
            return (<>{location.replace('/notapproved')} <center><h1>Not Approved By Admin</h1></center></>)
        } else if (data.Errors === "User Not Found") {
            return (<>
                <Seo title="Pro Hack Academy - No User Found" />
                <InnerNavbar />
                <Nousernamefound />
            </>)
        } else {
            return (<>{location.replace('/logout')} <center><h1>Redirecting...</h1></center></>)
        }
    }else {
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
