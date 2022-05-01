import Header from "./header";
const Layout = ({ children }) => {
    return ( 
        <>
            <div className="header_container">
                <Header/>
            </div>
            <div className="body_container">
                <div className="view_container">
                    { children }
                </div>
            </div>
        </>
     );
}
 
export default Layout;

/* 
<>
            <Header/>
            <div className="view_container">
                { children }
            </div>
        </>
*/