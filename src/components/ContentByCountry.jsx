import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ContentByCountry = ({ setShowDetails }) => {
  const [data, setData] = useState([]);
  const [onlyEven, setOnlyEven] = useState(false);
  const [search, setSearch] = useState(null);
  const instantSearch = () => {
    fetchData(`https://contact.mediusware.com/api/country-contacts/United States/?search=${search}`)
  }
  const fetchData = async (url) => {
    // fetch all content
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data.results);
      })
      .catch((error) => {
        console.error('There was a problem:', error);
      });
  }
  useEffect(() => {
    !search ? fetchData('https://contact.mediusware.com/api/country-contacts/United States/') :
      setTimeout(() => {
        fetchData(`https://contact.mediusware.com/api/country-contacts/United States/?search=${search}`)
      }, 2000);
  }, [search]);
  return (
    <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-uppercase">US Countries</h5>
            <Link to="/problem-2" className="btn-close" aria-label="Close"></Link>
          </div>
          <div className="modal-body">
            <div className="form-check">
              <input onChange={() => setOnlyEven(!onlyEven)} className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Only Even
              </label>
            </div>
            <div className='d-flex gap-3'>
              <input placeholder='search' type="text" onChange={(e) => setSearch(e.target.value)} name='search' className="form-control" />
              <input onClick={instantSearch} className="btn btn-primary" disabled={!search} type='submit' value="Submit" />
            </div>
            <table className="table table-striped">
              <thead>
                <tr className='text-uppercase text-center'>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {data?.length > 0 ?
                  data?.map((content, index) => {
                    if (onlyEven && content.id % 2 !== 0) return null;
                    return (
                      <tr key={index} onClick={() => setShowDetails(content)} style={{ cursor: 'pointer' }}>
                        <th scope="row">{content.id}</th>
                        <td>{content.country?.name}</td>
                        <td>{content.phone}</td>
                      </tr>
                    );
                  }) : <tr><td colSpan="3">
                    <div className="alert alert-info mt-3" role="alert">
                      No Data Found!
                    </div>
                  </td></tr>}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center gap-3 py-3">
            <Link to="/problem-2/all_content" className="btn btn-lg" style={{ color: '#46139f', border: '1px solid #46139f' }} type="button" data-bs-target="#exampleModal" >All Content</Link>
            <Link style={{ color: '#ff7f50', border: '1px solid #ff7f50' }} to="/problem-2/us_country" className="btn btn-lg " type="button" >US Contacts</Link>
            <Link to="/problem-2" className="btn btn-lg" style={{ color: '#46139f', border: '1px solid #46139f' }} type="button" >Close</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

//props validation
ContentByCountry.propTypes = {
  setShowDetails: PropTypes.func.isRequired
}

export default ContentByCountry;
