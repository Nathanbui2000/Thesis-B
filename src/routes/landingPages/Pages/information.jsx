import React from 'react';
import '../css/style.css';
import '../css/style2.css';
import '../css/general.css';

function information() {
    return (
        <>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Landing page" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Rubik:wght@400;500;600;700&display=swap"
        rel="stylesheet"
        />
        <link href="css/style.css" rel="stylesheet" />
        <link href="css/media.css" rel="stylesheet" />
        <link href="css/general.css" rel="stylesheet" />
        <title>Home page</title>
        <section className="section-top">
        <div className="centered-container">
            <p>AntiqueIoTChain</p>
            <div className="btn-container">
            <a href="/login">
            <button 
            className="btn"
            type="button"
            hef ="/login"
            >
                Sign in
            </button>
            </a>    
            <a href="/login">
                <button className="btn btn-important" type="button">
                Try for free
                </button>
            </a>
            </div>
        </div>
        </section>
        <main>
        <div className="centered-container">
            <div className="summary-container">
            <h1 className="heading-primary">Secure Your Antique Ownership</h1>
            <p className="product-description">Hello World</p>
            <div className="btn-container">
                <a href="/login">
                <button className="btn btn-important" type="button">
                    Try for free
                </button>
                </a>
                <a href="appointment.html">
                <button className="btn" type="button">
                    Make Appointment
                </button>
                </a>
            </div>
            </div>
            <section className="section-bot">
            <div className="feature">
                <div>
                <i className="ph-lock-key-bold icon" />
                <h2 className="heading-secondary">
                    Highly Secure Blockchain Application
                </h2>
                </div>
                <p className="feature-description">Icon1</p>
            </div>
            <div className="feature">
                <div>
                <i className="ph-money-bold icon" />
                <h2 className="heading-secondary">Evaluate Your Antique's Price</h2>
                </div>
                <p className="feature-description">Icon2</p>
            </div>
            <div className="feature">
                <div>
                <i className="ph-identification-card-bold icon" />
                <h2 className="heading-secondary">Ownership Verification</h2>
                </div>
                <p className="feature-description">Icon3</p>
            </div>
            <div className="feature">
                <div>
                <i className="ph-number-circle-one-bold icon" />
                <h2 className="heading-secondary">Top Leading Industry</h2>
                </div>
                <p className="feature-description">Icon4</p>
            </div>
            </section>
        </div>
        </main>
        </>

    )
}
export default information;