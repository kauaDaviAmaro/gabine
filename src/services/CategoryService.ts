import api from '@/api';
import type { Category } from '@/models/Category';
import type { AxiosResponse } from 'axios';

export default class CategoryService {
  static async getCategories(): Promise<AxiosResponse<Array<Category>>> {
    return await api.get('/category');
  }

  static async getCategoryById(id: string): Promise<AxiosResponse<Category>> {
    return await api.get(`/category/${id}`);
  }
}
