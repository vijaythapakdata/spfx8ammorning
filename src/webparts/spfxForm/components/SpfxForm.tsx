import * as React from 'react';
// import styles from './SpfxForm.module.scss';
import type { ISpfxFormProps } from './ISpfxFormProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import {sp,Web} from "@pnp/sp/presets/all";
import { ISpfxFormState } from './ISpfxFormsState';
import { Dialog } from '@microsoft/sp-dialog';
import { PrimaryButton, Slider, TextField } from '@fluentui/react';
const  SpfxForm:React.FC<ISpfxFormProps>=(props)=>{
  const[formdata,setFormData]=React.useState<ISpfxFormState>({
    Name:"",
    Age:"",
    Salary:"",
    Score:1,
    FullAddress:"",
    Email:""
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
  Score:formdata.Score
});
Dialog.alert("Data created Successffullly");
setFormData({
   Name:"",
    Age:"",
    Salary:"",
    Score:1,
    FullAddress:"",
    Email:""
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
