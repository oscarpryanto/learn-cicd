import axios from 'axios';
import authHeader from '../auth-header';
import authService from '../auth.service';


class FisherService {
   
     constructor(){
          const authorities = authService.getAuthorities();
          if (authorities.length === 0){
               window.location.replace('/login');   
          }
          const firstSiteId = authorities[0].site;
          this.API_URL =  'https://perahu.et.r.appspot.com/'+ firstSiteId + '/profiles';
     }

     async getAllFishermans(role) {
          console.log(role)
          try{
               const response = await axios.get(this.API_URL +`?roleCode=${role}`, {
                    headers: authHeader()
                  });
                  return response.data['data'];
          } catch(error){
               return[];
          }
     }

     async getFishermansById(id, role){
          console.log(id + role)
          try{
               const response = await axios.get(this.API_URL + `/${id}?roleCode=${role}`, {
                    headers: authHeader()
               });
               return response.data['data'];
          } catch (error){
               return error;
          }
     }

     async addFishermans(role,dataItem){
          console.log(dataItem + role)
          try {
              const response = await axios.post(this.API_URL + `?roleCode=${role}`, dataItem, {
               headers: authHeader()
              });
               if (response.data['status'] === 'Success'){
                    return true;
               }
               return response.data;    
          } catch (error) {
               return error;
          }
     }

     async updateFishermans (id,role, dataItem){
          try{
               const response = await axios.put(this.API_URL + `/${id}?roleCode=${role}`, dataItem, {
                    headers: authHeader()                    
               });
               if (response.data['status'] === 'Success'){
                    return true;
               }
               return response.data;
          } catch (error){
               return error;
          }
     } 

     async deleteFishermans(id, role){
          try{
               const response = await axios.delete(this.API_URL + `/${id}?roleCode=${role}`, {
                    headers: authHeader()
               })
               if (response.data['status'] === 'Success'){
                    return true;
               }
               return response.data;

          } catch (error){
               return error;

          }
     }

}

export default FisherService;