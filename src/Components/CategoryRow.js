import React, {useState} from 'react'
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

export const CategoryRow = ({data,sectionAndCategoryId, openModalFce,removeDataFce}) => {
    const [collapsed, setCollapsed] = useState(false);
    return(
        
            <TableRow>
                <Table>
                    <TableRow>
                        <TableCell  style={{border:"none"}}>
                            <IconButton onClick={() => setCollapsed(!collapsed)}>
                                {collapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell style={{border:"none"}}>
                            <h1 style={{fontSize: "16px",margin: "0",padding: "0"}}>{data.name}</h1>
                        </TableCell>
                        <TableCell align="left" style={{width:'768px',border: 'none'}}>
                            {data.description}
                        </TableCell>
                        <TableCell align="right"  style={{border:"none"}}>
                            <IconButton style={{color: '#2b2a2a'}} id={sectionAndCategoryId} color="primary" onClick={(e) => openModalFce({open: true,type: "update-category", elmId: e.currentTarget.getAttribute("id")})}component="span">
                            <EditIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell style={{border:"none"}}>
                            <IconButton style={{color: '#2b2a2a'}} id={sectionAndCategoryId} color="primary" onClick={(e) =>
                                        removeDataFce({state: true,data: {type: "remove-category",id: e.currentTarget.getAttribute("id"),}})} component="span">
                            <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={3} style={{backgroundColor: collapsed ? 'rgb(241 241 241)' : 'white',padding: collapsed?'15px':'0',border: collapsed?'35px solid white':'none'}}>
                            <Collapse in={collapsed} timeout="auto" unmountOnExit>
                                <Table style={{width:"100%"}}>
                                    <TableRow>
                                        <TableCell align="left" style={{border: "none"}}>
                                            <Button size="small" style={{fontSize: '12px'}}  id={sectionAndCategoryId} variant="outlined" onClick={(e) => openModalFce({open: true,type: "add-carousel", elmId: e.currentTarget.getAttribute("id")})}  style={{backgroundColor:'#2e496f',color:'white'}}>
                                            <AddIcon />Vytvořit carousel slide
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                
                                {
                                    data.carousel && data.carousel.map(carouselSlide => 
                                        <TableRow>
                                            <TableCell>
                                                <Table style={{width:'100%',marginTop: '20px', marginLeft: "20px"}}>
                                                    <TableRow>
                                                        <TableCell align="left" style={{border:'none'}}>
                                                            <img src={carouselSlide.imgBase64}  width="100" height="50" alt="carousel slide" />
                                                        </TableCell>
                                                        <TableCell align="left" style={{width:'700px', border:'none'}}>
                                                            {carouselSlide.description}
                                                        </TableCell>
                                                        <TableCell align="right" style={{border:'none'}}>
                                                            <IconButton style={{color: '#2b2a2a'}} id={`${sectionAndCategoryId},${carouselSlide.id}`} color="primary" onClick={(e) => openModalFce({ open: true, type: "update-carousel",elmId: e.currentTarget.getAttribute("id")})} component="span">
                                                                <EditIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell align="right" style={{border:'none'}}>
                                                            <IconButton style={{color: '#2b2a2a'}} id={`${sectionAndCategoryId},${carouselSlide.id}`} color="primary" onClick={(e) => removeDataFce({ state: true, data: {type: "remove-carousel", id: e.currentTarget.getAttribute("id")}})} component="span">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            

                                </Table>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                    
                </Table>
        </TableRow>
    )
}