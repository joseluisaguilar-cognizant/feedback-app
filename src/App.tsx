import { useState } from 'react';
import uniqid from 'uniqid';

import Header from './modules/dashboard/components/Header/Header';
import FeedbackData from './data/feedback.data';
import IFeedback from './interfaces/feedback.interface';
import FeedbackList from './modules/dashboard/components/FeedbackList/FeedbackList';
import './index.scss';
import FeedbackStats from './modules/dashboard/components/FeedbackStats/FeedbackStats';
import FeedbackForm from './modules/dashboard/components/FeedbackForm/FeedbackForm';

const App: React.FC = () => {
  const [feedback, setFeedback] = useState<Array<IFeedback>>(FeedbackData);

  const createFeedback = (newFeedback: Partial<IFeedback>) => {
    const newFeedbackWithId: IFeedback = {
      ...newFeedback,
      id: uniqid(),
    } as IFeedback;

    setFeedback((prevValue: Array<IFeedback>) => {
      return [newFeedbackWithId, ...prevValue];
    });
  };
  const deleteFeedback = (id: string) => {
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
        <FeedbackForm handleCreate={createFeedback} />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  );
};

export default App;
