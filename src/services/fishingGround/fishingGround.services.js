import axios from 'axios';
import authHeader from '../auth-header';
import authService from '../auth.service';


class FishingGroundService {
   
     constructor(){
          const authorities = authService.getAuthorities();
          if (authorities.length === 0){
               window.location.replace('/login');   
          }
          const firstSiteId = authorities[0].site;
          this.API_URL =  'https://perahu.et.r.appspot.com/'+ firstSiteId + '/fishing-grounds';
     }

     async getAllFishingGround() {
          try{
               const response = await axios.get(this.API_URL, {
                    headers: authHeader()
                  });
                  return response.data['data'];
          } catch(error){
               return[];
          }
     }

     async getFishingGroundById(id){
          try{
               const response = await axios.get(this.API_URL + `/${id}`, {
                    headers: authHeader()
               });
               return response.data['data'];
          } catch (error){
               return error;
          }
     }

     async addFishingGround(dataFishingGround){
          console.log(dataFishingGround)
          try {
              const response = await axios.post(this.API_URL, dataFishingGround, {
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

     async updateFishingGround (id, dataFishingGround){
          try{
               const response = await axios.put(this.API_URL + `/${id}`, dataFishingGround, {
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

     async deleteFishingGround(id){
          try{
               const response = await axios.delete(this.API_URL + `/${id}`, {
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

export default FishingGroundService;