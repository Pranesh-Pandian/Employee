import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Add = () => {

    
    const [emps,setEmp]=useState({
        name:"",
        id:"",
        dept:"",
        dob:"",
        gender:"",
        desg:"",
        salary:"",
        task:"",
    })

    const[nl,checkNl]=useState(false);
    const [inputType, setInputType] = useState('text');
    const [inputValue, setInputValue] = useState('');

    const handleFocus = () => {
        setInputType('date');
      };


      const handleBlur = () => {
        if (!inputValue) {
          setInputType('text');
        }
      };

    const navi=useNavigate()

    const handleChange=(e)=>{
        setEmp(prev=>({...prev,[e.target.name]:e.target.value}))
        if(e.target.name==="name"){
            if(e.target.value.length>30) checkNl(true)
            else checkNl(false)
            console.log(e.target.value.length+"/"+nl)
        }
    };
    const handleDChange=(e)=>{
        setEmp(prev=>({...prev,[e.target.name]:e.target.value}))
        setInputValue(e.target.value);
    };

    const handleClick= async e =>{
        e.preventDefault()
        try {
            const res=await axios.post("http://localhost:5500/add",[emps,maxDate])
            if(res.data==="0") alert("Name is Empty")
            else if(res.data==="1") alert("Id is Empty")
            else if(res.data==="2") alert("Dept is Empty")
            else if(res.data==="3") alert("DOB is Empty")
            else if(res.data==="4") alert("Gender is Empty")
            else if(res.data==="5") alert("Designation is Empty")
            else if(res.data==="6") alert("Salary is Empty")
            else if(res.data==="7") alert("Inavlid Salary")
            else if(res.data==="8") alert("Inavlid DOB")
            else{
            alert("Succesfully added")
            navi("/")
            }
        } catch (err) {
            console.log(err)
        } 
    }
    
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear()-18;
  
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
  
    var maxDate = year + '-' + month + '-' + day;
    return (
        <div className='addd'>
        <form >
          <h1 className='head'>Add Employee</h1>
          <input type="text" placeholder='Name' onChange={handleChange} name='name'/>
          {nl && <p id='erre'>Length of the Name should be less than 30 Characters</p>}
          <input type="text" placeholder='Id' onChange={handleChange} name='id'/>  
          <select name="dept" id="input" onChange={handleChange}>
              <option value="" disabled selected id="pc">Select Department</option>
              <option value="HR">HR</option>  
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Developer">Developer</option>
              <option value="Managing">Managing</option>
          </select>
          <input type={inputType} value={inputValue} onChange={handleDChange} onFocus={handleFocus} onBlur={handleBlur} max={maxDate}placeholder="Date of Birth" name="dob"/>
          <select name="gender" id="input" onChange={handleChange}>
              <option value="" disabled selected id="pc">Gender (M or F)</option>
              <option value="M">M</option>  
              <option value="F">F</option>
          </select>
          <select name="desg" id="input" onChange={handleChange}>
              <option value="" disabled selected id="pc">Select Designation</option>
              <option value="HR">HR</option>  
              <option value="TL">TL</option>
              <option value="Admin">Admin</option>
              <option value="DevOps">DevOps</option>
              <option value="Manager">Manager</option>
          </select>
          <input type="number" placeholder='Salary' onChange={handleChange} name='salary' min={0} max={99999999}/>
          <select name="task" id="input" onChange={handleChange}>
              <option value="" disabled selected id="pc">Select Task</option>
              <option value="Manage">Manage</option>  
              <option value="Design">Design</option>
              <option value="Scaling">Scaling</option>
              <option value="DevOps">DevOps</option>
              <option value="PR">PR</option>
          </select>
          <button  onClick={handleClick} className='doo'>Add</button>
          </form>
      </div>
  )
}

export default Add