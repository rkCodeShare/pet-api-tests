const supertest = require('supertest');
const chalk = require('chalk');



require('dotenv-safe').config();

const baseUrl = supertest(process.env.BASE_URL);

module.exports = {
  authHeaderApiKey() {
    return {
      'api_key': process.env.API_KEY,      
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  },

  authHeaderBearer(scope) {
    let bearerToken;
    switch (scope) {
      case 'read_write':
        bearerToken = process.env.READ_WRITE_BEARER_TOKEN;
        break;
      case 'read':
        bearerToken = process.env.READ_BEARER_TOKEN;
        break;
      case 'write':
          bearerToken = process.env.WRITE_BEARER_TOKEN;
          break;  
      case 'no_access':
        bearerToken = process.env.NO_ACCESS_BEARER_TOKEN;
        break;
      default:
        bearerToken = process.env.NO_ACCESS_BEARER_TOKEN;
        break;
    }
    return {
      'authorization': `Bearer ${bearerToken}`,      
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  },

  async postPet(postPetrequest, scope) {    
    const response = await baseUrl
      .post('/pet')
      .set(this.authHeaderBearer(scope))
      .send(postPetrequest)
      .catch((error) => error.response);      
    return response;
  },

  async putPet(putPetrequest, scope) {
    const response = await baseUrl
      .put('/pet')
      .set(this.authHeaderBearer(scope))
      .send(putPetrequest)
      .catch((error) => error.response);      
    return response;
  },

  async getPetById(petId, scope) {
    const response = await baseUrl
      .get(`/pet/${petId}`)
      .set(this.authHeaderBearer(scope))
      .send()
      .catch((error) => error.response);      
    return response;
  },

  async deletePet(petId, scope) {
    const response = await baseUrl
      .delete(`/pet/${petId}`)
      .set(this.authHeaderBearer(scope))
      .send()
      .catch((error) => error.response);      
    return response;
  },

  async getPetByIdApiKey(petId) {
    const response = await baseUrl
      .get(`/pet/${petId}`)
      .set(this.authHeaderApiKey())
      .send()
      .catch((error) => error.response);      
    return response;
  },
  
  getRandomId(){
    let randomId = Math.floor(Math.random() * 1000) + 1000;
    return randomId;
  }
};
