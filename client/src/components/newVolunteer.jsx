import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const NewVolunteer = () => {
    const navigate = useNavigate();
    const [volunteerData, setVolunteerData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        specialisations: [],
    });

    const specialisationsList = [
        "Medical Assistance", "Food Distribution", "Rescue Operations",
        "Psychological Support", "Logistics", "Construction & Repairs"
    ];

    const handleChange = (e) => {
        setVolunteerData({ ...volunteerData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (specialisation) => {
        setVolunteerData((prevState) => ({
            ...prevState,
            specialisations: prevState.specialisations.includes(specialisation)
                ? prevState.specialisations.filter((item) => item !== specialisation)
                : [...prevState.specialisations, specialisation],
        }));
    };

    const isFormValid = () => {
        return (
            volunteerData.id.trim() !== "" &&
            volunteerData.firstName.trim() !== "" &&
            volunteerData.lastName.trim() !== "" &&
            volunteerData.phone.trim() !== "" &&
            volunteerData.specialisations.length > 0
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) return;
        try {
            await axios.post("/api/GiveHand/volunteers", volunteerData);
            alert("You have successfully registered👍🏻 You chose to be on the side of the givers");
            navigate("/helpRequests");
        } catch (error) {
            alert("One of the data entered is incorrect🙁 Please try again");
            console.error("Error registering volunteer:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px", padding: "20px", maxWidth: "500px", margin: "auto", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", backgroundColor: "#f9f9f9" }}>
            <h1>Register as a Volunteer</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <input type="text" name="id" placeholder="ID" value={volunteerData.id} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="firstName" placeholder="First Name" value={volunteerData.firstName} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="lastName" placeholder="Last Name" value={volunteerData.lastName} onChange={handleChange} required style={inputStyle} />
                <input type="text" name="phone" placeholder="Phone" value={volunteerData.phone} onChange={handleChange} required style={inputStyle} />
                <h3>Select Your Specialisations:</h3>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                    {specialisationsList.map((specialisation) => (
                        <label key={specialisation}>
                            <input type="checkbox" value={specialisation} checked={volunteerData.specialisations.includes(specialisation)} onChange={() => handleCheckboxChange(specialisation)} />
                            {specialisation}
                        </label>
                    ))}
                </div>
                <button type="submit" style={buttonStyle(isFormValid())} disabled={!isFormValid()}>Register</button>
            </form>
        </div>
    );
};

const inputStyle = {
    width: "90%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
};

const buttonStyle = (enabled) => ({
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    marginTop: "15px",
    border: "none",
    opacity: enabled ? "1" : "0.7",
    cursor: enabled ? "pointer" : "not-allowed"
});