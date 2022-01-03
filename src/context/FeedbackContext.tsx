import { createContext, FunctionComponent, ReactNode, useState } from 'react';

import uniqid from 'uniqid';

import FeedbackData from '../data/feedback.data';
import IFeedback from '../interfaces/feedback.interface';

interface IFeedbackContext {
  feedback: Array<IFeedback>;
  createFeedback: (newFeedback: Partial<IFeedback>) => void;
  deleteFeedback: (id: string) => void;
  editFeedback: (item: IFeedback) => void;
  updateFeedback: (id: string, item: Partial<IFeedback>) => void;
  feedbackEdit: IFeedbackEdit;
}

interface IFeedbackProvider {
  children: ReactNode;
}

interface IFeedbackEdit {
  item: IFeedback;
  isEnableEditMode: boolean;
}

export const FeedbackContext = createContext<IFeedbackContext>(
  {} as IFeedbackContext
);

export const FeedbackProvider: FunctionComponent<IFeedbackProvider> = ({
  children,
}) => {
  const [feedback, setFeedback] = useState<Array<IFeedback>>(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState<IFeedbackEdit>({
    item: {} as IFeedback,
    isEnableEditMode: false,
  });

  const createFeedback = (newFeedback: Partial<IFeedback>): void => {
    const newFeedbackWithId: IFeedback = {
      ...newFeedback,
      id: uniqid(),
    } as IFeedback;

    setFeedback((prevValue: Array<IFeedback>) => {
      return [newFeedbackWithId, ...prevValue];
    });
  };

  // Set edit to be updating
  const editFeedback = (item: IFeedback): void => {
    setFeedbackEdit({
      item,
      isEnableEditMode: true,
    });
  };

  const deleteFeedback = (id: string): void => {
    if (window.confirm('Are you sure')) {
      setFeedback((prevValue: Array<IFeedback>) =>
        prevValue.filter((feedback: IFeedback) => feedback.id !== id)
      );
    }
  };

  const updateFeedback = (id: string, item: Partial<IFeedback>): void => {
    console.log(id);
    setFeedback((preValue: Array<IFeedback>) =>
      preValue.map((feedback: IFeedback) =>
        feedback.id === id ? { ...feedback, ...item } : feedback
      )
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        createFeedback,
        editFeedback,
        updateFeedback,
        feedbackEdit,
      }}>
      {children}
    </FeedbackContext.Provider>
  );
};
