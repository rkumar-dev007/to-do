import React from "react";
const Header = React.lazy(() => import('src/components/Header'))
const Footer = React.lazy(() => import('src/components/Footer'))

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
