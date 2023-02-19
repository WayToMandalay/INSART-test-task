import Header from '../header/header'
import Footer from '../footer/footer'

const BasicLayout = ({children}) => {

    return (
        <div className={'basicLayout'}>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}

export default BasicLayout
