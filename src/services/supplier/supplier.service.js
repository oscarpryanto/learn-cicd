import axios from 'axios';
import authHeader from '../auth-header';
import authService from '../auth.service';


class SupplierService {
   
     constructor(){
          const authorities = authService.getAuthorities();
          if (authorities.length === 0){
               window.location.replace('/login');   
          }
          const firstSiteId = authorities[0].site;
          this.API_URL =  'https://perahu.et.r.appspot.com/'+ firstSiteId + '/suppliers';
     }

     async getAllSupplier() {
          try{
               const response = await axios.get(this.API_URL, {
                    headers: authHeader()
                  });
                  return response.data['data'];
          } catch(error){
               return[];
          }
     }

     async getSuppliersById(id){
          try{
               const response = await axios.get(this.API_URL + `/${id}`, {
                    headers: authHeader()
               });
               return response.data['data'];
          } catch (error){
               return error;
          }
     }

     async addSuppliers(supplier){
          try {
              const response = await axios.post(this.API_URL, supplier, {
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

     async updateSuppliers (id, supplier){
          try{
               const response = await axios.put(this.API_URL + `/${id}`, supplier, {
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

     async deleteSuppliers(id){
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

export default SupplierService;