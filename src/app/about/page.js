// app/about/page.tsx
export default function About() {
  return (
    <div className="archive-container py-12">
      <div className="max-w-4xl mx-auto px-4">
        
        <h1 className="text-4xl md:text-5xl font-bold text-archive-accent mb-8 border-b-2 border-archive-tan pb-4">
          About This Library
        </h1>
        
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-archive-accent mb-4">
            Our Mission
          </h2>
          <p className="text-base md:text-lg text-archive-accent leading-relaxed">
            This library is a focused, non-commercial knowledge repository created to 
            consolidate specialized materials that were previously scattered across 
            multiple sources and locations. Many of these resources were fragmented, 
            difficult to locate, or inconsistently preserved. We have systematically 
            collected, organized, and curated them into a single, structured archive 
            to improve discoverability, continuity, and long-term access.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-archive-accent mb-4">
            Purpose
          </h2>
          <p className="text-base md:text-lg text-archive-accent leading-relaxed">
            The purpose of this project is educational and archival. It exists to 
            support learners, researchers, and practitioners by reducing access 
            barriers within this niche domain. The work of original authors and 
            publishers is acknowledged, and where practical legal alternatives exist, 
            users are encouraged to support original sources.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-archive-accent mb-4">
            Guiding Principles
          </h2>
          <p className="text-base md:text-lg text-archive-accent leading-relaxed">
            This repository does not aim to replace publishers or institutions. It 
            functions as a supplementary archive in the public interest, prioritizing 
            preservation, organization, and equitable access to knowledge.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-archive-accent mb-4">
            Supporting Original Work
          </h2>
          <p className="text-base md:text-lg text-archive-accent leading-relaxed">
            We encourage users to support original authors and publishers whenever 
            possible. This archive serves as a bridge where official channels may 
            be inaccessible, discontinued, or prohibitively expensive.
          </p>
        </section>

      </div>
    </div>
  )
}