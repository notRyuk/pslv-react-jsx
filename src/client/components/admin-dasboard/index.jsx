import NewsCard from '../cards/newsCard';
import "./styles.scss";
import AluminiRequestCard from '../cards/AluminiRequestCard';

const AdminDashboard = ({ role}) => {

    return (
        <>
            {role === 'admin' ? (
                <h1>ADMIN</h1>
            ) : (
                <main className="" id='mainContainer'>

                    {/* left profile container  */}

                    <div className="left-content content">
                        <div className="card">
                            <h2>Add Institute</h2>

                        </div>
                    </div>

                    <div className="card center-content content" id='center-content'>
                    <h2 className='pb-2' style={{fontWeight:"600", borderBottom:"1px solid white"}}>Student to Alumini Requests</h2>
                    <AluminiRequestCard ></AluminiRequestCard>
                    <AluminiRequestCard ></AluminiRequestCard>
                    <AluminiRequestCard ></AluminiRequestCard>
                    </div>
                    <div className="right-content content" id='right-content'>
                        <div className="card">
                            <h5>Mascot News</h5>
                            <NewsCard></NewsCard>
                            <div className="specialLink">
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default AdminDashboard;
