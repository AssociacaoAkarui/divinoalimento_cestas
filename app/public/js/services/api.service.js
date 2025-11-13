class ApiService {
  static async request(url, options = {}) {
    try {
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const config = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers,
        },
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  static async get(url, options = {}) {
    return this.request(url, {
      method: 'GET',
      ...options,
    });
  }

  static async post(url, body, options = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  static async put(url, body, options = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  static async delete(url, options = {}) {
    return this.request(url, {
      method: 'DELETE',
      ...options,
    });
  }
}
