import { FunctionComponent, useContext } from 'react';
import IFeedback from '../../../../interfaces/feedback.interface';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import { FeedbackContext } from '../../../../context/FeedbackContext';

// NO PROPS NO INTERFACE
// interface IFeedbackList {
//   handleDelete: (id: string) => void;
// }

const FeedbackList: FunctionComponent = () => {
  const { feedback, deleteFeedback } = useContext(FeedbackContext);

  if (!feedback || !feedback.length) {
    return <p>No feedback yet</p>;
  }
  return (
    <div className='feedback-list'>
      {feedback.map((feedbackElem: IFeedback) => {
        return (
          <FeedbackItem
            key={feedbackElem.id}
            feedbackElem={feedbackElem}
            handleDelete={deleteFeedback}
          />
        );
      })}
    </div>
  );
};

export default FeedbackList;
