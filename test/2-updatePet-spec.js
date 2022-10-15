const supertest = require('supertest');
const api = require('../utils/api-helper');
const postPetrequest = require('../json-data/request-post-pet.json');

const request = supertest(process.env.BASE_URL);
let response, id, responseGet, responsePut, updatePayload;

describe(
  'update pet name',
  () => {
        
    test(`pre-condition - Given that I have an existing pet -`, async () => {
      // add pet which can then be updated
      postPetrequest.id = api.getRandomId();
      response = await api.postPet(postPetrequest, 'read_write');
      expect(response.status).toBe(200);
      id = response.body.id;
      updatePayload = response.body;
      // console.log('Created id ' + id);  //to debug
    });  

    test(`when I request to update the pet name`, async () => {
      updatePayload.name = 'doggie_name_updated';
      responsePut = await api.putPet(updatePayload, 'read_write');      
      expect(responsePut.status).toBe(200);            
    });
    
    test(`then pet name is updated as expected.`, async () => {
      responseGet = await api.getPetById(id, 'read_write');      
      expect(responseGet.status).toBe(200);      
      expect(responseGet.body.name).toEqual('doggie_name_updated');  
    });


    afterAll(async () => {
      // tear down to clean up data -  delete pet 
      await api.deletePet(id, 'read_write')
      // console.log('Deleted id ' + id); //to debug
    });
  
});
