import React from 'react'
import MaterialTable from 'material-table';
import PropTypes from 'prop-types'

const CreateTable = ({title,columns,data, setUpdateData, setAddData, setRemoveData, ...rest}) => {
    return(
      <MaterialTable title={title} columns={columns} data={data} {...rest} editable={{
        onRowAdd: setAddData && ( (newData) => new Promise((resolve, reject) => {setAddData(newData);resolve()}) ),
        onRowUpdate: setUpdateData && ( (newData, oldData) => new Promise((resolve, reject) => {setUpdateData(newData,oldData);resolve()}) ),
        onRowDelete: setRemoveData && ( (oldData) => new Promise((resolve, reject) => {setRemoveData(oldData);resolve()}) ),
      }}
     
  />
    )
  }

  CreateTable.propTypes = {
    data:PropTypes.object.isRequired
  }

  CreateTable.defaultProps = {
    setUpdateData: undefined,
    setAddData: undefined,
    setRemoveData: undefined
  }

  export default CreateTable