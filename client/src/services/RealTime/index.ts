import Pusher from 'pusher-js';
import { getUserToken, HOST } from '../../utils/api';

const APP_KEY = 'd44e3d910d38a928e0be';
const APP_CLUSTER = 'eu';
const APP_AUTH_ENDPOINT = `${HOST}pusher/auth`;

const pusher = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER,
  authEndpoint: APP_AUTH_ENDPOINT,
  auth: {
    headers: {
      Authorization: `Bearer ${getUserToken()}`,
    },
  },
});

export default pusher;
