export class HttpClient {
    constructor(accessToken) {
      this.accessToken = accessToken; 
    }
  
    async post(url, body) {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
      
        if (!res.ok) {
          throw new Error(`POST failed: ${res.status} ${res.statusText}`);
        }
      
        return await res.json();
      }
      
  
      async get(url) {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        });
      
        if (!res.ok) {
          throw new Error(`GET failed: ${res.status} ${res.statusText}`);
        }
      
        return await res.json();
      }
      
  
    async delete(url) {
        const res = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        });
      
        if (!res.ok) {
          throw new Error(`DELETE failed: ${res.status} ${res.statusText}`);
        }
      
        return null;
      }

      async listDocuments(url) {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        });
      
        if (!res.ok) {
          throw new Error(`listDocuments failed: ${res.status} ${res.statusText}`);
        }
      
        const data = await res.json();
      
        return {
          documents: data.documents || []
        };
      }
      
      
  }
  