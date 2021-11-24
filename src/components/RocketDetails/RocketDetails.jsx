import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Carousel from '../Carousel/Carousel';
import './details.css';

export const RocketDetails = () => {
    const { rocketId } = useParams();
    const [rocket, setRocket] = useState();

    const getRocketDetails = async () => {
        const response = await axios.get(
            `https://api.spacexdata.com/v3/rockets/${rocketId}`
        );
        setRocket(response.data);
    };
    useEffect(() => {
        getRocketDetails();
    }, []);


    return (
        <div className='details'>
            {rocket && <Carousel images={rocket.flickr_images} />}

            {rocket && (
                <div className='details-data'>
                    <div className='detail-row'>
                        <h1 className='rocket-name'>{rocket.rocket_name}</h1>
                    </div>

                    <div className='detail-row'>
                        {' '}
                        <span className='title'>Type</span>  {rocket.rocket_type}
                    </div>
                    <div className='detail-row'>
                        {' '}
                        <span className='title'>First Flight</span>  {rocket.first_flight}
                    </div>
                    <div className='detail-row'>
                        {' '}
                        <span className='title'>Company</span>  {rocket.company}
                    </div>
                    <div className='detail-row'>
                        {' '}
                        <span className='title'>Country</span>  {rocket.country}
                    </div>
                    <div className='detail-row'>
                        {' '}
                        <span className='title'>Mass</span>  {rocket.mass.kg} kg
                    </div>
                    <div className='detail-row'>
                        {' '}
                        <span className='title'>Height</span>  {rocket.height.feet} feet
                    </div>
                    <div className='detail-row'>
                        {' '}
                        <span className='title'>Description</span>  {rocket.description}
                    </div>
                    <a
                        className="link"
                        target='_blank'
                        href={rocket.wikipedia}
                        rel="noreferrer"
                    >
                        {' '}
                        Read More{' '}
                    </a>
                </div>
            )}
        </div>
    );
};
