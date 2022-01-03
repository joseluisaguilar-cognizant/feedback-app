import {
  createContext,
  FunctionComponent,
  ReactNode,
  useState,
  useEffect,
} from 'react';

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
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<Array<IFeedback>>(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState<IFeedbackEdit>({
    item: {} as IFeedback,
    isEnableEditMode: false,
  });

  useEffect(() => {
    void fetchFeedbackData();
  }, []);

  // Fetch feedback
  const fetchFeedbackData = async (): Promise<void> => {
    const response = await fetch(
      'http://localhost:5000/feedback?_sort=id&_order=desc'
    );
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

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
        isLoading,
      }}>
      {children}
    </FeedbackContext.Provider>
  );
};
