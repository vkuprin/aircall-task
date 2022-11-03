import { getApiData, postApiData, putApiData } from '../../utils/api';
import { calls } from '../../constants/endpoints';

const CallsService = {
  async getCalls() {
    const result = await getApiData(calls);
    return result?.nodes;
  },

  async createNote(id: number, body: object) {
    await postApiData(`${calls}/${id}/archive`, body);
  },

  async archiveCall(id: string) {
    await putApiData(`${calls}/${id}/archive`);
  },
};

export default CallsService;
