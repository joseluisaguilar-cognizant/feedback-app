import { FunctionComponent } from 'react';
import { FaTimes } from 'react-icons/fa';
import IFeedback from '../../../../interfaces/feedback.interface';

import Card from '../../shared/components/Card/Card';

interface IFeedbackItem {
  feedbackElem: IFeedback;
  handleDelete: (id: number) => void;
}

const FeedbackItem: FunctionComponent<IFeedbackItem> = ({
  feedbackElem: { id, rating, text },
  handleDelete,
}: IFeedbackItem) => {
  return (
    <Card>
      <div className='num-display'>{rating}</div>
      <button onClick={() => handleDelete(id)} className='close'>
        <FaTimes color='purple' />
      </button>
      <div className='text-display'>{text}</div>
    </Card>
  );
};

export default FeedbackItem;
