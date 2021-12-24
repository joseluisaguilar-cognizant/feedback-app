import { FunctionComponent, ReactNode } from 'react';

interface ICard {
  reverse?: boolean;
  children: ReactNode;
}

const Card: FunctionComponent<ICard> = ({ reverse = false, children }) => {
  return <div className={`card ${reverse ? 'reverse' : ''}`}>{children}</div>;
};

export default Card;
