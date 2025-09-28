import { Link } from 'react-router-dom';
function NotFound() {
    return (
        <div>
            <h1>Page Not Found!</h1>
            <Link to={"/crossword/"}>Go Back Home</Link>
        </div>
    );
}

export default NotFound;