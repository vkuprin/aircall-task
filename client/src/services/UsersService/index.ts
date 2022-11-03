import { getApiData } from '../../utils/api';
import { calls } from '../../constants/endpoints';

const UsersService = {
  async getCalls() {
    return getApiData(
      calls,
    );
  },
};

export default UsersService;
