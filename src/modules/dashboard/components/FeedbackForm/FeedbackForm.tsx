import { ChangeEvent, FunctionComponent, useState } from 'react';
import Card from '../../shared/Card/Card';

const FeedbackForm: FunctionComponent = () => {
  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setText(value);
  };

  return (
    <Card>
      <form>
        <h2>How would you rate your service with us?</h2>
        <div className='input-group'>
          <input
            type='text'
            name='review'
            id='review'
            placeholder='Write a review'
            value={text}
            onChange={handleChange}
          />
          <button type='submit'>Send</button>
        </div>
      </form>
    </Card>
  );
};

export default FeedbackForm;
