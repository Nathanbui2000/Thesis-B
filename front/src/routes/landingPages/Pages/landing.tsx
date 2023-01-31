import React from 'react';
import '../css/style.css';
import '../css/style2.css';
import '../css/general.css';
// import NavBar from '../../../components/navbar/NavBar'
import 'phosphor-icons';
const landing = () => {
    return (
    <React.Fragment>
       
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <code><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
</code>
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Rubik:wght@400;500;600;700&display=swap"
            rel="stylesheet"
        />
        <section className="section-top">
            <div className="centered-container">
                <p>AntiqueIoTChain</p>
                <div className="btn-container">
                    <a href="/Login">
                        <button className="btn" type="button">Sign in</button>
                    </a>
                    <a href="/normal/sign-up">
                        <button className="btn btn-important" type="button">
                            Try for free
                        </button>
                    </a>
                </div>
            </div>
        </section>
        <main className="centered-page">
            <h1 className="heading-primary">AntiqueIoTChain</h1>
            <div className="product-card-container">
                {/* Card 1*/}
                
                <article className="product-card">
                <h2 className="heading-secondary">Antique's Owner</h2>
                <div className="card-content">
                    <ul className="feature-list">
                    <li>
                        <i className="card-icon ph-note-pencil-bold" />
                        <span>Evaluate Your Antique</span>
                    </li>
                    <li>
                        <i className="card-icon ph-circle-wavy-check-bold" />
                        <span>Verify Antique Object</span>
                    </li>
                    <li>
                        <i className="card-icon ph-user-plus-bold" />
                        <span>Talk to our Expert</span>
                    </li>
                    </ul>
                    <div className="btn-centered-container">
                        <a href="/normal/sign-up">
                            <button className="btn btn-important" type="button">
                                Start for free
                            </button>
                        </a>
                    </div>
                </div>
                </article>


                {/* Card 2 */}
                <article className="product-card card--pro">
                <h2 className="heading-secondary">Professional Appraiser</h2>
                <div className="card-content">
                    <ul className="feature-list">
                    <li>
                        <i className="card-icon ph-currency-dollar-bold" />
                        <span>Earn Real Money</span>
                    </li>
                    <li>
                        <i className="card-icon ph-trend-up-bold" />
                        <span>Career Boost</span>
                    </li>
                    <li>
                        <i className="card-icon ph-chart-bar-bold" />
                        <span>Highly Competitive</span>
                    </li>
                    </ul>
                    <div className="btn-centered-container">
                    <a href="/appraiser/sign-up">
                        <button className="btn btn-important" type="button">
                            Start for free
                        </button>
                    </a>
                    </div>
                </div>
                </article>
            </div>
        </main>
    </React.Fragment>
    )
}
export default landing;