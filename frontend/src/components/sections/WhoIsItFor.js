import React from 'react';
import './WhoIsItFor.css';
import { Users, Sprout, School, Home } from 'lucide-react';

function WhoIsItFor() {
  const users = [
    {
      emoji: '👨‍🌾',
      title: 'Farmers',
      icon: <Sprout size={32} />,
      items: ['Heat awareness', 'Rainfall monitoring', 'Water planning', 'Weather-sensitive decisions']
    },
    {
      emoji: '🏫',
      title: 'Schools',
      icon: <School size={32} />,
      items: ['Heat-risk awareness', 'Outdoor activity planning', 'Weather alerts']
    },
    {
      emoji: '👨‍👩‍👧',
      title: 'Communities',
      icon: <Home size={32} />,
      items: ['Understand local climate conditions', 'Receive risk alerts', 'Prepare for extreme weather']
    },
    {
      emoji: '🏛️',
      title: 'Local Decision-Makers',
      icon: <Users size={32} />,
      items: ['Monitor environmental conditions', 'Identify emerging risks', 'Support preparedness and response']
    }
  ];

  return (
    <section className="who-is-it-for">
      <div className="container">
        <div className="section-header">
          <h2>Who Is It For?</h2>
          <p className="tagline">Climate360 serves communities, not just weather enthusiasts</p>
        </div>

        <div className="users-grid">
          {users.map((user, idx) => (
            <div key={idx} className="user-card">
              <div className="user-emoji">{user.emoji}</div>
              <div className="user-icon">{user.icon}</div>
              <h3>{user.title}</h3>
              <ul>
                {user.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhoIsItFor;
