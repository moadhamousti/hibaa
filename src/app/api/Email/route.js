// Exporting named function for GET request
export const GET = async (req, res) => {
    try {
        // Ensure req.body is properly parsed
        const body = await req.json();

        // Extract email from request body
        const { email } = body;

        // Ensure email is provided
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const url = 'https://mailcheck.p.rapidapi.com/';
        const queryParams = new URLSearchParams({ domain: email }); // Use the extracted email
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'mailcheck.p.rapidapi.com',
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            },
        };
      
        const response = await fetch(`${url}?${queryParams.toString()}`, options);
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Check if res object is defined and has status method
        if (res && typeof res.status === 'function') {
            res.status(200).json(data);
        } else {
            console.error('Response object is not defined or does not have a status method');
        }
    } catch (error) {
        console.error(error);
        
        // Check if res object is defined and has status method
        if (res && typeof res.status === 'function') {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error('Response object is not defined or does not have a status method');
        }
    }
}
