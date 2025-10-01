import { Link } from 'react-router-dom';

const base = import.meta.env.BASE_URL;

function NotFound() {
    return (
        <div>
            <h1>Page Not Found!</h1>
            <Link to={base+""}>Go Back Home</Link>
        </div>
    );
}

export default NotFound;