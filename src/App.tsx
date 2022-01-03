import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './modules/dashboard/components/Header/Header';
import FeedbackList from './modules/dashboard/components/FeedbackList/FeedbackList';
import './index.scss';
import FeedbackStats from './modules/dashboard/components/FeedbackStats/FeedbackStats';
import FeedbackForm from './modules/dashboard/components/FeedbackForm/FeedbackForm';
import AboutPage from './modules/about/screens/AboutPage/AboutPage';
import AboutIcon from './modules/dashboard/shared/components/AboutIcon/AboutIcon';
import { FeedbackProvider } from './context/FeedbackContext';

const App: React.FC = () => {
  return (
    <FeedbackProvider>
      <Router>
        <Header text='Feedback UI' />

        <div className='container'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                  <AboutIcon />
                </>
              }></Route>
            <Route path='/about' element={<AboutPage />} />
          </Routes>
        </div>
      </Router>
    </FeedbackProvider>
  );
};

export default App;
