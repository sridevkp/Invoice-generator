import { useState } from 'react';
import './App.css';
import Invoice from './components/Invoice';
import { Button, Container } from '@mui/material/' ;

function App() {
  const [ create, setCreate ] = useState(false)

  
  return (
    <Container className='app' sx={{ display: 'flex'}}>{
      create ?
      <Invoice 
        invoiceNumber = {80928409880} 
        id = {1}
        company={{
          name:"KMKO",
          address: 'Busy street\nMumbai',
          logo:"https://i.imgur.com/WUtsRM9.png",
          phone:'+918281******',
          site:'https://kmkocompany.com',
          email:'samplemail@gmail.com'
        }} 
      ></Invoice>

      :<Button variant='contained' onClick={ () => { setCreate(true) }}>Create</Button>
    }</Container>
  );
}

export default App;
