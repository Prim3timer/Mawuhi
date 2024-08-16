import Users from "./Users";
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <section
        style={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center'
        }}
        >
            <h1>Admin</h1>
            <h2>Users List</h2>
            <br/>
            
            {<h2>Loading...</h2> && <Users/>}
            <br/>
            <div className="flexGrow"
            
            >
                <Link to="/"
                style={{
                    color: 'brown',
                    fontSize: '1.5rem'
                }}
                >Home</Link>
            </div>
        </section>
    )
}

export default Admin