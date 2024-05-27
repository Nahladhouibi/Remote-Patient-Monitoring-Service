const request = require('supertest');
const app = require('../index.js');
 const jwt = require('jsonwebtoken'); // Import JWT library

describe('Remote Patient Monitoring Unit test', () => {
    // Assuming you have a function to generate JWT token
    const generateToken = (userId) => {
        return jwt.sign({ id: userId }, 'ACCC009*09', { expiresIn: '1h' });
    };

    // Let's assume you have a user ID to generate a token for
    const userId = '1';

    it('should create a new remote monitoring item', async () => {
        const newItem = {
            device_type: "Test",
            value: "Test",
        };

        // Generate token for authorization
        const token = generateToken(userId);

        const res = await request(app)
            .post('/api/remoteMonoriting/')
            .set('Authorization', `${token}`)  
            .send(newItem);

        console.log(res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toEqual(true);
       
    });

      it('should read list of remote monoriting', async () => {
          
        const generateToken = (userId) => {
            return jwt.sign({ id: userId }, 'ACCC009*09', { expiresIn: '1h' });
        };
    
        // Let's assume you have a user ID to generate a token for
        const userId = '1';
        const token = generateToken(userId);
          const res = await request(app)
              .get('/api/remoteMonoriting/getMyRemoteMonitoring')
              .set('Authorization', `${token}`); 

     
          expect(res.statusCode).toEqual(200);
          expect(res.body.length).toBeGreaterThan(0); 
      });
});