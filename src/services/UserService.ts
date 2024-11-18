import api from "@/api";
import type { AxiosResponse } from "axios";

type SignInRequest = {
  email: string;
  password: string;
}

type SignInResponse = {
  token: string;
}

class UserService {
  async login(signInRequest: SignInRequest): Promise<SignInResponse> {
    const response: AxiosResponse = await api.post<SignInResponse>('/Auth/signIn', signInRequest);

    return response.data;
  }
}

export default UserService;
