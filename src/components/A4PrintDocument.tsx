import React from 'react';
import { 
  reportMetadata, 
  preliminarySections, 
  reportChapters, 
  referencesList,
  zitdaOrganogram,
  sampleWebpageProjectCode
} from '../data/reportData';
import { Printer, Download, BookOpen, ShieldCheck, Landmark } from 'lucide-react';

interface A4PrintDocumentProps {
  customMetadata?: typeof reportMetadata;
}

export const A4PrintDocument: React.FC<A4PrintDocumentProps> = ({ customMetadata = reportMetadata }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Print Action Bar (Hidden in Print) */}
      <div className="no-print p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-md flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
              Official Academic Submission Format
            </span>
            <span className="text-xs text-slate-400">Department of Computer Science • FUG</span>
          </div>
          <h3 className="text-base font-bold text-white mt-1">A4 Standard Printable Technical Report</h3>
          <p className="text-xs text-slate-400">
            Formatted strictly for official academic printing, spiral binding, and departmental submission.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-[#0A0B0E] text-xs font-bold shadow-xs transition-all"
          >
            <Printer className="w-4 h-4" />
            Print / Save to PDF (Ctrl+P)
          </button>
        </div>
      </div>

      {/* Main A4 Document Sheet Container */}
      <div className="a4-print-sheet max-w-4xl mx-auto bg-white text-slate-900 font-academic p-8 sm:p-14 sm:shadow-lg border border-slate-200/80 rounded-none sm:rounded-2xl leading-relaxed text-[15px] selection:bg-emerald-100">
        
        {/* ========================================================= */}
        {/* 1. OFFICIAL COVER PAGE / TITLE PAGE                       */}
        {/* ========================================================= */}
        <section className="min-h-[920px] flex flex-col justify-between text-center py-10 page-break-after border-b sm:border-none pb-12">
          {/* Header University Institution */}
          <div className="space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-900 text-white flex items-center justify-center font-cinzel font-bold text-xl border-2 border-emerald-600 mb-2">
              FUG
            </div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-slate-950 uppercase">
              {customMetadata.institution}
            </h1>
            <h2 className="text-base sm:text-lg font-semibold tracking-wide text-slate-800 uppercase">
              {customMetadata.department}
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest">
              Faculty of Science • Gusau, Zamfara State
            </p>
          </div>

          {/* Main Title Block */}
          <div className="my-10 space-y-4 py-8 border-y-2 border-slate-900">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-950">
              {customMetadata.title}
            </h2>
            <p className="text-xs sm:text-sm font-serif italic text-slate-700 max-w-xl mx-auto leading-relaxed">
              {customMetadata.reportType}
            </p>
            <h3 className="font-bold text-base sm:text-lg uppercase text-emerald-950 tracking-wide">
              {customMetadata.establishment}, {customMetadata.location}, {customMetadata.state}
            </h3>
          </div>

          {/* Author / Candidate Details */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">BY</p>
            <div className="space-y-1">
              <p className="font-bold text-lg text-slate-950 uppercase tracking-wider">
                {customMetadata.studentName}
              </p>
              <p className="font-mono text-sm font-semibold text-slate-800">
                MATRICULATION NUMBER: {customMetadata.matricNumber}
              </p>
            </div>
          </div>

          {/* Submission Purpose & Dates */}
          <div className="space-y-4 pt-6 text-xs sm:text-sm text-slate-700">
            <p className="max-w-md mx-auto leading-relaxed">
              SUBMITTED TO {customMetadata.submissionTarget} {customMetadata.purpose}
            </p>

            <div className="pt-3 border-t border-slate-200 max-w-sm mx-auto flex justify-between text-xs font-serif text-slate-600">
              <span><strong>START DATE:</strong> {customMetadata.startDate}</span>
              <span><strong>END DATE:</strong> {customMetadata.endDate}</span>
            </div>
            <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              SIWES DURATION: {customMetadata.duration}
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. DECLARATION                                            */}
        {/* ========================================================= */}
        <section className="page-break-after py-8 space-y-6 pt-10">
          <div className="text-center border-b border-slate-300 pb-3">
            <h2 className="font-cinzel text-lg font-bold uppercase tracking-wider text-slate-950">
              {preliminarySections.declaration.title}
            </h2>
          </div>

          <p className="text-justify leading-loose indent-8">
            {preliminarySections.declaration.text}
          </p>

          <p className="text-justify leading-loose indent-8">
            {preliminarySections.declaration.subtext}
          </p>

          <p className="text-justify leading-loose indent-8">
            {preliminarySections.declaration.closing}
          </p>

          <div className="pt-16 max-w-md space-y-4 text-sm font-serif">
            <div className="flex justify-between py-1">
              <span>Name:</span>
              <span className="font-bold">{customMetadata.studentName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Matric Number:</span>
              <span className="font-mono font-bold">{customMetadata.matricNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dotted border-slate-600">
              <span>Signature:</span>
              <span className="italic text-slate-400">___________________________</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dotted border-slate-600">
              <span>Date:</span>
              <span className="italic text-slate-400">___________________________</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. CERTIFICATION                                          */}
        {/* ========================================================= */}
        <section className="page-break-after py-8 space-y-6 pt-10">
          <div className="text-center border-b border-slate-300 pb-3">
            <h2 className="font-cinzel text-lg font-bold uppercase tracking-wider text-slate-950">
              {preliminarySections.certification.title}
            </h2>
          </div>

          <p className="text-justify leading-loose indent-8">
            {preliminarySections.certification.text}
          </p>

          <p className="text-justify leading-loose indent-8">
            {preliminarySections.certification.subtext}
          </p>

          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 gap-12 text-sm font-serif">
            {/* SIWES Industry Supervisor */}
            <div className="space-y-4">
              <div className="border-t border-slate-800 pt-2">
                <p className="font-bold text-slate-950">SIWES Industry Supervisor</p>
                <p className="text-xs text-slate-600">Zamfara IT Development Agency (ZITDA)</p>
              </div>
              <p className="text-xs">Signature: __________________________</p>
              <p className="text-xs">Date: __________________________</p>
            </div>

            {/* Institutional Supervisor */}
            <div className="space-y-4">
              <div className="border-t border-slate-800 pt-2">
                <p className="font-bold text-slate-950">Institutional SIWES Supervisor</p>
                <p className="text-xs text-slate-600">Department of Computer Science, FUG</p>
              </div>
              <p className="text-xs">Signature: __________________________</p>
              <p className="text-xs">Date: __________________________</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. ACKNOWLEDGEMENT                                        */}
        {/* ========================================================= */}
        <section className="page-break-after py-8 space-y-6 pt-10">
          <div className="text-center border-b border-slate-300 pb-3">
            <h2 className="font-cinzel text-lg font-bold uppercase tracking-wider text-slate-950">
              {preliminarySections.acknowledgement.title}
            </h2>
          </div>

          {preliminarySections.acknowledgement.paragraphs.map((p, idx) => (
            <p key={idx} className="text-justify leading-loose indent-8">
              {p}
            </p>
          ))}
        </section>

        {/* ========================================================= */}
        {/* TABLE OF CONTENTS                                         */}
        {/* ========================================================= */}
        <section className="page-break-after py-8 space-y-4 pt-10">
          <div className="text-center border-b border-slate-300 pb-3 mb-6">
            <h2 className="font-cinzel text-lg font-bold uppercase tracking-wider text-slate-950">
              TABLE OF CONTENTS
            </h2>
          </div>

          <div className="space-y-2 text-sm font-serif">
            <div className="flex justify-between border-b border-dotted border-slate-300 py-1 font-bold">
              <span>TITLE PAGE</span>
              <span>i</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-slate-300 py-1 font-bold">
              <span>DECLARATION</span>
              <span>ii</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-slate-300 py-1 font-bold">
              <span>CERTIFICATION</span>
              <span>iii</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-slate-300 py-1 font-bold">
              <span>ACKNOWLEDGEMENT</span>
              <span>iv</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-slate-300 py-1 font-bold">
              <span>TABLE OF CONTENTS</span>
              <span>v</span>
            </div>

            {/* Chapters In TOC */}
            {reportChapters.map((chap, cIdx) => (
              <div key={chap.id} className="pt-2">
                <div className="flex justify-between font-bold text-slate-900 border-b border-slate-200 py-1">
                  <span>{chap.chapterNumber}: {chap.title}</span>
                  <span>{cIdx + 1}</span>
                </div>
                <div className="pl-4 space-y-1 pt-1 text-slate-700 text-xs">
                  {chap.sections.map((sec) => (
                    <div key={sec.id} className="flex justify-between border-b border-dotted border-slate-200 py-0.5">
                      <span>{sec.number} {sec.title}</span>
                      <span className="text-slate-400">...</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between border-b border-dotted border-slate-300 py-1 font-bold pt-3">
              <span>REFERENCES</span>
              <span>{reportChapters.length + 1}</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CHAPTER ONE: INTRODUCTION                              */}
        {/* ========================================================= */}
        <section className="page-break-after py-8 space-y-6 pt-10">
          <div className="text-center border-b-2 border-slate-900 pb-3 mb-6">
            <h3 className="font-cinzel text-base font-bold uppercase tracking-wider text-slate-950">
              CHAPTER ONE
            </h3>
            <h4 className="font-cinzel text-lg font-bold uppercase tracking-wider text-emerald-950">
              INTRODUCTION AND BACKGROUND OF ESTABLISHMENT
            </h4>
          </div>

          {/* 1.1 Brief History of SIWES */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-950">1.1 BRIEF HISTORY OF SIWES</h4>
            {reportChapters[0].sections[0].paragraphs?.map((p, idx) => (
              <p key={idx} className="text-justify leading-loose indent-8">
                {p}
              </p>
            ))}
          </div>

          {/* 1.2 Brief History of Establishment */}
          <div className="space-y-3 pt-3">
            <h4 className="font-bold text-slate-950">1.2 BRIEF HISTORY OF THE ESTABLISHMENT WHERE SIWES WAS UNDERTAKEN</h4>
            {reportChapters[0].sections[1].paragraphs?.map((p, idx) => (
              <p key={idx} className="text-justify leading-loose indent-8">
                {p}
              </p>
            ))}
          </div>

          {/* 1.3 Objectives of SIWES */}
          <div className="space-y-3 pt-3">
            <h4 className="font-bold text-slate-950">1.3 OBJECTIVES OF SIWES</h4>
            <p className="text-justify leading-loose">The major objectives of SIWES include:</p>
            <ol className="list-decimal pl-10 space-y-1.5 leading-relaxed">
              {reportChapters[0].sections[2].bulletPoints?.map((item, idx) => (
                <li key={idx} className="text-justify">{item}</li>
              ))}
            </ol>
          </div>

          {/* 1.4 Mandate, Mission, Vision and Objectives of ZITDA */}
          <div className="space-y-4 pt-3">
            <h4 className="font-bold text-slate-950">1.4 MANDATE, MISSION, VISION AND OBJECTIVES OF ZITDA</h4>
            
            <div className="pl-4 space-y-3">
              <div>
                <strong className="block text-slate-900">Mandate:</strong>
                <p className="text-justify leading-loose">
                  The mandate of ZITDA is to promote the development and effective use of Information and Communication Technology in Zamfara State.
                </p>
              </div>

              <div>
                <strong className="block text-slate-900">Mission:</strong>
                <p className="text-justify leading-loose">
                  The mission of ZITDA is to promote digital transformation, digital skills development, e-government and ICT infrastructure for the benefit of the people of Zamfara State.
                </p>
              </div>

              <div>
                <strong className="block text-slate-900">Vision:</strong>
                <p className="text-justify leading-loose">
                  The vision of ZITDA is to promote Zamfara State as a technologically developed and digitally empowered state through ICT education, innovation and digital transformation.
                </p>
              </div>

              <div>
                <strong className="block text-slate-900">Objectives:</strong>
                <p className="text-justify mb-2">The objectives of ZITDA include:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Promoting digital literacy and ICT skills.</li>
                  <li>Supporting digital transformation in government.</li>
                  <li>Developing ICT infrastructure.</li>
                  <li>Encouraging technological innovation.</li>
                  <li>Promoting cybersecurity awareness.</li>
                  <li>Supporting e-government services.</li>
                  <li>Empowering young people and citizens through digital skills.</li>
                  <li>Encouraging the use of technology for economic and social development.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 1.5 Organogram */}
          <div className="space-y-4 pt-4 avoid-break">
            <h4 className="font-bold text-slate-950">1.5 ORGANOGRAM OF THE ESTABLISHMENT</h4>
            <p className="text-justify leading-loose">
              The organizational structure of ZITDA can generally be represented as follows:
            </p>

            <div className="p-4 bg-slate-50 border border-slate-300 font-mono text-xs text-slate-900 leading-relaxed text-center rounded-lg space-y-2">
              <div className="font-bold p-2 bg-emerald-100 border border-emerald-300 inline-block rounded">
                EXECUTIVE SECRETARY
              </div>
              <div>↓</div>
              <div className="grid grid-cols-2 gap-2 text-left p-2 bg-white border border-slate-200">
                <div>• ADMINISTRATION & HUMAN RESOURCES</div>
                <div>• FINANCE & ACCOUNTS</div>
                <div>• PROCUREMENT</div>
                <div>• AUDIT</div>
                <div>• INFORMATION & COMMUNICATION TECHNOLOGY (ICT)
                  <div className="pl-4 text-[11px] text-slate-600">- IT & Infrastructure Solutions</div>
                  <div className="pl-4 text-[11px] text-slate-600">- Cybersecurity</div>
                </div>
                <div>• DIGITAL ECONOMY
                  <div className="pl-4 text-[11px] text-slate-600">- Digital Literacy & Capacity Building</div>
                  <div className="pl-4 text-[11px] text-slate-600">- E-Government</div>
                </div>
                <div className="col-span-2">• MEDIA, CORRESPONDENCE & STRATEGY</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. CHAPTER TWO: ACTIVITIES AND INDUSTRIAL EXPERIENCE       */}
        {/* ========================================================= */}
        <section className="page-break-after py-8 space-y-6 pt-10">
          <div className="text-center border-b-2 border-slate-900 pb-3 mb-6">
            <h3 className="font-cinzel text-base font-bold uppercase tracking-wider text-slate-950">
              CHAPTER TWO
            </h3>
            <h4 className="font-cinzel text-lg font-bold uppercase tracking-wider text-emerald-950">
              ACTIVITIES AND INDUSTRIAL EXPERIENCE
            </h4>
          </div>

          {/* 2.1 Activities Engaged In */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-950">2.1 DIFFERENT ACTIVITIES ENGAGED IN DURING THE SIWES EXERCISE</h4>
            <p className="text-justify leading-loose">
              During my SIWES training at ZITDA, I was exposed to several ICT-related activities. These included:
            </p>
            <ol className="list-decimal pl-10 space-y-1 leading-relaxed">
              {reportChapters[1].sections[0].bulletPoints?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          </div>

          {/* 2.2 In-Depth Description */}
          <div className="space-y-4 pt-3">
            <h4 className="font-bold text-slate-950">2.2 IN-DEPTH DESCRIPTION OF THE ACTIVITIES CARRIED OUT</h4>

            <div className="space-y-3">
              <strong className="block text-slate-900">Computer Hardware:</strong>
              <p className="text-justify leading-loose indent-8">
                I learned about computer hardware components such as the motherboard, RAM, hard disk/SSD, processor, power supply unit, keyboard, mouse and monitor. I also learned the functions of the different components.
              </p>
            </div>

            <div className="space-y-3">
              <strong className="block text-slate-900">Software Installation:</strong>
              <p className="text-justify leading-loose indent-8">
                I learned how to install and uninstall computer applications. I also learned the importance of keeping computer software updated and using appropriate applications.
              </p>
            </div>

            <div className="space-y-3">
              <strong className="block text-slate-900">Computer Maintenance:</strong>
              <p className="text-justify leading-loose indent-8">
                I was introduced to basic computer maintenance procedures. This included cleaning computer components, checking connections, managing storage space and maintaining proper system performance.
              </p>
            </div>

            <div className="space-y-3">
              <strong className="block text-slate-900">Troubleshooting:</strong>
              <p className="text-justify leading-loose indent-8">
                I learned basic methods of identifying and solving common computer problems. I learned how to check cables, restart systems, inspect software settings and identify possible causes of system problems.
              </p>
            </div>

            <div className="space-y-3">
              <strong className="block text-slate-900">Networking:</strong>
              <p className="text-justify leading-loose indent-8">
                I learned the basic concepts of computer networking and the functions of devices such as routers, switches and network cables. I also learned about LAN and basic network connections.
              </p>
            </div>

            <div className="space-y-3">
              <strong className="block text-slate-900">Web Development:</strong>
              <p className="text-justify leading-loose indent-8">
                I was introduced to HTML and CSS. I learned how HTML is used to structure webpages while CSS is used to improve their appearance and presentation.
              </p>
            </div>

            <div className="space-y-3">
              <strong className="block text-slate-900">Cybersecurity:</strong>
              <p className="text-justify leading-loose indent-8">
                I learned basic cybersecurity practices such as creating strong passwords, avoiding suspicious links, protecting information and using computer systems responsibly.
              </p>
            </div>
          </div>

          {/* 2.3 Relevance to Computer Science */}
          <div className="space-y-3 pt-3">
            <h4 className="font-bold text-slate-950">2.3 RELEVANCE OF THE ACTIVITIES TO MY COURSE OF STUDY</h4>
            <p className="text-justify leading-loose indent-8">
              The activities carried out during my SIWES training were highly relevant to my course of study, Computer Science.
            </p>
            <p className="text-justify leading-loose indent-8">
              The training helped me connect the theoretical knowledge acquired in the classroom with practical applications. I improved my understanding of computer systems, networking, software, web development and cybersecurity.
            </p>
            <p className="text-justify leading-loose indent-8">
              The experience also improved my problem-solving, communication, teamwork and technical skills, which are important for my future career as a Computer Science student.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. CHAPTER THREE: SPECIAL PROJECT                         */}
        {/* ========================================================= */}
        <section className="page-break-after py-8 space-y-6 pt-10">
          <div className="text-center border-b-2 border-slate-900 pb-3 mb-6">
            <h3 className="font-cinzel text-base font-bold uppercase tracking-wider text-slate-950">
              CHAPTER THREE
            </h3>
            <h4 className="font-cinzel text-lg font-bold uppercase tracking-wider text-emerald-950">
              SPECIAL PROJECT / EXPERIMENT CARRIED OUT DURING SIWES
            </h4>
          </div>

          {/* 3.1 & 3.2 Title */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-950">3.1 SPECIAL PROJECT/EXPERIMENT CARRIED OUT DURING THE SIWES</h4>
            <p className="text-justify leading-loose indent-8">
              During my SIWES programme, I carried out practical activities involving basic computer networking and web development.
            </p>
            
            <h4 className="font-bold text-slate-950 pt-2">3.2 TITLE OF PROJECT</h4>
            <p className="font-bold text-center p-3 bg-slate-50 border border-slate-200 text-slate-900 uppercase">
              BASIC COMPUTER NETWORKING AND DEVELOPMENT OF A SIMPLE INFORMATION WEBPAGE
            </p>
          </div>

          {/* 3.3 Objectives of Project */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-950">3.3 OBJECTIVES OF THE PROJECT</h4>
            <p className="text-justify">The objectives of the project were:</p>
            <ol className="list-decimal pl-10 space-y-1">
              <li>To understand the basic principles of computer networking.</li>
              <li>To identify common networking devices.</li>
              <li>To understand how computers communicate through a network.</li>
              <li>To develop a simple webpage using HTML and CSS.</li>
              <li>To apply theoretical Computer Science knowledge to practical activities.</li>
              <li>To improve my technical and problem-solving skills.</li>
            </ol>
          </div>

          {/* 3.4 Introduction & 3.5 Principle */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-950">3.4 INTRODUCTION</h4>
            <p className="text-justify leading-loose indent-8">
              Computer networking involves connecting computers and other devices so that they can communicate and share resources.
            </p>
            <p className="text-justify leading-loose indent-8">
              Web development involves creating and designing websites or webpages. HTML is used to provide the structure of a webpage, while CSS is used to style and organize its appearance.
            </p>
            <p className="text-justify leading-loose indent-8">
              The practical project helped me understand how networking and web technologies can be applied in a professional ICT environment.
            </p>

            <h4 className="font-bold text-slate-950 pt-2">3.5 PRINCIPLE</h4>
            <p className="text-justify leading-loose indent-8">
              The principle of networking is based on communication between connected devices using appropriate hardware, software and communication protocols.
            </p>
            <p className="text-justify leading-loose indent-8">
              In web development, HTML is used to create the structure of a webpage, while CSS is used to control its presentation and appearance.
            </p>
          </div>

          {/* 3.6 Requirements/Materials */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-950">3.6 REQUIREMENTS/MATERIALS NEEDED</h4>
            <p className="text-justify">The materials and tools used included:</p>
            <ul className="list-disc pl-10 space-y-1">
              <li>Computer system</li>
              <li>Keyboard and mouse</li>
              <li>Network cables</li>
              <li>Router</li>
              <li>Network switch</li>
              <li>Internet connection</li>
              <li>Web browser</li>
              <li>Text/code editor</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>Power supply</li>
            </ul>
          </div>

          {/* 3.7 Procedures */}
          <div className="space-y-4 pt-2">
            <h4 className="font-bold text-slate-950">3.7 PROCEDURES</h4>
            
            <div>
              <strong className="block text-slate-900 mb-1">Networking Procedure:</strong>
              <ol className="list-decimal pl-10 space-y-1">
                <li>The networking devices were identified.</li>
                <li>Network cables were checked.</li>
                <li>Computers were connected to the network.</li>
                <li>The network connection was tested.</li>
                <li>Basic troubleshooting was carried out where necessary.</li>
              </ol>
            </div>

            <div>
              <strong className="block text-slate-900 mb-1">Web Development Procedure:</strong>
              <ol className="list-decimal pl-10 space-y-1">
                <li>A code editor was opened.</li>
                <li>A basic HTML document was created.</li>
                <li>Headings and paragraphs were added.</li>
                <li>Links and other webpage elements were included.</li>
                <li>CSS was used to improve the appearance of the webpage.</li>
                <li>The webpage was saved.</li>
                <li>The webpage was opened in a browser for testing.</li>
                <li>Errors were identified and corrected.</li>
              </ol>
            </div>
          </div>

          {/* 3.8 Results/Observations & 3.9 Conclusion */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-950">3.8 RESULTS/OBSERVATIONS</h4>
            <p className="text-justify leading-loose indent-8">
              The practical activities were successfully carried out. I was able to understand the basic operation of a computer network and identify common networking equipment.
            </p>
            <p className="text-justify leading-loose indent-8">
              I also created and tested a simple webpage using HTML and CSS. The practical work improved my understanding of how ICT concepts are applied in real working environments.
            </p>

            <h4 className="font-bold text-slate-950 pt-2">3.9 CONCLUSION AND RECOMMENDATIONS</h4>
            <p className="text-justify leading-loose indent-8">
              The project provided me with practical knowledge of basic networking and web development. It also improved my ability to identify problems, follow technical procedures and apply Computer Science knowledge to practical tasks.
            </p>
            <p className="text-justify leading-loose indent-8">
              I recommend that students should be given more practical sessions during SIWES to enable them to develop stronger technical skills.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. CHAPTER FOUR: SUMMARY, CONCLUSION & RECOMMENDATIONS    */}
        {/* ========================================================= */}
        <section className="page-break-after py-8 space-y-6 pt-10">
          <div className="text-center border-b-2 border-slate-900 pb-3 mb-6">
            <h3 className="font-cinzel text-base font-bold uppercase tracking-wider text-slate-950">
              CHAPTER FOUR
            </h3>
            <h4 className="font-cinzel text-lg font-bold uppercase tracking-wider text-emerald-950">
              SUMMARY, CONCLUSION AND RECOMMENDATIONS
            </h4>
          </div>

          {/* 4.1 Summary */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-950">4.1 SUMMARY</h4>
            <p className="text-justify leading-loose indent-8">
              My SIWES training at Zamfara Information Technology Development Agency (ZITDA) was a valuable practical learning experience.
            </p>
            <p className="text-justify leading-loose indent-8">
              During the training, I was exposed to computer hardware and software, computer maintenance, troubleshooting, networking, web development, database concepts and cybersecurity awareness.
            </p>
            <p className="text-justify leading-loose indent-8">
              The training enabled me to understand how Computer Science and ICT knowledge are applied in a professional working environment.
            </p>
            <p className="text-justify leading-loose indent-8">
              It also helped me improve my communication, teamwork, technical and problem-solving skills.
            </p>
          </div>

          {/* 4.2 Conclusion */}
          <div className="space-y-3 pt-3">
            <h4 className="font-bold text-slate-950">4.2 CONCLUSION WITH EMPHASIS ON SIGNIFICANT KNOWLEDGE ACQUIRED AND CHALLENGES ENCOUNTERED</h4>
            <p className="text-justify leading-loose indent-8">
              The SIWES programme was very useful in developing my practical knowledge and understanding of Computer Science and ICT.
            </p>
            <p className="text-justify leading-loose indent-8">
              Some of the significant knowledge and skills I acquired include computer maintenance, networking, software installation, troubleshooting, HTML and CSS, cybersecurity awareness and professional workplace practices.
            </p>
            <p className="text-justify leading-loose indent-8">
              During the training, I encountered some challenges such as difficulty understanding certain technical concepts at the beginning, limited practical time and occasional equipment or network-related problems.
            </p>
            <p className="text-justify leading-loose indent-8">
              However, with the guidance of my supervisors, continuous practice and willingness to learn, I was able to overcome many of these challenges.
            </p>
          </div>

          {/* 4.3 Suggestions & Recommendations */}
          <div className="space-y-3 pt-3">
            <h4 className="font-bold text-slate-950">4.3 SUGGESTIONS AND RECOMMENDATIONS</h4>
            <p className="text-justify leading-loose">
              Based on my experience during the SIWES programme, I recommend the following:
            </p>
            <ol className="list-decimal pl-10 space-y-1.5 leading-relaxed">
              <li>Students should be given more practical opportunities during SIWES.</li>
              <li>SIWES organizations should provide adequate ICT equipment for students.</li>
              <li>Students should participate actively in practical activities.</li>
              <li>Institutions should monitor students regularly during SIWES.</li>
              <li>More training should be provided in modern areas such as cybersecurity, cloud computing, networking, software development and artificial intelligence.</li>
              <li>Students should maintain proper records of their daily activities.</li>
              <li>Supervisors should continue to guide students throughout their industrial training.</li>
            </ol>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. REFERENCES                                             */}
        {/* ========================================================= */}
        <section className="py-8 space-y-6 pt-10">
          <div className="text-center border-b-2 border-slate-900 pb-3 mb-6">
            <h3 className="font-cinzel text-base font-bold uppercase tracking-wider text-slate-950">
              REFERENCES
            </h3>
          </div>

          <div className="space-y-4 text-sm font-serif">
            {referencesList.map((ref, idx) => (
              <p key={idx} className="text-justify pl-8 -indent-8 leading-relaxed">
                {ref.author}. ({ref.year}). <em>{ref.title}</em>. {ref.publisher}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
