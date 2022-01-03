import { FunctionComponent, useContext } from 'react';
import IFeedback from '../../../../interfaces/feedback.interface';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import { FeedbackContext } from '../../../../context/FeedbackContext';
import Spinner from '../../../../shared/components/Spinner/Spinner';

// NO PROPS NO INTERFACE
// interface IFeedbackList {
//   handleDelete: (id: string) => void;
// }

const FeedbackList: FunctionComponent = () => {
  const { feedback, isLoading } = useContext(FeedbackContext);

  if (!feedback || !feedback.length) {
    return <p>No feedback yet</p>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='feedback-list'>
      {feedback.map((feedbackElem: IFeedback) => {
        return (
          <FeedbackItem key={feedbackElem.id} feedbackElem={feedbackElem} />
        );
      })}
    </div>
  );
};

export default FeedbackList;
