import { useContext } from "react"
import { InvoiceContext } from "../context/InvoiceData"

const useInvoiceData = id => {
  const {data, setData} = useContext( InvoiceContext );

  const setId = id => {
    setData({ ...data, id })
  }

  const setDate = date => {
    setData({ ...data, date })
  }
  
  const setCompany = company => {
    setData({ ...data, company });
  }
  
  const setBillingAdress = billedTo => {
    setData({ ...data, billedTo });
  }
  
  const setPs = ps => {
    setData({ ...data, ps });
  }

  const setInvoiceNo = invoiceNumber => {
    setData({ ...data, invoiceNumber });
  }

  const addItem = item => {
    data.content.push( item );
    calculateAndSetData( data );
  }
  const deleteItem = idx => {
    data.content.splice( idx, 1 );
    calculateAndSetData( data );
  }

  const setDiscount = discount => {
    calculateAndSetData({ ...data, discount });
  }
  
  const setTaxRate = tax => {
    calculateAndSetData({ ...data, tax });
  }

  const calculateAndSetData = data => {
    let subtotal = 0;
    data.content.forEach( item => {
        subtotal += item.price * item.qty
    });
    
    const calculatedDiscount = data.discount;
    const calculatedTax = Number(((subtotal-calculatedDiscount) * data.tax /100).toFixed(1));
    const total = subtotal-calculatedDiscount+calculatedTax ;

    setData({ ...data, subtotal, calculatedDiscount, calculatedTax, total})

  }

  return {data, setId, setDate, setDiscount, setInvoiceNo, setCompany, setTaxRate, setBillingAdress, setPs, addItem, deleteItem }
}

export default useInvoiceData ;