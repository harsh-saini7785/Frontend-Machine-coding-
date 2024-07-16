import "./Home.css"
import endPoints from "../../routes/endPoints";
import { useNavigate } from "react-router-dom";
import tasks from "../../tasks";

const Card = ({ task }) => {
    const navigate = useNavigate();
    console.log(task?.route);

    return (
        <div className="card">
            <img onClick={()=>navigate(task?.route || endPoints.home)} src={task.image || "https://via.placeholder.com/150"} alt={task.name} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{task.name}</h3>
            </div>
        </div>
    );
};

const Home = () => {
    
    return (
        <div className="dashboard">
            <h1 className="heading">Mechine Coding Questions</h1>
            <div className="cardContainer">
                {tasks.map((task, index) => (
                    <Card key={index} task={task} />
                ))}
            </div>
        </div>
    )
}

export default Home;