import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Home = () => {
    let navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}> <br />
            <h1>GiveHand🫲🏻🫱🏻</h1>
            <h2>Hands That Give, Hearts That Care❤️</h2>
            <br /> <br /> <br />
            <button
                onClick={() => navigate("/chat")}
                style={{
                    padding: "16px 45px",
                    fontSize: "18px",
                    backgroundColor: "#ffeb66",
                    color: "black",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginBottom: "15px",
                    marginRight: "20px" 
                }}
            >
                To our chat 💬
            </button>
            <button
                onClick={() => navigate("/helpRequests")}
                style={{
                    padding: "15px 30px",
                    fontSize: "18px",
                    backgroundColor: "#5aa3ff", 
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginBottom: "15px" 
                }}
            >
                For all requests📄
            </button>

            <br />

            <button
                onClick={() => navigate("/newVolunteer")}
                style={{
                    padding: "15px 30px",
                    fontSize: "18px",
                    backgroundColor: "#ff6f61", 
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginBottom: "15px", 
                    marginRight: "20px"
                }}
            >
                Join our giving 👈🏻
            </button>
            <button
                onClick={() => navigate("/thanks")}
                style={{
                    padding: "15px 30px",
                    fontSize: "18px",
                    backgroundColor: "#66cc66", 
                    color: "black", 
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginBottom: "15px", 
                    marginRight: "20px" 
                }}
            >
                To your thanks 🙏🏻
            </button>
        </div>
    );
};
