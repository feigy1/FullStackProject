
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Details = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    axios.get(`/api/GiveHand/helpRequests/${id}`)
      .then(response => setRequest(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleVolunteerClick = () => {
    console.log("id: "+id);
    history(`/registerVolunteer/${id}`, { state: { requestId: id } });
  };

  if (!request) return <div>Loading...</div>;

  return (
    <div className="container" style={{
      maxWidth: "600px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#007bff", marginBottom: "20px" }}>Help Request Details</h1>

      <div style={{
        textAlign: "left",
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
        marginBottom: "20px"
      }}>
        <p style={{ fontSize: "18px", margin: "10px 0" }}><strong>🏠 Location ID:</strong> {request.LocationId}</p>
        <p style={{ fontSize: "18px", margin: "10px 0" }}><strong>📄 Description:</strong> {request.description}</p>
        <p style={{ fontSize: "18px", margin: "10px 0" }}><strong>📞 Phone:</strong> {request.phone}</p>
        <p style={{ fontSize: "18px", margin: "10px 0" }}>
          <strong>📊 Status:</strong>
          <span style={{
            color: request.status === "wait" ? "orange" :
              request.status === "treated" ? "blue" : "green",
            fontWeight: "bold"
          }}> {request.status}</span>
        </p>
        <p style={{ fontSize: "18px", margin: "10px 0" }}><strong>🚶 People Stuck:</strong> {request.numPeopleStuck}</p>
        <p style={{ fontSize: "18px", margin: "10px 0" }}>
          <strong>⚠️ Priority:</strong>
          <span style={{
            color: request.idpriority === "critical" ? "red" :
              request.idpriority === "high" ? "orange" :
                request.idpriority === "medium" ? "blue" : "gray",
            fontWeight: "bold"
          }}> {request.idpriority}</span>
        </p>
        <p style={{ fontSize: "18px", margin: "10px 0" }}><strong>🙋‍♂️ Volunteer ID:</strong> {request.idVolunteer || "None"}</p>
      </div>

      <button onClick={handleVolunteerClick} style={{
        padding: "12px 25px",
        fontSize: "18px",
        fontWeight: "bold",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#28a745",
        color: "white",
        cursor: "pointer",
        transition: "background 0.3s"
      }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}>
        I want to take this ✅
      </button>
    </div>
  );
};
