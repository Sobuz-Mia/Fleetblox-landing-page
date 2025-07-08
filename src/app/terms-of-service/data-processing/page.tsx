"use client";
import { useState, useEffect, useMemo } from "react";

const DataProcessingAgreement = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const keyContents = useMemo(
    () => [
      { id: "introduction", title: "Introduction" },
      { id: "parties", title: "Parties Involved" },
      { id: "recitals", title: "Recitals" },
      { id: "definitions", title: "Definitions" },
      { id: "scope", title: "Scope and Purpose" },
      { id: "retention", title: "Data Retention" },
      { id: "security", title: "Security Measures" },
      { id: "data-subject-rights", title: "Data Subject Rights" },
      { id: "sub-processors", title: "Sub-processors" },
      { id: "breach-notification", title: "Data Breach Notification" },
      { id: "international-transfers", title: "International Data Transfers" },
      { id: "liability", title: "Liability and Indemnity" },
      { id: "governing-law", title: "Governing Law and Jurisdiction" },
      { id: "amendments", title: "Amendments" },
      { id: "confidentiality", title: "Confidentiality" },
      { id: "severability", title: "Severability" },
      { id: "execution", title: "Execution" },
    ],
    []
  );

  // Navigation functions for step-by-step movement
  const getCurrentSectionIndex = () => {
    const index = keyContents.findIndex((item) => item.id === activeSection);
    return index >= 0 ? index : 0;
  };

  const navigateToSection = (direction: "up" | "down") => {
    const currentIndex = getCurrentSectionIndex();
    let newIndex;

    if (direction === "up") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    } else {
      newIndex =
        currentIndex < keyContents.length - 1
          ? currentIndex + 1
          : keyContents.length - 1;
    }

    const targetSection = keyContents[newIndex];
    if (targetSection) {
      handleSectionClick(targetSection.id);
    }
  };

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 80 : 120;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = keyContents.map((item) => item.id);
      const isMobile = window.innerWidth < 1024;
      const scrollPosition = window.scrollY + (isMobile ? 80 : 120);

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition + 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    const initializeActiveSection = () => {
      if (keyContents.length > 0 && !activeSection) {
        handleScroll();
        if (!activeSection) {
          setActiveSection(keyContents[0].id);
        }
      }
    };

    initializeActiveSection();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [keyContents, activeSection]);

  return (
    <section className="min-h-screen w-full bg-gray-100 p-2 sm:p-4">
      <div className="max-w-[1200px] mx-auto lg:flex lg:gap-8">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4 px-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-left flex justify-between items-center shadow-sm"
          >
            <span className="text-[#04082C] font-semibold">
              Table of Contents
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:w-full px-2 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Introduction */}
          <section id="introduction" className="mb-6 lg:mb-8">
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                This Data Processing Agreement (&quot;Agreement&quot;) is
                entered into as of the Effective Date (as defined below) by and
                between:
              </p>
            </div>
          </section>

          {/* Parties Involved */}
          <section id="parties" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              1. PARTIES INVOLVED
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                1.1 Data Controller
              </h3>
              <p className="text-[#7D7D7D]">
                For the purposes of this Agreement, the Data Controller is the
                customer or client of FleetBlox who utilizes the FleetBlox
                platform to manage their vehicle fleet and related data. The
                Data Controller is the entity or individual who, alone or
                jointly with others, determines the purposes and means of
                processing Personal Data (as defined below). The Data Controller
                is responsible for ensuring that the processing of Personal Data
                complies with all applicable data protection laws, regulations,
                and industry standards, including, but not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  General Data Protection Regulation (GDPR) (EU) 2016/679;
                </li>
                <li>California Consumer Privacy Act (CCPA);</li>
                <li>
                  Personal Information Protection and Electronic Documents Act
                  (PIPEDA) (Canada);
                </li>
                <li>
                  Any other applicable data protection laws, including
                  sector-specific regulations (collectively, the &quot;Data
                  Protection Laws&quot;).
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                The Data Controller acknowledges its responsibility to ensure
                that any Personal Data processed by FleetBlox is processed in
                accordance with these Data Protection Laws and that it has
                obtained the necessary consents or legal bases for such
                processing.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                1.2 Data Processor
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox, a corporation duly incorporated and existing under
                the laws of the Province of Ontario, Canada, with its principal
                place of business located at [Insert Address] (the &quot;Data
                Processor&quot;), provides platform-based fleet management
                services, which involve the processing of Personal Data on
                behalf of the Data Controller. As the Data Processor, FleetBlox
                is entrusted with the responsibility of processing Personal Data
                solely in accordance with the documented instructions provided
                by the Data Controller, as set out in this Agreement and any
                other relevant contract or instruction from the Data Controller.
              </p>
              <p className="text-[#7D7D7D]">
                FleetBlox shall ensure compliance with all applicable data
                protection laws and regulations, including the GDPR, CCPA, and
                PIPEDA, and will only process the Personal Data in a manner
                consistent with the purposes outlined by the Data Controller.
                FleetBlox agrees not to use the Personal Data for any purpose
                other than as described in this Agreement or as further
                instructed by the Data Controller. FleetBlox shall implement and
                maintain appropriate technical and organizational measures to
                safeguard the security, integrity, and confidentiality of the
                Personal Data it processes.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                1.3 Sub-processors / Third-Party Processors
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox may engage third-party sub-processors
                (&quot;Sub-processors&quot;) for the purpose of assisting with
                the processing of Personal Data as part of the Services provided
                under this Agreement. Sub-processors are defined as any
                third-party service provider that processes Personal Data on
                behalf of FleetBlox. The use of Sub-processors enables FleetBlox
                to offer its platform-based services, including cloud hosting,
                payment processing, security services, analytics, and other
                functionalities integral to the platform&apos;s operations.
              </p>
              <p className="text-[#7D7D7D]">
                The following third-party service providers are currently
                engaged by FleetBlox as Sub-processors:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Amazon Web Services (AWS): Cloud hosting and data storage
                  services.
                </li>
                <li>Stripe: Payment processing services.</li>
                <li>
                  Google Analytics: Web analytics and usage tracking services.
                </li>
                <li>
                  Cloudflare: Security and Content Delivery Network (CDN)
                  services.
                </li>
              </ul>
            </div>
          </section>

          {/* Recitals */}
          <section id="recitals" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              2. RECITALS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                <strong className="text-[#333333]">WHEREAS,</strong> the Data
                Controller has engaged FleetBlox for the purpose of utilizing
                FleetBlox&apos;s platform and services, which include but are
                not limited to fleet management, vehicle tracking, diagnostics,
                predictive maintenance, performance analytics, and other
                operational services that involve the processing of Personal
                Data (as defined herein), and which are essential for the
                effective management and optimization of the Data
                Controller&apos;s vehicle fleet;
              </p>
              <p className="text-[#7D7D7D]">
                <strong className="text-[#333333]">WHEREAS,</strong> the Data
                Controller, in its capacity as the entity determining the
                purposes and means of processing Personal Data, desires to
                ensure that FleetBlox, acting as the Data Processor, processes
                the Personal Data in strict compliance with all applicable data
                protection laws and regulations, including, but not limited to,
                the General Data Protection Regulation (GDPR) (EU) 2016/679, the
                California Consumer Privacy Act (CCPA), the Personal Information
                Protection and Electronic Documents Act (PIPEDA) (Canada), and
                other relevant national and international data protection laws
                (collectively, the &quot;Data Protection Laws&quot;), and to
                clearly define the scope and terms under which FleetBlox
                processes such Personal Data;
              </p>
              <p className="text-[#7D7D7D]">
                <strong className="text-[#333333]">WHEREAS,</strong> the Data
                Processor, FleetBlox, acknowledges and accepts its
                responsibility to act as a Data Processor on behalf of the Data
                Controller and to perform the processing services outlined in
                this Agreement, which includes but is not limited to the
                collection, storage, transmission, and processing of Personal
                Data as per the documented instructions provided by the Data
                Controller and in compliance with the applicable Data Protection
                Laws;
              </p>
              <p className="text-[#7D7D7D]">
                <strong className="text-[#333333]">WHEREAS,</strong> the parties
                recognize that the protection of Personal Data is critical to
                maintaining the privacy and confidentiality of individuals, and
                that both the Data Controller and the Data Processor are
                committed to ensuring the lawful and secure processing of
                Personal Data in accordance with the highest standards of data
                protection, security, and privacy;
              </p>
              <p className="text-[#7D7D7D]">
                <strong className="text-[#333333]">NOW, THEREFORE,</strong> in
                consideration of the mutual promises, covenants, and
                undertakings set forth herein, and for other good and valuable
                consideration, the parties hereby agree to the terms and
                conditions of this Data Processing Agreement, as set forth
                below:
              </p>
            </div>
          </section>

          {/* Definitions */}
          <section id="definitions" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              3. DEFINITIONS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                For the purposes of this Agreement, the following terms shall
                have the respective meanings set forth below, unless the context
                requires otherwise:
              </p>

              <div className="space-y-4 lg:space-y-6">
                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.1 &quot;Personal Data&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    means any information relating to an identified or
                    identifiable individual, including but not limited to,
                    names, contact information, vehicle data, location data,
                    operational data, payment information, identifiers such as
                    IP addresses, and any other data that can be used to
                    identify a person directly or indirectly, in accordance with
                    applicable data protection laws such as the General Data
                    Protection Regulation (GDPR) (EU) 2016/679, the California
                    Consumer Privacy Act (CCPA), and other relevant privacy
                    legislation. Personal Data also includes sensitive data
                    where applicable, as defined by relevant laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.2 &quot;Data Processing&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to any operation or set of operations performed on
                    Personal Data, whether or not by automated means, including
                    but not limited to collection, recording, storage,
                    retrieval, modification, organization, structuring, use,
                    disclosure by transmission, dissemination, restriction,
                    erasure, or destruction of such data.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.3 &quot;Data Subject&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to any identified or identifiable individual whose
                    Personal Data is being processed under this Agreement. An
                    identifiable individual is one who can be identified,
                    directly or indirectly, by reference to an identifier such
                    as a name, an identification number, location data, an
                    online identifier, or one or more factors specific to the
                    individual&apos;s physical, physiological, genetic, mental,
                    economic, cultural, or social identity.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.4 &quot;Data Controller&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to the entity or individual that determines the
                    purposes and means of processing Personal Data. In the
                    context of this Agreement, the Data Controller is the User,
                    which may be a fleet owner, operator, or business entity,
                    and who has the authority to decide the scope, purposes, and
                    use of the Personal Data collected.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.5 &quot;Data Processor&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to the party that processes Personal Data on behalf
                    of the Data Controller. In this Agreement, FleetBlox is the
                    Data Processor, responsible for executing the processing
                    operations as directed by the Data Controller, in compliance
                    with applicable data protection laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.6 &quot;Sub-Processor&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to any third-party processor engaged by FleetBlox to
                    assist in processing Personal Data. A Sub-Processor may be
                    contracted by FleetBlox to support specific processing
                    operations but is bound by the same data protection
                    obligations outlined in this Agreement. Sub-processors are
                    only authorized to process Personal Data following the Data
                    Controller&apos;s instructions and under the terms of this
                    Agreement.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.7 &quot;Processing Instructions&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    means the documented instructions provided by the Data
                    Controller to FleetBlox regarding the processing of Personal
                    Data. This includes the purpose(s) of processing, the nature
                    and scope of the processing activities, and any specific
                    legal or regulatory requirements regarding the handling and
                    retention of Personal Data. These instructions are subject
                    to the terms and provisions of this Agreement.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.8 &quot;Security Incident&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to any event, whether accidental or unlawful, that
                    leads to the destruction, loss, alteration, unauthorized
                    disclosure, or access to Personal Data. A Security Incident
                    may include data breaches, unauthorized access to systems,
                    or any other event that compromises the confidentiality,
                    integrity, or availability of Personal Data. FleetBlox has
                    an obligation to promptly notify the Data Controller of any
                    such incidents as per the breach notification obligations in
                    this Agreement.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.9 &quot;Standard Contractual Clauses (SCCs)&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refer to the clauses adopted by the European Commission or
                    relevant data protection authorities, specifically designed
                    to ensure adequate protection when transferring Personal
                    Data to third countries outside of the European Economic
                    Area (EEA). These clauses form part of the contractual
                    arrangements between the Data Controller and the Data
                    Processor or between the Data Processor and any
                    Sub-processors to ensure that Personal Data remains
                    protected in accordance with the provisions of the GDPR,
                    even in jurisdictions with less stringent data protection
                    laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.10 &quot;Confidential Information&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to all Personal Data, proprietary data, business
                    information, documents, materials, or any other information
                    shared between the parties, which is designated as
                    confidential or is reasonably understood to be confidential
                    based on the nature of the information. Confidential
                    Information shall also include any data that a party is
                    legally required to protect or maintain the confidentiality
                    of under applicable laws, regulations, or contractual
                    obligations.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.11 &quot;Data Protection Laws&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to any applicable national, regional, or
                    international laws and regulations relating to the
                    collection, use, processing, storage, and protection of
                    Personal Data, including, but not limited to, the General
                    Data Protection Regulation (EU) 2016/679 (GDPR), the
                    California Consumer Privacy Act (CCPA), the Personal
                    Information Protection and Electronic Documents Act
                    (PIPEDA), and any other legislation relating to privacy and
                    data protection.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.12 &quot;Data Transfer&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to any transmission, access, or transfer of Personal
                    Data from one party to another, either within the same
                    jurisdiction or across borders, including to countries or
                    regions outside of the EEA, UK, or other jurisdictions with
                    comparable data protection laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.13 &quot;Sensitive Personal Data&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to any category of Personal Data that requires
                    additional protection under applicable data protection laws,
                    including, but not limited to, data related to racial or
                    ethnic origin, political opinions, religious beliefs, trade
                    union membership, genetic data, biometric data, health data,
                    data concerning a person&apos;s sex life or sexual
                    orientation, or criminal convictions.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.14 &quot;Personal Data Breach&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to a Security Incident that results in the accidental
                    or unlawful destruction, loss, alteration, unauthorized
                    disclosure of, or access to Personal Data transmitted,
                    stored, or otherwise processed.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2">
                    3.15 &quot;Anonymized Data&quot;
                  </h3>
                  <p className="text-[#7D7D7D]">
                    refers to Personal Data that has been processed in such a
                    manner that it can no longer be attributed to a specific
                    Data Subject, even if combined with other information, and
                    therefore is not considered Personal Data under applicable
                    data protection laws. Anonymized Data is not subject to the
                    provisions of this Agreement.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Scope and Purpose */}
          <section id="scope" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              4. SCOPE AND PURPOSE OF DATA PROCESSING
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                4.1 Purpose of Processing
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox shall process Personal Data solely for the purposes
                outlined in this Agreement, and in accordance with the lawful
                instructions provided by the Data Controller. The processing of
                Personal Data by FleetBlox is necessary for the performance of
                the contractual obligations between the parties, and to achieve
                the following specific purposes:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-3 ml-4">
                <li>
                  <strong className="text-[#333333]">
                    Provision of Fleet Management Services:
                  </strong>{" "}
                  FleetBlox shall process Personal Data to facilitate the
                  management, monitoring, and optimization of the Data
                  Controller&apos;s vehicle fleet, which includes, but is not
                  limited to, vehicle tracking, predictive maintenance,
                  real-time diagnostics, fuel consumption analysis, route
                  optimization, and performance analytics. This processing is
                  essential for the provision of the Services as described in
                  this Agreement and for the overall operational efficiency of
                  the Data Controller&apos;s fleet.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Processing Payment and Billing Information:
                  </strong>{" "}
                  FleetBlox will process payment and billing information to
                  facilitate subscription billing, payments for services, and
                  processing of any financial transactions required under the
                  terms of the Services. This includes handling credit card
                  details, invoicing information, and other related financial
                  data through third-party payment processors, in accordance
                  with applicable data protection laws.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Compliance with Legal and Regulatory Requirements:
                  </strong>{" "}
                  FleetBlox will process Personal Data to ensure compliance with
                  applicable laws and regulations, including but not limited to,
                  vehicle compliance checks, regulatory reporting, tax
                  obligations, and customer support services. FleetBlox shall
                  also process Personal Data as necessary to fulfill legal or
                  contractual obligations related to data retention, audits, and
                  regulatory disclosures.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Improvement of FleetBlox&apos;s Platform and Services:
                  </strong>{" "}
                  FleetBlox may process Personal Data to analyze platform usage,
                  identify trends, and improve its platform&apos;s
                  functionalities, user experience, and performance. This
                  processing will be used to enhance the overall service
                  provided to the Data Controller, and to optimize the FleetBlox
                  platform for current and future use. This includes processing
                  usage analytics and feedback provided through the use of the
                  platform.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.2 Types of Personal Data Processed
              </h3>
              <p className="text-[#7D7D7D]">
                In the course of providing the FleetBlox Services, FleetBlox
                processes various types of Personal Data, as specified below.
                The types of Personal Data that may be processed by FleetBlox,
                and which may be provided by the Data Controller, include, but
                are not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-3 ml-4">
                <li>
                  <strong className="text-[#333333]">
                    Contact Information:
                  </strong>{" "}
                  This includes, but is not limited to, names, email addresses,
                  phone numbers, business contact details, and other information
                  necessary for customer support, account creation, and
                  communication with the Data Controller.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Vehicle and Fleet Data:
                  </strong>{" "}
                  This includes, but is not limited to, vehicle identifiers
                  (such as vehicle identification numbers, license plates, make
                  and model), operational data (such as mileage, maintenance
                  schedules, fuel usage), and vehicle diagnostics data (such as
                  engine performance, tire pressure, fuel consumption rates).
                </li>
                <li>
                  <strong className="text-[#333333]">
                    GPS and Location Data:
                  </strong>{" "}
                  This includes real-time location data such as GPS coordinates,
                  speed, routes, and movement data of vehicles within the fleet,
                  which is necessary for vehicle tracking and fleet management
                  services.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Driver Behavior Data:
                  </strong>{" "}
                  This includes information related to driver performance, such
                  as driving patterns (e.g., speed, braking, acceleration), fuel
                  efficiency, and other behavioral metrics used for performance
                  monitoring and optimization.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Payment and Billing Information:
                  </strong>{" "}
                  This includes financial information such as payment methods,
                  transaction histories, invoicing details, and other billing
                  data processed through third-party payment service providers
                  (such as Stripe, PayPal, or other payment processors).
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.3 Processing of Personal Data
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox shall process the Personal Data provided by the Data
                Controller only in accordance with the documented instructions
                from the Data Controller. FleetBlox shall ensure that the
                processing of Personal Data is confined to the purposes
                specified in this Agreement and is carried out in a manner that
                complies with the following:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-3 ml-4">
                <li>
                  <strong className="text-[#333333]">
                    Instruction-Based Processing:
                  </strong>{" "}
                  FleetBlox will only process Personal Data based on the Data
                  Controller&apos;s lawful, written instructions. The Data
                  Controller shall have the right to specify the types of
                  Personal Data to be processed, the purpose of processing, and
                  the specific instructions regarding the processing of the
                  Personal Data, including how it is collected, used, stored, or
                  shared.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Limitation on Processing:
                  </strong>{" "}
                  FleetBlox shall not process Personal Data for any purpose
                  beyond what is specified in this Agreement, unless authorized
                  by the Data Controller in writing or as required by applicable
                  law. In the event that FleetBlox receives any instruction or
                  request to process Personal Data for purposes beyond those set
                  forth in this Agreement, FleetBlox shall promptly notify the
                  Data Controller.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Adherence to Legal Obligations:
                  </strong>{" "}
                  FleetBlox shall process Personal Data in compliance with
                  applicable data protection laws, including the General Data
                  Protection Regulation (GDPR) (EU) 2016/679, the California
                  Consumer Privacy Act (CCPA), the Personal Information
                  Protection and Electronic Documents Act (PIPEDA), and other
                  relevant regulations. FleetBlox shall assist the Data
                  Controller in ensuring that Personal Data is processed in
                  accordance with the legal obligations of the Data Controller.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Security and Confidentiality:
                  </strong>{" "}
                  FleetBlox shall ensure that any processing of Personal Data is
                  done with appropriate technical and organizational security
                  measures to protect the data from unauthorized access, loss,
                  or disclosure. FleetBlox shall ensure that its personnel and
                  any third-party service providers involved in processing
                  Personal Data are subject to confidentiality agreements that
                  restrict unauthorized access to or use of the Personal Data.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-4">
                By entering into this Agreement, the Data Controller
                acknowledges that FleetBlox will only process Personal Data for
                the purposes set forth above, and that the Data Controller is
                solely responsible for ensuring that all Personal Data provided
                for processing is accurate, up-to-date, and provided in
                compliance with applicable data protection laws.
              </p>
            </div>
          </section>

          {/* Placeholder sections for remaining content */}
          <section id="retention" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              5. DATA RETENTION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                5.1 Retention Period
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox agrees to retain Personal Data only for as long as
                necessary to fulfill the specific purposes set forth in this
                Agreement, and in accordance with the Data Controller&apos;s
                lawful instructions. Upon the termination of this Agreement or
                cessation of the Data Controller&apos;s use of the FleetBlox
                Services, FleetBlox will retain the Personal Data for a period
                not exceeding 12 months, unless a longer retention period is
                required or permitted under applicable laws or for the
                fulfillment of regulatory compliance, dispute resolution, or
                legal obligations. In the event that longer retention is
                required by law, FleetBlox will maintain the data only for as
                long as necessary and in compliance with all applicable data
                protection regulations.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.2 Post-Termination Data Handling
              </h3>
              <p className="text-[#7D7D7D]">
                Upon the expiration of the retention period or the Data
                Controller&apos;s request for termination of this Agreement,
                FleetBlox will take the following actions in relation to
                Personal Data:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-3 ml-4">
                <li>
                  <strong className="text-[#333333]">Return of Data:</strong>{" "}
                  FleetBlox shall return the Personal Data to the Data
                  Controller if so requested and in a format mutually agreed
                  upon by both parties.
                </li>
                <li>
                  <strong className="text-[#333333]">Anonymization:</strong>{" "}
                  FleetBlox shall anonymize the Personal Data, rendering it
                  irreversibly non-identifiable for any further processing
                  purposes, except as required for analytical, statistical, or
                  compliance-related purposes.
                </li>
                <li>
                  <strong className="text-[#333333]">Deletion:</strong> If no
                  further retention is required, FleetBlox will securely delete
                  the Personal Data from all systems and platforms in compliance
                  with the applicable data protection laws. All deletion
                  activities will be documented to ensure a transparent process.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-4">
                FleetBlox will undertake all necessary steps to ensure the
                confidentiality and security of Personal Data during the
                post-termination data handling process.
              </p>
            </div>
          </section>

          <section id="security" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              6. SECURITY MEASURES
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                6.1 Technical and Organizational Security Measures
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox recognizes the importance of securing Personal Data
                and has implemented robust technical and organizational measures
                to ensure the protection of such data against unauthorized
                access, disclosure, alteration, or destruction. The following
                measures will be maintained and regularly assessed:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-3 ml-4">
                <li>
                  <strong className="text-[#333333]">Data Encryption:</strong>{" "}
                  FleetBlox ensures that all Personal Data is encrypted during
                  transmission using Transport Layer Security (TLS) protocols,
                  and that data at rest is encrypted using Advanced Encryption
                  Standard (AES-256), a widely accepted industry standard for
                  secure data encryption.
                </li>
                <li>
                  <strong className="text-[#333333]">Access Control:</strong>{" "}
                  Multi-factor authentication (MFA) is employed for accessing
                  sensitive data and systems. In addition, FleetBlox uses
                  role-based access control (RBAC) to restrict access to
                  Personal Data to only those employees or agents who require
                  such access to perform their duties.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Regular Security Assessments:
                  </strong>{" "}
                  FleetBlox conducts regular security assessments, including
                  vulnerability testing, penetration testing, and risk
                  assessments to identify and address potential security gaps.
                  These assessments are part of a comprehensive information
                  security management framework.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Continuous Monitoring:
                  </strong>{" "}
                  FleetBlox maintains a continuous monitoring system to detect
                  any potential security breaches or unauthorized access
                  attempts. Automated anomaly detection tools are in place to
                  quickly identify unusual patterns in data access or system
                  behavior that may indicate a potential security incident.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-4">
                These measures are designed to provide a high level of security
                to the Personal Data processed by FleetBlox, in line with
                industry best practices and legal requirements.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6.2 Incident Response and Notification
              </h3>
              <p className="text-[#7D7D7D]">
                In the event of a security incident or data breach, FleetBlox
                shall adhere to the following procedures:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-3 ml-4">
                <li>
                  <strong className="text-[#333333]">
                    Immediate Notification:
                  </strong>{" "}
                  FleetBlox shall notify the Data Controller without undue delay
                  and in no case later than 72 hours after becoming aware of the
                  breach. The notification will include detailed information
                  regarding the nature of the breach, including the scope of the
                  affected data, the number of Data Subjects impacted, and any
                  potential consequences of the breach.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Mitigation Measures:
                  </strong>{" "}
                  FleetBlox will provide the Data Controller with a description
                  of the steps taken or planned to address and mitigate the
                  breach, including any corrective actions to prevent further
                  incidents.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Regulatory Compliance:
                  </strong>{" "}
                  In the event the breach is considered reportable under
                  applicable data protection laws (such as GDPR or CCPA),
                  FleetBlox will cooperate with the Data Controller to notify
                  the relevant supervisory authority and, where necessary, the
                  affected Data Subjects. FleetBlox will ensure that the Data
                  Controller is fully supported in managing regulatory
                  obligations resulting from the breach.
                </li>
              </ul>
            </div>
          </section>

          <section id="data-subject-rights" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              7. DATA SUBJECT RIGHTS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                7.1 Assistance with Data Subject Requests
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox recognizes the importance of enabling the Data
                Controller to comply with data subject rights under applicable
                data protection laws, including but not limited to the General
                Data Protection Regulation (GDPR), the California Consumer
                Privacy Act (CCPA), and the Personal Information Protection and
                Electronic Documents Act (PIPEDA). FleetBlox agrees to provide
                reasonable assistance to the Data Controller in fulfilling data
                subject rights requests, which may include:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-3 ml-4">
                <li>
                  <strong className="text-[#333333]">Right of Access:</strong>{" "}
                  The right of Data Subjects to obtain confirmation of whether
                  or not their Personal Data is being processed, and if so,
                  access to the Personal Data being processed.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Right to Rectification:
                  </strong>{" "}
                  The right to request the correction of inaccurate or
                  incomplete Personal Data.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Right to Erasure (Right to be Forgotten):
                  </strong>{" "}
                  The right to request the deletion of Personal Data when it is
                  no longer necessary for the purposes for which it was
                  collected or when consent is withdrawn.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Right to Restrict Processing:
                  </strong>{" "}
                  The right to request the restriction of processing in certain
                  circumstances, such as when the accuracy of the data is
                  contested.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Right to Data Portability:
                  </strong>{" "}
                  The right to request the transfer of Personal Data to another
                  service provider in a structured, commonly used, and
                  machine-readable format.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-4">
                FleetBlox shall provide the Data Controller with the necessary
                tools to facilitate the processing of such requests, including
                the implementation of mechanisms within the FleetBlox platform
                that enable the Data Controller to access, correct, delete, or
                restrict the processing of Personal Data as required by the
                applicable laws.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                7.2 Data Subject Rights Requests
              </h3>
              <p className="text-[#7D7D7D]">
                In the event that FleetBlox receives a request from a Data
                Subject directly, such as a request to access, rectify, or
                delete their Personal Data, FleetBlox will promptly inform the
                Data Controller. The Data Controller is responsible for
                responding to such requests in compliance with applicable laws.
                FleetBlox will provide reasonable cooperation and assistance in
                processing such requests in accordance with the Data
                Controller&apos;s instructions.
              </p>
            </div>
          </section>

          <section id="sub-processors" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              8. SUB-PROCESSORS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                8.1 Authorization of Sub-processors
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox acknowledges its responsibility to process Personal
                Data in compliance with applicable data protection laws. In the
                performance of this Agreement, FleetBlox may engage third-party
                sub-processors for the processing of Personal Data. Any
                sub-processors engaged by FleetBlox shall be contractually
                obligated to adhere to the same data protection obligations set
                forth under this Agreement. FleetBlox shall ensure that any
                sub-processor provides sufficient guarantees to implement
                appropriate technical and organizational measures to meet the
                requirements of the GDPR, CCPA, and other applicable laws.
              </p>
              <p className="text-[#7D7D7D]">
                A list of current sub-processors utilized by FleetBlox is
                available upon request, and FleetBlox commits to ensuring that
                each sub-processor is governed by a data processing agreement
                that aligns with the terms of this Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                8.2 Notification of Changes to Sub-processors
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox shall notify the Data Controller of any changes
                regarding its sub-processors, including but not limited to the
                addition of new sub-processors. Such notification shall occur in
                writing, and the Data Controller shall have thirty (30) days to
                object to the engagement of a new sub-processor, commencing from
                the date of the notification. If the Data Controller does not
                object within the specified period, the new sub-processor will
                be deemed accepted. If the Data Controller objects, FleetBlox
                will work with the Data Controller to resolve any concerns,
                which may include terminating this Agreement if no suitable
                alternatives are available.
              </p>
            </div>
          </section>

          <section id="breach-notification" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              9. DATA BREACH NOTIFICATION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                9.1 Breach Notification Obligation
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox shall promptly notify the Data Controller without
                undue delay, and in no event later than seventy-two (72) hours,
                after becoming aware of any data breach affecting Personal Data.
                The notification will contain the following information, where
                available and applicable:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-3 ml-4">
                <li>
                  A description of the nature of the breach, including the
                  categories and approximate number of data subjects and
                  personal data records affected.
                </li>
                <li>The likely consequences of the breach.</li>
                <li>
                  A description of the measures taken or proposed to mitigate
                  the breach and prevent its recurrence.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-4">
                FleetBlox will provide the Data Controller with all necessary
                information to comply with legal obligations under data
                protection laws, including notifying affected data subjects or
                relevant supervisory authorities as required under GDPR or other
                applicable laws.
              </p>
            </div>
          </section>

          <section id="international-transfers" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              10. INTERNATIONAL DATA TRANSFERS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                10.1 Transfers Outside the EEA
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox may, in the course of providing the Services, transfer
                Personal Data to locations outside of the European Economic Area
                (EEA), the United Kingdom (UK), or any other jurisdiction that
                provides an equivalent level of data protection. These transfers
                will occur in accordance with applicable data protection laws
                and may be protected using the European Commission&apos;s
                Standard Contractual Clauses (SCCs), as required under GDPR or
                other similar regulatory mechanisms. Such transfers will also be
                subject to appropriate technical, contractual, and
                organizational measures to ensure the protection of Personal
                Data.
              </p>
              <p className="text-[#7D7D7D] mt-4">
                FleetBlox commits to ensuring that all international transfers
                of Personal Data comply with the applicable legal framework
                governing cross-border data transfers, such as the use of SCCs
                or other recognized safeguards.
              </p>
            </div>
          </section>

          <section id="liability" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              11. LIABILITY AND INDEMNITY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                11.1 Liability of FleetBlox
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox acknowledges its responsibility for complying with the
                terms of this Agreement and applicable data protection laws. In
                the event of non-compliance or a failure to meet the obligations
                set forth in this Agreement, FleetBlox shall be liable for
                direct damages caused by such non-compliance. The total
                liability of FleetBlox for any claims arising out of this
                Agreement shall be limited to the total amount paid by the Data
                Controller for the Services in the twelve (12) months preceding
                the event giving rise to the liability. In no event shall
                FleetBlox be liable for any indirect, incidental, or
                consequential damages, including but not limited to loss of
                profits, data loss, or reputational harm.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                11.2 Indemnification
              </h3>
              <p className="text-[#7D7D7D]">
                The Data Controller agrees to indemnify, defend, and hold
                FleetBlox harmless from and against any claims, damages,
                liabilities, losses, costs (including legal fees), or expenses
                arising out of:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-3 ml-4">
                <li>
                  The Data Controller&apos;s misuse of the Services, including
                  any unauthorized or unlawful use of Personal Data.
                </li>
                <li>
                  The Data Controller&apos;s failure to comply with applicable
                  data protection laws, including but not limited to GDPR, CCPA,
                  and PIPEDA.
                </li>
                <li>Any breach of this Agreement by the Data Controller.</li>
              </ul>
              <p className="text-[#7D7D7D] mt-4">
                FleetBlox may control the defense of any claims subject to
                indemnification by the Data Controller and shall promptly notify
                the Data Controller of any claim, providing the Data Controller
                with the opportunity to cooperate in the defense and settlement
                thereof.
              </p>
            </div>
          </section>

          <section id="governing-law" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              12. GOVERNING LAW AND JURISDICTION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                12.1 Governing Law
              </h3>
              <p className="text-[#7D7D7D]">
                This Agreement shall be governed by, and construed in accordance
                with, the laws of the Province of Ontario, Canada, without
                regard to its conflicts of law principles. Any dispute arising
                out of or in connection with this Agreement, including but not
                limited to the interpretation of its terms, enforcement of its
                provisions, or any claim related to the processing of Personal
                Data, shall be resolved in accordance with the laws of Ontario,
                Canada.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                12.2 Jurisdiction
              </h3>
              <p className="text-[#7D7D7D]">
                The parties agree that any disputes arising from this Agreement
                shall be subject to the exclusive jurisdiction of the courts
                located in Toronto, Ontario, Canada. The parties hereby
                irrevocably submit to the jurisdiction of such courts and waive
                any objections to the venue or jurisdiction of such proceedings.
              </p>
            </div>
          </section>

          <section id="amendments" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              13. AMENDMENTS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                13.1 Right to Modify
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right to modify, amend, or update the
                terms of this Agreement at any time, in its sole discretion, in
                order to comply with changes in applicable laws, regulations, or
                industry standards. Any modification, amendment, or update will
                be communicated to the Data Controller through written notice,
                which may be sent via email or made available through the
                FleetBlox platform.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                13.2 Notification of Material Changes
              </h3>
              <p className="text-[#7D7D7D]">
                In the event of a material change to this Agreement, FleetBlox
                shall provide the Data Controller with at least thirty (30)
                days&apos; prior notice before the new terms take effect. Such
                notice will clearly identify the modifications and provide the
                Data Controller with an opportunity to review the changes.
                Continued use of the Services after such changes constitutes
                acceptance of the updated terms.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                13.3 Data Controller&apos;s Right to Object
              </h3>
              <p className="text-[#7D7D7D]">
                If the Data Controller does not accept the updated terms, the
                Data Controller may terminate this Agreement in accordance with
                the termination provisions set forth in Section 7 of this
                Agreement. The Data Controller will have the right to cease
                using the Services immediately following such notice.
              </p>
            </div>
          </section>

          <section id="confidentiality" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              14. CONFIDENTIALITY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                14.1 Confidential Information
              </h3>
              <p className="text-[#7D7D7D]">
                Both parties agree to treat all information related to this
                Agreement and the processing of Personal Data as confidential.
                This includes all business, operational, technical, and Personal
                Data obtained during the course of the relationship, whether
                directly or indirectly. Neither party shall disclose such
                confidential information to any third party except as required
                by law or as necessary for the fulfillment of their obligations
                under this Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                14.2 Obligations of Confidentiality
              </h3>
              <p className="text-[#7D7D7D]">
                The parties shall maintain the confidentiality of any
                proprietary information or Personal Data shared under this
                Agreement, and shall take all reasonable measures to protect the
                confidentiality of such information, including using the same
                degree of care as they would use for their own confidential
                information, but no less than reasonable care. This
                confidentiality obligation shall survive the termination of this
                Agreement.
              </p>
            </div>
          </section>

          <section id="severability" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              15. SEVERABILITY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                15.1 Severability of Provisions
              </h3>
              <p className="text-[#7D7D7D]">
                If any provision of this Agreement is found to be invalid,
                unenforceable, or void, such provision shall be modified or
                construed to the extent necessary to make it enforceable, while
                the remaining provisions of this Agreement shall continue in
                full force and effect. The invalidity of any provision shall not
                affect the validity and enforceability of the remaining
                provisions of the Agreement, and the parties agree to replace
                any invalid provision with a valid provision that best reflects
                the intent of the original provision.
              </p>
            </div>
          </section>

          <section id="execution" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              16. EXECUTION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                This Agreement is executed and agreed to by the undersigned
                parties, acting through their duly authorized representatives.
                By signing below, both parties confirm their acceptance of and
                agreement to the terms and conditions set forth in this Data
                Processing Agreement.
              </p>

              <div className="mt-8 space-y-6">
                <div className="border-t border-gray-300 pt-4">
                  <h4 className="text-[18px] text-[#04082C] font-bold mb-4">
                    [Data Controller]
                  </h4>
                  <div className="space-y-2">
                    <p className="text-[#7D7D7D]">
                      By: ______________________________________
                    </p>
                    <p className="text-[#7D7D7D]">
                      Name: ____________________________________
                    </p>
                    <p className="text-[#7D7D7D]">
                      Title: _____________________________________
                    </p>
                    <p className="text-[#7D7D7D]">
                      Date: _____________________________________
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-4">
                  <h4 className="text-[18px] text-[#04082C] font-bold mb-4">
                    FleetBlox (Data Processor)
                  </h4>
                  <div className="space-y-2">
                    <p className="text-[#7D7D7D]">
                      By: ______________________________________
                    </p>
                    <p className="text-[#7D7D7D]">
                      Name: ____________________________________
                    </p>
                    <p className="text-[#7D7D7D]">
                      Title: _____________________________________
                    </p>
                    <p className="text-[#7D7D7D]">
                      Date: _____________________________________
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Floating Navigation Buttons - Desktop Only */}
      <div className="hidden lg:block fixed right-8 bottom-8 z-50">
        <div className="flex flex-col space-y-3">
          {/* Up Button */}
          <button
            onClick={() => navigateToSection("up")}
            disabled={getCurrentSectionIndex() <= 0}
            className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
              getCurrentSectionIndex() <= 0
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : "bg-[#ffffff] hover:bg-[#ffffff]/90 hover:shadow-xl active:scale-95"
            }`}
            title="Previous Section"
          >
            <svg
              className={`w-6 h-6 ${
                getCurrentSectionIndex() <= 0
                  ? "text-gray-500"
                  : "text-[#0336BC]"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>

          {/* Down Button */}
          <button
            onClick={() => navigateToSection("down")}
            disabled={getCurrentSectionIndex() >= keyContents.length - 1}
            className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
              getCurrentSectionIndex() >= keyContents.length - 1
                ? "bg-gray-300 cursor-not-allowed opacity-50"
                : "bg-[#FFFFFF] hover:bg-[#F0F0F0]/90 hover:shadow-xl active:scale-95"
            }`}
            title="Next Section"
          >
            <svg
              className={`w-6 h-6 ${
                getCurrentSectionIndex() >= keyContents.length - 1
                  ? "text-gray-500"
                  : "text-[#0336BC]"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DataProcessingAgreement;
