import { create, findAll } from "../controllers/proposal.controller";
import { proposals } from "../models";
import proposalModel from "../models/proposal.model";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

export default class proposal_formation{
    construnctor(){
        this.name=document.getElementById("prop_name").value;
        this.desc=document.getElementById("prop_desc").value;
        this.contact=document.getElementById("prop_contact").value;
        this.getIdByName();
    }

    async getIdByName(){      
        if (this.name) {
            try {
              const res = await instance.get("/contacts", {
                params: {
                  name: this.name
                }
              });
        
              const result = {
                status: res.status + "-" + res.statusText,
                headers: res.headers,
                data: res.data,
              };
        
              this.contactId =  res.data[0].Id;
            } catch (err) {
                console.log(err);
            }
        }
    }

    async insertProposition(){
        try {
            const res = await instance.post("/proposals", {
              name: this.name,
              description: this.desc,
              contactId: this.contactId
            });
        
            const result = {
              status: res.status + "-" + res.statusText,
              headers: res.headers,
              data: res.data,
            };
        
          } catch (err) {
            console.log(err);
          }
    }
}
