import { FunctionComponent } from 'react';
import IFeedback from '../../../../interfaces/feedback.interface';
import { getAverage } from '../../../../utils/utils';

interface IFeedbackStats {
  feedback: Array<IFeedback>;
}

const getRates = (feedback: Array<IFeedback>): Array<number> =>
  feedback.map((feedbackElem: IFeedback) => feedbackElem.rating);

const FeedbackStats: FunctionComponent<IFeedbackStats> = ({ feedback }) => {
  const average = getAverage(...getRates(feedback));

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  );
};

export default FeedbackStats;
