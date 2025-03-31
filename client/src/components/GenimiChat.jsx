import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Paper, TextField, IconButton, Typography, Box, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";

const ChatContainer = styled(Paper)(({ theme }) => ({
    maxWidth: "600px",
    margin: "auto",
    padding: theme.spacing(2),
    backgroundColor: "#f9f9f9",
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
    maxHeight: "400px",
    overflowY: "auto",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: "#fff",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
}));

const InputContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
});

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [faq, setFaq] = useState([]); // רשימת השאלות הנפוצות
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/GiveHand/faq")
            .then((response) => setFaq(response.data))
            .catch((error) => console.error("Error loading FAQ:", error));
    }, []);
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setInput("");

        try {
            const response = await axios.post("http://localhost:3001/api/GiveHand/gemini", { message: input });
            const botMessage = { role: "bot", content: response.data.reply };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "bot", content: "⏳ יותר מדי בקשות! אנא נסה שוב בעוד כמה רגעים" },
            ]);
        }
    };


    return (
        <ChatContainer style={{ marginTop: "100px" }}>
            <Typography variant="h5" gutterBottom>
                💬 Chat with GiveHand
            </Typography>

            <MessagesContainer>
                {messages.map((msg, index) => (
                    <Box key={index} display="flex" justifyContent={msg.role === "user" ? "flex-end" : "flex-start"} mb={1}>
                        <Box sx={{
                            maxWidth: "70%",
                            padding: "10px",
                            backgroundColor: msg.role === "user" ? "#007bff" : "#e0e0e0",
                            color: msg.role === "user" ? "#fff" : "#000",
                            borderRadius: "10px"
                        }}>
                            <Typography variant="body1">{msg.content}</Typography>
                        </Box>
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </MessagesContainer>

            <InputContainer>
                <TextField fullWidth variant="outlined" placeholder="Ask anything..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage(input)} />
                <IconButton color="primary" onClick={() => sendMessage(input)}>
                    <SendIcon />
                </IconButton>
            </InputContainer>
            <Accordion sx={{ mt: 2, backgroundColor: "#f0f8ff", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#e3f2fd" }}>
                    <Typography variant="h6" color="primary">❔ Frequently Asked Questions</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: "#ffffff" }}>
                    <List>
                        {faq.map((question, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => sendMessage(question)} sx={{ "&:hover": { backgroundColor: "#90caf9" } }}>
                                    <Typography color="textPrimary">{question}</Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>

        </ChatContainer>
    );
};

export default ChatPage;
