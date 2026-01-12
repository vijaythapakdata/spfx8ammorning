import * as React from 'react';
// import styles from './LargeList.module.scss';
import type { ILargeListProps } from './ILargeListProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { ILargeListState } from '../../../CommonMethod/IlaregListState';
import { ServiceClassLargeList } from '../../../ServiceApi/LargeListServiceApi';
import { DetailsList } from '@fluentui/react';
const LargeList:React.FC<ILargeListProps>=(props)=>{
  const [listItems,setListItems]=React.useState<ILargeListState[]>([]);
  const _service =React.useMemo(()=>{
    return new ServiceClassLargeList(props.context)
  },[props.context]);

  React.useEffect(()=>{
    const fetchData=async()=>{
      try{
const result=await _service.getLargeListItems(props.ListName);
setListItems(result);
      }
      catch(err){
console.log(`Errror occcurred while reading the items`,err);
throw err;
      }
    }
    fetchData();
  },[props.ListName,props.context]);
  return(
    <>
    <DetailsList
    items={listItems}
    />
    </>
  )
}
export default LargeList;