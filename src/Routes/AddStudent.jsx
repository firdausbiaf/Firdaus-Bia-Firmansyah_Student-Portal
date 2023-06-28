import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    profilePicture: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullname, profilePicture, address, phoneNumber, birthDate, gender, programStudy } = formData;

    const faculty = getFacultyByProgramStudy(programStudy);

    const studentData = {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      faculty,
      programStudy,
    };

    // Kirim permintaan POST ke json-server
    fetch("http://localhost:3001/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Data student berhasil ditambahkan:", data);
        // Reset form data
        setFormData({
          fullname: "",
          profilePicture: "",
          address: "",
          phoneNumber: "",
          birthDate: "",
          gender: "",
          programStudy: "",
        });
        // Redirect ke halaman Student
        navigate("/student");
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menambahkan data student:", error);
      });

    // Reset the form data
    setFormData({
      fullname: "",
      profilePicture: "",
      address: "",
      phoneNumber: "",
      birthDate: "",
      gender: "",
      programStudy: "",
    });

    // Redirect to Student page
    // navigate("/student");
  };

  const getFacultyByProgramStudy = (programStudy) => {
    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        return "Fakultas Ekonomi";
      case "Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        return "Fakultas Ilmu Sosial dan Politik";
      case "Teknik Sipil":
      case "Arsitektur":
        return "Fakultas Teknik";
      case "Matematika":
      case "Fisika":
      case "Informatika":
        return "Fakultas Teknologi Informasi dan Sains";
      default:
        return "";
    }
  };

  return (
    <>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            data-testid="name"
            required
          />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            data-testid="profilePicture"
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            data-testid="address"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            data-testid="phoneNumber"
            required
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            data-testid="date"
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            data-testid="gender"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="programStudy">Program Study:</label>
          <select
            id="programStudy"
            name="programStudy"
            value={formData.programStudy}
            onChange={handleChange}
            data-testid="prody"
            required
          >
            <option value="">Select Program Study</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Administrasi Publik">Administrasi Publik</option>
            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
            <option value="Hubungan Internasional">Hubungan Internasional</option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Arsitektur">Arsitektur</option>
            <option value="Matematika">Matematika</option>
            <option value="Fisika">Fisika</option>
            <option value="Informatika">Informatika</option>
          </select>
        </div>
        <button type="submit" data-testid="add-btn">Add Student</button>
      </form>
    </>
  );
};

export default AddStudent;
