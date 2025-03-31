import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export const RegisterVolunteer = () => {
  const { requestId } = useParams();
  const history = useNavigate();
  const [volunteerId, setVolunteerId] = useState("");
  const [volunteerExists, setVolunteerExists] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const location = useLocation();
  console.log("Location State:", location.state);
  const requestid = location.state?.requestId || null;

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

  const checkVolunteer = async () => {
    if (!volunteerId.trim()) {
      alert("Please enter your ID.");
      return;
    }

    try {
      const response = await axios.get(`/api/GiveHand/volunteers/${volunteerId}`);
      if (response.data) {
        setVolunteerExists(true);

        await axios.put(`/api/GiveHand/helpRequests/${requestid}`, {
          status: "treated",
          idVolunteer: volunteerId,
        });

        alert("The call is on! 🚀 Thank you for being there for them!");
        history(`/helpRequests`);
      }
    } catch (error) {
      if (
        volunteerId < 100000000 ||  
        volunteerId > 999999999 ||  
        !/^[0-9]{9,10}$/.test(volunteerId) 
      ) {
        alert("Invalid ID ❌");
      } else {
        setShowRegisterForm(true);
        setVolunteerData({ ...volunteerData, id: volunteerId });
      }

    }
  };

  const isFormValid = () => {
    return (
      volunteerData.firstName.trim() !== "" &&
      volunteerData.lastName.trim() !== "" &&
      volunteerData.phone.trim() !== "" &&
      volunteerData.specialisations.length > 0
    );
  };

  const handleRegister = async () => {
    if (!isFormValid()) return;

    try {
      await axios.post(`/api/GiveHand/volunteers`, volunteerData);
      alert("You have successfully registered👍🏻 Now you can respond to the request you wanted!");
      console.log("requestid: " + requestid);
      history(`/helprequest/${requestid}`);
    } catch (error) {
      alert("One of the data entered is incorrect🙁 Please try again");
    }
  };

  return (
    <div className="container">
      <h1>Volunteer for a Request</h1>

      {!showRegisterForm && (
        <>
          <input
            type="text"
            placeholder="Enter your ID"
            value={volunteerId}
            onChange={(e) => setVolunteerId(e.target.value)}
            className="input-field"
          />
          <button onClick={checkVolunteer} className="btn btn-primary">
            Confirm
          </button>
        </>
      )}

      {showRegisterForm && (
        <div className="register-modal">
          <h2>New Volunteer Registration</h2>
          <input type="text" placeholder="First Name" value={volunteerData.firstName}
            onChange={(e) => setVolunteerData({ ...volunteerData, firstName: e.target.value })} />
          <input type="text" placeholder="Last Name" value={volunteerData.lastName}
            onChange={(e) => setVolunteerData({ ...volunteerData, lastName: e.target.value })} />
          <input type="text" placeholder="Phone Number" value={volunteerData.phone}
            onChange={(e) => setVolunteerData({ ...volunteerData, phone: e.target.value })} />

          <h3>Select Your Specialisations:</h3>
          <div className="specialisations-list">
            {specialisationsList.map((specialisation) => (
              <label key={specialisation}>
                <input type="checkbox" value={specialisation}
                  checked={volunteerData.specialisations.includes(specialisation)}
                  onChange={() => setVolunteerData((prevState) => ({
                    ...prevState,
                    specialisations: prevState.specialisations.includes(specialisation)
                      ? prevState.specialisations.filter((item) => item !== specialisation)
                      : [...prevState.specialisations, specialisation],
                  }))} />
                {specialisation}
              </label>
            ))}
          </div>

          <button className={`btn success ${!isFormValid() ? "disabled" : ""}`}
            onClick={handleRegister} disabled={!isFormValid()}>
            Confirm & Register
          </button>
        </div>
      )}
    </div>
  );
};


