import { getApiData, postApiData, putApiData } from '../../utils/api';
import { calls, currentUser } from '../../constants/endpoints';

const CallsService = {
  async getCalls({ offset, limit }: { offset: number; limit: number }) {
    const result = await getApiData(`${calls}?offset=${offset}&limit=${limit}`);
    return result;
  },

  async createNote(id: number, body: object) {
    return await postApiData(`${calls}/${id}/archive`, body);
  },

  async archiveCall(id: string) {
    return await putApiData(`${calls}/${id}/archive`);
  },

  async myself() {
    return await getApiData(currentUser);
  },
};

export default CallsService;
