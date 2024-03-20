import './home.scss';
import {Link} from 'react-router-dom';


export const Home = () => {
    return (
        <div className="home">
            <div className="boxes">
                <div className="box">
                <h1><Link className="link" to={'/diary'}>
                    Create Daily Note
                </Link></h1>
                    <p>
                        This should be used to create a day to day events details
                    </p>
                </div>
                <div className="box">
                <h1><Link className='link' to={'/todo'}>
                        Create Daily Tasks
                    </Link></h1>
                    <p>
                        This should be used to create a todays tasks
                    </p>
                </div>
                <div className="box">
                <h1><Link className="link" to={'/challenge'}>
                        Create Challenges
                    </Link></h1>
                    <p>
                        This should be used to create  Challenges
                        based on the number of days
                    </p>
                </div>
                <div className="box">
                <h1><Link className="link" to={'/schedule'}>
                        Schedule Events
                    </Link></h1>
                    <p>
                        This should be used to create a picture based image details
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
