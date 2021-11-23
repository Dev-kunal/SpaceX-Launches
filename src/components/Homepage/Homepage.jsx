import React from 'react'
import { useNavigate } from 'react-router';
import "./home.css";

export default function Homepage() {
    const navigate = useNavigate()
    return (
        <div className="homepage">
            <h1 style={{ textAlign: "center" }}>SpaceX Rock8 Launches</h1>
            <img className="rock8" src="https://ik.imagekit.io/abcdefg/Roc8-3d_Krjl_TZkrbt.png?updatedAt=1637576041565" alt="rock-logo" />
            <button onClick={() => navigate("/launchlist")} className="btn-secondary">Launch 🚀</button>
        </div>
    )
}
