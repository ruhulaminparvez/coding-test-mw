import { useState } from 'react';

const Problem1 = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Active');
    const [tasks, setTasks] = useState([]);
    const sortedStatuses = ['Active', 'Completed', 'Pending', 'Archive', 'Canceled'];

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            setTasks((prevTasks) => [...prevTasks, { name, status }]);
            setName('');
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (status === 'All') {
            return true;
        }
        return task.status === status;
    });

    filteredTasks.sort((a, b) => {
        return sortedStatuses.indexOf(a.status) - sortedStatuses.indexOf(b.status);
    });

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
                <div className="col-6">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" value={name} onChange={handleNameChange} />
                        </div>
                        <div className="col-auto">
                            <select className="form-select" value={status} onChange={handleStatusChange}>
                                <option value="All">All</option>
                                {sortedStatuses?.map((sortedStatus, index) => (
                                    <option key={index} value={sortedStatus}>{sortedStatus}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${status === 'All' && 'active'}`} type="button" onClick={() => handleStatusChange({ target: { value: 'All' } })}>
                                All
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${status === 'Active' && 'active'}`} type="button" onClick={() => handleStatusChange({ target: { value: 'Active' } })}>
                                Active
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${status === 'Completed' && 'active'}`} type="button" onClick={() => handleStatusChange({ target: { value: 'Completed' } })}>
                                Completed
                            </button>
                        </li>
                    </ul>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr className='text-uppercase text-center'>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {filteredTasks.length > 0 ?
                                filteredTasks.map((task, index) => (
                                    <tr key={index}>
                                        <td>{task.name}</td>
                                        <td>{task.status}</td>
                                    </tr>
                                )) : <tr><td colSpan="2">
                                    No Data Found!
                                </td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
