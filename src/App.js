import { useRef, useState } from 'react';
import './App.css';
import Invoice from './components/Invoice';
import { Button, Container } from '@mui/material/' ;
import { useReactToPrint } from 'react-to-print';

function App() {
  const [ create, setCreate ] = useState(false)
  const ref = useRef()

  const company = {
    name:"KMKO",
    address: 'Busy street\nMumbai',
    logo:"https://i.imgur.com/WUtsRM9.png",
    phone:'+918281******',
    site:'https://kmkocompany.com',
    email:'samplemail@gmail.com'
  }

  const content = [
    {
      name : 'Colgate ToothBrush',
      price : 40,
      qty : 3
    },
    {
      name : 'Chandrika Soap',
      price: 55,
      qty : 1 ,
    },
    {
      name : 'Parachute Coconut Oil',
      price: 130,
      qty : 1 ,
    },
    {
      name : 'Alpenlibe Strawberry',
      price: 1,
      qty :30 ,
    },
  ]

  const handlePrint = useReactToPrint({
    content : () => ref.current
  })
  
  return (
    <Container className='app' >{//sx={{ display: 'flex'}}
      create ?
      [<Invoice 
        key={0}
        innerRef = {ref}
        invoiceNumber = {80928409880} 
        id = {1}
        date={ new Date()}
        company={company} 
        billedTo={{
          name : 'John Kallely',
          address:'MG road Chalakudy Thrissur',
          phone : '+917902******',
          email : 'johnkallely@mgits.ac.in'
        }}
        content={ content }
        discount={{
          percent : 10,
          max : 100
        }}
        tax={8.9}
        ps={{
          title : 'Pleasure doing business with you',
          note : 'Terms & Conditions :  \nFull payment is due upon receipt of this invoice.Late payments may incur additional charges or interest as per the applicable laws.'
        }}
      />,

      <Button key={1} variant='contained' onClick={handlePrint}>Print</Button>
      ]
      :<Button variant='outlined' onClick={ () => { setCreate(true) }}>Create</Button>
    }</Container>
  );
}

export default App;
