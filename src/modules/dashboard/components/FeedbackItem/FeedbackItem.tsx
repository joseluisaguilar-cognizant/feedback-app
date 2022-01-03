import { FunctionComponent, useContext } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { FeedbackContext } from '../../../../context/FeedbackContext';
import IFeedback from '../../../../interfaces/feedback.interface';

import Card from '../../shared/components/Card/Card';

interface IFeedbackItem {
  feedbackElem: IFeedback;
}

const FeedbackItem: FunctionComponent<IFeedbackItem> = ({
  feedbackElem,
}: IFeedbackItem) => {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  return (
    <Card>
      <div className='num-display'>{feedbackElem.rating}</div>
      <button onClick={() => deleteFeedback(feedbackElem.id)} className='close'>
        <FaTimes color='purple' />
      </button>
      <button onClick={() => editFeedback(feedbackElem)} className='edit'>
        <FaEdit color='purple' />
      </button>
      <div className='text-display'>{feedbackElem.text}</div>
    </Card>
  );
};

export default FeedbackItem;
