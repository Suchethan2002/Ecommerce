import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const MonthlyTimeSpentChart = () => {
    const svgRef = useRef();

    const data = JSON.parse(window.sessionStorage.getItem("data"));
    useEffect(() => {
        // Parse the data
        data.forEach(d => {
            d.monthYear = d.month + ' ' + d.year;
            d.totalTime = Object.values(d.total_time_per_event).reduce((a, b) => a + b, 0);
        });

        // Group the data by month and calculate total time spent for each month
        const monthlyData = d3.rollup(data, v => d3.sum(v, d => d.totalTime), d => d.monthYear);

        // Convert the map to an array
        const formattedData = Array.from(monthlyData, ([key, value]) => ({ monthYear: key, totalTime: value / 60 }));

        // Sort the data by month
        formattedData.sort((a, b) => {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return months.indexOf(a.monthYear.split(' ')[0]) - months.indexOf(b.monthYear.split(' ')[0]);
        });

        // Set up the dimensions
        const margin = { top: 50, right: 50, bottom: 70, left: 50 }; // Adjusted bottom margin
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Select the SVG element
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Define scales
        const x = d3.scaleBand()
            .domain(formattedData.map(d => d.monthYear))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(formattedData, d => d.totalTime)]).nice()
            .range([height, 0]);

        // Draw X axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end")
            .attr("dy", "0.5em")
            .attr("dx", "-0.4em")
            .style("font-size", "12px");

        // Draw Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Draw line
        svg.append("path")
            .datum(formattedData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(d => x(d.monthYear) + x.bandwidth() / 2)
                .y(d => y(d.totalTime))
            );

        // Draw dots
        svg.selectAll("dot")
            .data(formattedData)
            .enter().append("circle")
            .attr("fill", "steelblue")
            .attr("cx", d => x(d.monthYear) + x.bandwidth() / 2)
            .attr("cy", d => y(d.totalTime))
            .attr("r", 5);
    }, [data]);

    return (
        <svg ref={svgRef} style={{ marginTop: "40px", display: "block" }}></svg>
    );
};

export default MonthlyTimeSpentChart;
