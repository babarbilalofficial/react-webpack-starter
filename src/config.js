let production = process.env.NODE_ENV == 'production' ? true : false; 

const configProduction = {
  
};

module.exports = {
  production: production, 
  port: production ? 3001 : 3001,
  host: production ? 'localhost' : 'localhost'
};
