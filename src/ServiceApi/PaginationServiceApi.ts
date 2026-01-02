import {sp} from "@pnp/sp/presets/all";
import { IPaginationState } from "../CommonMethod/IPaginationState";

export default class PaginationService{
    public static async getPaginationItems(ListName:string):Promise<IPaginationState[]>{
        try{
const data=await sp.web.lists.getByTitle(ListName).items.select("Id","Title","EmailAddress","Age","Admin/Title","City/Title")
.expand("Admin","City").get();
return data.map(e=>({
   key:e.Id,
   Title:e.Title,
   EmailAddress:e.EmailAddress,
   Age:e.Age,
   Admin:e.Admin?.Title,
   City:e.City?.Title 
}));
        }
        catch(err){
console.error("Error while fetching the items",err);
return [];
        }
    }
}