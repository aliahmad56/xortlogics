import axios from 'axios';

// Plzzzzzz Replace with your backend API base URL
const BASE_URL = 'http://localhost:4000'; 
const userApi = {

  searchUsers: async (searchTerm) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/search?query=${searchTerm}`);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw new Error('Failed to search users');
    }
  },  
};

export default userApi;
