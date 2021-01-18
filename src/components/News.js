import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck
} from "@fortawesome/free-solid-svg-icons";
function News(props) {
  const [project, setProject] = useState({});
  const [load, setLoad] = useState(false);
  const [interestedBox, setInterestedBox] = useState(false);
  const [interested, setInterested] = useState(false);
  const [availableNews,setAvailableNews]=useState([]);

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
        `${props.domain}/news`,
        requestOptions
      );
      const data = await response.json();
      setAvailableNews(data);
      setLoad(true);
      console.log(data);
    } catch (err) {
      props.handleLogOut();
      props.history.push("/login");
    }
  }
  async function changeActive(id){

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": props.token,
      },
      body:JSON.stringify({})
    };
    try {
      const response = await fetch(
        `${props.domain}/news/update/${id}`,
        requestOptions
      );
      const data = await response;
      console.log(data)
     fetchData()
    } catch (err) {
      props.handleLogOut();
      props.history.push("/login");
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="container">
      <div className="w-100 h-100 pt-3">
        <div className="text-center">
        <h2>Update News</h2>
       <p>Choose your active News by clicking the checkmark by the side of it</p>

        </div>
       {load ?
       <ul>
  {availableNews.map((news,index)=>(
      <li key={news.id}>
        <span className="pr-3">{news.title}</span>
        <FontAwesomeIcon
                    icon={faCheck}
                    id="onTimelineEye"
                    color={news.selected ? "orange" : "grey"}
                    onClick={(e) =>
                      changeActive(news._id)
                    }
                  />
        </li>
      

  ))
}

       </ul>:
       <div>loading</div>}
       <div className="d-flex justify-content-center">
        <Link to="/home"><a className="btn btn-primary btm-block">Back to Main menu</a></Link>

       </div>
      </div>
    </div>
  );
}

export default News;
