const supertest = require('supertest');
const api = require('../utils/api-helper');
const postPetrequest = require('../json-data/request-post-pet.json');
const request = supertest(process.env.BASE_URL);
let response, id, responseGet, responseDelete, responsePut, updatePayload;

describe(
  'find pet by ID - non-existing pet',
  () => {
        
    test(`pre-condition - Given that I have ID for a non-existing pet -`, async () => {
      // add pet which can then be deleted
      postPetrequest.id = api.getRandomId();
      response = await api.postPet(postPetrequest, 'read_write');
      expect(response.status).toBe(200);
      id = response.body.id;    
      // console.log('Created id ' + id);  //to debug
      responseDelete = await api.deletePet(id, 'read_write');      
      expect(responseDelete.status).toBe(200);  
    });  
    
    test(`then pet with given ID is Not found as expected.`, async () => {
      responseGet = await api.getPetById(id, 'read_write');      
      expect(responseGet.status).toBe(404);      
      expect(responseGet.body.message).toEqual('Pet not found');  
    });
  
});

describe(
  'update pet - invalid id',
  () => {
        
    test(`pre-condition - Given that I have ID for an existing pet -`, async () => {
      // add pet which can then be updated
      postPetrequest.id = api.getRandomId();
      response = await api.postPet(postPetrequest, 'read_write');
      expect(response.status).toBe(200);
      id = response.body.id;       
      updatePayload = response.body;         
      // console.log('Created id ' + id);  //to debug
    });  
    
    test(`when I request to update the pet with invalid id then I get 500 server error`, async () => {   
      updatePayload.id = 'x';   
      responsePut = await api.putPet(updatePayload, 'read_write');      
      expect(responsePut.status).toBe(500);            
    });
  
    afterAll(async () => {
      // tear down to clean up data -  delete pet 
      await api.deletePet(id, 'read_write')
      // console.log('Deleted id ' + id); //to debug
    });
});

describe(
  'delete pet - invalid id',
  () => {
        
    test(`pre-condition - Given that I have ID for a non-existing pet -`, async () => {
      // add pet which can then be deleted
      postPetrequest.id = api.getRandomId();
      response = await api.postPet(postPetrequest, 'read_write');
      expect(response.status).toBe(200);
      id = response.body.id;    
      // console.log('Created id ' + id);  //to debug
      responseDelete = await api.deletePet(id, 'read_write');      
      expect(responseDelete.status).toBe(200);  
    });  
    
    test(`when I try to delete the pet then I get 404 Not found as expected.`, async () => {
      responseDelete = await api.deletePet(id, 'read_write');       
      expect(responseGet.status).toBe(404);            
    });
});