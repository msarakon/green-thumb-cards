import React from 'react';
import packageJson from '../../package.json';
import './Footer.css';

const Footer = () => {
    const appVersion = packageJson.version;
    const url = packageJson.repository.url;

    return (
        <div className="footer">
            <div>v{appVersion}</div>
            <div>source at <a href={url} target="_blank" rel="noopener noreferrer">github</a></div>
            <div><a href="mailto:minna.sarakontu@gmail.com">contact me</a></div>
        </div>
    );
};

export default Footer;