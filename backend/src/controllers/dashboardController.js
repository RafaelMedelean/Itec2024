
export const accoutInfo =async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}


export const allAplications = async (req, res) => {
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

// Compare this snippet from Itec2024/backend/src/controllers/userController.js:    


// Compare this snippet from Itec2024/backend/src/controllers/userController.js:    