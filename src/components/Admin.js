import Users from "./Users";
import { Link } from "react-router-dom";
import UserSelect from "./UserSelect";
import useAuth from "../hooks/useAuth"


const Admin = () => {
    const {auth} = useAuth()
    console.log('picker3 is : ', auth.picker3)
    console.log('picker is: ', auth.picker)
    return (
        <section
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
        >
            <h1
            style={{
                color: 'darkslateblue'  
            }}
            >Admin</h1>
            <h2>Users List</h2>
            <br/>
            
            {<h2>Loading...</h2> && <Users/>}
            <br/>
            <div className="flexGrow"
            
            >
                <button
                style={{
                    marginBottom: '1rem'

                }}
                >

                <Link to="/"
                    style={{
                        color: 'white',
                        fontSize: '1.5rem',
                        textDecoration: 'none',
                        
                    }}
                >Home</Link>
                </button>
            </div>
        </section>
    )
}

export default Admin