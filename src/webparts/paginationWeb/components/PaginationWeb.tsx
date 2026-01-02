import * as React from 'react';
// import styles from './PaginationWeb.module.scss';
import type { IPaginationWebProps } from './IPaginationWebProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import {Table ,Input} from 'antd';
import {sp} from "@pnp/sp/presets/all";
import PaginationService from '../../../ServiceApi/PaginationServiceApi';
const PaginationWeb:React.FC<IPaginationWebProps>=(props)=>{
  const [items,setItems]=React.useState<any[]>([]);
  const[searchtext,setSearchText]=React.useState<string>('');

  React.useEffect(()=>{
    sp.setup({
      spfxContext:props.context as any
    });
    PaginationService.getPaginationItems(props.ListName)
    .then((response)=>setItems(response))
    .catch((err)=>console.error("Errorr while fetching the items",err));
  },[props.context]);
  const columns=[
    {
      title:"Name",
      dataIndex:"Title",
      key:"Title",
      sorter:(a:any,b:any)=>(a.Title||"").localeCompare(b.Title||"")
    },
    {
      title:"Email Address",
      dataIndex:"EmailAddress",
      key:"EmailAddress",
       sorter:(a:any,b:any)=>(a.EmailAddress||"").localeCompare(b.EmailAddress||"")
    },
    {
      title:"Age",
      dataIndex:"Age",
      key:"Age",
      sorter:(a:any,b:any)=>(a.Age||0)-(b.Age||0)
    },
    {
        title:"Admin",
      dataIndex:"Admin",
      key:"Admin",
       sorter:(a:any,b:any)=>(a.Admin||"").localeCompare(b.Admin||"")

    },
    {
        title:"City",
      dataIndex:"City",
      key:"City",
       sorter:(a:any,b:any)=>(a.City||"").localeCompare(b.City||"")
    }
  ];

  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchText(e.target.value);
  };
  const hanldingEmptyrowsSearch=items.filter((item)=>(item?.Title?.toLowerCase()||"").includes(searchtext.toLowerCase())||
(item?.EmailAddress?.toLowerCase()||"").includes(searchtext.toLowerCase())||(item?.Admin?.toLowerCase()||"").includes(searchtext.toLowerCase())
||(item?.City?.toLowerCase()||"").includes(searchtext.toLowerCase())
)
  return(
    <>
    <Input
    placeholder="search here..."
    value={searchtext}
    onChange={handleSearch}
    style={{marginBottom:20}}
    />
    <Table
    dataSource={hanldingEmptyrowsSearch}
    columns={columns}
    pagination={{pageSize:5}}
    />
    </>
  )
}
export default PaginationWeb
