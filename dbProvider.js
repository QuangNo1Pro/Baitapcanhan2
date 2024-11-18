const BASE_URL = 'http://matuan.online:2422';

export class dbProvider {
    static async fetch(queryString) {
        try {
            const [type, className, ...rest] = queryString.split('/');
            let url = `${BASE_URL}/api`; 
            let params = new URLSearchParams();
            
            // Xử lý pattern và query params
            if (rest.length > 0) {
                const [pattern, query] = rest[0].split('?');
                if (pattern) {
                    url += `/${encodeURIComponent(pattern)}`; 
                }
                if (query) {
                    params = new URLSearchParams(query); 
                }
            }

            if (!params.has('per_page')) params.set('per_page', '5');
            if (!params.has('page')) params.set('page', '1');
            
            
            switch(type) {
                case 'get':
                    switch(className) {
                        case 'Top50Movies': 
                            url = `${BASE_URL}/api/Top50Movies`; 
                            break;
                        case 'MostPopularMovies': 
                            url = `${BASE_URL}/api/MostPopularMovies`; 
                            break;
                        case 'Movies': 
                            url = `${BASE_URL}/api/Movies`; 
                            break;
                        default:
                            throw new Error(`Unknown className for 'get' type: ${className}`);
                    }
                    break;
                case 'search':
                    url = `${BASE_URL}/api/${className === 'movie' ? 'Movies' : 'Names'}`; 
                    break;
                case 'detail':
                    url = `${BASE_URL}/api/${className === 'movie' ? 'Movies' : 'Names'}/${rest[0] || ''}`; 
                    break;
                default:
                    throw new Error(`Unknown type: ${type}`);
            }

            const finalUrl = `${url}${params.toString() ? '?' + params.toString() : ''}`; // Sử dụng backticks cho finalUrl

            const response = await fetch(finalUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            return {
                search: rest[0]?.split('?')[0] || '',
                page: parseInt(params.get('page')),
                per_page: parseInt(params.get('per_page')),
                total_page: Math.ceil(data.length / parseInt(params.get('per_page'))),
                total: data.length,
                items: Array.isArray(data) ? data : [data]
            };
        } catch (error) {
            console.error('Error in fetch:', error);
            throw error;
        }
    }
}
