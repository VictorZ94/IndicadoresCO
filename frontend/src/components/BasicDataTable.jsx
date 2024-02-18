import DataTable, { createTheme } from "react-data-table-component";
import { useLoaderData } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

const BasicDataTable = ({ title }) => {
  const { data } = useLoaderData();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [id, setId] = useState("");

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id.split("-")[4],
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Valor",
      selector: (row) => new Intl.NumberFormat().format(row.value),
      sortable: true,
    },
    {
      name: "",
      selector: (row) => {
        return (
          <div className="flex space-x-3">
            <FiEdit
              className="cursor-pointer"
              onClick={() => {
                setOpenModalEdit(true);
                setId(row.id);
              }}
            />
            <RiDeleteBin6Line
              className="cursor-pointer"
              onClick={() => setOpenModalDelete(true)}
            />
          </div>
        );
      },
    },
  ];

  createTheme(
    "tw-dark",
    {
      text: {
        primary: "#ffffff",
        secondary: "#2aa198",
      },
      background: {
        default: "#1f2937",
      },
      context: {
        background: "#1f2937",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const customStyles = {
    rows: {
      style: {
        fontSize: "16px",
      },
    },
    headCells: {
      style: {
        fontSize: "18px",
      },
    },
    header: {
      style: {
        fontSize: "32px",
      },
    },
    pagination: {
      style: {
        fontSize: "16px",
      },
    },
  };

  const isDark = localStorage.getItem("flowbite-theme-mode");

  return (
    <>
      <DataTable
        title={title}
        columns={columns}
        data={data}
        pagination
        theme={isDark ? "tw-dark" : ""}
        customStyles={customStyles}
      />
      {openModalDelete && (
        <ModalDelete
          openModal={openModalDelete}
          setOpenModal={setOpenModalDelete}
        />
      )}
      {openModalEdit && (
        <ModalEdit
          openModal={openModalEdit}
          setOpenModal={setOpenModalEdit}
          id={id}
        />
      )}
    </>
  );
};

export default BasicDataTable;
