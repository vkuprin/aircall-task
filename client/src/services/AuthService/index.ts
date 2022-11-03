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
};

export default AuthService;
