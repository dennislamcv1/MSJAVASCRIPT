import React from 'react';
import PropTypes from 'prop-types';
function ProgressBar({ progress, totalPages }) {
  const percentage = totalPages > 0 ? (progress / totalPages) * 100 : 0;
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-filled"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
export default ProgressBar;