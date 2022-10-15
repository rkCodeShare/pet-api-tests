const supertest = require('supertest');
const api = require('../utils/api-helper');
const postPetrequest = require('../json-data/request-post-pet.json');

const request = supertest(process.env.BASE_URL);
let response, id, responseGet;

describe.each([
  {
    category: 'dogs',
    status: 'available',
  },
  {
    category: 'cats',
    status: 'pending',
  },
  {
    category: 'rabbit',
    status: 'sold',
  },
])(
  'find pet by Id - for category $category',
  ({ category, status }) => {
        
    test(`pre-condition - Given that I have ID for a pet with category ${category} and in status ${status} -`, async () => {
      // add pet which can then be searched by id
      postPetrequest.id = api.getRandomId();
      postPetrequest.category.name = category;
      postPetrequest.status = status;
      response = await api.postPet(postPetrequest, 'read_write');
      expect(response.status).toBe(200);
      id = response.body.id;
      // console.log('Created id ' + id);  //to debug
    });  

    test(`when I find pet by ID`, async () => {
      responseGet = await api.getPetById(id, 'read_write');      
      expect(responseGet.status).toBe(200);      
      // console.log('Get by id ' + id);  //to debug
    });
    
    test(`then I can find expected pet`, () => {
      expect(responseGet.body.id).toEqual(id);  
    });

    test(`and I can see expected category and status`, () => {
      expect(responseGet.body.category.name).toEqual(category);  
      expect(responseGet.body.status).toEqual(status);  
    });


    afterAll(async () => {
      // tear down to clean up data -  delete pet 
      await api.deletePet(id, 'read_write')
      // console.log('Deleted id ' + id); //to debug
    });
  
});
