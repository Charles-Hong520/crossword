// components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header'; // Your Header component
import Footer from '@/components/Footer'; // Your Footer component
import '@/styles/Layout.css';

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;