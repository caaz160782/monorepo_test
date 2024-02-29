const mockGetAll = jest.fn();

const request = require('supertest');
const createApp = require('../src/app');
const { generateManyBook } = require('../src/fakes/book.fake');

// Suplantación de la BD.
jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  // Metodos a suplantar.
  getAll: mockGetAll, // Directo, sin fake y sin => function.
  // getAll: () => [...fakeBooks], // "data enlatada"
  create: () => {},
})));

describe('test for hello endpoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    await server.close();
  });
  describe('test for [GET]/api/v1/books', () => {
    test('should return the list books', () => {
      // arrange
      const fakeBooks = generateManyBook(3);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.length).toEqual(fakeBooks.length);
        });
    });
  });
});
