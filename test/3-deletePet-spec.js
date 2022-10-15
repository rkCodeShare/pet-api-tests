const supertest = require('supertest');
const api = require('../utils/api-helper');
const postPetrequest = require('../json-data/request-post-pet.json');

const request = supertest(process.env.BASE_URL);
let response, id, responseGet, responseDelete, updatePayload;

describe(
  'delete pet',
  () => {
        
    test(`pre-condition - Given that I have an existing pet -`, async () => {
      // add pet which can then be deleted
      postPetrequest.id = api.getRandomId();
      response = await api.postPet(postPetrequest, 'read_write');
      expect(response.status).toBe(200);
      id = response.body.id;    
      // console.log('Created id ' + id);  //to debug
    });  

    test(`when I request to delete the pet`, async () => {      
      responseDelete = await api.deletePet(id, 'read_write');      
      expect(responseDelete.status).toBe(200);            
    });
    
    test(`then pet with given ID is deleted as expected.`, async () => {
      responseGet = await api.getPetById(id, 'read_write');      
      expect(responseGet.status).toBe(404);      
      expect(responseGet.body.message).toEqual('Pet not found');  
    });
  
});
