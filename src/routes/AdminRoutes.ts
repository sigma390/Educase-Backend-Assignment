import { Router } from 'express';
import School from '../database/db'; // Assuming this exports the School model
import ShortestDistance from '../utils/SortAlgo';
const router = Router();

// Add School Endpoint
router.post('/addSchool', async (req: any, res: any) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate required fields
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newSchool = new School({
      name,
      address,
      latitude,
      longitude,
    });

    // Save the new school to the database
    const savedSchool = await newSchool.save();

    // Return the newly created school
    return res
      .status(201)
      .json({ message: 'School added successfully', school: savedSchool });
  } catch (err) {
    // Log and return an error response
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Error adding school', error: (err as Error).message });
  }
});

//=====================> Sorting Algorithm to get Nearest School <========================

router.get('/listSchools', async (req: any, res: any) => {
  const { usrlatitude, usrlongitude } = req.query;
  const userlatitude = parseFloat(usrlatitude);
  const userlongitude = parseFloat(usrlongitude);
  if (!userlatitude || !userlongitude) {
    throw new Error('Please provide both latitude and longitude');
  }

  try {
    const schools = await School.find();

    // Calculate distance for each school and sort by proximity
    const sortedSchools = schools
      .map((school: any) => ({
        ...school.toObject(),
        distance: ShortestDistance(
          userlatitude,
          userlongitude,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a: any, b: any) => a.distance - b.distance); // Sort by distance
    // Return the sorted list of schools
    return res.status(200).json(sortedSchools);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error fetching schools',
      error: (error as Error).message,
    });
  }
});

export default router;

// router.post('/addSchools', async (req: any, res: any) => {
//   const dummySchools = [
//     {
//       id: 2,
//       name: 'Springfield Academy',
//       address: '456 Elm St',
//       latitude: 41.7128,
//       longitude: -75.006,
//     },
//     {
//       id: 3,
//       name: 'Riverside Secondary',
//       address: '789 Oak St',
//       latitude: 42.7128,
//       longitude: -76.006,
//     },
//     {
//       id: 4,
//       name: 'Pinehill School',
//       address: '101 Pine St',
//       latitude: 43.7128,
//       longitude: -77.006,
//     },
//     {
//       id: 5,
//       name: 'Maple Valley High',
//       address: '202 Maple St',
//       latitude: 44.7128,
//       longitude: -78.006,
//     },
//     {
//       id: 6,
//       name: 'Cedarwood Institute',
//       address: '303 Cedar St',
//       latitude: 45.7128,
//       longitude: -79.006,
//     },
//     {
//       id: 7,
//       name: 'Sunrise Academy',
//       address: '404 Sunrise St',
//       latitude: 46.7128,
//       longitude: -80.006,
//     },
//     {
//       id: 8,
//       name: 'Oceanview High',
//       address: '505 Ocean St',
//       latitude: 47.7128,
//       longitude: -81.006,
//     },
//     {
//       id: 9,
//       name: 'Hilltop High School',
//       address: '606 Hilltop St',
//       latitude: 48.7128,
//       longitude: -82.006,
//     },
//     {
//       id: 10,
//       name: 'Victory School',
//       address: '707 Victory St',
//       latitude: 49.7128,
//       longitude: -83.006,
//     },
//   ];

//   try {
//     // Insert multiple schools with IDs 1 to 10 into MongoDB
//     const schools = await School.insertMany(dummySchools);
//     res
//       .status(201)
//       .json({ message: 'Dummy schools added successfully', schools });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       message: 'Error adding dummy schools',
//       error: (err as Error).message,
//     });
//   }
// });
