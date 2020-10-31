import React,{useState,useEffect } from 'react'
import MaterialTable from 'material-table'
import { getdata } from './actions/auth';

const Editable=()=> {

  const [columns] = useState([
    { title: 'Name', field: 'contact_name' },
    { title: 'Comany Name', field: 'name', initialEditValue: 'initial edit value' },
    { title: 'Email', field: 'email', type: 'numeric' },
    {
      title: 'Work Phone',
      field: 'phone',
    },
    {
      title: 'GST Treatment',
      field: 'is_registered_for_gst',
    },
    {
      title: 'Receivable',
      field: 'currency_symbol',
    },
    {
      title: 'Payable',
      field: 'currency_code',
    },
  ]);  

  const [data, setData] = useState([]);

  useEffect(() => {
     fetchData()
  },[]);

  const fetchData = async() => {
    const result =  await getdata()
    console.log(result)
    if(result.data){
    setData(result.data)
    }else{
      console.log(result)
    }
  }

  return (
    <MaterialTable
      title="All Contacts"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }}
    />
  )
}

export default Editable;
