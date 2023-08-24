import React from 'react';
import Image from 'next/image';
import Lauren from '../img/Lauren.jpeg';
import deiosha from '../img/deiosha.JPG';
import jerry from '../img/jerry.jpeg';
import manuch from '../img/manuch.jpeg';

export default function AboutUs() {
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const contentContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px', 
    padding: '20px',
    border: '1px solid #ccc', 
    borderRadius: '8px', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
  };

  const centeredStyle = {
    textAlign: 'center',
    marginBottom: '10px', 
  };

  const imageStyle = {
    width: '200px', 
    height: '200px', 
    objectFit: 'cover', 
    borderRadius: '50%', 
  };

  const linkStyle = {
    textDecoration: 'none', 
    color: '#0070f3', 
    fontWeight: 'bold', 
    marginLeft: '5px', 
  };

  const teamMembers = [
    {
      name: 'Deiosha Sparks',
      image: deiosha,
      githubLink: 'https://github.com/Deiosha',
      linkedinLink: 'https://www.linkedin.com/in/deiosha-sparks-954882251/',
    },
    {
      name: 'Jerry Barrows-Fitzgerald',
      image: jerry,
      githubLink: 'https://github.com/jbarrfitz',
      linkedinLink:'https://www.linkedin.com/in/jbarrowsfitzgerald/',
    },
    {
      name: 'Lauren Main',
      image: Lauren,
      githubLink: 'https://github.com/elleem',
      linkedinLink:'https://www.linkedin.com/in/laurenmain28/',
    },
    {
      name: 'Manuch Sadri',
      image: manuch,
      githubLink: 'https://github.com/mcsadri',
      linkedinLink: 'https://www.linkedin.com/in/manuch-sadri/',
    },
  ];

  return (
    <div>
      <h2 style={centeredStyle}>About Us</h2>
      <div style={containerStyle}>
        {teamMembers.map((member, index) => (
          <div key={index} style={contentContainerStyle}>
            <h3 style={centeredStyle}>{member.name}</h3>
            <div style={centeredStyle}>
              <Image src={member.image} alt={member.name} style={imageStyle} />
            </div>
            <p>
              GitHub{' '}
              <a
                href={member.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                here
              </a>
              {member.linkedinLink && (
                <span>
                  , LinkedIn{' '}
                  <a
                    href={member.linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                  >
                    here
                  </a>
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
