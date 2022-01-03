import {
  createContext,
  FunctionComponent,
  ReactNode,
  useState,
  useEffect,
} from 'react';

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
    const response = await fetch('/feedback?_sort=id&_order=desc');
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  const createFeedback = async (
    newFeedback: Partial<IFeedback>
  ): Promise<void> => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback((prevValue: Array<IFeedback>) => {
      return [data, ...prevValue];
    });
  };

  // Set edit to be updating
  const editFeedback = (item: IFeedback): void => {
    setFeedbackEdit({
      item,
      isEnableEditMode: true,
    });
  };

  const deleteFeedback = async (id: string): Promise<void> => {
    if (window.confirm('Are you sure')) {
      void (await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      }));

      setFeedback((prevValue: Array<IFeedback>) =>
        prevValue.filter((feedback: IFeedback) => feedback.id !== id)
      );
    }
  };

  const updateFeedback = async (
    id: string,
    item: Partial<IFeedback>
  ): Promise<void> => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    const data = await response.json();

    setFeedback((preValue: Array<IFeedback>) =>
      preValue.map((feedback: IFeedback) =>
        feedback.id === id ? { ...feedback, ...data } : feedback
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
