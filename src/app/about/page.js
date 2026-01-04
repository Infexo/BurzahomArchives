// app/about/page.js
export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        <h1>About This Library</h1>
        
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            This library is a focused, non-commercial knowledge repository created to 
            consolidate specialized materials that were previously scattered across 
            multiple sources and locations. Many of these resources were fragmented, 
            difficult to locate, or inconsistently preserved. We have systematically 
            collected, organized, and curated them into a single, structured archive 
            to improve discoverability, continuity, and long-term access.
          </p>
        </section>

        <section className="purpose">
          <h2>Purpose</h2>
          <p>
            The purpose of this project is educational and archival. It exists to 
            support learners, researchers, and practitioners by reducing access 
            barriers within this niche domain. The work of original authors and 
            publishers is acknowledged, and where practical legal alternatives exist, 
            users are encouraged to support original sources.
          </p>
        </section>

        <section className="principles">
          <h2>Guiding Principles</h2>
          <p>
            This repository does not aim to replace publishers or institutions. It 
            functions as a supplementary archive in the public interest, prioritizing 
            preservation, organization, and equitable access to knowledge.
          </p>
        </section>

        <section className="support">
          <h2>Supporting Original Work</h2>
          <p>
            We encourage users to support original authors and publishers whenever 
            possible. This archive serves as a bridge where official channels may 
            be inaccessible, discontinued, or prohibitively expensive.
          </p>
        </section>
      </div>
    </div>
  )
}