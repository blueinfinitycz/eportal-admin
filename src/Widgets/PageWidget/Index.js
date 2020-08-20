import React, {useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import Grid from "@material-ui/core/Grid";
import {getData, crudOperation} from  '../../Redux/actions'
import CustomModal from '../../Components/CustomModal'
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {SectionRow} from '../../Components/SectionRow'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiTableRow : {
      head: {
        border: '1px solid transparent'
      }
    },
    MuiTableCell: {
      root: {
        paddingTop: 4,
        paddingBottom: 4
      }
    },
    MuiTable: {
      root: {
        padding:0
      }
    },
    MuiTableHead:{
      root:{
        padding:0
      }
    }
  }
});

const Index = () => {
    const [dataLoaded, setDataLoaded] = useState(false)
    const [addData, setAddData] = useState({state:false, data:{}})
    const [openModal, setOpenModal] = useState({open:false,type:'',elmId:undefined})
    const [updateData, setUpdateData] = useState({state:false, data:{}})
    const [removeData, setRemoveData] = useState({state:false, data:{}})

    const dispatch = useDispatch()
    
    const {data} = useSelector(state => state.JSONReducer)
    console.log('DATA JSON: ', data)


    // LOADING DATA
    useEffect(()=> {
        if(!dataLoaded){
          dispatch(getData('/getJSONData'))
          return () => setDataLoaded(false);
        }
      }, [dataLoaded, dispatch])


    //   ADDING DATA
      useEffect(()=>{
        if(addData.state) {
            console.log("ADD SECTION LOCAL: ", addData.data)
          dispatch(crudOperation('/addJSONData','/getJSONData',addData.data))
          return (function(){setAddData({state:false, data:{}}); setOpenModal({open:false,type:'', elmId:undefined})})()
        }

      },[addData, dispatch])


      // UPDATE DATA
      useEffect(()=>{
        if(updateData.state) {
            console.log("UPDATE SECTION LOCAL: ", updateData.data)
          dispatch(crudOperation('/updateJSONData','/getJSONData',updateData.data))
          return (function(){setUpdateData({state:false, data:{}}); setOpenModal({open:false,type:'',elmId:undefined})})()
        }

      },[updateData, dispatch])


    //   REMOVE DATA
      useEffect(()=>{
        if(removeData.state) {
            console.log("REMOVE SECTION LOCAL: ", removeData.data)
          dispatch(crudOperation('/removeJSONData','/getJSONData',removeData.data))
          return setRemoveData({state:false, data:{}});
        }
      },[removeData, dispatch])

  return (

    <Grid item xs="10" style={{margin:'auto'}} >
      
     <CustomModal
        openModalState={openModal.open}
        elmId={openModal.elmId}
        addDataFce={setAddData}
        updateDataFce={setUpdateData}
        type={openModal.type}
        openModalFce={() =>
          setOpenModal({ open: false, type: "", elmId: undefined })
        }
      />
       
      <MuiThemeProvider theme={theme}>

      <TableContainer style={{margin: '30px 0'}}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="right" style={{border:'none'}}>
                <Button
                  variant="contained"
                  onClick={() =>
                    setOpenModal({ open: true, type: "add-section" })
                  }
                  style={{backgroundColor:'#2e496f',color:'white'}}
                >
                  <AddIcon />
                  Vytvořit novou sekci
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} style={{marginBottom: '30px'}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><h3>Nadpis</h3></TableCell>
                <TableCell>{data && (data.pageTitle.length>0 ? data.pageTitle : "---")}</TableCell>
              <TableCell align="right">
                <IconButton
                    style={{color: '#2b2a2a'}}
                      color="primary"
                      onClick={(e) =>
                        setOpenModal({
                          open: true,
                          type: "update-title",
                        })
                      }
                      component="span"
                    >
                      <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell><h3>Podnadpis</h3></TableCell>
                    <TableCell>{data && (data.pageSubtitle.length>0 ? data.pageSubtitle : "---" )}</TableCell>
              <TableCell align="right">
                <IconButton
                    style={{color: '#2b2a2a'}}
                      color="primary"
                      onClick={(e) =>
                        setOpenModal({
                          open: true,
                          type: "update-subtitle",
                        })
                      }
                      component="span"
                    >
                      <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>

      {data && data.sections.length>0 && (
      <TableContainer component={Paper}>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{border:'none'}}><h1>Sekce</h1></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{textAlign:'left'}}>
            
          {
              data.sections.map((item, index) => <SectionRow data={item} openModalFce={setOpenModal} removeDataFce={setRemoveData} />)
            }
            
          </TableBody>
        </Table>
      </TableContainer>
      )}
      </MuiThemeProvider>

    </Grid>
  );
};

export default Index;
