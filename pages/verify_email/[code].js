const verify_email = (props) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col pt-2">
                        <div className="row ">
                            <div className="col">
                                <h2 className="pt-2 text-center">
                                    <span className="header">Email Verification

                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className="card card-body rounded text-center">
                            <p>{props.message.Success}{props.message.Errors}</p>
                            <a href="/">Return home</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const code = context.query.code;
    if (code.length < 30) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    try {
        const code_array = code.split("___");
        const [userId, uniqueString] = code_array;
        const verify_result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                uniqueString
            })
        })
        const join_res = await verify_result.json();
        return { props: { message: join_res } };
    } catch {
        return
    }
}

export default verify_email