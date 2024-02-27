import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios'


const Update = () => {

    const [emps,setEmp]=useState({
        name:"",
        id:"",
        dept:"",
        dob:"",
        gender:"",
        desg:"",
        salary:"",
        task:""
    })

    const navi=useNavigate()
    const loci=useLocation();
    const sId=loci.pathname.split('/')[2]
    useEffect(()=>{
        const fetchEmps=async()=>{
            try {
                const res=await axios.get(`https://employee-pxqn.onrender.com/upd/${sId}`)
                console.log(res.data[0])
                setEmp(res.data[0]);
            } catch (e) {
                console.log(e)
            }
        }
        fetchEmps();
    },[])

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


    const handleChange=(e)=>{
        setEmp(prev=>({...prev,[e.target.name]:e.target.value}))
    };
    const handleDChange=(e)=>{
        setEmp(prev=>({...prev,[e.target.name]:e.target.value}))
        setInputValue(e.target.value);
    };

    const handleClick= async e =>{
        e.preventDefault()
        try {
            await axios.put("https://employee-pxqn.onrender.com/upd/"+sId,emps)
            alert("Succesfully updated")
            navi("/")
        } catch (err) {
            console.log(err)
        } 
    }
    return (
    <div className='addd'>
      <form >
        <h1 className='head'>Update Employee</h1>
        <input type="text" placeholder='Name' onChange={handleChange} name='name' value={emps.name}/>
        <select name="dept" id="input" onChange={handleChange} value={emps.dept}>
              <option value="" disabled selected id="pc">Select Departmet</option>
              <option value="HR">HR</option>  
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Developer">Developer</option>
              <option value="Managing">Managing</option>
          </select>
        <input type={inputType} value={emps.dob} onChange={handleDChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="Date of Birth" name="dob"/>
        <select name="gender" id="input" onChange={handleChange} value={emps.gender}>
            <option value="" disabled selected id="pc">Gender (M or F)</option>
            <option value="M">M</option>  
            <option value="F">F</option>
        </select>
        <select name="desg" id="input" onChange={handleChange} value={emps.des}>
              <option value="" disabled selected id="pc">{emps.des}</option>
              <option value="HR">HR</option>  
              <option value="TL">TL</option>
              <option value="Admin">Admin</option>
              <option value="DevOps">DevOps</option>
              <option value="Manager">Manager</option>
        </select>
        <input type="number" placeholder='Salary' onChange={handleChange} name='salary' min={0} max={99999999} value={emps.salary}/>
        <select name="task" id="input" onChange={handleChange} value={emps.task}>
              <option value="" disabled selected id="pc">Select Task</option>
              <option value="Manage">Manage</option>  
              <option value="Design">Design</option>
              <option value="Scaling">Scaling</option>
              <option value="DevOps">DevOps</option>
              <option value="PR">PR</option>
          </select>
        <button  onClick={handleClick} className='doo'>Update</button>
        </form>
    </div>
  )
}

export default Update