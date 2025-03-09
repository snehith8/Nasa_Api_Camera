import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPhoto } from './photosSlice';
import { Button } from 'primereact/button';

const Details = () => {
    const location=useLocation();
    const image_details=location.state?.photo;
    const navigate=useNavigate();
    const dispatch=useDispatch();


    const handleview=(image_details)=>{
        dispatch(addPhoto(image_details));
        navigate('/Gallery',{state:{image_details}})
    }
    const handlecancel=()=>{
        navigate(-1);
    }

    return (
    <>
        <h1><center>Details of Image</center></h1>
       <div className='details'>
        <div className='im'>
        <img src={image_details.img_src} />
        </div>
        <div className='dis'>
        <p><strong>Id:</strong>{image_details.id}</p>
        <p><strong>Camera Name:</strong>{image_details.camera.full_name}</p>
        <p><strong>Camera Code:</strong>{image_details.camera.name}</p>
        <p><strong>Landing_date:</strong>{image_details.rover.landing_date}</p>
        <p><strong>Launch_date:</strong>{image_details.rover.launch_date}</p>
        <p><strong>Max_Sol:</strong>{image_details.rover.max_sol}</p>
        <p><strong>Earth Date:</strong>{image_details.earth_date}</p>
        <p><strong>Sol:</strong>{image_details.sol}</p>
        <p><strong>Rover Status:</strong>{image_details.rover.status}</p>
        <Button onClick={()=>handleview(image_details)}>Save</Button>
        <Button className='cancel' onClick={handlecancel}>Go Back</Button>
        </div>
    </div>
    </>
  )
}

export default Details;
