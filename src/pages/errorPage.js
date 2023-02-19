import './errorPage.scss'

const ErrorPage = () => {
    return (
        <div className="errorPage">
            <div className="errorPage__container">
                <h1 className={'errorPage__title'}>Ooops!</h1>
                <p className="errorPage__semiTitle">
                    Sorry, our service is currently unavailable.
                </p>
                <p className="errorPage__semiTitle">Please try again later.</p>
            </div>
        </div>
    )
}

export default ErrorPage
