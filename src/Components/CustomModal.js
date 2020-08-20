import React, {useRef, useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import FileBase64 from 'react-file-base64';

const useStyles = makeStyles((theme) => ({
    paper: {
    width: 768,
    position: 'absolute',
    left:(window.innerWidth/2)-(768/2),
    top:(window.innerHeight/2)-(150/2),
    textAlign:'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  section: {
    
    height: 150,
    padding: 20
  },
  category: {
    width:768,
    height:150,
    padding:120
  },
  carousel: {
    width:768,
    minHeight:150,
    padding: 20
  },
  positioning: {
   
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    button: {
      margin: theme.spacing(1),
    },
  }
}));

const Index = ({openModalState,openModalFce,type,addDataFce, updateDataFce, elmId}) => {
  const [carouselData, setCarouselData] = useState({imgData:"",descr:""}) // {imgData:base64,descr:carouselDescrRef.current.value}
  const [categoryData, setCategoryData] = useState({txt:"",descr:""})
  const [sectionData, setSectionData] = useState("")
  
  console.log("ELM iD: ",elmId, "type: ",type);
  const classes = useStyles();
  let sectionTxtRef = useRef(null);
  let categoryNameTxtRef = useRef(null);
  let categoryDescrTxtRef = useRef(null);
  let carouselDescrRef = useRef(null);
  let base64="";

   useEffect(()=>{
    if(carouselData.imgData!=="" || carouselData.descr!==""){
      distinquishOperation({state:true,data:{type:type,id:elmId,imgData:carouselData.imgData,descr:carouselData.descr}})
      return setCarouselData({imgData:"",descr:""})
    }
   },[carouselData])

   useEffect(()=>{
     if(categoryData.txt!=="" || categoryData.descr!==""){
        distinquishOperation({state:true,data:{type:type,id:elmId,txt:categoryData.txt,descr:categoryData.descr}})
        return setCategoryData({txt:"",descr:""})
      }
   },[categoryData])

  useEffect(()=>{
    if(sectionData!==""){
      distinquishOperation({state:true,data:{type:type,id:elmId,txt:sectionData}})
      return setSectionData("")
    }
  },[sectionData])

  const distinquishOperation = (data) => {
    if(type.split("-")[0]=== "add"){
      addDataFce(data)
    }else{
      updateDataFce(data)
    }
  }

      const Category = () => (
        <section id="modalCategoryContainer" className={classes.paper}>
          <Button variant="contained" onClick={openModalFce} style={{position:'absolute', right: '20px'}} >X</Button>
          <form className={classes.root} noValidate autoComplete="off" style={{display: 'inline-block'}}>

                  <TextField inputRef={categoryNameTxtRef} component="div" id="outlined-basic" style={{width: '550px'}} label="Název" variant="outlined" />
                 
                      <TextField inputRef={categoryDescrTxtRef} id="standard-multiline-static" style={{width: '550px'}} label="Popis kategorie" variant="outlined" multiline rows={4}  />
                
                <Button variant="contained"  style={{backgroundColor:'#2e496f',color:'white'}} onClick={()=> setCategoryData({txt:categoryNameTxtRef.current.value,descr:categoryDescrTxtRef.current.value})} className={classes.button} endIcon={<SendIcon />}>Odeslat</Button>
          </form>
    </section>
      )
    
    const Section = () => (
      <section id="modalSectionContainer" className={classes.paper}>
        <Button variant="contained" onClick={openModalFce} style={{position:'absolute', right: '20px'}} >X</Button>
          <form className={classes.root} noValidate autoComplete="off" style={{display: 'inline-block'}}>
                  <TextField inputRef={sectionTxtRef} component="div" id="outlined-basic" style={{width: '550px'}} label="Název sekce" variant="outlined" />
                <Button variant="contained"  style={{backgroundColor:'#2e496f',color:'white'}} onClick={()=> setSectionData(sectionTxtRef.current.value)} className={classes.button} endIcon={<SendIcon />}>Odeslat</Button>
          </form>
      </section>
    )

    const Carousel = () => {
      return(
        <section id="modalCarouselContainer"  className={classes.paper} style={{top:(window.innerHeight/2)-(373/2)}}>
          <Button variant="contained" onClick={openModalFce} style={{position:'absolute', right: '20px'}} >X</Button>
          <h1>Vytvořte jednotlivé slidy carouselu:</h1>
          <TableContainer>
            <Table>
              <TableRow>
                <TableCell>
                  <FileBase64 multiple={false} onDone={(e)=>base64=e.base64} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField inputRef={carouselDescrRef} component="div" id="outlined-basic" style={{width: '550px'}} label="Doplňující text k obrázku slidu" variant="outlined" multiline rows={4} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{textAlign:'center'}}>
                  <Button variant="contained"  style={{backgroundColor:'#2e496f',color:'white'}} onClick={()=> setCarouselData({imgData:base64,descr:carouselDescrRef.current.value})} className={classes.button} endIcon={<SendIcon />}>Odeslat</Button>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>

        </section>
        
      )
    }

    let Comp
    switch(type.split("-")[1]){
      case "section" : Comp = Section; break;
      case "title" : Comp = Section; break;
      case "subtitle" : Comp = Section; break;
      case "category": Comp = Category; break;
      case "carousel": Comp = Carousel; break;
      default: Comp=undefined;
    }

  return (
    <div>
      
      <Modal open={openModalState} onClose={openModalFce}>
         {Comp!==undefined && (<Comp />)}
      </Modal>
    </div>
  );
}

export default Index