import React, { createContext, useState } from 'react';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [ data, setData ] = useState({
    id : 0,
    invoiceNumber : 1010101010,
    date : new Date(),
    tax : 8.9,

    company : {
      name:"KMKO",
      address: 'Busy street\nMumbai',
      logo:"https://i.imgur.com/WUtsRM9.png",
      phone:'+918281******',
      site:'https://kmkocompany.com',
      email:'samplemail@gmail.com'
    },

    billedTo : {
      name : 'John Kallely',
      address:'MG road Chalakudy Thrissur',
      phone : '+917902******',
      email : 'johnkallely@mgits.ac.in'
    },
    content : [
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
    ],

    ps : {
      title : 'Pleasure doing business with you',
      note : 'Terms & Conditions :  \nFull payment is due upon receipt of this invoice.Late payments may incur additional charges or interest as per the applicable laws.'
    },

    subtotal : 300,
    discount : 30 ,
    calculatedDiscount:30,
    calculatedTax:35,
    total:320,
  });
  return (
    <InvoiceContext.Provider value={{ data, setData }}>
      {children}
    </InvoiceContext.Provider>
  );
};
