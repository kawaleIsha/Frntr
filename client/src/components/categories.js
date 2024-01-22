import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const Projects = ({ category }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects/${category}`)
            .then(response => setProjects(response.data))
            .catch(error => console.error(error));
    }, [category]);

    return (
        <div>
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Projects</h3>
            {projects.length > 0 ? (
                <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                    {projects.map((project) => (
                        <div key={project._id}>
                            <h4>{project.name}</h4>
                            <img src={`http://localhost:5000/${project.imageURL}`} alt={project.name} style={{ maxWidth: '30vh', height: '30vh' }} />
                            <p>{project.details}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No projects in this category yet.</p>
            )}
        </div>
    );
};

export default Projects;