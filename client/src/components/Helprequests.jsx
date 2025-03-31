import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Details } from "./details";

export const HelpRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({ location: "", status: "", priority: "" });
  const history = useNavigate();

  const selectStyle = {
    width: "60%",
    padding: "12px",
    margin: "5px 0",
    border: "1px solid #aaa",
    borderRadius: "8px",
    fontSize: "18px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer"
  };
  const isFormValid = () => {
    return (
      newRequest &&
      newRequest.description.trim() !== "" &&
      newRequest.phone.trim() !== "" &&
      newRequest.numPeopleStuck.trim() !== "" &&
      newRequest.LocationId.trim() !== "" &&
      newRequest.idpriority.trim() !== ""
    );
  };

  useEffect(() => {
    axios.get('/api/GiveHand/helpRequests', { params: filters })
      .then(response => setRequests(response.data))
      .catch(error => console.error(error));
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({ location: "", status: "", priority: "" });
  };

  const handleInputChange = (e) => {
    setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
  };

  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    LocationId: "",
    description: "",
    phone: "",
    status: "wait",
    numPeopleStuck: "",
    idpriority: "",
    idVolunteer: 0,
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('/api/GiveHand/locations')
      .then(response => setLocations(response.data))
      .catch(error => console.error("Error fetching locations:", error));
  }, []);

  const handleSaveRequest = () => {
    let priorityValue;
    switch (newRequest.idpriority) {
      case "low":
        priorityValue = 1;
        break;
      case "medium":
        priorityValue = 2;
        break;
      case "high":
        priorityValue = 3;
        break;
      case "critical":
        priorityValue = 4;
        break;
      default:
        priorityValue = 1;
    }
    let locationValue;
    switch (newRequest.LocationId) {
      case "brim":
        locationValue = 500;
        break;
      case "haran":
        locationValue = 501;
        break;
      case "bruk":
        locationValue = 502;
        break;
      case "chabad":
        locationValue = 503;
        break;
      case "achida":
        locationValue = 504;
        break;
      case "tzadka":
        locationValue = 505;
        break;
      case "kenig":
        locationValue = 506;
        break;
      case "ramban":
        locationValue = 507;
        break;
      case "bender":
        locationValue = 508;
        break;
      case "mutzafi":
        locationValue = 509;
        break;
      case "arav shach":
        locationValue = 510;
        break;
      default:
        locationValue = 500;
    }

    const requestToSend = { ...newRequest, idpriority: priorityValue };
    console.log("requestToSend: " + requestToSend.data);
    axios.post('/api/GiveHand/helpRequests', requestToSend)
      .then(() => {
        setShowModal(false);
        setNewRequest({ description: "", LocationId: "", phone: "", numPeopleStuck: "", idpriority: "" });
        setRequests(prevRequests => [...prevRequests, requests.data]);
        alert("The request was successfully registered 📄");
      })
      .catch(error => alert("One of the data entered is incorrect🙁 Please try again"));
  };

  return (
    <div className="container"><br />
      <h1>Help Request List</h1><br />
      <h6>Filter by:</h6>
      <div className="filters" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        width: "fit-content",
        margin: "0 auto"
      }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <select name="location" onChange={handleFilterChange} value={filters.location} style={selectStyle}>
            <option value="" disabled hidden>Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.street}>{location.street}</option>
            ))}
          </select>
          <select name="status" onChange={handleFilterChange} value={filters.status} style={selectStyle}>
            <option value="" disabled hidden>Status</option>
            <option value="wait">Wait</option>
            <option value="treated">Treated</option>
            <option value="finished">Finished</option>
          </select>
          <select name="priority" onChange={handleFilterChange} value={filters.priority} style={selectStyle}>
            <option value="" disabled hidden>Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <button onClick={resetFilters} style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background 0.3s",
          marginTop: "10px"
        }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}>
          Reset Filters
        </button>
      </div>

      <br />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <table style={{
          borderCollapse: "collapse",
          width: "90%",
          textAlign: "center",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "white", fontSize: "18px", cursor: "pointer" }}>
              <th style={{ padding: "15px", border: "1px solid #ddd" }}>📌 Description</th>
              <th style={{ padding: "15px", border: "1px solid #ddd" }}>🏠 Location</th>
              <th style={{ padding: "15px", border: "1px solid #ddd" }}>📞 Phone</th>
              <th style={{ padding: "15px", border: "1px solid #ddd" }}>📊 Status</th>
              <th style={{ padding: "15px", border: "1px solid #ddd" }}>People Stuck 🚶</th>
              <th style={{ padding: "15px", border: "1px solid #ddd" }}>⚠️ Priority</th>
              <th style={{ padding: "15px", border: "1px solid #ddd" }}>Volunteer 🙋‍♂️</th>
              <th style={{ padding: "15px", border: "1px solid #ddd" }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: "15px", textAlign: "center" }}>No requests</td>
              </tr>
            ) : (
              requests
                .filter(request => request && request.description) // סינון בקשות לא תקינות
                .map((request, index) => (
                  <tr key={request.id || index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                    <td style={{ padding: "15px", border: "1px solid #ddd" }}>{request.description}</td>
                    <td style={{ padding: "15px", border: "1px solid #ddd" }}>{request.LocationId}</td>
                    <td style={{ padding: "15px", border: "1px solid #ddd" }}>{request.phone}</td>
                    <td style={{ padding: "15px", border: "1px solid #ddd" }}>{request.status}</td>
                    <td style={{ padding: "15px", border: "1px solid #ddd" }}>{request.numPeopleStuck}</td>
                    <td style={{ padding: "15px", border: "1px solid #ddd" }}>{request.idpriority}</td>
                    <td style={{ padding: "15px", border: "1px solid #ddd" }}>
                      {request.idVolunteer === 0 ? "/" : request.idVolunteer}
                    </td>
                    <td style={{ padding: "15px", border: "1px solid #ddd" }}>
                      <Link to={`/helprequest/${request._id}`} element={<Details />} style={{ textDecoration: "none", color: "#007bff", fontWeight: "bold" }}>
                        🔍 View
                      </Link>
                    </td>
                  </tr>
                ))
            )}
          </tbody>

        </table>
      </div>
      <button onClick={() => setShowModal(true)} style={{ padding: "10px", backgroundColor: "#007bff", color: "white", borderRadius: "5px", cursor: "pointer" }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
      >➕ Add Request</button>
      {showModal && (
        <div style={{
          position: "fixed",
          bottom: "5%",
          left: "5%",
          backgroundColor: "white",
          padding: "40px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          zIndex: 1000,
          width: "400px"
        }}>
          <h2>New Help Request</h2>
          <input type="text" name="description" placeholder="Description" value={newRequest.description} onChange={handleInputChange} /><br />
          <input type="text" name="phone" placeholder="Phone" value={newRequest.phone} onChange={handleInputChange} /><br />
          <input type="number" name="numPeopleStuck" placeholder="People Stuck" value={newRequest.numPeopleStuck} onChange={handleInputChange} /><br />
          <select name="LocationId" value={newRequest.LocationId} onChange={handleInputChange} style={selectStyle}>
            <option value="">Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>{location.street}</option>
            ))}
          </select><br />
          <select name="idpriority" value={newRequest.idpriority} onChange={handleInputChange} style={selectStyle}>
            <option value="" disabled hidden>Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select><br />
          {/* <button onClick={handleSaveRequest} style={{ backgroundColor: "#3399ff", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" }}>Save ✅</button> */}
          <button
            onClick={handleSaveRequest}
            disabled={!isFormValid()}  // הוספתי סוגריים לקריאה לפונקציה
            style={{
              backgroundColor: isFormValid() ? "#3399ff" : "#ccc", // אפור אם הכפתור נעול
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              cursor: isFormValid() ? "pointer" : "not-allowed"
            }}
          >
            Save ✅
          </button>

          <button
            onClick={() => {
              setShowModal(false);
              setNewRequest({ description: "", LocationId: "", phone: "", numPeopleStuck: "", idpriority: "" });
            }}
            style={{ marginLeft: "10px", backgroundColor: "#ff6666", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" }}>Cancel ❌</button>
        </div>
      )}
    </div>
  );
};
