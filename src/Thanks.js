import useAuth from "./hooks/useAuth"

const Thanks = () =>{
const {auth} = useAuth()
console.log(auth.receipt)
    return (
        <div className="thanks">
            <h2>Thank you for your order</h2>
            {/* <h5>{auth.receipt.name}</h5> */}
        </div>
    )
}

export default Thanks