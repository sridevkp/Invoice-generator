import { useRef, useState } from 'react';
import { Button, Container } from '@mui/material/' ;
import { useReactToPrint } from 'react-to-print';
import Invoice from './components/Invoice'
import InvoiceEditor from './components/InvoiceEditor';

import './App.css';


function App() {
  const [ printing, setPrinting ] = useState(true);
  const [ create, setCreate ] = useState(false);

  const ref = useRef();

  const handlePrint = useReactToPrint({
    content : () => ref.current
  })

  return (
    <Container className='app' >
      {
        create 
        ? <>
          <InvoiceEditor/>
          <Button sx={{margin:5}} key={1} variant='contained' onClick={handlePrint}>Print</Button>
          <h2>Preview</h2>
          <Invoice ref={ref} hidden={false}/> 
        </>
        
        : <Button variant='outlined' onClick={ () => { setCreate(true) }} className='create'>Start creating</Button>
    }
    
    </Container>
  );
}

export default App;
