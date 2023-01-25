import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './auth.service';

class AddressServices {
     constructor() {
          const authorities = AuthService.getAuthorities();
    if (authorities.length === 0) {
      window.location = '/login';
    }
    const firstSiteId = authorities[0].site;

    this.API_URL = 'https://perahu.et.r.appspot.com';
     }

     async getCountries(){
          try{
               const response = await axios.get(this.API_URL + '/countries', {
                    headers: authHeader()
               });
               return response.data['data'];
          } catch (error) {
               return error;
          }
     }
     async getProvinces(id){
          try{
               const response = await axios.get(this.API_URL + `/provinces?countryid=${id}`, {
                    headers: authHeader()
               });
               return response.data['data'];
          } catch (error) {
               return error;
          }
     }
     async selectedProvinces(id){
          try{
               const response = await axios.get(this.API_URL + `/provinces/${id}`, {
                    headers: authHeader()
               });
               return response.data['data'];
          } catch (error) {
               return error;
          }
     }

     async getRegencies(id){
          console.log(id);
          try{
               const response = await axios.get(this.API_URL + `/regencies?provinceId=${id}`, {
                    headers: authHeader()
               });
               return response.data['data'];
               
          } catch (error) {
               return error;
          }
     }
     async selectedRegencies(id){
          console.log(id);
          try{
               const response = await axios.get(this.API_URL + `/regencies/${id}`, {
                    headers: authHeader()
               });
               return response.data['data'];
               
          } catch (error) {
               return error;
          }
     }
     async getDistricts(id){
          console.log(id);
          try{
               const response = await axios.get(this.API_URL + `/districts?regencyId=${id}`, {
                    headers: authHeader()
               });
               return response.data['data'];
               
          } catch (error) {
               return error;
          }
     }

     async selectedDistricts(id){
          console.log(id);
          try{
               const response = await axios.get(this.API_URL + `/districts/${id}`, {
                    headers: authHeader()
               });
              
               return response.data['data'];
               
               
          } catch (error) {
               return error;
          }
     }

     async getVillage(id){
          console.log(id);
          try{
               const response = await axios.get(this.API_URL + `/villages?districtId=${id}`, {
                    headers: authHeader()
               });
               return response.data['data'];

               
          } catch (error) {
               return error;
          }
     }

     async selectedVillage(id){
          console.log(id);
          try{
               const response = await axios.get(this.API_URL + `/villages/${id}`, {
                    headers: authHeader()
               });
               return response.data['data'];
               
          } catch (error) {
               return error;
          }
     }
}

export default AddressServices;