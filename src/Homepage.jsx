import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchNasaphotos } from './photosSlice';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';


const Homepage = () => {
    const location=useLocation();
    const earth_date=location.state?.selectedDate;
    const navigate=useNavigate();
    const [selectedCamera, setSelectedCamera] = useState('All');

    const handledetails=(photo)=>{
         navigate('/Details',{state:{photo}})
    }
    const handleback=()=>{
        navigate('/');
    }
   
    // //*****  use if data to be store in session storage and clear photoslice component ****\\
    // const [data,setData]=useState([]);
    // const [loading,setLoading]=useState(true);
    // const [error,setError]=useState(null);
    // const API_KEY="0iRTSSIHF6RmmtNKSipR4GdBUUnxN3CDr9QVbfuQ";

    // useEffect(()=>{
    //     if(earth_date){
    //         const cachdata=sessionStorage.getItem(`photos_${earth_date}`)
    //         if (cachdata){
    //             setData(JSON.parse(cachdata));
    //             setLoading(false);
    //         }
    //         else{
    //             setLoading(true);
    //             fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earth_date}&api_key=${API_KEY}`)

    //            .then(response =>{
    //             if(!response.ok){
    //               throw new Error('Network Response Was Not Ok');
    //            }
    //            return response.json();
    //            })
    //            .then(data => {
    //              setData(data.photos);
    //              setLoading(false);
    //              sessionStorage.setItem(`photos_${earth_date}`, JSON.stringify(data.photos));
    //            })
    //           .catch(error => {
    //               setError(error);
    //              setLoading(false);
    //             })
    //         }
    //    }
    // },[earth_date]);
    // and in return replace photos.length to data.length similar photos.map to data.map

    //****use if data to store in redux store */
    const dispatch=useDispatch();
    const { data={} ,loading= false, error =null }=useSelector((state)=> state.photos || {});
    const photos=data[earth_date] || [];

    useEffect(()=>{
        if(earth_date && !data[earth_date]){
            dispatch(fetchNasaphotos(earth_date))
        }
    },[dispatch,earth_date,data]);
    const filteredPhotos = selectedCamera === 'All' ? photos : photos.filter(photo => photo.camera.name === selectedCamera);
    const cameras = ['All', ...new Set(photos.map(photo => photo.camera.name))];

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error...!{error.message}</p>

    return (
    <div className='home_page'>
      <h1><center>NASA Images</center></h1>
      <Button className='cancel' onClick={handleback}>Go Back</Button> <br />
      <br />
      <Dropdown 
         value={selectedCamera} 
         options={cameras}
         onChange={(e) => setSelectedCamera(e.value)} 
         placeholder='Select Camera'
         className="camera-dropdown"
       /> <br />
      {filteredPhotos.length === 0 ? (
                <p>No photos found for the selected date.</p>
            ) : (
                <div className='photo-list'>    
                    {filteredPhotos.map((photo) => (
                        <div key={photo.id} className='pics'>
                            <div className="photo-card">
                              <img src={photo.img_src} alt={`Mars Rover - ${photo.rover.name}`} width="250" />
                              <br />
                              <Button onClick={() => handledetails(photo)}>View Details</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
    </div>
  )
}

export default Homepage;