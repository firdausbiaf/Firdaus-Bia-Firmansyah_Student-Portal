import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
  });

  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    // Fetch data student berdasarkan id
    fetch(`http://localhost:3001/student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          fullname: data.fullname,
          address: data.address,
          phoneNumber: data.phoneNumber,
          birthDate: data.birthDate,
          gender: data.gender,
          programStudy: data.programStudy,
        });
        setProfilePicture(data.profilePicture);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data student:", error);
        setLoading(false);
      });
  }, [id]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullname, address, phoneNumber, birthDate, gender, programStudy } = formData;

    const faculty = getFacultyByProgramStudy(programStudy);

    const studentData = {
      fullname,
      address,
      phoneNumber,
      birthDate,
      gender,
      programStudy,
      faculty,
    };

    // Kirim permintaan PUT ke json-server
    fetch(`http://localhost:3001/student/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Data student berhasil diubah:", data);
        // Redirect ke halaman Student
        navigate("/student");
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengubah data student:", error);
      });
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <h2>Edit Student</h2>
      <img src={profilePicture} alt={`Foto Profil ${formData.fullname}`} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            data-testid="name"
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            data-testid="address"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            data-testid="phoneNumber"
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="text"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            data-testid="date"
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            data-testid="gender"
          />
        </div>
        <div>
          <label htmlFor="programStudy">Program Study:</label>
          <input
            type="text"
            id="programStudy"
            name="programStudy"
            value={formData.programStudy}
            onChange={(e) => setFormData({ ...formData, programStudy: e.target.value })}
            data-testid="prody"
          />
        </div>
        <button type="submit" data-testid="edit-btn">
          Edit Student
        </button>
      </form>
    </>
  );
};

export default EditStudent;
