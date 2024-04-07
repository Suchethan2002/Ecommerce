import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './data.json';

const PieChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const categoryCounts = {};

    // Calculate category counts
    data.forEach(session => {
      session.events.forEach(event => {
        if (event.type === "product_view") {
          const category = event.category || "Unknown";
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
      });
    });

    // Convert category counts to D3-compatible format
    const pieData = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count
    }));

    // Set up dimensions and radius
    const width = 700;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width /2}, ${height / 2})`);

    // Create pie generator
    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);

    // Create arc generator
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Generate arcs
    const arcs = svg.selectAll('arc')
      .data(pie(pieData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Draw arcs
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (_, i) => d3.schemeCategory10[i]);

    // Add labels
    arcs.append('text')
      .attr('transform', d => {
        const pos = arc.centroid(d);
        // Move the label above the slice
        pos[1] -= 10; // Adjust this value according to your preference
        return `translate(${pos})`;
      })
      .attr('text-anchor', d => midAngle(d) < Math.PI ? 'start' : 'end')
      .text(d => `${d.data.category}: ${d.data.count}`);

    // Function to calculate mid angle of arc
    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default PieChart;
