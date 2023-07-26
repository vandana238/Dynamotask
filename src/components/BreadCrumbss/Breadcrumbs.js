import { HomeFilled } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Breadcrumbs = (props) => {
  const navigate = useNavigate()
  let routepath=useLocation()
  const [paths, setPaths] = useState(props.values)
  const [localpaths,setlocalpaths]=useState(JSON.parse(localStorage.getItem("BreadCrumbs")))
  console.log(paths)

  // console.log(routepath, "routepath")
  // console.log(routepath.state,"statedataprovidedddddd")
  // console.log(routepath.state.cards.data.appname, "vcards datata enterede")

  // let valueofbreadcrumbs = routepath.state.cards.data.appname;



  function fun(index) {
alert(index)
    var test=props.values.splice(index)
    const myString = test.join(",");
console.log(myString);
var finalpaths=myString.replace(',','/')
alert(finalpaths)
    navigate(`${finalpaths}`);
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






