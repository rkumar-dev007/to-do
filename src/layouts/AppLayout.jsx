import React from "react";
const Header = React.lazy(() => import('src/components/UI/Header'))
const Footer = React.lazy(() => import('src/components/UI/Footer'))

const AppLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}



export default React.memo(AppLayout);
