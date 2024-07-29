import React from 'react';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#streams">Streams</a></li>
        <li><a href="#revenue">Revenue</a></li>
        <li><a href="#audience">Audience</a></li>
        <li><a href="#social">Social Media</a></li>
      </ul>
    </nav>
  );
};

export default Sidebar;