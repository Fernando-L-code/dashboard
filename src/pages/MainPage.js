import { useEffect, useState } from "react";
import { getShipments } from "../services/shipmentService";
import Filter from "../components/Filter";
import CustomTable from "../components/CustomTable";
import { ModalDetail } from "../components/ModalDetail";
import Header from "../components/Header.js";

const MainPage = ({onLogout}) => {
  const [shipments, setShipments] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setError("Error al obtener envíos");
    }
  };
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
  const flattenedShipments = Object.values(shipments).flat();
  return (

    <div>
       <Header onLogout={onLogout} />

    <div className="" style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
        <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
          <Filter filtro={filtro} setFiltro={setFiltro} />
        </div>

        <CustomTable columns={columns} data={flattenedShipments} filtro ={filtro}  count={count} setFiltro={setFiltro} />

      <ModalDetail open={isModalOpen} 
      // onClose={closeModal}
      >
        <h2>Contenido del Modal</h2>
        <p>Aquí puedes colocar cualquier contenido que desees mostrar en el modal.</p>
      </ModalDetail>
    </div>
    </div>
  );
};

export default MainPage;

