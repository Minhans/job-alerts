import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Head from 'next/head';

let socket;

export default function Home({ initialJobs }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState('');

  useEffect(() => {
    socket = io('http://localhost:4000'); // Change if backend hosted elsewhere

    socket.on('newJob', (job) => {
      setJobs(prevJobs => [job, ...prevJobs]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.state.toLowerCase().includes(search.toLowerCase()) ||
    job.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Indian Job Alerts - Real-time UPSC, SSC, PSU Jobs</title>
        <meta name="description" content="Real-time updated job alerts from UPSC, SSC, PSU, Railways in India." />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>

      <main style={{ maxWidth: 900, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
        <h1>Indian Job Alerts - Real-time UPSC, SSC, PSU Jobs</h1>

        {/* Adsense Top */}
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXX"  /* Replace */
            data-ad-slot="YYYYYYYYYY"             /* Replace */
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <script>
            {(adsbygoogle = window.adsbygoogle || []).push({})}
          </script>
        </div>

        <input
          type="search"
          placeholder="Search jobs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: 10, fontSize: 16, marginBottom: 20 }}
          aria-label="Search jobs"
        />

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredJobs.length === 0 && <li>No jobs found.</li>}
          {filteredJobs.map(job => (
            <li key={job.id} style={{
              border: '1px solid #ccc',
              marginBottom: 10,
              padding: 15,
              borderRadius: 6,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <a href={job.url} target="_blank" rel="noopener noreferrer" style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#3f51b5',
                textDecoration: 'none'
              }}>
                {job.title}
              </a>
              <p><strong>State:</strong> {job.state}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Location:</strong> {job.location}</p>
            </li>
          ))}
        </ul>

        {/* Adsense Bottom */}
        <div style={{ margin: '40px 0', textAlign: 'center' }}>
          <ins className="adsbygoogle"
            style={{ display: 'inline-block', width: '728px', height: '90px' }}
            data-ad-client="ca-pub-XXXXXXXXXXXX"  /* Replace */
            data-ad-slot="ZZZZZZZZZZ"></ins>        /* Replace */
          <script>
            {(adsbygoogle = window.adsbygoogle || []).push({})}
          </script>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/api/jobs');
  const initialJobs = await res.json();

  return {
    props: {
      initialJobs,
    },
  };
}
