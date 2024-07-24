import React from 'react';
import useInvoiceData from '../hooks/useInvoiceData';
import './invoice.css'
import Barcode from 'react-barcode'

const Invoice = React.forwardRef(( props, ref ) => {
    const {data} = useInvoiceData();
    const { invoiceNumber, date, id, company, billedTo, content, ps, tax, subtotal, calculatedDiscount, calculatedTax, total } = data ;
    
    return (
        <div className={`container ${ props.hidden && "hidden"}`} ref={ref}>
            <div className='header'><h1>INVOICE</h1></div>
            <div className='section details'>
                <div className='company-info'>
                    <div className='brand'>
                        <img src={company.logo} height={70} alt="company logo"></img>
                        <h2 className='brand-name'>{company.name}</h2>
                    </div>
                    
                    <p className='more-info'>
                        {company.address}<br/>
                        Phone: {company.phone}<br/>
                        {company.email}<br/>
                        <span className='link'>{company.site}</span><br/>
                    </p>
                </div>
                <div className='invoice-info'>
                    <table>
                        <tbody>
                            <tr>
                                <td className='label'>Date Added</td><td>: {new Date(date).toLocaleDateString()}</td>                          
                            </tr>
                            <tr>
                                <td className='label'>Invoice No</td><td> <Barcode value={String(invoiceNumber)} width={1.2} height={50} ></Barcode> </td>
                            </tr>
                            <tr>
                                <td className='label'>Order ID</td><td>: {id}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='section billing-info'>
                <div className='sub-header'><h4>BILLED TO:</h4></div>
                <p>
                    {billedTo.name}<br/>
                    {billedTo.address}<br/>
                    {billedTo.phone}<br/>
                    {billedTo.email}<br/>
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
                            content.map( (item, index) => {
                                return (<tr key={index}>
                                    <td>{index+1}.</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.qty*item.price}</td>
                                </tr>)
                            })
                        }

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
                            <td className='h5'>{calculatedDiscount}</td>
                        </tr>
                        <tr className='imp tax'>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='h5'>Tax({tax}%)</td>
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
                <h5>{ps.title}</h5>
                {ps.note}
            </div>
        </div>
    )
})

export default Invoice