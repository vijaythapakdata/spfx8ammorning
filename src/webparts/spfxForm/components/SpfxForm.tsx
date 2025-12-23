import * as React from 'react';
// import styles from './SpfxForm.module.scss';
import type { ISpfxFormProps } from './ISpfxFormProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import {sp,Web} from "@pnp/sp/presets/all";
import { ISpfxFormState } from './ISpfxFormsState';
import { Dialog } from '@microsoft/sp-dialog';
import { PrimaryButton, Slider, TextField } from '@fluentui/react';
import {PeoplePicker,PrincipalType} from "@pnp/spfx-controls-react/lib/PeoplePicker";
const  SpfxForm:React.FC<ISpfxFormProps>=(props)=>{
  const[formdata,setFormData]=React.useState<ISpfxFormState>({
    Name:"",
    Age:"",
    Salary:"",
    Score:1,
    FullAddress:"",
    Email:"",
    Admin:"",
    AdminId:"",
    Manager:[],
    ManagerId:[]
  });
  React.useEffect(()=>{
    sp.setup({
      spfxContext:props.context as any
    });
    // createData();
  },[props.context,props.siteurl]);

  const createData=async()=>{
    try{
const web=Web(props.siteurl); //let 
await web.lists.getByTitle(props.ListName).items.add({
  Title:formdata.Name,
  Age:parseInt(formdata.Age),
  Salary:parseFloat(formdata.Salary),
  EmailAddress:formdata.Email,
  Address:formdata.FullAddress,
  Score:formdata.Score,
  AdminId:formdata.AdminId,
  ManagerId:{results:formdata.ManagerId}
});
Dialog.alert("Data created Successffullly");
setFormData({
   Name:"",
    Age:"",
    Salary:"",
    Score:1,
    FullAddress:"",
    Email:"",
     Admin:"",
    AdminId:"",
    Manager:[],
    ManagerId:[]
});
    }
    catch(err){
console.log("Error in creating data",err);
    }
  }
  //form event 
  const handleChange=(fielValue:keyof ISpfxFormState,value:string|number|boolean):void=>{
    setFormData(prev=>({...prev,[fielValue]:value})); //[1,2,3,4,5],[...a[2,3]]
  }
  //get admins
  const _getPeoplePickerItems=(items: any[]) =>{
    if(items.length>0){
      setFormData(prev=>({...prev,Admin:items[0].text,AdminId:items[0].id}))
    }
    else{
      setFormData(prev=>({...prev,Admin:"",AdminId:""}))
    }
  console.log('Items:', items);
}
//get manager
const _getManagerPeoplePickerItems=(items: any[]) =>{
const managersName=items.map((i:any)=>i.text);
const managersId=items.map((i:any)=>i.id);
setFormData(prev=>({...prev,Manager:managersName,ManagerId:managersId}))

}
  return(
    <>
    <TextField
    label='Name'
    value={formdata.Name}
    onChange={(e,v)=>handleChange("Name",v||"")}
    />
     <TextField
    label='Email Address'
    value={formdata.Email}
    onChange={(e,v)=>handleChange("Email",v||"")}
    />
     <TextField
    label='Age'
    value={formdata.Age}
    onChange={(e,v)=>handleChange("Age",v||"")}
    />
     <TextField
    label='Salary'
    value={formdata.Salary}
    onChange={(e,v)=>handleChange("Salary",v||"")}
    prefix='$'
    />
    <Slider
    label='Score'
    value={formdata.Score}
    onChange={(v)=>handleChange("Score",v)}
    max={100}
    step={1}
    />
     <TextField
    label='Full Address'
    value={formdata.FullAddress}
    onChange={(e,v)=>handleChange("FullAddress",v||"")}
    multiline
    rows={5}
    />
    {/* People Picker */}
    <PeoplePicker
    context={props.context as any}
    titleText="Admin"
    personSelectionLimit={1}
    showtooltip={true}
    onChange={_getPeoplePickerItems}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    ensureUser={true}
    defaultSelectedUsers={[formdata.Admin?formdata.Admin:""]}
    webAbsoluteUrl={props.siteurl}
    
    />

    <PeoplePicker
    context={props.context as any}
    titleText="Managers"
    personSelectionLimit={2}
    showtooltip={true}
    onChange={_getManagerPeoplePickerItems}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000}
    ensureUser={true}
    defaultSelectedUsers={formdata.Manager}
    webAbsoluteUrl={props.siteurl}
    
    />
    <br/>
    <PrimaryButton
    text="Submit"
    onClick={createData}
    iconProps={{iconName:'save'}}
    />
    </>
  )
}
export default  SpfxForm;
