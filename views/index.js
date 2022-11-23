const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  function htmlizeResponse(res) {
    return `<div class="alert alert-secondary mt-2" role="alert"><pre>` + JSON.stringify(res, null, 2) + "</pre></div>";
  }
  
  async function getAllData() {
    let resultElement = document.getElementById("getResult");
    resultElement.innerHTML = "";
  
    try {
      const res = await instance.get("/contacts");
  
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
  
      resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
      resultElement.innerHTML = htmlizeResponse(err);
    }
  }
  
  async function getDataById() {
    let resultElement = document.getElementById("getResult");
    resultElement.innerHTML = "";
  
    const id = document.getElementById("get-id").value;
  
    if (id) {
      try {
        const res = await instance.get(`/contacts/${id}`);
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
  
        resultElement.innerHTML = htmlizeResponse(result);
      } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err);
      }
    }
  }
  
  async function getDataByName() {
    let resultElement = document.getElementById("getResult");
    resultElement.innerHTML = "";
  
    const name = document.getElementById("get-title").value;
  
    if (title) {
      try {
        // const res = await instance.get(`/contacts?title=${title}`);
        const res = await instance.get("/contacts", {
          params: {
            name: name
          }
        });
  
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
  
        resultElement.innerHTML = htmlizeResponse(result);
      } catch (err) {
        resultElement.innerHTML = htmlizeResponse(err);
      }
    }
  }
  
  async function postData() {
    let resultElement = document.getElementById("postResult");
    resultElement.innerHTML = "";
  
    const name = document.getElementById("post-name").value;
    const email = document.getElementById("post-email").value;
    const phone = document.getElementById("post-phone").value;
    const type = document.getElementById("post-type").value;
  
    try {
      const res = await instance.post("/contacts", {
        name: name,
        email: email,
        phone: phone,
        type: type
      });
  
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
  
      resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
      resultElement.innerHTML = htmlizeResponse(err);
    }
  }
  
  async function putData() {
    let resultElement = document.getElementById("putResult");
    resultElement.innerHTML = "";
  
    const id = document.getElementById("put-id").value;
    const name = document.getElementById("put-name").value;
    const email = document.getElementById("put-email").value;
    const phone = document.getElementById("put-phone").value;
    const type = document.getElementById("put-type").value;
  
    try {
      const res = await instance.put(`/contacts/${id}`, {
        name: name,
        email: email,
        phone: phone,
        type: type
      });
  
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
  
      resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
      resultElement.innerHTML = htmlizeResponse(err);
    }
  }
  
  async function deleteAllData() {
    let resultElement = document.getElementById("deleteResult");
    resultElement.innerHTML = "";
  
    try {
      const res = await instance.delete("/contacts");
  
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
  
      resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
      resultElement.innerHTML = htmlizeResponse(err);
    }
  }
  
  async function deleteDataById() {
    let resultElement = document.getElementById("deleteResult");
    resultElement.innerHTML = "";
  
    const id = document.getElementById("delete-id").value;
  
    try {
      const res = await instance.delete(`/contacts/${id}`);
  
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
  
      resultElement.innerHTML = htmlizeResponse(result);
    } catch (err) {
      resultElement.innerHTML = htmlizeResponse(err);
    }
  }
  
  function clearGetOutput() {
    document.getElementById("getResult").innerHTML = "";
  }
  
  function clearPostOutput() {
    document.getElementById("postResult").innerHTML = "";
  }
  
  function clearPutOutput() {
    document.getElementById("putResult").innerHTML = "";
  }
  
  function clearDeleteOutput() {
    document.getElementById("deleteResult").innerHTML = "";
  }

  async function submitContact() {  
    const name = document.getElementById("contName").value;
    const email = document.getElementById("contEmail").value;
    const phone = document.getElementById("contPhone").value;
    const type = document.getElementById("contTypeGrom").checked ?
        document.getElementById("contTypeGrom").value :
        document.getElementById("contTypeVol").value;
  
    try {
      const res = await instance.post("/contacts", {
        name: name,
        email: email,
        phone: phone,
        type: type
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getContactByData(email = "", phone = "") { 
    if (!email) {
      try {
        const res = await instance.get("/contacts", {
          params: {
            phone: phone
          }
        });
        return res;
      } catch (err) {
        console.log(err);
      }
    }
    else if (!phone) {
      try {
        const res = await instance.get("/contacts", {
          params: {
            email: email
          }
        });
        return res;
      } catch (err) {
        console.log(err);
      }
    }
    else {
      try {
        const res = await instance.get("/contacts", {
          params: {
            email: email,
            phone: phone
          }
        });
        return res.data[0];
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function submitProposal() {
    const name = document.getElementById("propTitle").value;
    const email = document.getElementById("propEmail").value;
    const phone = document.getElementById("propPhone").value;
    const text = document.getElementById("propBody").value;
    const file = document.getElementById("propFile").value;
    
    try {
      const contact = await getContactByData(email, phone);
      if (contact.id == undefined) {
        throw new Error();
      }

      const res = await instance.post("/proposals", {
        name: name,
        description: text,
        contactId: contact.id
      });
  
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }