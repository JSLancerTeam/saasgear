import Axios from 'axios';

export default Axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
