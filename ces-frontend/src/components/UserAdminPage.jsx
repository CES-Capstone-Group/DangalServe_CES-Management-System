import React from "react";
import AdminSidebar from "./AdminSidebar";
import TopNav from "./TopNav";
import AdminMainContent from "./AdminMainContent";

const UserAdminPage = () => {
    return (
        <>
            <AdminSidebar/>
            <AdminMainContent />
            <TopNav/>
        </>
    )
}

export default UserAdminPage;