import React,{useState,useEffect} from 'react'
import './Admin.css'
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis} from 'recharts'
import { EventData } from '../LoginSignup/LoginSignup.jsx'
import { handleEvent } from '../LoginSignup/LoginSignup.jsx'
import { useNavigate } from 'react-router-dom';





export const Admin = () => {
  const [inputvalue,setInputvalue]=useState(EventData?.custom);
  const [visible,setVisible]=useState(true);
  const [className, setClassName] = useState('activeButton');
  const [category7, setCategory7] = useState(EventData?.category7);
  const [category8, setCategory8] = useState(EventData?.category8);
  const [category9, setCategory9] = useState(EventData?.category9);
  const [category10, setCategory10] = useState(EventData?.category10);
  const [eventvalue, seteventvalue] = useState(EventData?.charge);

  const navigate = useNavigate();
  const handleLogin = async () => {
    
    const apiUrl = 'https://stg.dhunjam.in/account/admin/4';
  
    try {
      let response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          "amount": {
            "category_6": inputvalue,
            "category_7": category7,
            "category_8":category8,
            "category_9":category9,
            "category_10":category10,
          }
        }),
      });
      
       
      if (response.ok) {
        response=await response.json();
        let id=response.data.id;
  
        const apiUrl1 = "https://stg.dhunjam.in/account/admin/"+EventData?.id
        
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
            navigate("/admin");
            
          }}
          catch (error) {
            console.error('Error during login:', error);
          }
        // If login is successful, redirect to the admin dashboard
        
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  const data = [
    {
      "name": "Custom",
      "pv": EventData?.custom
    },
    
    {
      "name": "Category1",
      "pv": EventData?.category7
    },
    {
      "name": "Category2",
      "pv": EventData?.category8
    },
    {
      "name": "Category3",
      "pv": EventData?.category9
    },
    {
      "name": "Category4",
      "pv": EventData?.category10
    },
   
  ]

  // Function to handle changing the class name
  const changeClassName = (inputClassName) => {
    // Change the class name when the button is clicked
    setClassName(inputClassName);
  };
  
  function getData(val){
    if(val.target.value>99){
      changeClassName("activeButton")
    }
    else{
      changeClassName("inactiveButton")
    }
   setInputvalue(val.target.value);
   
  }

  function checkValues7(val){
    if(val.target.value>79){
      changeClassName("activeButton")
    }
    else{
      changeClassName("inactiveButton")
    }
    setCategory7(val.target.value);
  }

  function checkValues8(val){
    if(val.target.value>59){
      changeClassName("activeButton")
    }
    else{
      changeClassName("inactiveButton")
    }
    setCategory8(val.target.value);
  }

  function checkValues9(val){
    if(val.target.value>39){
      changeClassName("activeButton")
    }
    else{
      changeClassName("inactiveButton")
    }
    setCategory9(val.target.value);
  }

  function checkValues10(val){
    if(val.target.value>19){
      changeClassName("activeButton")
    }
    else{
      changeClassName("inactiveButton")
    }
    setCategory10(val.target.value);
  }

  const handleRadioChange = (event) => {

    
    const selectedValue = event.target.value;
    
    // Log different messages based on the selected radio button value
    if (selectedValue === 'yes') {
      changeClassName("activeButton")
      seteventvalue(true);
    } else if (selectedValue === 'No') {
      changeClassName("inactiveButton")
      seteventvalue(false);
    }
  }; 
  return (
    <>
    <div className="container">
      <div className="name">
         {EventData?.name},{EventData?.location}   on Dhun Jam
      </div>

      <div className="condition">
        <div className="choose">
            Do you want to charge your <br/> customers for requesting songs?
            </div>
            <div className="radio">
              
            <input type="radio" value="yes" name="choose" id="yesRadio" onClick={()=>setVisible(true)}  onChange={handleRadioChange} checked={eventvalue===true} /> yes
        <input type="radio" value="No" name="choose"  onClick={()=>setVisible(false)}  onChange={handleRadioChange}   /> No
            </div>
      </div>
     
      <div className="condition">
        <div className="choose">
        Custom Song request amount-
            </div>
            <div className='amount'>
                    <input className='input1' type='text' placeholder={inputvalue} disabled={!visible} onChange={getData} required>
                    
               </input>
                </div>

      </div>
      
      <div className="condition">
        <div className="choose">
            Regular song request amounts, <br/> from hign to low-
            </div>
          <div className="options">
          <div className='amount1'>
                <input className='input2' type='text' value={category7} disabled={!visible} onChange={checkValues7} required/>      
               </div>
               <div className='amount1'>
                    <input className='input2' type='text' value={category8} disabled={!visible} onChange={checkValues8}required >      
               </input>
               </div>
               <div className='amount1'>
                    <input className='input2' type='text' value={category9}  disabled={!visible} onChange={checkValues9} required>      
               </input>
               </div>
               <div className='amount1'>
                    <input className='input2' type='text' value={category10}  disabled={!visible} onChange={checkValues10} required>      
               </input>
               </div>
               
            
            </div>
      </div>
      {
        visible && <div className="chart">
        <p>&#x20B9;</p>
      <BarChart width={530} height={250} data={data}>

       <XAxis dataKey="name" stroke='white' />
       <YAxis tick={{ fill: 'black' }} tickLine={{ stroke: 'black' }} stroke='white' />
 
  
       <Bar dataKey="pv" fill="#F0C3F1" barSize={30} radius={5} />

      </BarChart>
      </div>
      }
      
      <div className="submit-container-2">
                <button type='button' className={className} disabled={!visible} onClick={handleLogin} >Save</button>
        </div>
    </div>
    
    </>
  )
}
