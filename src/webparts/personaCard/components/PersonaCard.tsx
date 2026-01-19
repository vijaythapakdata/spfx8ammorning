import * as React from 'react';
// import styles from './PersonaCard.module.scss';
import type { IPersonaCardProps } from './IPersonaCardProps';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import {GraphError,ResponseType} from "@microsoft/microsoft-graph-client";
import { Link, Persona, PersonaSize } from '@fluentui/react';
import { LivePersona} from "@pnp/spfx-controls-react/lib/LivePersona";
const PersonaCard:React.FC<IPersonaCardProps>=(props)=>{
  const [name,SetName]=React.useState<string>('');
  const [email,SetEmail]=React.useState<string>('');
  const [phone,SetPhone]=React.useState<string>('');
  const [image,setImage]=React.useState<string>('');

  React.useEffect(()=>{
    props.graphClient.api('me')
    .get((err:GraphError,user:MicrosoftGraph.User)=>{
      if(!err){
        SetName(user.displayName||'');
        SetEmail(user.mail||'');
        SetPhone(user.businessPhones?.[0]||'');
      }
    });
    props.graphClient.api('me/photo/$value')
    .responseType(ResponseType.BLOB)
    .get((er:GraphError,photoResponse:Blob)=>{
      const blobUrl=URL.createObjectURL(photoResponse);
      setImage(blobUrl);
    })
  },[props.graphClient]);
const renderEmail=():React.ReactNode=>{
  return email?<Link href={`mailto:${email}`}>{email}</Link>:<div/>
}
const renderPhone=():React.ReactNode=>{
  return phone?<Link href={`tel:${phone}`}>{phone}</Link>:<div/>
}
  return(
    <>
{/*     
    <Persona
    text={name}
    secondaryText={email}
    onRenderSecondaryText={renderEmail}
    tertiaryText={phone}
    onRenderTertiaryText={renderPhone}
    imageUrl={image}
size={PersonaSize.size100}
    /> */}

    <LivePersona upn="Vijay123@y5sx6.onmicrosoft.com"
        template={<>
          <Persona text={name}
            secondaryText={email}
            onRenderSecondaryText={renderEmail}
            tertiaryText={phone}
            onRenderTertiaryText={renderPhone}
            imageUrl={image}
            size={PersonaSize.size100} />
        </>}
        serviceScope={props.context.serviceScope} />
    </>
  )
}
export default PersonaCard;