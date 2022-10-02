import Seo from "../components/Seo";
import useSWR from "swr";

const fetcher = async () => await fetch(`${process.env.NEXT_PUBLIC_URL}/api/check_approved`, {
    method: "POST",
    credentials: 'include'
}).then((res) => res.json());

const notapproved = () => {
    const { data, error } = useSWR("/not_approved", fetcher, { dedupingInterval: 10000 });
    if(data){
        if (data.Success) {
            return (<>{window.location.replace("/dashboard")} <center><h1>Redirecting...</h1></center></>)
        } else if (data.Errors === "Not Approved") {
            return (
                <>
                    <Seo title="Pro Hack Academy - Not Approved" />
                    <div className="container">
                        <div className="row">
                            <div className="col pt-2">
                                <div className="row ">
                                    <div className="col">
                                        <h2 className="pt-2 text-center">
                                            <span className="header">Not Approved By Admin
        
                                            </span>
                                        </h2>
                                    </div>
                                </div>
                                <div className="card card-body rounded text-center">
                                    <p>Dear {data?.username} plz wait let the admin verify your account</p>
                                    <a href="/logout" style={{ textDecoration: "none" }}>Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            window.location.replace("/logout");
        }
    }else{
        return (
            <>
                <Seo title="Pro Hack Academy - Not Approved" />
                <div className="container">
                    <div className="row">
                        <div className="col pt-2">
                            <div className="row ">
                                <div className="col">
                                    <h2 className="pt-2 text-center">
                                        <span className="header">Not Approved By Admin
    
                                        </span>
                                    </h2>
                                </div>
                            </div>
                            <div className="card card-body rounded text-center">
                                <p>Checking ...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default notapproved;
