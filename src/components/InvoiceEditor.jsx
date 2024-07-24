import useInvoiceData from '../hooks/useInvoiceData';
import Barcode from 'react-barcode'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, InputLabel, InputAdornment } from '@mui/material';
import './invoice.css'
import { useRef, useState } from 'react';

const InvoiceEditor = () => {
    const [ openItemDialog, setOpenItemDialog] = useState(false);
    const [ openLogoDialog, setOpenLogoDialog] = useState(false);
    const [ openInvoiceDialog, setopenInvoiceDialog ] = useState(false)
    const { data, setId, setDate, setPs, setTaxRate, setCompany, setBillingAdress, setDiscount, setInvoiceNo, deleteItem, addItem } = useInvoiceData();
    const { company, billedTo, content, ps, subtotal, calculatedTax, total } = data ;
    
    const itemInput = useRef({
        name : "",
        price: 0,
        qty  : 0 ,
    });

    const invoiceInput = useRef( data.invoiceNumber )

    return (
        <>
        <Dialog
          open={openItemDialog}
          fullWidth
          onClose={() => setOpenItemDialog(false)}
        >
          <DialogTitle>Item info</DialogTitle>

          <DialogContent>

            <InputLabel>Name :</InputLabel>
            <TextField
              autoFocus
              id="id"
              fullWidth
              variant="standard"
              onChange={ e => itemInput.current.name = e.target.value}
            />

            <InputLabel>Price :</InputLabel>
            <TextField
              variant="standard"
              onChange={ e => itemInput.current.price = e.target.value}
              startAdornment={<InputAdornment position='start'>$</InputAdornment>}
            />

            <InputLabel>Quantity :</InputLabel>
            <TextField
              variant="standard"
              onChange={ e => itemInput.current.qty = e.target.value}
            />
          </DialogContent>

          <DialogActions>

            <Button onClick={ e => {
                addItem( itemInput.current );
                setOpenItemDialog(false);
                itemInput.current = {} ;
            }}>Add</Button>

          </DialogActions>
        </Dialog>

        <Dialog
          open={openInvoiceDialog}
          fullWidth
          onClose={() => setopenInvoiceDialog(false)}
        >
          <DialogTitle>Invoice No</DialogTitle>

          <DialogContent>

            <InputLabel>Invoice no :</InputLabel>
            <TextField
              autoFocus
              id="id"
              fullWidth
              variant="standard"
              onChange={ e => invoiceInput.current = e.target.value}
            />
          </DialogContent>

          <DialogActions>

            <Button onClick={ e => {
                setInvoiceNo( invoiceInput.current );
                setopenInvoiceDialog(false);
                invoiceInput.current = {} ;
            }}>Set</Button>

          </DialogActions>
        </Dialog>
        
        <div className="container">
            <div className='header'><h1>INVOICE</h1></div>
            <div className='section details'>
                <div className='company-info'>
                    <div className='brand'>
                        <img src={company.logo} height={70} alt="company logo"></img>
                        <input className='brand-name h4' value={data.company.name} onChange={ e => setCompany({...company, name : e.target.value}) }></input>
                    </div>
                    
                    <p className='more-info'>
                        <input type="text" value={data.company.address} onChange={ e => setCompany({ ...company, address : e.target.value })}/>
                        <br/>
                        Phone: <input type="tel" value={data.company.phone} onChange={ e => setCompany({ ...company, phone : e.target.value })} />
                        <br/>
                        <input type="email" value={data.company.email} onChange={ e => setCompany({ ...company, email: e.target.value })}/>
                        <br/>
                        <span className='link'><input type="text" value={data.company.site} onChange={ e => setCompany({ ...company, site: e.target.value })}/></span><br/>
                    </p>
                </div>
                <div className='invoice-info'>
                    <table>
                        <tbody>
                            <tr>
                                <td className='label'>Date Added</td>
                                <td>: <input type="date" value={data.date} onChange={ e => setDate(e.target.value)} /></td>                          
                            </tr>
                            <tr>
                                <td className='label'>Invoice No</td>
                                <td onClick={ () => setopenInvoiceDialog(true)}> <Barcode value={String( data.invoiceNumber)} width={1.2} height={50} ></Barcode> </td>
                            </tr>
                            <tr>
                                <td className='label'>Order ID</td>
                                <td>: <input type="text"  value={data.id} onChange={ e => setId(e.target.value)}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='section billing-info'>
                <div className='sub-header'><h4>BILLED TO:</h4></div>
                <p>
                    <input type="text" value={billedTo.name} onChange={ e => setBillingAdress({ ...data.billedTo, name : e.target.value })}/>
                    <br/>
                    <input type="text" value={billedTo.address} onChange={ e => setBillingAdress({ ...data.billedTo, address : e.target.value })}/>
                    <br/>
                    <input type="tel" value={billedTo.phone} onChange={ e => setBillingAdress({ ...data.billedTo, phone : e.target.value })}/>
                    <br/>
                    <input type="email" value={billedTo.email} onChange={ e => setBillingAdress({ ...data.billedTo, email : e.target.value })}/>
                    <br/>
                </p>
            </div>

            <div className='section content'>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            content.map( (item, idx) => {
                                return (
                                <tr key={idx}>
                                    <td>{idx+1}.</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td className='flex-container'>
                                        {item.qty*item.price}
                                        <button className='delete-item-btn' onClick={ e => deleteItem( idx )}>delete</button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        <tr>
                            <td></td>
                            <button className='add-item-btn' onClick={ () => {
                                setOpenItemDialog( true );
                                
                            }}>Add Item</button>
                        </tr>

                        <tr className='subtotal'>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='h5'>Subtotal</td>
                            <td className='h5'>{subtotal}</td>
                        </tr>
                        <tr className='imp discount'>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='h5'>Discount</td>
                            <td className='h5'><input type="number" value={data.calculatedDiscount} onChange={ e => setDiscount( e.target.value )}/></td>
                        </tr>
                        <tr className='imp tax'>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='h5'>Tax(<input type="number" className='tax-input' value={data.tax} onChange={ e => setTaxRate( e.target.value )}/>%)</td>
                            <td className='h5'>{calculatedTax}</td>
                        </tr>
                        <tr className='imp total'>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='h4'>Total</td>
                            <td className='h4'>{total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='section ps'>
                <h5><input type="text" className='ps-title-input h5' value={data.ps.title} onChange={ e => setPs({ ...data.ps, note : e.target.value })}/></h5>
                <textarea className='ps-note-area' onChange={ e => setPs({ ...data.ps, note : e.target.value })}>{ps.note}</textarea>
            </div>
        </div>
        </>
    )
}

export default InvoiceEditor