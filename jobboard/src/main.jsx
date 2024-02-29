import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './input.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './components/Loader';
const App = React.lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
