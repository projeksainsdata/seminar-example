import React, { useEffect, useState } from 'react';
import { createAuthorWork } from '../Services/ConferenceServices';
import { useLoaderData } from 'react-router-dom';

const AuthorRegistration = () => {
  const data = useLoaderData();
  const conferenceList = data.data;

  const [conference, setConference] = useState('');
  const [tracks, setTracks] = useState([]);
  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    affiliation: '',
    country: '',
    contactNumber: '',
    email: '',
    googlescId: '',
    orchidId: '',
    title: '',
    track: '',
    keywords: '',
    abstract: '',
    pdfFile: null,
    topicid: '',
    CoAuthors: [],
    selectedTrackId: '',
  });
  const [errors, setErrors] = useState({});
  const [completionMessage, setCompletionMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleTrackChange = (e) => {
    const ind = e.target.selectedIndex - 1;
    setFormData((prevData) => ({
      ...prevData,
      selectedTrackId: e.target.value,
      track: tracks[ind]?.track_name || '',
    }));
    setTopics(ind !== -1 ? tracks[ind].topics : []);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const requiredFields = ['name', 'affiliation', 'country', 'contactNumber', 'email', 'title', 'track', 'topicid', 'keywords', 'abstract', 'pdfFile'];

    requiredFields.forEach(field => {
      if (!formData[field]) newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const coAuthorsData = formData.CoAuthors.map(coAuthor => ({
      name: coAuthor.name,
      affiliation: coAuthor.affiliation,
      country: coAuthor.country,
      contact_no: coAuthor.mobile,
      email: coAuthor.email,
    }));

    const authorWorkData = {
      ...formData,
      contact_no: formData.contactNumber,
      google_sh_id: formData.googlescId,
      orcid_id: formData.orchidId,
      co_authors: coAuthorsData,
    };

    createAuthorWork(authorWorkData, formData.topicid, formData.selectedTrackId, conference._id, formData.pdfFile)
      .then((Response) => {
        alert(Response.data.message);
        window.location.reload();
      })
      .catch(err => {
        alert(err.response.data.error);
        console.error(err);
      });
  };

  const handleAddCoAuthor = () => {
    setFormData((prevData) => ({
      ...prevData,
      CoAuthors: [...prevData.CoAuthors, { name: '', email: '', mobile: '', affiliation: '', country: '', googleScholarId: '', orchidId: '' }],
    }));
  };

  const handleCoAuthorChange = (index, field, value) => {
    const updatedCoAuthors = [...formData.CoAuthors];
    updatedCoAuthors[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      CoAuthors: updatedCoAuthors,
    }));
  };

  const handleDeleteCoAuthor = (index) => {
    const updatedCoAuthors = [...formData.CoAuthors];
    updatedCoAuthors.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      CoAuthors: updatedCoAuthors,
    }));
  };

  const handleConferenceChange = (event) => {
    const selectedConferenceId = event.target.value;
    const selectedConferenceData = conferenceList.find((conf) => conf._id === selectedConferenceId);
    setConference(selectedConferenceData);
    setTracks(selectedConferenceData.tracks);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-15">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Submit Paper</h3>
              {completionMessage && (
                <div className="alert alert-success" role="alert">
                  {completionMessage}
                </div>
              )}
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label">Conference:</label>
                  <select
                    name="conference"
                    className={`form-select mb-3 ${errors.track ? 'is-invalid' : ''}`}
                    onChange={handleConferenceChange}
                  >
                    <option value="">Select Conference</option>
                    {conferenceList.map((conf) => (
                      <option key={conf._id} value={conf._id}>
                        {conf.conference_title}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.track}</div>
                </div>

                {/* Other form fields */}
                {['name', 'affiliation', 'country', 'contactNumber', 'email', 'googlescId', 'orchidId', 'title', 'keywords', 'abstract'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</label>
                    <input
                      type={field === 'abstract' ? 'textarea' : 'text'}
                      name={field}
                      className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                      value={formData[field]}
                      onChange={handleInputChange}
                    />
                    <div className="invalid-feedback">{errors[field]}</div>
                  </div>
                ))}

                <div className="mb-3">
                  <label className="form-label">Track:</label>
                  <select
                    name="track"
                    className={`form-select mb-3 ${errors.track ? 'is-invalid' : ''}`}
                    onChange={handleTrackChange}
                  >
                    <option value="">Select Track</option>
                    {tracks.map((track, index) => (
                      <option key={index} value={track._id}>
                        {track.track_name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.track}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Topic:</label>
                  <select
                    name="topicid"
                    className={`form-select mb-3 ${errors.topicid ? 'is-invalid' : ''}`}
                    value={formData.topicid}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Topic</option>
                    {topics.map((topic) => (
                      <option key={topic._id} value={topic._id}>
                        {topic.topic_name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{errors.topicid}</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload PDF:</label>
                  <input
                    type="file"
                    name="pdfFile"
                    className={`form-control ${errors.pdfFile ? 'is-invalid' : ''}`}
                    accept=".pdf"
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">{errors.pdfFile}</div>
                </div>

                <label className="form-label">Co-authors:</label>
                <div>
                  <b>
                    <p onClick={handleAddCoAuthor} style={{ cursor: 'pointer' }}>
                      Add Co-Author
                    </p>
                  </b>
                  {formData.CoAuthors.map((coAuthor, index) => (
                    <div key={index} className="row mb-3">
                      {['name', 'email', 'mobile', 'affiliation', 'country', 'googleScholarId', 'orchidId'].map((field) => (
                        <div className="col" key={field}>
                          <input
                            type="text"
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={coAuthor[field]}
                            onChange={(e) => handleCoAuthorChange(index, field, e.target.value)}
                            className="form-control"
                          />
                        </div>
                      ))}
                      <div className="col-auto">
                        <span style={{ cursor: 'pointer' }} onClick={() => handleDeleteCoAuthor(index)}>
                          &#10060;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorRegistration;
