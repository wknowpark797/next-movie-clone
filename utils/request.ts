const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
	sf: `${BASE_URL}/discover/movie?api_key=${API_KEY}&languages=en-US&with_genres=878`,
};

export default requests;
