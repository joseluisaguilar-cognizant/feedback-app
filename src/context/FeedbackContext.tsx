import { createContext, FunctionComponent, ReactNode, useState } from 'react';

import uniqid from 'uniqid';

import FeedbackData from '../data/feedback.data';
import IFeedback from '../interfaces/feedback.interface';

interface IFeedbackContext {
  feedback: Array<IFeedback>;
  createFeedback: (newFeedback: Partial<IFeedback>) => void;
  deleteFeedback: (id: string) => void;
}

interface IFeedbackProvider {
  children: ReactNode;
}

export const FeedbackContext = createContext<IFeedbackContext>(
  {} as IFeedbackContext
);

export const FeedbackProvider: FunctionComponent<IFeedbackProvider> = ({
  children,
}) => {
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
    <FeedbackContext.Provider
      value={{ feedback, deleteFeedback, createFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};
