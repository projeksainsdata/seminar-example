import axios from "axios";

//const REST_API_BASE_URL = import.meta.env.REST_API_BASE_URL;
const REST_API_BASE_URL="http://localhost:3030";
export const listConference=()=>axios.get(REST_API_BASE_URL);  
//create authors
export const createAuthorWork = (authorwork,topicid,trackid,conferenceId,pdffile) => {
  console.log(conferenceId);
     const formData = new FormData();
     formData.append("pdf",pdffile);
    //  const authorData = {
    //   name: authorwork.name,
    //   address: authorwork.address,
    //   state: authorwork.state,
    //   country: authorwork.country,
    //   cont_no: authorwork.contactNumber,
    //   email: authorwork.email,
    //   title: authorwork.title,
    //   track: authorwork.track,
    //   key_words: authorwork.keywords,
    //   abstractText: authorwork.abstract,
    //   // CoAuthors: CoAuthors  // Pass the coAuthors array directly
    // };
  
    // Convert authorData object to JSON string
    const x = JSON.stringify(authorwork);
     formData.append("data",x);
    //return axios.post(`http://localhost:9090/authors/uploadwork/${topicid}/${conferenceId}`,formData);

    return axios.post(`${REST_API_BASE_URL}/author/upload/${topicid}/${conferenceId}/${trackid}`,formData);
  };
export const createConference=(conference)=>{
   return axios.post(`${REST_API_BASE_URL}/conference/create`,conference);
};
//get all conference between recent date
export const listConferenceBtwDate=()=>{
  return axios.get('http://localhost:9090/conference/getAllConferencebtwdate');

}
// create track
export const createTracks=(conferenceId,tracks)=>{
  console.log(conferenceId);
  //return axios.post(`http://localhost:9090/track/createtrack/${conferenceId}`,tracks);
  return axios.put(`${REST_API_BASE_URL}/track/addtracks/${conferenceId}`,tracks);
}
//get all tracks
export const getalltracks=(conferenceid)=>{
  return axios.get(`http://localhost:9090/track/getalltracks/${conferenceid}`);
}
//get all reviewers by track
export const getallreviewersbytrack=(track_id)=>{
  return axios.get(`${REST_API_BASE_URL}/Reviewer/getallreviwersbytrack/${track_id}`)
}


// create topic
export const createTopics=(trackId,topics)=>{
  //return axios.post(`http://localhost:9090/topic/createtopic/${trackId}`,topics);
  return axios.put(`${REST_API_BASE_URL}/topic/addtopics/${trackId}`,topics);
}


//call all roles
export const gellAllRoles=()=>axios.get('http://localhost:9090/role/getallrole');

//create committee members

export const createCommitteeMembers=(members,committee_id)=>{
   return axios.post(`${REST_API_BASE_URL}/member/create/${committee_id}`,members);
}
export const createReviewers=(members,conference_id)=>{
  //return axios.post(`http://localhost:9090/Reviewer/createreviewer/${conference_id}`,members);
  return axios.post(`${REST_API_BASE_URL}/reviewer/create/${conference_id}`,members);
}

//fetch all users before recent date

export const gellAllusersBeforDate=()=>{
  const conference_id=sessionStorage.getItem('con');
  if (!conference_id) {
   
    throw new Error('Conference ID not found in session storage.');
  }
  return axios.get(`${REST_API_BASE_URL}/member/allmembersexcurr/${conference_id}`);
};

//fetch all authors using conferenceid
export const gellAllAuthors=(conference_id)=>{
  return axios.get(`http://localhost:9090/authors/getallauthors/${conference_id}`);
}
//fetch all reviewers using conferenceid
export const gellAllReviewers=(conference_id)=>{
  return axios.get(`http://localhost:9090/Reviewer/getallreviwers/${conference_id}`);
}
export const gellAllreviewersBeforDate=()=>{
  const conference_id=sessionStorage.getItem('con');
  if (!conference_id) {
   
    throw new Error('Conference ID not found in session storage.');
  }
  return axios.get(`${REST_API_BASE_URL}/reviewer/allreviewersexcurr/${conference_id}`)
};

export const getallpaperandtrackbyconid=()=>{
  const conference_id=sessionStorage.getItem('con');
  if (!conference_id) {
   
    throw new Error('Conference ID not found in session storage.');
  }
  return axios.get(`${REST_API_BASE_URL}/author/getallpaperbyaonid/${conference_id}`);
}
export const getallpaperandconauthorbyconid=()=>{
  const conference_id=sessionStorage.getItem('con');
  if (!conference_id) {
   
    throw new Error('Conference ID not found in session storage.');
  }
  return axios.get(`${REST_API_BASE_URL}/author/getallpaper2byaonid/${conference_id}`);
}

export const getallmembersoftpcbyconid=()=>{
  const conference_id=sessionStorage.getItem('con');
  if (!conference_id) {
   
    throw new Error('Conference ID not found in session storage.');
  }
  return axios.get(`${REST_API_BASE_URL}/committee/getmembersfromtpc/${conference_id}`);
}


//create committee
export const createCommittee=(conferenceId,committee)=>{
  //return axios.post(`http://localhost:9090/committee/createcommittee/${conferenceId}`,committee)
  return axios.post(`${REST_API_BASE_URL}/committee/createcommittee/${conferenceId}`,committee)
}
export const gellAllreviewersbyconid=()=>{
  const conference_id=sessionStorage.getItem('con');
  if (!conference_id) {
   
    throw new Error('Conference ID not found in session storage.');
  }
  return axios.get(`${REST_API_BASE_URL}/reviewer/allreviewersbyconid/${conference_id}`)
};

