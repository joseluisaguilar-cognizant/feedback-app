import { Link } from 'react-router-dom';
import Card from '../../../dashboard/shared/components/Card/Card';

const AboutPage = () => {
  return (
    <Card>
      <div className='about'>
        <h1>About this project</h1>
        <p>This is a React app to leave a rank for a product or service</p>
        <p>Version: 1.2.0</p>
        <p>
          <Link to='/'>Back home</Link>
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
