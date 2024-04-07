import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import data from './data.json';

const PurchaseBehaviorChart = () => {
  const [selectedYear, setSelectedYear] = useState(2022); // Default year
  const [selectedMonth, setSelectedMonth] = useState(0); // January as default

  useEffect(() => {
    renderVisualization();
  }, [selectedYear, selectedMonth]); // Re-render when selectedYear or selectedMonth changes

  // Function to filter data by year and month
  const filterDataByYearAndMonth = (year, month) => {
    return data.filter(session => {
      const sessionDate = new Date(session.events[0].timestamp);
      return sessionDate.getFullYear() === year && sessionDate.getMonth() === month;
    });
  };

  // Function to handle year selection
  const handleYearSelect = (e) => {
    const selectedYearValue = parseInt(e.target.value, 10);
    setSelectedYear(selectedYearValue);
  };

  // Function to handle month selection
  const handleMonthSelect = (e) => {
    const selectedMonthIndex = parseInt(e.target.value, 10);
    setSelectedMonth(selectedMonthIndex);
  };

  // Function to render visualization
  const renderVisualization = () => {
    const yearMonthData = filterDataByYearAndMonth(selectedYear, selectedMonth);
    const weeksInMonth = d3.timeWeeks(
      new Date(selectedYear, selectedMonth, 1),
      new Date(selectedYear, selectedMonth + 1, 0)
    );

    // Count the number of purchases per week
    const purchaseCountPerWeek = weeksInMonth.map(week => {
      const weekStart = week;
      const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
      return yearMonthData.filter(session => {
        const sessionDate = new Date(session.events[0].timestamp);
        return sessionDate >= weekStart && sessionDate <= weekEnd &&
               session.events.some(event => event.type === 'purchase');
      }).length;
    });

    // Remove previous visualization
    d3.select('#purchase-chart svg').remove();

    // Define SVG dimensions and margins
    const svgWidth = 600;
    const svgHeight = 350;
    const margin = { top: 40, right: 20, bottom: 30, left: 40 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select('#purchase-chart')
                  .append('svg')
                  .attr('width', svgWidth)
                  .attr('height', svgHeight)
                  .append('g')
                  .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Define scales
    const xScale = d3.scaleBand()
                     .domain(weeksInMonth.map((week, index) => {
                       const weekStart = week;
                       const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
                       return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
                     }))
                     .range([0, width])
                     .padding(0.1);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(purchaseCountPerWeek)])
                     .nice()
                     .range([height, 0]);

    // Add bars
    svg.selectAll('.bar')
       .data(purchaseCountPerWeek)
       .enter()
       .append('rect')
       .attr('class', 'bar')
       .attr('x', (d, i) => xScale(weeksInMonth[i].toLocaleDateString()))
       .attr('y', d => yScale(d))
       .attr('width', xScale.bandwidth())
       .attr('height', d => height - yScale(d))
       .attr('fill', 'steelblue');

    // Add x-axis
    svg.append('g')
       .attr('transform', `translate(0, ${height})`)
       .call(d3.axisBottom(xScale).tickFormat((d, i) => d));

    // Add y-axis
    svg.append('g')
       .call(d3.axisLeft(yScale));

    // Add axis labels
    svg.append('text')
       .attr('transform', `translate(${width / 2}, ${height + margin.top + 10})`)
       .style('text-anchor', 'middle')
       .text('Weeks');

    svg.append('text')
       .attr('transform', 'rotate(-90)')
       .attr('y', 0 - margin.left)
       .attr('x', 0 - (height / 2))
       .attr('dy', '1em')
       .style('text-anchor', 'middle')
       .text('Number of Purchases');
  };

  // Function to format date as 'Month Day'
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div>
      <select onChange={handleYearSelect} value={selectedYear}>
        {[...Array(3).keys()].map(year => ( // Change the array size based on available years
          <option key={year} value={2022 + year}>{2022 + year}</option>
        ))}
      </select>
      <select onChange={handleMonthSelect} value={selectedMonth}>
        {[...Array(12).keys()].map(month => (
          <option key={month} value={month}>{new Date(2022, month, 1).toLocaleString('default', { month: 'long' })}</option>
        ))}
      </select>
      <div id="purchase-chart"></div>
    </div>
  );
};

export default PurchaseBehaviorChart;
