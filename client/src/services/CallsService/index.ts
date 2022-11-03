import { getApiData } from '../../utils/api';
import { calls } from '../../constants/endpoints';

const CallsService = {
  async getCalls() {
    const result = await getApiData(calls);
    return result?.nodes;
  },
};

export default CallsService;
