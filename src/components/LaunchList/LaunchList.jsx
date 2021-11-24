import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import './list.css';
import Loader from "react-loader-spinner";

export const LaunchList = () => {
    const navigate = useNavigate();
    const [launches, setLauncehs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [lastElement, setLastElement] = useState(null);

    const getLaunchList = async () => {
        setLoading(true);
        const response = await axios.get(
            `https://api.spacexdata.com/v3/launches?offset=${offset}&limit=10`
        );
        setLauncehs((oldData) => [...oldData, ...response.data]);
        setLoading(false);
    };

    useEffect(() => {
        if (offset < 100) {
            getLaunchList();
        }
    }, [offset]);

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    const observer = useRef(
        new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setOffset((off) => off + 10);
            }
        })
    );

    return (
        <>
            <h3> SpaceX Rocket Launch list</h3>
            <table cellSpacing='0'>
                <tbody>
                    <tr>
                        <th>Flight Number</th>
                        <th>Mission Name</th>
                        <th>Rocket Id </th>
                        <th>Rocket Name </th>
                        <th>Launch Year </th>
                    </tr>
                    <>
                        {launches.map(
                            (
                                {
                                    flight_number,
                                    mission_name,
                                    launch_year,
                                    rocket: { rocket_id, rocket_name },
                                },
                                index
                            ) => {
                                if (launches.length + 1 >= index) {
                                    return (
                                        <tr ref={setLastElement} key={flight_number}>
                                            <td>{flight_number}</td>
                                            <td>{mission_name}</td>
                                            <td
                                                className='rocket'
                                                onClick={() => navigate(`/${rocket_id}`)}
                                            >
                                                {rocket_id}
                                            </td>
                                            <td>{rocket_name}</td>
                                            <td>{launch_year}</td>
                                        </tr>
                                    );
                                } else {
                                    return (
                                        <tr key={flight_number}>
                                            <td>{flight_number}</td>
                                            <td>{mission_name}</td>
                                            <td
                                                className='rocket'
                                                onClick={() => navigate(`/${rocket_id}`)}
                                            >
                                                {rocket_id}
                                            </td>
                                            <td>{rocket_name}</td>
                                            <td>{launch_year}</td>
                                        </tr>
                                    );
                                }
                            }
                        )}
                    </>
                </tbody>
            </table>
            <div className="loading">
                {loading && <Loader
                    type="ThreeDots"
                    color="#353535"
                    height={30}
                    width={30}
                />}
            </div>
        </>
    );
};
