import React,{useEffect, useState} from 'react'
import './LoginSignup.css'
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
let EventData;

export function handleEvent(data) {
  EventData = {
       id:data.id,
       name : data.name,
       location: data?.location,
       charge:data?.charge_customers,
       custom: data?.amount.category_6,
       category7:data?.amount?.category_7,
       category8:data?.amount?.category_8,
       category9:data?.amount?.category_9,
       category10:data?.amount?.category_10,
  };
}


export const LoginSignup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputpassword,setInputPassword] = useState('password');
  
  function passwordfield(val){
    if(inputpassword==='password'){
      setInputPassword('text')
    }
    else{
      setInputPassword('password')
    }
   
   
  }


  const handleLogin = async () => {
    const apiUrl = 'https://stg.dhunjam.in/account/admin/login';

    try {
      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      
       
      if (response.ok) {
        response=await response.json();
        let id=response.data.id;

        const apiUrl1 = "https://stg.dhunjam.in/account/admin/"+id
        try {
          let response1 = await fetch(apiUrl1, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept':'application/json'
            }, 
          });
          if(response1.ok){
            response1=await response1.json();
            handleEvent(response1.data);
          }}
          catch (error) {
            console.error('Error during login:', error);
          }
        navigate("/admin");
        // If login is successful, redirect to the admin dashboard
        
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>Venue Admin Login</div>   
        </div>
        <div>
            <div className='inputs'>
                
                <div className='input'>
                    <input type='text'placeholder='UserName' value={username}
            onChange={(e) => setUsername(e.target.value)} ></input>
                </div>
            </div>
            <div className='inputspass'>
                <div className='inputpassword'>
                    <input type={inputpassword} placeholder='Password' value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="password-icon" onClick={passwordfield}>
                <RemoveRedEyeIcon></RemoveRedEyeIcon>
                </div>
                
            </div>
            <div className="submit-container">
                <button type='button' className="submit"  onClick={handleLogin}>Sign In</button>
            </div>
            <div className="new-registration"><span>New Registration?</span></div>
        </div>
        

    </div>
  )
}

export {EventData};
