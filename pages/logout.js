import useSWR, {mutate} from "swr";

const fetcher = async () => await fetch(`${process.env.NEXT_PUBLIC_URL}/api/logout`, {
    method: "DELETE",
    credentials: 'include'
}).then((res) => res.json());

const logout = () => {
    const { data, error } = useSWR("/logout", fetcher);
    if(data){
        if (data.Success) {
            location.replace('/');
        } else {
            location.replace('/');
        }
    }else{
        mutate("/logout")
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col pt-2">
                        <div className="row ">
                            <div className="col">
                                <h2 className="pt-2 text-center">
                                    <span className="header">Logout ...

                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default logout;