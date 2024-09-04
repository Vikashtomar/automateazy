import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Number of items per page
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query

    useEffect(() => {
        axios.get("https://randomuser.me/api?results=200")
            .then((res) => {
                setData(res.data.results);
                setTotalPages(Math.ceil(res.data.results.length / itemsPerPage));
            });
    }, [itemsPerPage]);
 
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
        setCurrentPage(1);  
    };

    // Filtered data based on the search query
    const filteredData = data.filter(user => {
        return (
            user.name.first.toLowerCase().includes(searchQuery) ||
            user.name.last.toLowerCase().includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery)
        );
    });
 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        // Update the totalPages whenever the filtered data changes
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    }, [filteredData, itemsPerPage]);

    return (
        <div className='homepage'>
            
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
                { 
                (data) && 
            <div className='users'>

                    <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((dt, index) => (
                            <tr key={index}>
                                <td>{dt.name.first} {dt.name.last}</td>
                                <td>{dt.cell}</td>
                                <td>{dt.dob.age}</td>
                                <td>{dt.email}</td>
                                <td>
                                    <img src={dt.picture.medium} alt={dt.name.first} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
                }
        </div>
    );
}

export default Home;
