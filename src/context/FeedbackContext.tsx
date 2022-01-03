import { createContext, FunctionComponent, ReactNode, useState } from 'react';

import FeedbackData from '../data/feedback.data';
import IFeedback from '../interfaces/feedback.interface';

interface IFeedbackContext {
  feedback: Array<IFeedback>;
}

interface IFeedbackProvider {
  children: ReactNode;
}

export const FeedbackContext = createContext<IFeedbackContext>({
  feedback: [],
});

export const FeedbackProvider: FunctionComponent<IFeedbackProvider> = ({
  children,
}) => {
  const [feedback, setFeedback] = useState<Array<IFeedback>>(FeedbackData);

  return (
    <FeedbackContext.Provider value={{ feedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};
