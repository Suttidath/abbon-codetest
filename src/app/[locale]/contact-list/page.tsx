"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserForm } from "../home/page";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface Contact {
  id: string;
  name: string;
  age: number;
  [key: string]: any;
}

type StateStore = {
  user: IUserForm;
  contacts: {
    contact_list: Contact[];
  };
};

const ContactListPage = () => {
  const t = useTranslations("ContactList");
  const contacts = useSelector(
    (state: StateStore) => state.contacts.contact_list
  ) as Contact[];
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const columns: {
    id: keyof Contact | "action";
    label: string;
    align?: "center" | "left" | "right";
    minWidth: number;
  }[] = [
    { id: "name", label: t("name"), align: "left", minWidth: 120 },
    { id: "age", label: t("age"), align: "left", minWidth: 120 },
    { id: "action", label: "Action", align: "center", minWidth: 50 },
  ];

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "REMOVE_CONTACT", payload: id });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) => {
    const lowerSearch = search.toLowerCase();
    return (
      search.length > 2 &&
      (contact.name.toLowerCase().includes(lowerSearch) ||
        contact.age.toString().includes(lowerSearch))
    );
  });

  const displayContacts = search.length > 2 ? filteredContacts : contacts;

  return (
    <div className="w-full lg:w-[90%] justify-center pb-24">
      <Typography variant="h6" className="py-2">
        {t("title")}
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: 4 }}>
        <div className="flex gap-4 pb-6">
          <TextField
            label={t("search")}
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={handleSearchChange}
          />
          <Button
            sx={{ width: 250 }}
            variant="contained"
            onClick={() => setSearch("")}
          >
            {t("clear")}
          </Button>
        </div>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontSize: 16,
                      backgroundColor: "lightgray",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayContacts.length > 0 ? (
                displayContacts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        if (column.id === "action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                onClick={() => handleDelete(row.id)}
                                color="error"
                                variant="contained"
                              >
                                Delete
                              </Button>
                            </TableCell>
                          );
                        }
                        const value = row[column.id as keyof Contact];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="w-full min-h-[100px] flex justify-center items-center">
                      <Typography variant="subtitle2">No Data</Typography>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 100]}
          component="div"
          count={displayContacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ContactListPage;
