import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import searchEvents from './data.json';

const Search = () => {
  const svgRef = useRef();
  const histogramRef = useRef();
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const histogramSvg = d3.select(histogramRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Extract search queries
    const queries = searchEvents.flatMap(event =>
      event.events.filter(e => e.type === 'search').map(e => e.query)
    );

    // Count the frequency of each search query
    const queryCounts = queries.reduce((acc, query) => {
      acc[query] = (acc[query] || 0) + 1;
      return acc;
    }, {});

    // Prepare data for word cloud layout
    const words = Object.keys(queryCounts).map(query => ({
      text: query,
      size: queryCounts[query] * 10, // Adjust the size multiplier as needed
    }));

    // Calculate insights
    const totalQueries = queries.length;
    const mostFrequentQuery = Object.keys(queryCounts).reduce((a, b) => queryCounts[a] > queryCounts[b] ? a : b);

    // Calculate frequency distribution for histogram
    const frequencyDistribution = Object.values(queryCounts);
    const bins = d3.histogram()
      .domain(d3.extent(frequencyDistribution))
      .thresholds(10) // Number of bins
      (frequencyDistribution);

    setInsights({ totalQueries, mostFrequentQuery, frequencyDistribution, bins });

    // Create the word cloud layout
    const layout = cloud()
      .size([innerWidth / 2, innerHeight])
      .words(words)
      .padding(5)
      .rotate(() => (Math.random() < 0.5 ? 0 : 90)) // Randomly rotate words
      .font('Arial')
      .fontSize(d => d.size)
      .on('end', draw);

    // Generate the word cloud layout
    layout.start();

    function draw(words) {
      svg.selectAll('text').remove(); // Clear previous text elements
      svg.append('g')
        .attr('transform', `translate(${width / 4},${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('fill', '#69b3a2') // Change text color
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text(d => d.text);
    }

    // Create the histogram
    const x = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.x1)])
      .range([0, innerWidth / 2]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .range([innerHeight, 0]);

    histogramSvg.selectAll('*').remove(); // Clear previous elements

    histogramSvg.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('x', d => x(d.x0))
      .attr('y', d => y(d.length))
      .attr('width', d => x(d.x1) - x(d.x0) - 1)
      .attr('height', d => innerHeight - y(d.length))
      .style('fill', '#69b3a2');

    histogramSvg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .append('text') // Add label for x-axis
      .attr('x', innerWidth / 4)
      .attr('y', 25)
      .attr('dy', '0.71em')
      .attr('fill', '#000')
      .attr('text-anchor', 'middle')
      .text('Frequency');

    histogramSvg.append('g')
      .call(d3.axisLeft(y))
      .append('text') // Add label for y-axis
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('fill', '#000')
      .attr('text-anchor', 'end')
      .text('Count');

  }, []);

  // Make the graphs responsive by adjusting their sizes according to the width of the screen
  const svgWidth = 600;
  const svgHeight = 400;

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <svg ref={svgRef} width={svgWidth} height={svgHeight}></svg>
        {insights && (
          <div>
            <h2>Insights:</h2>
            <p>High visibility of a search term is the most frequent among your searches</p>
            <p>Total Number of Queries: {insights.totalQueries}</p>
            <p>Most Frequent Query: {insights.mostFrequentQuery}</p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Search;
