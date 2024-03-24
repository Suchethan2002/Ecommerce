import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import searchEvents from './data.json';

const Search = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
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

    // Create the word cloud layout
    const layout = cloud()
      .size([innerWidth, innerHeight])
      .words(words)
      .padding(5)
      .rotate(() => (Math.random() < 0.5 ? 0 : 90)) // Randomly rotate words
      .font('Arial')
      .fontSize(d => d.size)
      .on('end', draw);

    // Generate the word cloud layout
    layout.start();

    function draw(words) {
      svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('fill', '#000')
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text(d => d.text);
    }
  }, []);

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default Search;
