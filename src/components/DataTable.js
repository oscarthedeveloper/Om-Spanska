import React, { useState } from 'react';
import './DataTable.css'; // Import CSS file for styling (if needed)

const DataTable = ({ data }) => {
  const [sortBy, setSortBy] = useState('verb');
  const [sortOrder, setSortOrder] = useState('asc');
  const [arrowVisible, setArrowVisible] = useState(true);

  // Function to handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setArrowVisible(false); // Hide arrow after sorting
    setTimeout(() => setArrowVisible(true), 0); // Show arrow after a short delay
  };

  // Function to compare values for sorting
  const compareValues = (value1, value2) => {
    if (value1 < value2) return -1;
    if (value1 > value2) return 1;
    return 0;
  };

  // Sorting the data based on current sortBy and sortOrder
  const sortedData = [...data].sort((a, b) => {
    const fieldA = a[sortBy];
    const fieldB = b[sortBy];
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * compareValues(fieldA, fieldB);
  });

  return (
    <div className="datatable-container">
      <table className="datatable">
        <thead>
          <tr>
            <th
              className={`sortable-header ${sortBy === 'verb' ? 'sorted' : ''}`}
              onClick={() => handleSort('verb')}
            >
              Infinitiv {sortBy === 'verb' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th>🇸🇪 Svenska</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td>{row.verb}</td>
              <td>{row.translation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
