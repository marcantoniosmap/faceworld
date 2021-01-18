import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
function Home(props) {
  const [project, setProject] = useState({});
  const [load, setLoad] = useState(true);
  const [interestedBox, setInterestedBox] = useState(false);
  const [interested, setInterested] = useState(false);

  useEffect(() => {
    // fetchData();
    // console.log(project);
  }, []);

  return (
    <div>
      <div className="w-00 h-100 pt-3">
        <h3 className="text-center">FaceWorld Customization</h3>
        <div className="row">
          <div className="col-lg-6">
            <Link to="/news">
            <div className="d-flex justify-content-center align-items-center">
              <div>
              <img src="/news.png" className="img-fluid" style={{maxWidth:"240px"}}/>
              <h4 className="text-center">Update News</h4>
              </div>
            </div>
            </Link>
          </div>

          <div className="col-lg-6">
            <Link to="/calendar">
            <div className="d-flex justify-content-center align-items-center">
              <div>
              <img src="/calendar.png" className="img-fluid" style={{maxWidth:"240px"}}/>
              <h4 className="text-center">Update Calendar</h4>
              </div>
            </div>

            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Home;
