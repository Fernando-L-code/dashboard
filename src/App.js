import './App.css';
import { Container, Typography } from "@mui/material";
import CustomTable from "./pages/CustomTable.js";
import MainContext from "./context/MainContext.js";
import { useEffect, useState } from 'react';
import { getShipments } from './services/shipmentService.js';

import {ModalDetail} from './components/ModalDetail.js'
import moment from 'moment';
import Filter from './components/Filter.js';
const App = () => {
  const [data, setData] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtro, setFiltro] = useState({
    where: {
      fulfillmentDate: {
        '[gte]': '2023-12-12T06:00:00.000Z',
        '[lte]': '2024-01-12T05:59:59.999Z'
      },
      status: 'Label created',
      markedAs: 'OPEN'
    },
    limit: 10,
    offset: 0,
    sortBy: 'fulfillmentDate',
    sortDir: 'ASC'
  });
  
  
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await getShipments(filtro);
        const { body } = response;
        setShipments(body.rows);
      } catch (error) {
        setError("Error al obtener envíos");
      }
    };

    fetchShipments();
  }, [filtro]);


  const handlerOpenDetail= ()=>{

  }

  const columns = [
    { id: "trackingNumber", 
      label: "Numero de Guias",
      minWidth: 170,
      sortable: true
    },
    { id: "orderNumber", 
      label: "Numero de orden",
      minWidth: 100,
      sortable: true
    },
    { id: "courier", 
      label: "mensajería",
      minWidth: 100,
      sortable: true
    },
    {
      id: "type",
      label: "Tipo",
      minWidth: 170,
      align: "center",
    },
    {
      id: "markedAs",
      label: "marcado",
      minWidth: 170,
      align: "center",
    },
    {
      id: "createdAt",
      label: "Fecha Creacion",
      minWidth: 170,
      align: "center",
      sortable: true
    },
    {
      id: "actions",
      label: "Acciones",
      minWidth: 170,
      align: "center",
    },
  ];


  return (
    <div className="" style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
      <MainContext.Provider value={{ data, setData, filtro, setFiltro }}>
        <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
          <Filter filtro={filtro} setFiltro={setFiltro} />
        </div>

        <CustomTable columns={columns} data={shipments} />
      </MainContext.Provider>

      <ModalDetail open={isModalOpen} 
      // onClose={closeModal}
      >
        <h2>Contenido del Modal</h2>
        <p>Aquí puedes colocar cualquier contenido que desees mostrar en el modal.</p>
      </ModalDetail>
    </div>
  );
};

export default App;

