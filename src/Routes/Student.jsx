import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/student");
            const data = await response.json();
            setStudents(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: "DELETE",
            });
            setStudents((prevStudents) =>
                prevStudents.filter((student) => student.id !== id)
            );
        } catch (error) {
            console.error("Failed to delete student:", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredStudents =
        filter === "All"
            ? students
            : students.filter((student) => student.faculty === filter);

    return (
        <>
            <h2>Student</h2>
            <select
                value={filter}
                onChange={handleFilterChange}
                data-testid="filter"
            >
                <option value="All">All</option>
                <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                <option value="Fakultas Ilmu Sosial dan Politik">
                    Fakultas Ilmu Sosial dan Politik
                </option>
                <option value="Fakultas Teknik">Fakultas Teknik</option>
                <option value="Fakultas Teknologi Informasi dan Sains">
                    Fakultas Teknologi Informasi dan Sains
                </option>
            </select>
            {isLoading ? (
                <p>Loading ...</p>
            ) : (
                <table id="table-student">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Full Name</th>
                            <th>Faculty</th>
                            <th>Program Study</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
                            <tr className="student-data-row" key={student.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/student/${student.id}`}>
                                        {student.fullname}
                                    </Link>
                                </td>
                                <td>{student.faculty}</td>
                                <td>{student.programStudy}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleDeleteStudent(student.id)
                                        }
                                        data-testid={`delete-${student.id}`}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Student;

