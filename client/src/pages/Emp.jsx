import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Emp = () => {

    const [emp,setEmp]=useState([]);

    const handleDelete=async (id)=>{
        try {
            await axios.delete(`https://employee-pxqn.onrender.com/del/${id}`);
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        const fetchEmps=async()=>{
            try {
                const res=await axios.get("https://employee-pxqn.onrender.com/emp")
                console.log(res.data)
                setEmp(res.data);
                
            } catch (e) {
                console.log(e)
            }
        }
        fetchEmps();
    },[])

  return (
        <div id='finemp'>
            <h1 id='tit1'>Employee</h1>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Id</th>
                    <th>Dept</th>
                    <th>Dob</th>
                    <th>Gender</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Delete</th>
                    <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {emp.map(emps=>(
                        <tr>
                            <td>{emps.name}</td>
                            <td>{emps.id}</td>
                            <td>{emps.dept}</td>
                            <td>{emps.dob}</td>
                            <td>{emps.gender}</td>
                            <td>{emps.des}</td>
                            <td>{emps.salary}</td>
                            <td><button onClick={()=>handleDelete(emps.id)} className='button'>Delete</button></td>
                            <td><button id="upd" className='button'><Link to={`/upd/${emps.id}`}>Update</Link></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button id='add' className='button'><Link to="/add">ADD</Link></button>
        </div>
  )
}

export default Emp