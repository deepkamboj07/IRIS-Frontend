import { Outlet } from "react-router-dom";
import logoImage from '../assets/logo.png'
import { Card } from "../Wrapper/Card";
import { Spin } from "antd";
import type { JSX } from "react";
import { useAuthStore } from "../store/useAuthStore";
const LoginLayout = () : JSX.Element => {
    const token = localStorage.getItem('token');
    const { loading } = useAuthStore();
    if (token) {
        window.location.href = '/profile';
        return <></>; // Prevents rendering the layout if already logged in
    }
     return (
        <div
            className="w-full h-screen bg-gradient-to-r from-[var(--color-gradient-primary)] to-[var(--color-gradient-secondary)] text-white flex justify-center items-center overflow-hidden relative card"
        >
            <div className="relative z-10 w-full">
                <Card className="w-full relative max-w-md p-8 rounded-3xl shadow-2xl bg-white max-h-[90vh] overflow-y-auto ">
                    <Outlet />
                    {loading && <div className="flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.5)] z-20">
                        <Spin spinning={loading} size="large" tip="Loading..." />
                    </div>}
                </Card>
                
            </div>
            <div className="absolute top-5 left-5 z-0">
                <img 
                    src={logoImage}/>
            </div>
        </div>
    );
}

export default LoginLayout;