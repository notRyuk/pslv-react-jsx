// // import JobHandler from '../handlers/job';
// // import { getValue } from '../utils/object';
// // import request from 'supertest';
// // import app from '../main/server'; // Import your Express app
// // import JobApplication from '../server/models/job/application'; // Import your JobApplication model

// // // Mocking dependencies
// // // jest.mock('../server/middleware/verify/verifyToken', () => ({
// // //     verifyToken: jest.fn().mockImplementation((_, __, next) => {
// // //         // Mock your verifyToken middleware logic here
// // //         // You can modify res.locals in this function to include mock data for testing
// // //         next();
// // //     }),
// // // }));

// // // jest.mock('../server/middleware/verify/verifyParams', () => ({
// // //     verifyParams: jest.fn().mockImplementation((_, __, next) => {
// // //         // Mock your verifyParams middleware logic here
// // //         // You can modify req.params in this function to include mock data for testing
// // //         next();
// // //     }),
// // // }));

// // // jest.mock('../utils/handler', () => ({
// // //     success: jest.fn().mockImplementation(data => ({ success: true, data })),
// // // }));

// // // jest.mock('../utils/helper', () => ({
// // //     getValue: jest.fn().mockReturnValue('mockedJobValue'),
// // // }));

// // // // Mocking the JobApplication model methods
// // // jest.mock('../server/models/JobApplication', () => ({
// // //     find: jest.fn(),
// // // }));

// // // Dummy function for verifyToken middleware
// // const mockVerifyToken = (_, __, next) => {
// //     // Mock logic for verifyToken middleware
// //     // You can modify res.locals here if needed
// //     next(); // Call next to proceed to the next middleware or route handler
// // };

// // // Dummy function for verifyParams middleware
// // const mockVerifyParams = (_, __, next) => {
// //     // Mock logic for verifyParams middleware
// //     // You can modify req.params here if needed
// //     next(); // Call next to proceed to the next middleware or route handler
// // };

// // // Dummy implementation for getValue utility function
// // // const mockGetValue = () => {
// // //     // Mock logic for getValue function
// // //     // You can return a mock value here
// // //     return 'mockedJobValue';
// // // };


// // describe('GET /job/:job', () => {
// //     it('should return job applications for a given job', async () => {
// //         // Mocking data
// //         const mockJobApplications = [{ id: 1, name: 'Applicant 1' }, { id: 2, name: 'Applicant 2' }];
// //         (JobApplication.find as jest.Mock).mockImplementationOnce(() => ({
// //             exec: jest.fn().mockResolvedValueOnce(mockJobApplications),
// //         }));

// //         // Making the request
// //         const response = await request(app)
// //             .get('/job/someJobId')
// //             .set('Authorization', 'Bearer someMockToken');

// //         // Checking the response
// //         expect(response.status).toBe(200);
// //         expect(response.body).toEqual({ success: true, data: mockJobApplications });

// //         // Checking if dependencies were called with expected arguments
// //         expect(JobApplication.find).toHaveBeenCalledWith({ job: 'mockedJobValue' });
// //         expect(mockVerifyToken).toHaveBeenCalled();
// //         expect(mockVerifyParams).toHaveBeenCalled();
// //         expect(JobHandler.success).toHaveBeenCalledWith(mockJobApplications);
// //         expect(getValue).toHaveBeenCalled();
// //     });

// //     // Add more test cases for error scenarios, unauthorized access, etc.
// // });



// class AuthService {
//     private
//     constructor(private api) { }

//     async getTemperature(city: string): Promise<number> {
//         const response = await this.api.get(`/weather/${city}`);
//         return response.data.temperature;
//     }
// }

// test('get temperature', async () => {
//     const mockApi = {
//         get: jest.fn(() => Promise.resolve({ data: { temperature: 25 } })),
//     };
//     const weatherService = new WeatherService(mockApi);
//     const temperature = await weatherService.getTemperature('London');
//     expect(temperature).toBe(25);
// });