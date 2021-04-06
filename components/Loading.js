import { CircularProgress, LinearProgress } from "@material-ui/core"

const Loading = () => {
    return (
        <div style={{
            height: "100vh",
            display: "grid",
            placeItems: "center",
            backgroundColor: "#131c21",
        }}>
            <div style={{
                color: "white",
                textAlign: "center",
                padding: "40px",
                width: "40%",
            }}>
                <img
                    style={{
                        width: "100px",
                        objectFit: "contain",
                        marginBottom: "40px",
                    }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"
                    alt="WhatsApp"
                />
                <div className="login__text" style={{ marginBottom: "30px" }}>
                    <h1>Welcome To WhatsApp 🚀🔥</h1>
                </div>
                <LinearProgress />
            </div>
        </div>
    )
}

export default Loading
