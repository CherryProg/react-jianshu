import Header from './common/header';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import home from './pages/home';
import login from './pages/login';
import detail from './pages/detail';

function App() {
  return (
      <Provider store={store}>
          <div>
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path='/' exact component={home}></Route>
                    <Route path='/login' exact component={login}></Route>
                    <Route path='/detail/:id' exact component={detail}></Route>
                </div>
            </BrowserRouter>
          </div>
      </Provider>
  );
}

export default App;
