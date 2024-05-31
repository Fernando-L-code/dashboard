import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import moment from "moment";

const Filter = ({ filtro, setFiltro }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = name.startsWith("fulfillmentDate")
          ? moment(value).toISOString()
          : value;
    
        setFiltro((prevFiltro) => ({
          ...prevFiltro,
          where: name.startsWith("fulfillmentDate")
            ? {
                ...prevFiltro.where,
                fulfillmentDate: {
                  ...prevFiltro.where.fulfillmentDate,
                  [name]: formattedValue
                }
              }
            : prevFiltro.where,
          [name]: formattedValue
        }));
      };
    const gteDate = moment(filtro.where.fulfillmentDate['[gte]']).format('YYYY-MM-DD');

    const lteDate = moment(filtro.where.fulfillmentDate['[lte]']).format('YYYY-MM-DD');
  
 
    return (
        <div style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', border: '1px solid #ccc', background: "white",borderRadius: '8px', margin: '0 auto', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexBasis: '200px' }}>
            <TextField
              label="Fecha de inicio"
              type="date"
              InputLabelProps={{ shrink: true }}
              id="fulfillmentDateGte"
              name="[gte]"
              value={gteDate}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexBasis: '200px' }}>
            <TextField
              label="Fecha de fin"
              type="date"
              InputLabelProps={{ shrink: true }}
              id="fulfillmentDateLte"
              name="[lte]"
              value={lteDate}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexBasis: '200px' }}>
            <FormControl fullWidth>
                <InputLabel id="sortBy-label">Sort By</InputLabel>
                <Select
                    labelId="sortBy-label"
                    id="sortBy"
                    name="sortBy"
                    value={filtro.sortBy}
                    onChange={handleInputChange}
                    label="Sort By"
                >
                    <MenuItem value="fulfillmentDate">Fecha llenado completo</MenuItem>
                    <MenuItem value="createdAt">Fecha de Creacion</MenuItem>
                    <MenuItem value="trackingNumber">Número de seguimiento</MenuItem>
                    <MenuItem value="orderNumber">Número de orden</MenuItem>
                    <MenuItem value="courier">Mensajería</MenuItem>
                    <MenuItem value="type">Tipo</MenuItem>
                    <MenuItem value="markedAs">Marcado</MenuItem>
                </Select>
            </FormControl>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexBasis: '200px' }}>
            <FormControl fullWidth>
                <InputLabel id="sortDir-label">Sort Direction</InputLabel>
                <Select
                    labelId="sortDir-label"
                    id="sortDir"
                    name="sortDir"
                    value={filtro.sortDir}
                    onChange={handleInputChange}
                    label="Sort Direction"
                >
                    <MenuItem value="ASC">ASC</MenuItem>
                    <MenuItem value="DESC">DESC</MenuItem>
                </Select>
            </FormControl>
          </div>
  
        </div>
      );
    };
  
  export default Filter;