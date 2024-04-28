import Card from "../../Card"
import Picapprenant from'../../../assets/Apprenant.png'
import Picprof from '../../../assets/prof.png'
import Picmodule from '../../../assets/module.png'
import Picespace from '../../../assets/espace.png'
import Table from "../../Table"
// import Rightside from "../../Rightside"


function AdminHome  ()  {
  let totalusers_app= 89935 ;
  let totalusers_prof= 89935 ;
  let totalusers_module= 89935 ;
  let totalusers_espace= 89935 ;
  return (
    <div className="adminhome">
      <div className="Home-text">
      <h2>Bienvenu ,</h2>
        <p>Voici les informations concernant la platforme </p>
      </div>
        <div className="card-container">
        <Card url={Picapprenant}stat={totalusers_app} title={"Total users"}></Card>
        <Card url={Picprof} stat={totalusers_prof} title={"Total users"}></Card>
        <Card url={Picmodule} stat={totalusers_module} title={"Total users"}></Card>
        <Card url={Picespace}stat={totalusers_espace} title={"Total users"}></Card>
        </div>
        <div className="listContainer">
           
            <Table></Table>
        </div>
       {/* <Rightside></Rightside> */}
       
    </div>
  )
}

export default AdminHome