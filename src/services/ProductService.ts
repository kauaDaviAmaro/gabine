import api from '@/api'
import type { Product } from '@/models/Products'
import type { AxiosResponse } from 'axios'

export default class ProductService {
  static async getProducts(
    search: string | null = null,
    categoryId: string | null = null,
  ): Promise<AxiosResponse<Array<Product>>> {
    return await api.get('/product', {
      params: {
        search,
        categoryId,
      },
    })
  }

  static async createProduct(product: Product): Promise<AxiosResponse<Product>> {
    return await api.post('/product', product)
  }

  static async updateProduct(product: Product): Promise<AxiosResponse<Product>> {
    return await api.put(`/product/${product.id}`, product)
  }

  static async deleteProduct(id: string): Promise<AxiosResponse<Product>> {
    return await api.delete(`/product/${id}`)
  }

  static async getProductById(id: string): Promise<AxiosResponse<Product>> {
    return await api.get(`/product/${id}`)
  }

  static async uploadProductImage(id: string, imageUrl: string): Promise<AxiosResponse<Product>> {
    return await api.put(`/product/${id}/image`, { imageUrl })
  }
}
