import moment from "moment";

const Filter = ({ filtro, setFiltro,handleSearch }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = moment(value).toISOString();
        setFiltro((prevFiltro) => ({
          ...prevFiltro,
          where: {
            ...prevFiltro.where,
            fulfillmentDate: {
              ...prevFiltro.where.fulfillmentDate,
              [name]: formattedValue
            }
          }
        }));
      };
    const gteDate = moment(filtro.where.fulfillmentDate['[gte]']).format('YYYY-MM-DD');

    // Utilizar Moment.js para formatear la fecha de fin
    const lteDate = moment(filtro.where.fulfillmentDate['[lte]']).format('YYYY-MM-DD');
  
    return (
        <div style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', border: '1px solid #ccc', borderRadius: '8px', margin: '0 auto', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexBasis: '200px' }}>
                <label htmlFor="fulfillmentDateGte">Fecha de inicio:</label>
                <input
                type="date"
                id="fulfillmentDateGte"
                name="    "
                value={gteDate}
                onChange={handleInputChange}
                />
            </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexBasis: '200px' }}>

                <label htmlFor="fulfillmentDateLte">Fecha de fin:</label>
                <input
                type="date"
                id="fulfillmentDateLte"
                name="[lte]"
                
                value={lteDate} 
                onChange={handleInputChange}
                />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexBasis: '200px' }}>
        <button 
            onClick={handleSearch} 
            style={{ padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
            Search
        </button>

</div>
     
      </div>
    );
  }
  
  export default Filter;