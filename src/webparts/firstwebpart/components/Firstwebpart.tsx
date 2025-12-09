import * as React from 'react';
// import styles from './Firstwebpart.module.scss';
import type { IFirstwebpartProps } from './IFirstwebpartProps';
import PanelItems from './Panel';


const Firstwebpart:React.FC<IFirstwebpartProps>=(props)=>{
  return(
    <>
    <h1>hello world</h1>
    <br/>
    <PanelItems/>
    </>
  )
}
export default Firstwebpart;
