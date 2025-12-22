import * as React from 'react';
// import styles from './PropertyPaneWebpart.module.scss';
import type { IPropertyPaneWebpartProps } from './IPropertyPaneWebpartProps';
// import { escape } from '@microsoft/sp-lodash-subset';

const PropertyPaneWebpart:React.FC<IPropertyPaneWebpartProps>=(props)=>{
  return(
    <>
    <div>
      <strong>List Name :</strong>{props.ListName}
    </div>
    <div>
      <strong>Permisson  :</strong>{props.ToggleOptions?'ON':'OFF'}
    </div>
    <div>
      <strong>Department :</strong>{props.DropdownOptions}
    </div>
    <div>
      <strong>Gender :</strong>{props.GenderOptions}
    </div>
    <div>
      <strong>Score :</strong>{props.Score}
    </div>
    <div>
      <strong>Address :</strong>{props.Address}
    </div>
    </>
  )
}
export default PropertyPaneWebpart;
