import './invoice.css'
import Barcode from 'react-barcode'

const Invoice = ({ invoiceNumber, id, company }) => {
    return (
        <div className="container">
            <div className='header'><h1>INVOICE</h1></div>
            <div className='details'>
                <div className='company-info'>
                    <div className='brand'>
                        <img src={company.logo} height={70}></img>
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
                        <tr>
                            <td className='label'>Date Added</td>   <td>: {new Date().toLocaleDateString()}</td>                          
                        </tr>
                        <tr>
                            <td className='label'>Invoice No</td>   <td> <Barcode value={invoiceNumber} width={1.5} height={60} ></Barcode> </td>
                        </tr>
                        <tr>
                            <td className='label'>Order ID</td>   <td>: 1</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className='billing-info'>

            </div>
            <div className='content'>

            </div>
        </div>
    )
}

export default Invoice