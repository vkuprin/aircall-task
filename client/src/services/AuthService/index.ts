import { postApiData } from '../../utils/api';
import { signIn } from '../../constants/endpoints';

export interface AuthServiceType {
    username: string;
    password: string;
}

const AuthService = {
  async postSignIn({ username, password }: AuthServiceType) {
    if (!password) return;
    return await postApiData(
      signIn,
      {
        username,
        password,
      },
    );
  },
  async refreshTokenV2() {
    return await postApiData(
      `${signIn}/refresh-token-v2`,
      {
        refreshToken: localStorage.getItem('refreshToken'),
      },
    );
  },
};

export default AuthService;
