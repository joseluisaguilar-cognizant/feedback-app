import { useState } from 'react';

import Header from './modules/dashboard/components/Header/Header';
import FeedbackData from './data/feedback.data';
import IFeedback from './interfaces/feedback.interface';
import FeedbackList from './modules/dashboard/components/FeedbackList/FeedbackList';
import './index.scss';
import FeedbackStats from './modules/dashboard/components/FeedbackStats/FeedbackStats';

const App: React.FC = () => {
  const [feedback, setFeedback] = useState<Array<IFeedback>>(FeedbackData);
  const deleteFeedback = (id: number) => {
    if (window.confirm('Are you sure')) {
      setFeedback((prevValue: Array<IFeedback>) =>
        prevValue.filter((feedback: IFeedback) => feedback.id !== id)
      );
    }
  };

  return (
    <>
      <Header text='Feedback UI' />
      <div className='container'>
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  );
};

export default App;
