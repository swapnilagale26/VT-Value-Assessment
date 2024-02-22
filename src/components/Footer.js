import React from 'react'

function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <p style={textStyle}>Copyright &copy; {currentYear} • Ventura eLearning Global • Privacy Policy • Terms of Service</p>
      </div>
    </footer>
  );
};

// Styles
const footerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  textAlign: 'center',
  color: "#333333"
};

const contentStyle = {
  maxWidth: '960px',
  margin: '0 auto',
};

const textStyle = {
  fontSize: '14px',
  margin: '0',
};

export default Footer;