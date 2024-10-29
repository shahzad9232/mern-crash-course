export const apiRequest = async (endpoint, method, body = null) => {
    try {
        // Use the full endpoint URL directly
        const response = await fetch(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            // Handle non-200 responses
            const errorText = await response.text();
            throw new Error(`${response.status}: ${errorText}`);
        }

        // If the response is ok, parse the JSON
        return await response.json();
    } catch (error) {
        console.error('API Request failed:', error);
        throw error; // Rethrow the error to handle it where it's called
    }
};
