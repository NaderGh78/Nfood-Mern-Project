import './headingBreadcrumb.css';
import { Link } from 'react-router-dom';

/*======================================*/
/*======================================*/
/*======================================*/

const HeadingBreadcrumb = (props) => {

  const { breadcrumb } = props;

  /*======================================*/

  return (
    <div className='heading-breadcrumb'>
      <h2>{breadcrumb}</h2>
      <p><Link to="/" className='my_link'>Home</Link> / {breadcrumb}</p>
    </div>
  )
}

export default HeadingBreadcrumb;