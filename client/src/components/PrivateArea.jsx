import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const PrivateArea = () => {
    const [volunteerId, setVolunteerId] = useState("");
    const [volunteerTasks, setVolunteerTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const history = useNavigate();

    const checkVolunteer = async () => {
        if (!volunteerId.trim()) {
            alert("Please enter your ID.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/GiveHand/volunteers/${volunteerId}`);
            if (response.data) {
                setIsRegistered(true);
                const tasksResponse = await axios.get("/api/GiveHand/helpRequests", { params: { volunteerId: volunteerId } });
                setVolunteerTasks(tasksResponse.data);
            } else {
                setIsRegistered(false);
                alert("You are not registered as a volunteer with us😢 To join our giving, click on Join our giving on the home page");
                setVolunteerTasks([]);
            }
        } catch (error) {
            setIsRegistered(false);
            alert("You are not registered as a volunteer with us😢 To join our giving, click on Join our giving on the home page");
            setVolunteerTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const completeTask = async (taskId, status) => {
        console.log(taskId + "   " + status);
        if (status[0] === "finished") {
            alert("This task has already been completed.");
            return;
        }
        else {
            try {
                await axios.put(`/api/GiveHand/helpRequests/${taskId}`, { status: "finished" });
                alert("Request marked as completed! 🎉 Thank you🙏🏻");
                checkVolunteer();
            } catch (error) {
                console.error("Error finishing task:", error);
                alert("An error occurred. Please try again");
            }
        }
    };

    return (
        <div className="private-area-container">
            <h1>Your personal area📌</h1>
            <p>Enter your ID to see your tasks</p>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Insert ID"
                    value={volunteerId}
                    onChange={(e) => setVolunteerId(e.target.value)}
                />
                <button onClick={checkVolunteer} disabled={loading}>
                    {loading ? "checking..." : "🔍 checking"}
                </button>
            </div>

            {loading && <div className="loading">Loading tasks...⏳</div>}

            {volunteerTasks.length > 0 && (
                <div className="tasks-container">
                    <h2>Your tasks 📋:</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Description 📌</th>
                                <th>Location 🏠</th>
                                <th>📞 Phone</th>
                                <th>Status 📊</th>
                                <th>People Stuck 🚶</th>
                                <th>Priority ⚠️</th>
                                <th>Complete 👍🏻</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteerTasks.map(task => (
                                <tr key={task._id}>
                                    <td>{task.description}</td>
                                    <td>{task.LocationId}</td>
                                    <td>{task.phone}</td>
                                    <td>{task.status}</td>
                                    <td>{task.numPeopleStuck}</td>
                                    <td>{task.idpriority}</td>
                                    <td>
                                        <button
                                            className="complete-btn"
                                            onClick={() => completeTask(task._id, task.status)}
                                        >
                                            ✅ I complete the task
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isRegistered && volunteerTasks.length === 0 && !loading && (
                <p className="no-tasks">⛔ אין משימות פעילות כרגע</p>
            )}
        </div>
    );
};
