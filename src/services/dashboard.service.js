import AuthService from './auth.service'


export default function dashboardServices() {
          const authorities = AuthService.getAuthorities();
          if (authorities.length === 0) {
            window.location.replace('/login'); 
          }
}

