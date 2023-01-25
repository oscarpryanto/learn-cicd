import axios from 'axios';
import authHeader from '../auth-header';
import AuthService from '../auth.service';


class CompanyService {
  constructor() {
    const authorities = AuthService.getAuthorities();
    if (authorities.length === 0) {
      window.location = '/login';
    }
    const firstSiteId = authorities[0].site;

    this.API_URL = 'https://perahu.et.r.appspot.com/'+ firstSiteId + '/companies';
  }

  async getAllCompanies() {
    try {
      const response = await axios.get(this.API_URL, {
        headers: authHeader()
      });
      return response.data['data'];
    } catch (error) {
      return error;
    }
  }

  async getCompanyById(id) {
    try {
      const response = await axios.get(this.API_URL + `/${id}`, {
        headers: authHeader()
      });
      return response.data['data'];
    } catch (error) {
      return error;
    }
  }

  async addCompany(company) {
    try {
      const response = await axios.post(this.API_URL, company, {
        headers: authHeader()
      });
      if (response.data['status'] === 'Success') {
        return true;
      }
      return response;
    } catch (error) {
      return error;
    }
  }  

  async updateCompany(id, company) {
    try {
      const response = await axios.put(this.API_URL + `/${id}`, company, {
        headers: authHeader()
      });
      if (response.data['status'] === 'Success') {
        return true;
      }
      return false;
    } catch (error) {
      return error;
    }
  }

  async deleteCompany(id) {
    try {
      const response = await axios.delete(this.API_URL + `/${id}`, {
        headers: authHeader()
      });
      if (response.data.status === 'Success') {
        return true;
      }
      return response.data;
    } catch (error) {
      return false;
    }
  }
  
}

export default CompanyService;