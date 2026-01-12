import { ILargeListState } from "../CommonMethod/IlaregListState";
import {sp,ICamlQuery} from "@pnp/sp/presets/all";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export class ServiceClassLargeList{
    constructor(context:WebPartContext){
        sp.setup({
            spfxContext:context as any
        });
    }
    //Method
    public async getLargeListItems(ListName:string):Promise<ILargeListState[]>{
        const allItems:ILargeListState[]=[];
        let position:any;
        do{

const camlQuery:ICamlQuery={
    ViewXml:
    `
    <View>
    <Query>
    <Where>
    <IsNotNull>
    <FieldRef Name='Title'/>
    </IsNotNull>
    </Where>
    </Query>
    <RowLimit Paged='TRUE'>5000</RowLimit>
    </View>
    
    `
}  ;

const response=await sp.web.lists.getByTitle(ListName).getItemsByCAMLQuery(camlQuery,position);
console.log(`Batched items ${response.length}`);
allItems.push(...response.map((item:any)=>({
    Title:item.Title
})));
}
        while(position){
            console.log(`Fetching items ${allItems.length}`);
            return allItems;

        }
    }
}