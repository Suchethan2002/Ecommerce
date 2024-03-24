import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const UserEngagementChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Data preprocessing
    const parseDate = d3.utcParse('%Y-%m-%dT%H:%M:%SZ');
    const dateFormat = d3.utcFormat('%d-%m-%Y');

    // Extracting metrics and sorting dates
    const dates = data.map(d => parseDate(d.start_timestamp)).sort((a, b) => a - b);
    const formattedDates = dates.map(date => dateFormat(date));
    const pageViews = data.map(d => d['Total Pageviews per Session']);
    const productViews = data.map(d => d['Total Product Views per Session']);
    const conversions = data.map(d => d['Conversions (Purchases) per Session']);

    // Visualization
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().domain(formattedDates).range([0, width]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max([...pageViews, ...productViews, ...conversions])]).range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append('g').attr('transform', `translate(0,${height})`).call(xAxis);
    svg.append('g').call(yAxis);

    const line = d3
      .line()
      .x((d, i) => x(formattedDates[i]) + x.bandwidth() / 2)
      .y(d => y(d));

    svg
      .append('path')
      .datum(pageViews)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg
      .append('path')
      .datum(productViews)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    svg
      .append('path')
      .datum(conversions)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Cleanup
    return () => {
      svg.selectAll('*').remove();
    };
  }, [data]);

  return <div ref={chartRef}></div>;
};

export default UserEngagementChart;
