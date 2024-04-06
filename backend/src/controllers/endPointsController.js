
import User from '../models/user.js';

export const SendEndPoints = async (req, res) => {
    try {
        if (req.isAuthenticated() && req.user) {
            console.log('Authenticated username:', req.user.username);

            // Constructing the object to be added to the endpoints array
            const aplicLink = req.body.link+req.body.endpoint;
       
            const endpointData = {
                link: aplicLink,
                stat: 'Stable', // Assuming default stat
                history: [200,400,200,200,200,400,500,200] // Assuming an empty history array to start with
            };
            const user = await User.findOne({ username: req.user.username });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            } 
            const endpointExists = user.endpoints.some(endpoint => endpoint.link === endpointData.link);


            if (!endpointExists) {
                // Push the new endpointData into the endpoints array if it doesn't exist
                user.endpoints.push(endpointData);
                const updatedUser = await user.save();  // Save the updated user document
                console.log('Updated user with new endpoint:', updatedUser);
                res.status(200).json(updatedUser);
            } else {
                // Endpoint already exists, do nothing or handle accordingly
                console.log('Endpoint already exists, no update performed');
                res.status(200).json(user);  // You might want to return the original user document or a custom message
            }

        } else {
            console.log('User is not authenticated or req.user is undefined');
            res.status(401).json({ message: 'User is not authenticated' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(404).json({ message: error.message });
    }
};


export const GetEndPoints = async (req, res) => {
    try {
        console.log('Authenticated username:', req.user.username);
        const user = await User.findOne({ username: req.user.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Map over the user's endpoints and construct the desired structure
        const sendEndData = user.endpoints.map(endpoint => ({
            link: endpoint.link,
            username: req.user.username,
            stat: endpoint.stat
        }));
        console.log(sendEndData);   
        res.status(200).json(sendEndData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};
