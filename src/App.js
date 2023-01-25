import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register  from './components/register.component';
import Login  from './components/login.component';
import DashboardComponent from "./components/home/dashboard.component";
import Chart from "./components/home/charts";
import Company from "./components/company/company.component";
import EditCompany from "./components/company/editcompany.component"
import AddCompany from "./components/company/addcompany.component";
import SelectCompany from "./components/company/selectcompany.component"
import Fisher from "./components/fishers/fishers.component"
import AddFisherman from "./components/fishers/addnewfisherman.component"
import EditFisherman from "./components/fishers/editfisherman.component"
import ViewFisherman from "./components/fishers/viewfisherman.component"
import Supplier from "./components/supplier/supplier.component";
import AddSupplier from "./components/supplier/addnewsupplier.component"
import EditSupplier from "./components/supplier/editsupplier.component"
import ViewSupplier from "./components/supplier/selectedSupplier.component"
import FishingGround from "./components/FishingGround/fishingGround.component"
import AddFishingGround from "./components/FishingGround/addFishingGround.component"
import EditFishingGround from "./components/FishingGround/editFishingGround.component"
import ViewFishingGround from "./components/FishingGround/selectedFishingGround.component"
import Captains from "./components/captains/captains.component"
import AddCaptains from "./components/captains/addnewCaptain.component"
import EditCaptains from "./components/captains/editCaptain.component"
import ViewCaptains from "./components/captains/viewCaptain.component"
import Traders from "./components/traders/traders.component"
import AddTraders from "./components/traders/addnewTraders.component"
import EditTraders from "./components/traders/editTraders.component"
import ViewTraders from "./components/traders/viewTraders.component"


function App() {
    return (
      <div>
        <Router>
        <Routes>
          <Route exact path="/" element={<DashboardComponent />}>
            <Route path="/" element={<Chart />}/>
            {/* modul company */}
            <Route path="company" element={<Company />}/> 
            <Route path="company/add" element={<AddCompany />}/> 
            <Route path="company/:id/edit" element={<EditCompany />}/> 
            <Route path="company/:id" element={<SelectCompany />}/>
            {/* modul fisher  */}
            <Route path="fisher" element={<Fisher />}/> 
            <Route path="fisher/add" element={<AddFisherman />}/> 
            <Route path="fisher/:id/edit" element={<EditFisherman />}/> 
            <Route path="fisher/:id" element={<ViewFisherman />}/>
            {/* modul supplier  */}
            <Route path="supplier" element={<Supplier />}/>  
            <Route path="supplier/add" element={<AddSupplier />}/> 
            <Route path="supplier/:id/edit" element={<EditSupplier />}/> 
            <Route path="supplier/:id" element={<ViewSupplier />}/> 
            {/* modul fishing-ground  */}
            <Route path="fishing-ground" element={<FishingGround />}/>  
            <Route path="fishing-ground/add" element={<AddFishingGround />}/>  
            <Route path="fishing-ground/:id/edit" element={<EditFishingGround />}/>  
            <Route path="fishing-ground/:id" element={<ViewFishingGround />}/>  
             {/* modul captain  */}
             <Route path="captain" element={<Captains />}/>  
             <Route path="captain/add" element={<AddCaptains />}/>  
             <Route path="captain/:id/edit" element={<EditCaptains />}/>  
             <Route path="captain/:id" element={<ViewCaptains />}/>  
             {/* modul traders  */}
             <Route path="trader" element={<Traders />}/>  
             <Route path="trader/add" element={<AddTraders />}/>  
             <Route path="trader/:id/edit" element={<EditTraders />}/>  
             <Route path="trader/:id" element={<ViewTraders />}/>  
          </Route>
          <Route path="/register"  element={<Register/>}/>
          <Route path="/login"  element={<Login />}/>
        </Routes>
        </Router>
      </div>
   

      );                                                                              
}

export default App;
