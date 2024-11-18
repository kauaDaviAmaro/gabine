import api from '@/api'
import type { AxiosResponse } from 'axios'

class AddressService {
  async getAddresses(): Promise<AxiosResponse> {
    const response: AxiosResponse = await api.get('/Address');

    return response.data;
  }
}

export default AddressService;
