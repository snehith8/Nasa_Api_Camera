import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Button } from 'primereact/button';

const Gallery = () => {
  const savedPhotos = useSelector((state) => state.photos.savedPhotos);
  const navigate=useNavigate();

  const handleback=()=>{
   navigate(-1)
  }

  return (
    <div className='home'>
      <h1><center>Saved Photos</center></h1>
       <center><Button className='cancel' onClick={handleback}>Go Back</Button></center> <br />
            {savedPhotos.length === 0 ? (
                <p>No saved photos to display.</p>
            ) : (
                <DataTable value={savedPhotos} >
                    <Column field='img_src' header="Image" body={(rowData)=> <img src={rowData.img_src}  width="100" />} />
                    <Column field="id" header="Id" />
                    <Column field="camera.full_name" header="Camera Name" />
                    <Column field="rover.launch_date" header="Launch Date" />
                    <Column field="rover.landing_date" header="Landing Date" />
                    <Column field="earth_date" header="Date Taken" />
                </DataTable>
            )}
    </div>
  )
}

export default Gallery;