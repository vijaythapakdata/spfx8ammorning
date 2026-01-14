import * as React from 'react';
// import styles from './GetAllUsers.module.scss';
import type { IGetAllUsersProps } from './IGetAllUsersProps';
import {MSGraphClientV3} from "@microsoft/sp-http";
import { DetailsList, PrimaryButton } from '@fluentui/react';
interface IUser{
  displayName:string;
  mail:string;
}
const GetAllUsers:React.FC<IGetAllUsersProps>=(props)=>{
  const [userState,setUserState]=React.useState<IUser[]>([]);

const getUsers=React.useCallback(()=>{
  props.graphClient
  .getClient('3')
  .then((msGraphClient:MSGraphClientV3)=>{
    msGraphClient.api('users').version('v1.0')
    .select('displayName,mail')
    .get((err,response)=>{
      if(err){
        console.error(err);
        return;
      }
      const allusers:IUser[]=response.value.map((result:any)=>({
        displayName:result.displayName,
        mail:result.mail
      }));
      setUserState(allusers);
    });
  });
},[props.graphClient]);
  return(
    <>
    <PrimaryButton
    text="Search" onClick={getUsers}
    iconProps={{iconName:'search'}}
    />
    <DetailsList
    
    items={userState}
    />
    </>
  )
}
export default GetAllUsers;
