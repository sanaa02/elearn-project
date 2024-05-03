/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./styles/Adminfirst.css"

function Card  (props) {
   
    return (
     
        <div className="Carde" >
          <div className="carde container">
        <img className="Card-img" src={props.url} alt="card-img"></img>
      <h3 className="Card-stat">{props.stat}</h3>
     
      </div>
      </div> 
     
   
    )
  }
  
  export default Card