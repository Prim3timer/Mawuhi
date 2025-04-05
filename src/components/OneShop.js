import axios from "../app/api/axios"
import { Link, useNavigate } from "react-router-dom"



const OneShop = ({items, one}) => {
    console.log(items)
    const item = items.find((item) => item._id=== one)
    console.log(item)
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <div
        
        >
         
            {/* <Link to='../shopping'><button
            style={{
                textAlign: 'center'
            }}
            >Reciepts</button></Link> */}

               <article
                                style={{
                                    // display: 'flex',
                                    // flexDirection: 'column',
                                    // justifyContent: 'center',
                               
                                    // alignItems: 'center'
                                    marginTop: '10%'
                                }}
                                >
                              
                                    <h5>cashierID: {item.cashierID}</h5>
                                    <h4>Date: {item.date}</h4>
                                    <p>TransID: {item._id}</p>
                                    {/* <br/> */}
                                    {item.goods.map((good)=> {
                                        return (
                                            <div
                                            style={{display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                            }}
                                            >
                                                
                                                <h5>{good.name}</h5>
                                                <p>Qty: {good.qty} {good.unitMeasure.split(' ')[1].slice(1, -1)}</p>
                                                <p>Price: {good.price}</p>
                                                <h5>Sub Total: ₦{numberWithCommas(parseFloat(good.total).toFixed(2))}</h5>
                                                <br/>
                                            </div>
                                        )
                                    })}
                                 
                                    <h4>Grand Total: ₦{ numberWithCommas(parseFloat(item.grandTotal).toFixed(2))}</h4>
                                    <h5>Cashier: {item.cashier}</h5>
                                    <br/>
                                   
                                </article>
                               
        </div>
    )
}

export default OneShop