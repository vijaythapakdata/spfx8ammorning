import * as React from 'react';
// import styles from './Firstwebpart.module.scss';
import type { IFirstwebpartProps } from './IFirstwebpartProps';
import PanelItems from './Panel';
import { TabularForm } from './TabularForm';


const Firstwebpart:React.FC<IFirstwebpartProps>=(props)=>{
  return(
    <>
    <h1>hello world</h1>
    <br/>
    <PanelItems/>
    <TabularForm/>
    </>
  )
}
export default Firstwebpart;
