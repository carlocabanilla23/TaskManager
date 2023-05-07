class coreHTTP {

  // Make an HTTP GET request
  async get(url) {
    const res = await fetch(url);
    if (res.status >= 200 && res.status <= 299) {
      return res.json();
    } else {
      throw Error(res.status);
    }
  }

  // Make an HTTP POST request
  async post(url, data) {
    const res = await fetch(url,{
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(data)
    });
  
  
    if (res.status >= 400) {
      throw Error(res.status)
    }

  }

 
  // Make an HTTP PUT request
  async put (url,data) {
    const res = await fetch(url, {
      method: "PUT",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(data)
    });
    if (res.status >= 400) {
      throw Error(res.status)
    }
  };

  async patch (url,data) {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(data)
    });
    if (res.status >= 400) {
      throw Error(res.status)
    }
  };

  // Make an HTTP DELETE request
  async delete (url) {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {"Content-type": "application/json"}
    });
    if (res.status >= 200 && res.status <= 299) {
      return "User deleted...";
    } else {
      throw new Error(res.statusText);
    }
  };
}  // End of class
