import { useEffect, useState } from "react";
import { GetStatus, getShipments } from "../services/shipmentService";
import Filter from "../components/Filter";
import CustomTable from "../components/CustomTable";
import { ModalDetail } from "../components/ModalDetail";
import Header from "../components/Header.js";
import { Box, Button, TextField, Typography } from "@mui/material";

const MainPage = ({onLogout}) => {
  const [shipments, setShipments] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shipmentStatus, setShipmentStatus] = useState(null);

  const [courier, setCourier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const [filtro, setFiltro] = useState({
    where: {
      fulfillmentDate: {
        '[gte]': '2023-12-12T06:00:00.000Z',
        '[lte]': '2024-01-12T05:59:59.999Z'
      },
      // status: 'Label created',
      // markedAs: 'OPEN'
    },
    limit: 10,
    offset: 0,
    sortBy: 'fulfillmentDate',
    sortDir: 'ASC'
  });
  
  useEffect(() => {
      fetchShipments();
  }, [filtro]);

  const fetchShipments = async () => {
    try {
      const response = await getShipments(filtro);
      const { body } = response;
      // Agrupar los envíos por offset
      const offsetKey = filtro.offset.toString();
      const groupedShipments = {
        [offsetKey]: body.rows,
      };

      // Actualizar shipments como un objeto con arrays basados en el offset
      setShipments((prevState) => ({
        ...prevState,
        ...groupedShipments,
      }));

      setCount(body.count);
    } catch (error) {
      setError("Error al obtener envío");
    }
  };

  const handlerOpenDetail = async (event) => {
    await fetchShipmentsStatus(event.courier, event.trackingNumber);
    setIsModalOpen(true);
  };

  const handlerCloseDetail = () => {
    setShipmentStatus(null)
    setIsModalOpen(false);
  };

  const fetchShipmentsStatus = async (courier, trackingNumber) => {
    try {
      const response = await GetStatus(courier, trackingNumber);
      console.log(response.body.data[0])
      setShipmentStatus(response.body.data[0]);
    } catch (error) {
      
      setError("Error al obtener envío");
    }
  };

  const handleSearch = async () => {
    try {
      await fetchShipmentsStatus(courier, trackingNumber);
      setIsModalOpen(true);
    } catch (error) {
      setIsModalOpen(true); // Abrir el modal aunque no se haya encontrado el envío
      error("Envío no encontrado");
    }
  };

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
  const flattenedShipments = Object.values(shipments).flat();
  return (

    <div>
       <Header onLogout={onLogout} />

    <div className="" style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
      
    <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>

    <Box sx={{ margin: "2rem 0", textAlign: "center",padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', border: '1px solid #ccc', background: "white",borderRadius: '8px', margin: '0 auto', justifyContent: 'center'   }}>
      <Typography variant="h6">Buscar Envío Manualmente</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
        <TextField
          label="Mensajería"
          value={courier}
          onChange={(e) => setCourier(e.target.value)}
        />
        <TextField
          label="Número de Seguimiento"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>Buscar</Button>
      </Box>
    </Box>
    </div>

        <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
          <Filter filtro={filtro} setFiltro={setFiltro} />
        </div>

        <CustomTable 
          columns={columns} 
          data={flattenedShipments} 
          filtro ={filtro}  
          count={count} 
          setFiltro={setFiltro} 
          handlerOpenDetail = {handlerOpenDetail}
        />

      <ModalDetail 
        open={isModalOpen} 
        onClose={handlerCloseDetail}
        data={shipmentStatus}
        error={error}
      >

      </ModalDetail>
    </div>
    </div>
  );
};

export default MainPage;

