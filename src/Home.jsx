import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home=()=> {
    const[date,setDate]=useState('');
    const navigate= useNavigate();

    const handleNavigate=()=>{
        if(date){
            navigate(`/Homepage`, {state : {selectedDate : date}})
        }
    }

  return (
    <div className='home'>
      <h1><center>Nasa Images</center></h1>
      <p>Select The Date:</p>
      <InputText 
      type='date'
      value={date}
      onChange={(e)=> setDate(e.target.value)}
      /> <br />
      <br />
      <Button onClick={handleNavigate}>Set</Button>
    </div>
  )
}

export default Home;