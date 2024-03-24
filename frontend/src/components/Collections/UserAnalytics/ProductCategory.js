import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ProductCategory = () => {
    const svgRef = useRef();

    const data = JSON.parse(window.sessionStorage.getItem("data"));

    useEffect(() => {
        if (!data) return;

        // Aggregate total page views for each category
        const categoryPageViews = {};
        data.forEach(d => {
            if (categoryPageViews.hasOwnProperty(d.pageview_category)) {
                categoryPageViews[d.pageview_category] += d.total_time_per_event.pageview / 60;
            } else {
                categoryPageViews[d.pageview_category] = d.total_time_per_event.pageview / 60;
            }
        });

        const margin = { top: 20, right: 30, bottom: 40, left: 90 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(Object.keys(categoryPageViews))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(Object.values(categoryPageViews))])
            .nice()
            .range([height, 0]);

        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y));

        svg.selectAll('.bar')
            .data(Object.keys(categoryPageViews))
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d))
            .attr('y', d => y(categoryPageViews[d]))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(categoryPageViews[d]))
            .attr('fill', 'steelblue')
            .on('mouseover', (event, d) => {
                const tooltip = svg.append('text')
                    .attr('class', 'tooltip')
                    .attr('x', x(d) + x.bandwidth() / 2)
                    .attr('y', y(categoryPageViews[d]) - 5)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '12px')
                    .attr('fill', 'black')
                    .text(`${d}: ${categoryPageViews[d].toFixed(2)}`); // Rounded to 2 decimal points

                // Prevent overlapping of tooltips
                const textWidth = tooltip.node().getBBox().width;
                let textX = x(d) + x.bandwidth() / 2 - textWidth / 2;

                // Adjust position if tooltip extends beyond SVG width
                if (textX < 0) {
                    textX = 0;
                } else if (textX + textWidth > width) {
                    textX = width - textWidth;
                }

                tooltip.attr('x', textX);

                // Remove tooltip if it still extends beyond SVG width
                if (textX < 0 || textX + textWidth > width) {
                    tooltip.remove();
                }
            })
            .on('mouseout', () => {
                svg.selectAll('.tooltip').remove();
            });

    }, [data]);

    return <svg ref={svgRef} style={{ marginTop: "40px", display: "block" }}></svg>;
};

export default ProductCategory;
