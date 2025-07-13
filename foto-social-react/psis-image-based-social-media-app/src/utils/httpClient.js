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
        const errorText = await res.text();
        console.error("Firestore error response:", errorText);
        throw new Error(`POST failed: ${res.status} ${res.statusText} - ${errorText}`);
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

      async patch(url, body) {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error(`PATCH failed: ${response.status} ${response.statusText}`);
        return response.json();
      }

      async put(url, body) {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
    
        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`HTTP PUT failed: ${response.status} ${response.statusText} - ${errorBody}`);
        }
    
        return response.json();
      }

      async putBinary(url, binaryBody, contentType = 'application/octet-stream') {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': contentType
          },
          body: binaryBody
        });
      
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`PUT Binary failed: ${response.status} ${response.statusText} - ${errorText}`);
        }
      
        const json = await response.json();

        return json.downloadTokens;
      }
      
      
      async putJson(url, jsonBody) {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBody),
        });
      
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`PUT JSON failed: ${response.status} ${response.statusText} - ${errorText}`);
        }
      
        return await response.json();
      }
      
    }

    
  