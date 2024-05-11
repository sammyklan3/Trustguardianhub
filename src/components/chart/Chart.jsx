import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

export const Chart = ({ chartData }) => {
    return (
        <div>
            <Line data={chartData} />
        </div>
    );
};

Chart.propTypes = {
    chartData: PropTypes.object.isRequired,
};