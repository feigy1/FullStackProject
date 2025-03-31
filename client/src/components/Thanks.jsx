import { useNavigate } from "react-router-dom";

export const Thanks = () => {
    let navigate = useNavigate();

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            marginTop: "80px",  
            padding: "20px", 
        }}>
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: "200px",  
                width: "100%",
                marginBottom: "100px" 
            }}>
                <img src="s.webp" alt="" width="380" height="500" />
                <img src="f.webp" alt="" width="330" height="500" />
            </div>
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: "200px",  
                width: "100%",
                marginBottom: "20px" 
            }}>
                <img src="g.webp" alt="" width="400" height="360" />
                <img src="h.webp" alt="" width="300" height="450" />
            </div>
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: "200px",  
                width: "100%",
                marginBottom: "20px" 
            }}>
                <img src="d.webp" alt="" width="350" height="500" />
                <img src="i.webp" alt="" width="330" height="500" />
            </div>
        </div>
    );
};
