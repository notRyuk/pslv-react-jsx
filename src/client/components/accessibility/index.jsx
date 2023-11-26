import React from 'react';
import Footer from '../footer';

const Accessibility = () => {
    return (
        <>

            <h1 className="card" style={{ color: 'white', width: '90%', margin: '0 auto', marginTop: '5rem', textAlign: 'center', fontSize: '3rem' }}>
                Accessibility
            </h1>
            <main className="twoColumnGrid">
                <div className="leftContent">
                    <div className="card">
                        <h2 style={{ lineHeight: 1.2, marginBottom: '1rem' }}>
                            Mascot is a platform that aims to provide equal opportunities for all members of the global workforce.
                        </h2>
                        <h4 style={{ marginBottom: '2rem', color: '#aaa1a1' }}>
                            Whether you are looking for a job or trying to network with like-minded professionals, Mascot's community is designed to be inclusive and diverse.
                        </h4>
                        <h5 style={{ marginBottom: '0.5rem' }}>
                            The platform understands that every member has unique goals, ideas, and abilities, and it is committed to making accessibility and inclusive design a part of its core principles.
                        </h5>
                        <h5 style={{ marginbottom: '3rem' }}>
                            One of the main features that sets Mascot apart is its commitment to accessibility. The platform has been built from the ground up to ensure that everyone can use it, regardless of any physical or cognitive disabilities they may have. Mascot has integrated several accessibility features into its design to make it easier for everyone to use the platform.
                        </h5>
                        <h6 style={{ marginBottom: '1.5rem' }}>
                            Mascot has incorporated keyboard navigation into its platform, making it possible for users to navigate the platform using only their keyboard. This feature is especially helpful for users who cannot use a mouse or other pointing device to access the platform's features.
                        </h6>
                        <h6 style={{ marginbottom: '1.5rem' }}>
                            Another important accessibility feature is keyboard navigation and screen reader compatibility, Mascot has also implemented several other accessibility features, including alt text descriptions for images, closed captions for videos. All of these features are designed to make it easier for users with disabilities to access the platform's content and features.
                        </h6>
                        <h6 style={{ marginbottom: '1.5rem' }}>
                            Mascot is also committed to continuous improvement of its accessibility features. The platform's teams are constantly working to improve the user experience for all its products. They welcome feedback from members and customers to make the platform even better. If a member encounters an accessibility bug or has difficulty using Mascot's products with assistive technology, they can contact the platform for assistance.
                        </h6>
                        <h6 style={{ marginbottom: '1.5rem' }}>
                            Mascot recognizes that accessibility is not just a checkbox to tick off; it is an ongoing process. The platform is always looking for ways to improve its accessibility features, and it believes that this journey is a collaborative effort between its teams and its members. Mascot's commitment to accessibility is reflected in its efforts to build an inclusive and accessible community, where all members can connect and advance their professional goals.</h6>
                    </div>
                </div>
                <div className="rightContent">
                    <Footer></Footer>
                </div>
            </main>
        </>
    );
};

export default Accessibility;
