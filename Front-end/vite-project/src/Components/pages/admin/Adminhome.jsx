import Card from "../../Card"
import Picapprenant from'../../../assets/Apprenant.png'
import Picprof from '../../../assets/prof.png'
import Picmodule from '../../../assets/module.png'
import Picespace from '../../../assets/espace.png'
import Table from "../../Table"



function AdminHome  ()  {
  let totalusers_app= 89935 ;
  let totalusers_prof= 89935 ;
  let totalusers_module= 89935 ;
  let totalusers_espace= 89935 ;
  return (
    <div className="adminhome">
      <div className="Home-text">
      <h2 style={{color:'#000066',marginTop:'20px',marginBottom:'20px'}}>Bienvenu ,</h2>
        <p style={{marginBottom:'20px'}}>Voici les informations concernant la platforme </p>
      </div>
        <div className="card-container">
        <Card url={Picapprenant}stat={totalusers_app} ></Card>
        <Card url={Picprof} stat={totalusers_prof} ></Card>
        <Card url={Picmodule} stat={totalusers_module}></Card>
        <Card url={Picespace}stat={totalusers_espace}></Card>
        </div>
        <div className="listContainer">
           
            <Table></Table>
        </div>
       {/* <Rightside></Rightside> */}
       
    </div>
  )
}

export default AdminHome