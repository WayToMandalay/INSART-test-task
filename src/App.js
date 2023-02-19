import './styles/global.scss';
import ExchangeAppContainer from './components/exchangeApp/exchangeAppContainer'
import BasicLayout from './components/basicLayout/basicLayout'

function App() {
  return (
    <BasicLayout>
      <ExchangeAppContainer/>
    </BasicLayout>
  );
}

export default App;
