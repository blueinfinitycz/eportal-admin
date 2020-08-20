import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {CategoryRow} from './CategoryRow'

export const SectionRow = ({data,openModalFce, removeDataFce }) => {
    console.log("DATA CATEGORIES: ", data.categories)
  const [collapsed, setCollapsed] = useState(false);
  const sectionId = data.id
  const categories = data.categories
  const name = data.name
  return (
    <TableRow>
      <Table >
        <TableRow style={{backgroundColor:'rgb(245 245 245)',border: '1px solid #d2d2d2'}}>
          <TableCell>
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <h1 style={{ display: 'inline-block',fontSize: "17px", marginLeft: "20px"}}>{name}</h1>
          </TableCell>
          
          <TableCell align="right">
              <IconButton style={{color: '#2b2a2a'}} id={sectionId} color="primary" onClick={(e) => openModalFce({ open: true, type: "update-section",elmId: e.currentTarget.getAttribute("id")})
                      } component="span">
                <EditIcon />
              </IconButton>

              <IconButton style={{color: '#2b2a2a'}} id={sectionId} color="primary" onClick={(e) => removeDataFce({ state: true, data: {type: "remove-section", id: e.currentTarget.getAttribute("id")}})} component="span">
                  <DeleteIcon />
              </IconButton>

        </TableCell>

        </TableRow>
        <TableRow>
          <TableCell style={{ padding: "0" }}>
            <Collapse in={collapsed} timeout="auto" unmountOnExit>
             
              <Table>
                  <TableRow>
                    <TableCell align="left" style={{border: "none"}}>
                      <Button
                        size="small"
                        id={data.id}
                        variant="contained"
                        onClick={(e) =>
                          openModalFce({
                            open: true,
                            type: "add-category",
                            elmId: e.currentTarget.getAttribute("id"),
                          })
                        }
                        style={{backgroundColor:'#2e496f',color:'white'}}
                      >
                        <AddIcon />
                        Vytvořit kategorii
                      </Button>
                    </TableCell>
                   
                  </TableRow>
                  <TableRow>
                        <Table>
                            {categories && categories.map((category,index) => <CategoryRow sectionAndCategoryId={`${data.id},${category.id}`} openModalFce={openModalFce} removeDataFce={removeDataFce} data={category} />)}
                        </Table>
                  </TableRow>

                  {/* <TableRow style={{border:'2px solid'}}>
                    <Table style={{border:'2px solid'}}>
                      {categories && categories.map(category => <CategoryRow sectionId={data.id} openModalFce={openModalFce} removeDataFce={removeDataFce} data={category} />)}
                      </Table>
                  </TableRow> */}
              </Table>
            </Collapse>
          </TableCell>
          <TableCell>

          </TableCell>
        </TableRow>
      </Table>
    </TableRow>
  );
};
