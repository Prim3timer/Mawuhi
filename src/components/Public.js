import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Retail Tracker</span></h1>
            </header>
            <main className="public__main">
            </main>
            <footer >
                <Link to="/login" style={{textDecoration: 'none',
                    color: 'white'
                }}>Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public