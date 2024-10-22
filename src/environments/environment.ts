export const environment = {
  production: true,
  apiUrl: {
    //base: 'http://localhost/api', este es el servicor local
    base:'https://meyd-mt-5dad4c7c009d.herokuapp.com/api',
    sucursal: 'sucursales',
    consultaservicio : 'consultaservicio/serv',
    auth:{
      login: 'auth/login',
      check: 'auth/check'
    }
  },

};
