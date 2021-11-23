import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./list.css"

export const LaunchList = () => {
    const navigate = useNavigate();
    const [launches, setLauncehs] = useState([]);
    const [loading, setLoading] = useState(false);
    let offset = 0;

    const getLaunchList = async () => {
        setLoading(true)
        const response = await axios.get(`https://api.spacexdata.com/v3/launches?offset=${offset}&limit=10`);
        setLauncehs((oldData) => [...oldData, ...response.data])
        setLoading(false)
        offset += 10;
    }
    const getRocketDetails = (id) => {
        navigate(`/${id}`);
    }

    const onWindowScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            getLaunchList();
        }
    }

    useEffect(() => {
        getLaunchList();
        window.addEventListener("scroll", onWindowScroll)
    }, [])
    return (
        <div>
            <h3> SpaceX Rocket Launch list</h3>
            <table cellSpacing="0">
                <tbody>
                    <tr>
                        <th>Flight Number</th>
                        <th>Mission Name</th>
                        <th>Rocket Id </th>
                        <th>Rocket Name </th>
                        <th>Launch Year </th>
                    </tr>
                    {loading && "Loading.."}
                    {launches.map(({ flight_number, mission_name, launch_year, rocket: { rocket_id, rocket_name } }) =>
                        <tr key={flight_number}>
                            <td>{flight_number}</td>
                            <td>{mission_name}</td>
                            <td className="rocket" onClick={() => getRocketDetails(rocket_id)}>{rocket_id}</td>
                            <td>{rocket_name}</td>
                            <td>{launch_year}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
