import * as React from 'react';
import styles from './FormikValidationForm.module.scss';
import type { IFormikValidationFormProps } from './IFormikValidationFormProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { FormikService } from '../../../FormikServiceApi/service';
import {sp} from "@pnp/sp/presets/all";
import * as Yup from 'yup';
import { Formik,FormikProps } from 'formik';
import { Dialog } from '@microsoft/sp-dialog';
import { DatePicker, Dropdown, Label, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
const stackTokens={childrenGap:8}
const FormikValidationForm:React.FC<IFormikValidationFormProps>=(props)=>{
  const [service,setService]=React.useState<ReturnType<typeof FormikService>|null>(null);
  React.useEffect(()=>{
    sp.setup({
      spfxContext:props.context as any
    });
    setService(FormikService());
  },[props.context]);
  const validationSchema=Yup.object().shape({
    name:Yup.string().required("Task name is required"),
    details:Yup.string().min(15,"Minimum 15 or more characters are required").required("Task details are required"),
    startDate:Yup.date().required("Start date is required"),
    endDate:Yup.date().required("End date is required"),
    emailAddress:Yup.string().email("Invalid email").required("Email Address is required"),
    phoneNumber:Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/,"phone number must be 10 digits"),
    projectName:Yup.string().required("Project Name is required")
  });
  //event 
  const getFieldProps=(formik:FormikProps<any>,field:string)=>({
    ...formik.getFieldProps(field),errorMessage:formik.errors[field] as string
  });
  // create record
  const createRecord=async(record:any)=>{
try{
  if(!service) return;
const item=await service?.createItems(props.ListName,{
  Title:record.name,
  StartDate:record.startDate,
  EndDate:record.endDate,
  EmailAddress:record.emailAddress,
  PhoneNumber:record.phoneNumber,
  ProjectName:record.projectName,
  TaskDetails:record.details
});
console.log("Items",item);
Dialog.alert("Items have been sucessfully saved");
}
catch(err){
  console.error(err);
  Dialog.alert("Error occurred while creating the items");

}
  }

  return(
    <>
    <Formik
       initialValues={{
        name:"",
        startDate:null,
        endDate:null,
        emailAddress:"",
        phoneNumber:"",
        projectName:"",
        details:""
       }}
       validationSchema={validationSchema}
      onSubmit={(values,helpers)=>{
        createRecord(values).then(()=>helpers.resetForm())
      }}
     >
{(formik:FormikProps<any>)=>(
  <form onSubmit={formik.handleSubmit}>
    <div className={styles.formikValidationForm}>
      <Stack tokens={stackTokens}>
<Label className={styles.lbl}>User Name</Label>
<PeoplePicker
context={props.context as any}
personSelectionLimit={1}
disabled={true}
ensureUser={true}
principalTypes={[PrincipalType.User]}
defaultSelectedUsers={[props.context.pageContext.user.displayName as any]}
webAbsoluteUrl={props.siteurl}
/>
<Label className={styles.lbl}>Task Name</Label>
<TextField
{...getFieldProps(formik,'name')}
/>
<Label className={styles.lbl}>Email Address</Label>
<TextField
{...getFieldProps(formik,'emailAddress')}
/>
<Label className={styles.lbl}>Phone Number</Label>
<TextField
{...getFieldProps(formik,'phoneNumber')}
/>
<Label className={styles.lbl}>Project Name</Label>
<Dropdown
options={[
  {key:'Project 1',text:'Project 1'},
  {key:'Project 2',text:'Project 2'}
]}
selectedKey={formik.values.projectName}
onChange={(_,options)=>formik.setFieldValue('projectName',options?.key)}
errorMessage={formik.errors.projectName as string}
/>
<Label className={styles.lbl}>Start Date</Label>
<DatePicker
value={formik.values.startDate}
textField={{...getFieldProps(formik,'startDate')}}
onSelectDate={(date)=>formik.setFieldValue('startDate',date)}
/>
<Label className={styles.lbl}>End Date</Label>
<DatePicker
value={formik.values.endDate}
textField={{...getFieldProps(formik,'endDate')}}
onSelectDate={(date)=>formik.setFieldValue('endDate',date)}
/>
<Label className={styles.lbl}>Task Details</Label>
<TextField
{...getFieldProps(formik,'details')}
rows={5}
multiline
/>
      </Stack>
      <PrimaryButton
      className={styles.btn}
      type='submit'
      text='Submit'
      iconProps={{iconName:'save'}}
      />
      <PrimaryButton
      className={styles.btn}
      text='Cancel'
      iconProps={{iconName:'cancel'}}
      onClick={formik.handleReset as any}
      />
    </div>


  </form>
)}


     </Formik>
    
    </>
  )
}
export default FormikValidationForm;