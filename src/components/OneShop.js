import axios from "../app/api/axios"

const OneShop = ({items, one}) => {
    console.log(items)
    const item = items.find((item) => item._id=== one)
    console.log(item)
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <div>
            <h2
            style={{
                textAlign: 'center',
            }}
            >Single Reciept</h2>

               <article
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                    <h5>Cashier: {item.cashier}</h5>
                                    <h5>cashierID: {item.cashierID}</h5>
                                    <p>TransID: {item._id}</p>
                                    <p>Date: {item.date}</p>
                                    {item.goods.map((good)=> {
                                        return (
                                            <div
                                            style={{display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
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
                                    <br/>
                                   
                                </article>
        </div>
    )
}

export default OneShop