//create paper allotments
export const createPaperallot=(informationdb)=>{
 // return axios.post(`http://localhost:9090/allotment/papersallot`,informationdb)
  return axios.post(`${REST_API_BASE_URL}/paper/allotments`,informationdb) 
}

export const emailsend=(topic_id,date,name,designation)=>{
  const data={date,name,designation};
  console.log(topic_id);
  //return axios.post(`http://localhost:9090/Email/send/${topic_id}`,data)
  return axios.post(`${REST_API_BASE_URL}/paper/sendMails/${topic_id}`,data)
}

export const fetchreviewer=(reviewerId)=>{
  //return axios.get(`http://localhost:9090/Reviewer/getreviewerbyid/${reviewerId}`);
  return axios.get(`${REST_API_BASE_URL}/reviewer/fetchreviewerbyid/${reviewerId}`);
}

export const getAllConference=()=>{
  // console.log("fff");
  // return axios.get(`http://localhost:9090/conference/getAllConference`)
  return axios.get(`${REST_API_BASE_URL}/conference/getallconference`);
}
export const setConferenceToSession=(conference_id)=>{
  return axios.get(`http://localhost:9090/conference/setSessionData/${conference_id}`,{withCredentials:true});
}

export const getConferencefromsession=()=>{
  return axios.get(`http://localhost:9090/conference/getConferenceFromSession`,{withCredentials:true});
}

export const getConferenceById=()=>{
  //console.log("fff");
  const conference_id=sessionStorage.getItem('con');
  if (!conference_id) {
   
    throw new Error('Conference ID not found in session storage.');
  }
 // return axios.get(`http://localhost:9090/conference/getConference/${conference_id}`)
  return axios.get(`${REST_API_BASE_URL}/conference/getconferencebyid/${conference_id}`)
}

export const getConferenceByid=(con_id)=>{
  return axios.get(`${REST_API_BASE_URL}/conference/fetch/${con_id}`)
}

export const getpdf = (authorId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${REST_API_BASE_URL}/paper/getpdf/${authorId}`)
      .then((response) => {
        const pdfUrl = response.data.pdfUrl; // Assuming your backend returns the PDF URL in the response
        resolve(pdfUrl);
      })
      .catch((error) => {
        console.error('Error fetching PDF:', error);
        reject(error);
      });
  });
};






export const fetchauthorwork=(id)=>{
// return axios.get(`http://localhost:9090/authors/getauthorwork/${id}`);
return axios.get(`${REST_API_BASE_URL}/author/fetchpaperbyid/${id}`);
}

//--------------------reports--------------------------

export const fetchfirstsuthors=()=>{
  const conference_id=sessionStorage.getItem('con');
  if (!conference_id) {
   
    throw new Error('Conference ID not found in session storage.');
  }
  return axios.get(`${REST_API_BASE_URL}/report/getListOfFirsrAuthor/${conference_id}`);
  }

  export const fetchallauthors=()=>{
    const conference_id=sessionStorage.getItem('con');
    if (!conference_id) {
     
      throw new Error('Conference ID not found in session storage.');
    }
    return axios.get(`${REST_API_BASE_URL}/report/getListOfAllAuthor/${conference_id}`);
    }

    export const fetchpaperwithreviewer=()=>{
      const conference_id=sessionStorage.getItem('con');
      if (!conference_id) {
       
        throw new Error('Conference ID not found in session storage.');
      }
      return axios.get(`${REST_API_BASE_URL}/report/getListOfPapersWithReviewer/${conference_id}`);
      }
      export const fetchpaperallotedtoreviewer=()=>{
        const conference_id=sessionStorage.getItem('con');
        if (!conference_id) {
         
          throw new Error('Conference ID not found in session storage.');
        }
        return axios.get(`${REST_API_BASE_URL}/report/getListOfPaperAllotedToReviewer/${conference_id}`);
        }
export const fetchpapersenttocopyright=()=>{
          const conference_id=sessionStorage.getItem('con');
          if (!conference_id) {
           
            throw new Error('Conference ID not found in session storage.');
          }
          return axios.get(`${REST_API_BASE_URL}/report/getListOfPaperSentToCopyRight/${conference_id}`);
          }
export const fetchcommitteemembers=()=>{
            const conference_id=sessionStorage.getItem('con');
            if (!conference_id) {
             
              throw new Error('Conference ID not found in session storage.');
            }
            return axios.get(`${REST_API_BASE_URL}/report/getListOfCommitteeMember/${conference_id}`);
            }

            export const fetchpaperstatus=()=>{
              const conference_id=sessionStorage.getItem('con');
              if (!conference_id) {
               
                throw new Error('Conference ID not found in session storage.');
              }
              return axios.get(`${REST_API_BASE_URL}/report/getpaperstatus/${conference_id}`);
              }
export const fetchreviewers=()=>{
                const conference_id=sessionStorage.getItem('con');
                if (!conference_id) {
                 
                  throw new Error('Conference ID not found in session storage.');
                }
                return axios.get(`${REST_API_BASE_URL}/report/getreviewers/${conference_id}`);
                }

export const conferenceAndTrack=(conid)=>{
  // const conference_id=sessionStorage.getItem('con');
  // if (!conference_id) {
   
  //   throw new Error('Conference ID not found in session storage.');
  // }
  return axios.get(`${REST_API_BASE_URL}/conference/conferenceAndTrack/${conid}`);
}

export const getconid=()=>{
    const conference_id=sessionStorage.getItem('con');
  if (!conference_id) {
   
    throw new Error('Conference ID not found in session storage.');
  }
  return conference_id;
}

export const getallreviewersbytrackid=(track_id)=>{
  return axios.get(`${REST_API_BASE_URL}/Reviewer/allreviewersbytrackid/${track_id}`);
}
