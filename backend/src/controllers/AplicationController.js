import Aplication from '../models/aplication.js';

export const sendAplication = async (req, res) => {
    try {
        if (req.isAuthenticated() && req.user) {
            console.log('Authenticated username:', req.user.username);

            // Check if an application with the provided link already exists
            const existingApplication = await Aplication.findOne({ link: req.body.link });

            if (existingApplication) {
                // Check if the current user is already listed in the developers array
                const isDeveloper = existingApplication.developers.includes(req.user.username);
                
                if (isDeveloper) {
                    // User is already a developer, return an error message
                    return res.status(409).json({ message: 'Application already exists for this user' });
                } else {
                    // User is not a developer, add the user to the developers array
                    existingApplication.developers.push(req.user.username);
                    await existingApplication.save();
                    return res.status(200).json({ message: 'User added to existing application', application: existingApplication });
                }
            } else {
                // Application doesn't exist, create a new one
                const newAplicationData = {
                    developers: [req.user.username], // Adding the current user's username to the developers array
                    link: req.body.link, // Setting the application link from the request body
                    status: 'Stable', // Default status
                    endpoints: [] // Assuming no endpoints to start with
                };
                
                // Creating a new application document
                const newAplication = new Aplication(newAplicationData);

                // Saving the new application document to the database
                await newAplication.save();

                console.log('New application added:', newAplication);
                res.status(201).json(newAplication);
            }
        } else {
            console.log('User is not authenticated or req.user is undefined');
            res.status(401).json({ message: 'User is not authenticated' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message }); // Server error
    }
};


export const getAplication = async (req, res) => {
    try {
        console.log('Authenticated username:', req.user.username);
        // Find all applications where the current user is listed in the developers array
        const applications = await Aplication.find({ developers: req.user.username });

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for the user' });
        }
    // console.log(applications);
        // Extract the links from the applications and send them as an array
        const applicationLinks = applications.map(application => application.link);
        res.status(200).json(applicationLinks);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

export const addEndpoint = async (req, res) => {
    try {
        if (req.isAuthenticated() && req.user) {
            console.log('Authenticated username:', req.user.username);
            console.log('Request body:', req.body.applicationLink);
            // Constructing the object to be added to the endpoints array
     
            const endpointData = {
                endpoint: req.body.endpoint, // Use just the endpoint part as the link
                stat: 'Stable', // Assuming default stat
                history: [] // Assuming an initial history array
            };

            // Find the application by its link
            const application = await Aplication.findOne({ link: req.body.applicationLink });
            // console.log("appfound:"+ application);
            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
            }

            // Check if the endpoint already exists in the application
          //  const endpointExists= 0;
             const endpointExists = application.endpoints.some(endpoint => endpoint.link === endpointData.endpoint);

            if (endpointExists) {
                return res.status(409).json({ message: 'Endpoint already exists in this application' });
            }

            // If the endpoint doesn't exist, add it to the application's endpoints array
            application.endpoints.push(endpointData);

            // Save the updated application document
            await application.save();
// console.log("app:"+application);
            res.status(201).json({ message: 'Endpoint added successfully', application });
        } else {
            console.log('User is not authenticated or req.user is undefined');
            res.status(401).json({ message: 'User is not authenticated' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message }); // Use 500 for server errors
    }
};

export const getAplicationall = async (req, res) => {
    try {
        console.log('Authenticated username:', req.user.username);
        // Find all applications where the current user is listed in the developers array
        const applications = await Aplication.find({ developers: req.user.username });

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for the user' });
        }

        // Send the entire applications including their endpoints
        res.status(200).json(applications);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};
