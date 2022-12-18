import Header from "./header";
import {useWrapperContext} from '../context/context'

//standard layout of every page
//has a header with title and lang select,
//then the children displayed in the box of the view container
export default function Layout({ children }) {
    const context = useWrapperContext();

    return ( 
        <>
            <div className="">
                <Header/>
            </div>
            <div className="row justify-content-lg-center">
                <div className="col border">
                    {
                        process.env.NODE_ENV === 'development' ?
                        <div className='text-center'>
                            <p><strong>Debug Menu</strong></p>
                            <p>Lang: {context.state.lang}</p>
                            <p>AvatarID: {context.state.avatarID}</p>
                            <p>User ID: {context.state.userID}</p>

                        </div>
                        :
                        <>
                        </>
                    }
                </div>
                <div className="col border">
                    <div className="view_container">
                        { children }
                    </div>
                </div>
                <div className="col border">
                </div>
            </div>
        </>
     );
}