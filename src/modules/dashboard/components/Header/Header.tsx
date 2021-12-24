import { CSSProperties, FunctionComponent } from 'react';

import './Header.scss';

interface IHeader {
  text: string;
  bgColor?: string;
  textColor?: string;
}

const Header: FunctionComponent<IHeader> = ({
  text = 'Default title',
  bgColor = 'rgba(0,0,0,0.4)',
  textColor = '#ff6a95',
}) => {
  const headerStyles: CSSProperties = {
    color: textColor,
    backgroundColor: bgColor,
  };

  return (
    <header style={headerStyles}>
      <div className='container'>
        <h2>{text}</h2>
      </div>
    </header>
  );
};
export default Header;
