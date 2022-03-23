import Header from "./header";
const Layout = ({ children }) => {
    return ( 
        <>
            <Header/>
            <div className="view_container">
                { children }
            </div>
        </>
     );
}
 
export default Layout;