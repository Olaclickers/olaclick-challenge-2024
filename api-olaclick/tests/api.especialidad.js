
const request = require('supertest')
const app = require('../app')
const api = '/api'

/*
 TESTING Post
*/
describe("POST /specialties ", () => {
  it("Creando especialidad", async() =>{
    await request(app)
      .post(`${api}/specialties`)
      .field('name', 'desarrollo web 15')
      .field('descrip', 'Entornoooo DEV')
      .attach('image', 'tests/images/img-1.png')
      //.attach('image', 'https://static.wikia.nocookie.net/eswikia/images/d/df/Pokémon.png/revision/latest/scale-to-width-down/980?cb=20170308220152')
      //.set("Accept", "application/json")
      //.expect("Content-Type", /json/)
      .expect(200)
  })  
})

describe("POST /", () => {
  it("", async() => {
    const data = {}
    await request(app)
            .post('')
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)

  })
})
