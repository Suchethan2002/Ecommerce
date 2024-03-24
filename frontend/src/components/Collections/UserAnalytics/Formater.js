import data from './data.json';
import { useState, useEffect } from 'react';
import UserEngagementChart from './UserEngamenet';

const Formater = () => {
    useEffect(() => {
        const parseTimestamp = (timestampStr) => {
            return new Date(timestampStr.slice(0, -1));
        };

        const parsedSessions = data.map((session) => {
            const sessionInfo = {
                session_id: session.session_id,
                total_time_per_event: {},
                session_duration_seconds: 0,
                month: '',
                year: 0,
                pageview_category: '',
            };

            session.events.sort((a, b) => {
                return parseTimestamp(a.timestamp) - parseTimestamp(b.timestamp);
            });

            let prevEvent = null;
            session.events.forEach((event) => {
                const eventType = event.type;
                const eventTimestamp = parseTimestamp(event.timestamp);

                if (prevEvent) {
                    const timeSpent = eventTimestamp - parseTimestamp(prevEvent.timestamp);
                    if (sessionInfo.total_time_per_event[eventType]) {
                        sessionInfo.total_time_per_event[eventType] += timeSpent / 1000;
                    } else {
                        sessionInfo.total_time_per_event[eventType] = timeSpent / 1000;
                    }
                }
                prevEvent = event;

                if (eventType === 'pageview' && event.category) {
                    sessionInfo.pageview_category = event.category;
                }
            });

            const lastEventTimestamp = parseTimestamp(session.events[session.events.length - 1].timestamp);
            const sessionStartTimestamp = parseTimestamp(session.start_timestamp);
            sessionInfo.session_duration_seconds = (lastEventTimestamp - sessionStartTimestamp) / 1000;
            sessionInfo.month = sessionStartTimestamp.toLocaleString('default', { month: 'long' });
            sessionInfo.year = sessionStartTimestamp.getFullYear();

            return sessionInfo;
        });

        window.sessionStorage.setItem("data", JSON.stringify(parsedSessions));
        console.log("formater");
    }, []);

    return null; // Render nothing, since this component only handles side effects
};

const UserEngProcess = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const calculateSessionInfo = () => {
            const updatedResults = data.map(session => {
                const { session_id, start_timestamp, events } = session;
                let pageviews_count = 0;
                let product_views_count = 0;
                let conversions_count = 0;

                events.forEach(event => {
                    if (event.type === 'pageview') {
                        pageviews_count++;
                    } else if (event.type === 'product_view') {
                        product_views_count++;
                    } else if (event.type === 'purchase') {
                        conversions_count++;
                    }
                });

                return {
                    session_id,
                    start_timestamp,
                    'Total Pageviews per Session': pageviews_count,
                    'Total Product Views per Session': product_views_count,
                    'Conversions (Purchases) per Session': conversions_count,
                };
            });

            setResults(updatedResults);
        };

        calculateSessionInfo();
    }, []);
    console.log(results)

    return(<div>
    <UserEngagementChart  data={results} />
  </div>); // Render nothing, since this component only handles side effects
};

export { UserEngProcess };
export default Formater;
