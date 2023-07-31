import { HomeFilled } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Breadcrumbs = (props) => {
  const navigate = useNavigate()
  let routepath=useLocation()
  const [paths, setPaths] = useState(routepath.pathname)
  const [localpaths,setlocalpaths]=useState(JSON.parse(localStorage.getItem("BreadCrumbs")))
  console.log(paths)

  console.log((routepath.pathname), "routepath")
  // console.log(routepath.state,"statedataprovidedddddd")
  // console.log(routepath.state.cards.data.appname, "vcards datata enterede")

  // let valueofbreadcrumbs = routepath.state.cards.data.appname;

  function fun(index) {
    var temp=paths.split("/")
    var arr=temp.splice(0,index+2)
    const result = arr.join('/');

var temp=JSON.parse(localStorage.getItem("BreadCrumbs"))
temp.pop()
localStorage.setItem('BreadCrumbs', JSON.stringify(temp));

    navigate(`${result}`);
  }
  return (<>
    <div className='breadCrumbSection' style={{ margin: "20px", color: "#8c8c8c", marginTop: "-6px" }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        <h3> <Link to="/nlp-apps"> <HomeFilled /></Link></h3>
        {
          localpaths.length > 0 ? <>  {
            localpaths.map((item, index) =>
            (
              <h3 style={{ color: "#8c8c8c" }}>  
              <div onClick={() => { { fun(index) } }}>{item}/ </div></h3>

            ))
          }</> : <></>
        }
      </div>

    </div>
  </>)
}
export default Breadcrumbs;






