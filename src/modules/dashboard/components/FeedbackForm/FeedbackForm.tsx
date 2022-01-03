import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { FeedbackContext } from '../../../../context/FeedbackContext';

import IFeedback from '../../../../interfaces/feedback.interface';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import RatingSelect from '../RatingSelect/RatingSelect';

const FeedbackForm: FunctionComponent = () => {
  const [text, setText] = useState<string>('');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [rating, setRating] = useState<number>(10);

  const { createFeedback, updateFeedback, feedbackEdit } =
    useContext(FeedbackContext);

  useEffect(() => {
    const {
      item: { text, rating },
      isEnableEditMode,
    } = feedbackEdit;

    if (isEnableEditMode) {
      setBtnDisabled(false);
      setText(text);
      setRating(rating);
    }
  }, [feedbackEdit]);

  const formEl = useRef(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFeedback: Partial<IFeedback> = { text, rating };

    if (feedbackEdit.isEnableEditMode) {
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else {
      createFeedback(newFeedback);
    }

    resetForm();
  };

  const resetForm = () => {
    setText('');
    setRating(10);
    setBtnDisabled(true);
    setMessage('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const isValid = new RegExp('^[a-zA-Z0-9_,. ]{10,}$').test(text);

    setText(value);

    if (isValid) {
      setBtnDisabled(false);
      setMessage('');
    } else {
      setBtnDisabled(true);
      setMessage('You must write at least ten characters');
    }
  };

  const changeRating = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setRating(Number(value));
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} ref={formEl}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect rating={rating} onRatingChange={changeRating} />
        <div className='input-group'>
          <input
            type='text'
            name='review'
            id='review'
            placeholder='Write a review'
            value={text}
            onChange={handleChange}
          />
          <Button type='submit' version='secondary' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
