import React from 'react';
import Sidebar from '@/components/Navigation/Sidebar';
import FacultyDashboard from '@/components/faculty/FacultyDashboard';

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <FacultyDashboard children={children} />
        </div>
    );
};

export default Layout;