import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.flickr.com/services/rest/',
});
