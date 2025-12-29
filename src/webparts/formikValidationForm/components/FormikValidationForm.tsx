import * as React from 'react';
import styles from './FormikValidationForm.module.scss';
import type { IFormikValidationFormProps } from './IFormikValidationFormProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { FormikService } from '../../../FormikServiceApi/service';
import {sp} from "@pnp/sp/presets/all";
import * as Yup from 'yup';
import { Formik,FormikProps } from 'formik';
const FormikValidationForm:React.FC<IFormikValidationFormProps>=(props)=>{
  const [service,setService]=React.useState<ReturnType<typeof FormikService>|null>(null);
  React.useEffect(()=>{
    sp.setup({
      spfxContext:props.context as any
    });
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
  
  return(
    <></>
  )
}
export default FormikValidationForm;