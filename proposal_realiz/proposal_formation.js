import { create, findAll } from "../controllers/proposal.controller";
import { proposals } from "../models";
import proposalModel from "../models/proposal.model";

export default class proposal_formation{
    construnctor(){
        this.name=document.getElementById("prop_name");
        this.desc=document.getElementById("prop_name");
        this.contact=document.getElementById("prop_name");
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
        
              this.contactId =  res.data.Id;
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
