import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className='self-center'>
            <h1 className='text-center'>404 - nie znaleziono strony</h1>
            <Link to='/'>Strona Glowna</Link>
        </div>
    )
}