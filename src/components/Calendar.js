import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { Form,Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Calendar(props) {

  const [load, setLoad] = useState(false);
  const [availableActivity,setAvailableActivity]=useState([]);
  const [date,setDate]=useState(null)
  const [activity,setActivity]=useState("")
  const [currentState,setCurrentState]=useState("view")

  async function fetchData() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": props.token,
      },
    };
    try {
      const response = await fetch(
        `${props.domain}/calendar`,
        requestOptions
      );
      const data = await response.json();
      setAvailableActivity(data);
      setCurrentState("view");
      console.log(data);
      setLoad(true)
    } catch (err) {
      props.handleLogOut();
      props.history.push("/login");
    }
  }
  async function deleteItem(id) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": props.token,
      },
    };
    try {
      const response = await fetch(
        `${props.domain}/calendar/delete/${id}`,
        requestOptions
      );
      const data = await response;
      fetchData()
    } catch (err) {
      props.handleLogOut();
      props.history.push("/login");
    }
  }
  async function addNew(){
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": props.token,
      },
      body:JSON.stringify({title:activity,date:date})
    };
    try {
      const response = await fetch(
        `${props.domain}/calendar/insert`,
        requestOptions
      );
      const data = await response;
      setActivity("")
      setDate(null)
     fetchData()
     setCurrentState("view")
    } catch (err) {
      props.handleLogOut();
      props.history.push("/login");
    }
  }
  function check() {
    return activity.length > 0 && date !== null;
  }
  function sendTomainMenu(){
    props.history.push('/home')
  }
  console.log(currentState)
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="container">
         <div className="text-center pt-3">
        <h2>FaceWorld Calendar</h2>
       <p>Manage your schedule here</p>
        </div>
        {currentState==="view" ? 
        <div>
          <button className="btn btn-secondary btn-block" onClick={sendTomainMenu}>Back to main Menu</button>
          <button className="btn btn-danger btn-block" onClick={()=>setCurrentState("add")}>Add Item</button>
        <Table hover>
        <thead>
          <tr>
            <th width={"180px"}>Date</th>
            <th>Activity</th>
            <th width={"80px"}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {load &&
            availableActivity.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.date.substring(0,10)}</td>
                <td>{activity.title}</td>
                <td className="icons">

                  <FontAwesomeIcon
                    icon={faTrash}
                    id="trashcan"
                    onClick={(e) => deleteItem(activity._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
        </div>
        : 
        <div className="">
                <Form.Group controlId="dob">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control type="date" name="dob" placeholder="Date of Birth" value={date} onChange={(e) => setDate(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="text">
                    <Form.Label>Type Activity</Form.Label>
                    <Form.Control type="text" name="activity" placeholder="Football Practice" value={activity} onChange={(e) => setActivity(e.target.value)}/>
                </Form.Group>
                <button onClick={()=>setCurrentState("view")} className="btn btn-secondary btn-block">Cancel</button>
                <button onClick={addNew} disabled={!check()} className="btn btn-danger btn-block">SUBMIT</button>
            </div>
      }
      
            
    </div>
  );
}
export default Calendar;
