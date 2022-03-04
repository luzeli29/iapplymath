import Header from "./header";
const Layout = ({ children }) => {
    return ( 
        <>
            <Header/>
                <div className="game_view">
                    <div className="game_container">
                        { children }
                    </div>
                </div>
        </>
     );
}
 
export default Layout;