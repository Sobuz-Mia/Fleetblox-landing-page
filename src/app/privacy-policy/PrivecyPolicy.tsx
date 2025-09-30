"use client";
import { useState, useEffect, useMemo } from "react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const keyContents = useMemo(
    () => [
      { id: "introduction", title: "Introduction" },
      { id: "definitions", title: "Definitions" },
      { id: "scope-applicability", title: "Scope and Applicability" },
      {
        id: "purpose-collection-use",
        title: "Purpose of Data Collection and Use",
      },
      {
        id: "legal-basis-processing",
        title: "Legal Basis for Processing Personal Data",
      },
      { id: "sharing-disclosure", title: "Sharing and Disclosure" },
      { id: "data-retention", title: "Data Retention" },
      { id: "security-measures", title: "Data Security" },
      { id: "your-rights", title: "User Rights" },
      { id: "cookies", title: "Cookies and Tracking" },
    ],
    []
  );

  // Navigation functions for step-by-step movement
  const getCurrentSectionIndex = () => {
    const index = keyContents.findIndex((item) => item.id === activeSection);
    return index >= 0 ? index : 0; // Default to first section if not found
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
      // Adjust offset based on screen size
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
      // Close mobile menu on resize to larger screen
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initialize active section on mount
    const initializeActiveSection = () => {
      if (keyContents.length > 0 && !activeSection) {
        // Check which section is currently in view
        handleScroll();
        // If still no active section, default to first section
        if (!activeSection) {
          setActiveSection(keyContents[0].id);
        }
      }
    };

    // Initialize on mount
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
      {/* heading section */}
      <div className="flex flex-col items-center justify-center p-4 sm:p-8 max-w-2xl h-[300px] sm:h-[400px] w-full mx-auto">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[52px] font-montserrat text-[#04082C] font-bold mb-4 text-center">
          Privacy Policy
        </h1>
        <p className="text-[12px] sm:text-[14px] text-[#0336BC] font-openSans font-bold text-center">
          Effective: June 20, 2025
        </p>
      </div>

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

        {/* Sidebar - Key Contents */}
        <div
          className={`lg:w-1/4 lg:sticky lg:top-40 lg:h-fit ${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:block mb-6 lg:mb-0`}
        >
          <div className="bg-white lg:bg-transparent rounded-lg lg:rounded-none p-4 lg:p-0 shadow-sm lg:shadow-none border lg:border-none">
            <h4 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-4">
              Key Contents
            </h4>
            <div className="space-y-2 my-4 lg:my-10">
              {keyContents.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    handleSectionClick(item.id);
                    setIsMobileMenuOpen(false); // Close mobile menu after selection
                  }}
                  className={`cursor-pointer p-2 transition-all duration-200 rounded lg:rounded-none ${
                    activeSection === item.id
                      ? "font-semibold text-[#0336BC] border-l-2 border-[#0336BC] bg-[#0336BC]/5"
                      : "text-[#04082C] hover:text-[#0336BC] hover:bg-white/30 lg:hover:bg-white/30"
                  } font-openSans text-[14px] sm:text-[16px]`}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 px-2 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Introduction */}
          <section id="introduction" className="mb-6 lg:mb-8">
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#04082C] font-semibold">
                This Privacy Policy (the &quot;Policy&quot;) is issued by
                After20solutions Inc. (&quot;we,&quot; &quot;our,&quot;
                &quot;us&quot;), a corporation duly incorporated and existing
                under the laws of Ontario, Canada, with its principal office
                located at [Insert Address], Toronto, Ontario, Canada. As the
                Data Controller under applicable data protection laws, including
                the Personal Information Protection and Electronic Documents Act
                (PIPEDA), After20solutions Inc. is responsible for the
                collection, processing, storage, and disclosure of Personal Data
                (as defined below) in connection with your access to, use of, or
                interaction with our platform, which includes, but is not
                limited to, the fleet management dashboard, mobile application,
                and all associated services (collectively referred to as the
                &quot;Services&quot;).
              </p>
              <p className="text-[#7D7D7D]">
                This Policy governs how we collect, use, disclose, store, and
                safeguard your Personal Data when you access or engage with our
                Services. By accessing, using, or otherwise interacting with our
                Services, you expressly consent to the collection, processing,
                and use of your Personal Data as outlined in this Policy. By
                using our Services, you further acknowledge and agree to the
                terms of this Policy, providing your informed, unequivocal
                consent to our data processing activities in accordance with the
                General Data Protection Regulation (GDPR) (EU) 2016/679,
                California Consumer Privacy Act (CCPA), Personal Information
                Protection and Electronic Documents Act (PIPEDA) (Canada), and
                other applicable privacy and data protection laws and
                regulations.
              </p>
              <p className="text-[#7D7D7D]">
                This Policy is designed to ensure compliance with the
                aforementioned data protection laws and any other relevant
                statutory provisions related to privacy, including but not
                limited to:
                <br />
                Article 6 of the GDPR – Lawfulness of processing;
                <br />
                Article 9 of the GDPR – Processing of special categories of
                data;
                <br />
                Section 1798.100-1798.199 of the CCPA – The rights of California
                residents under the CCPA;
                <br />
                Section 10 of PIPEDA – Consent and the conditions under which it
                is obtained;
                <br />
                Article 13 and 14 of the GDPR – Information to be provided when
                collecting personal data.
              </p>
              <p className="text-[#7D7D7D]">
                In accordance with these provisions, After20solutions Inc.
                ensures transparency, accountability, and the lawful processing
                of Personal Data, including providing individuals with clear
                information regarding the nature and purpose of data processing,
                their rights under applicable law, and how they can exercise
                those rights.
              </p>
              <p className="text-[#7D7D7D]">
                By continuing to use our Services, you acknowledge that you have
                read, understood, and agreed to the terms set forth in this
                Policy, which is legally binding. This Policy outlines the
                conditions under which After20solutions Inc. processes Personal
                Data in the context of its business operations and defines your
                rights regarding the control, access, and use of your data,
                under the following legal frameworks:
                <br />
                Section 5 of PIPEDA – Requirements for the fair and transparent
                collection of Personal Data;
                <br />
                Section 1798.120 of the CCPA – Your right to access, delete, and
                opt-out of the sale of your Personal Data;
                <br />
                Article 15 of the GDPR – Right of access by the data subject,
                allowing you to obtain confirmation and access to your Personal
                Data being processed.
              </p>
              <p className="text-[#7D7D7D]">
                We strongly encourage you to carefully review the full contents
                of this Policy to understand how we manage, store, and protect
                your data. This Policy provides important information about your
                rights, including your rights to access, rectify, erase,
                restrict processing, and object to processing, under the
                relevant legal frameworks. Should you have any questions or
                concerns regarding this Policy or our data processing practices,
                please contact us using the details provided at the end of this
                document.
              </p>
            </div>
          </section>

          <section id="definitions" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              1. DEFINITIONS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                For the purposes of this Privacy Policy (the
                &quot;Policy&quot;):
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Personal Data</strong> refers to any information
                  relating to an identified or identifiable natural person,
                  whether directly or indirectly, including but not limited to,
                  identifiers such as name, address, telephone number, email
                  address, identification numbers, location data, vehicle health
                  metrics, diagnostic information, transaction history, IP
                  address, online identifiers, and other data by which such
                  individual can be directly or indirectly identified. Personal
                  Data may also include Sensitive Personal Data, as defined
                  under applicable law, including data related to race,
                  ethnicity, health, genetic data, sexual orientation, and any
                  other information that reveals the individual&apos;s private
                  life or personal characteristics.
                </li>
                <li>
                  <strong>Sensitive Personal Data</strong> (also known as
                  Special Category Data) refers to certain categories of
                  Personal Data that require additional protection due to their
                  sensitive nature. This includes, but is not limited to, data
                  concerning racial or ethnic origin, political opinions,
                  religious or philosophical beliefs, trade union membership,
                  genetic data, biometric data, health data, or data related to
                  an individual&apos;s sex life or sexual orientation. Such data
                  is subject to more stringent conditions for collection,
                  processing, and storage under relevant data protection laws
                  such as the GDPR.
                </li>
                <li>
                  <strong>Processing</strong> refers to any operation or set of
                  operations performed on Personal Data, whether or not by
                  automated means, including collection, recording,
                  organization, storage, adaptation, retrieval, modification,
                  consultation, use, disclosure, dissemination, alignment,
                  combination, restriction, erasure, or destruction. The term
                  Processing also encompasses the management of Personal Data as
                  necessary to provide the Services, perform contractual
                  obligations, and ensure compliance with legal requirements.
                </li>
                <li>
                  <strong>Data Controller</strong> refers to After20solutions
                  Inc., a corporation duly incorporated under the laws of
                  Ontario, Canada, and with its registered office located at
                  [Insert Address], Toronto, Ontario, Canada. The Data
                  Controller determines the purposes and means of processing
                  Personal Data and is responsible for ensuring that the
                  collection, processing, storage, and dissemination of Personal
                  Data complies with all applicable privacy and data protection
                  laws, including the GDPR, CCPA, PIPEDA, and other relevant
                  regulations.
                </li>
                <li>
                  <strong>Data Processor</strong> refers to any third-party
                  entity or organization that processes Personal Data on behalf
                  of the Data Controller. The Data Processor acts under the
                  authority of the Data Controller and processes Personal Data
                  only according to instructions provided by the Data
                  Controller, typically under a contract. Common examples of
                  Data Processors include cloud service providers, payment
                  processors, analytics providers, and other vendors that
                  process data on behalf of the Data Controller.
                </li>
                <li>
                  <strong>Service Providers</strong> refers to third-party
                  individuals, organizations, or entities that assist
                  After20solutions Inc. in the operation and delivery of its
                  Services. Service Providers may process Personal Data on
                  behalf of After20solutions Inc. and are bound by legal
                  agreements to ensure the confidentiality, integrity, and
                  security of the Personal Data. These include, but are not
                  limited to, hosting providers, data storage and processing
                  companies, IT support services, and payment processors.
                </li>
                <li>
                  <strong>Third-Party</strong> refers to any individual, entity,
                  or organization that is not the Data Controller, Data
                  Processor, or a Service Provider, who may have access to the
                  Personal Data in accordance with this Policy or the applicable
                  laws. A Third-Party may include regulatory bodies, auditors,
                  or contractors under a legal or regulatory obligation.
                </li>
                <li>
                  <strong>Data Subject</strong> refers to an individual whose
                  Personal Data is collected, stored, and processed by the Data
                  Controller. Data Subjects are granted specific rights under
                  privacy laws, such as the right to access, rectify, delete, or
                  object to the processing of their Personal Data.
                </li>
              </ul>
            </div>
          </section>

          {/* 2. SCOPE AND APPLICABILITY */}

          <section id="scope-applicability" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              2. SCOPE AND APPLICABILITY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                This Privacy Policy applies to all individuals
                (&apos;Users&apos;) who use or access the FleetBlox Services,
                including but not limited to fleet managers, drivers,
                administrative personnel, or any other individuals authorized to
                access or interact with the FleetBlox platform (hereinafter
                referred to as &apos;Users&apos;). This Policy governs all data
                processing activities conducted by After20solutions Inc., as the
                Data Controller, in relation to Personal Data processed in
                connection with the provision of the Services.
              </p>
              <p className="text-[#7D7D7D]">
                <strong>Application to Data Processing</strong>
                <br />
                The FleetBlox Services include, but are not limited to, the
                fleet management dashboard, mobile application, real-time
                vehicle monitoring, predictive maintenance tools, diagnostics,
                and fleet optimization services. This Privacy Policy applies to
                all interactions with the FleetBlox Services, whether through
                web-based platforms, mobile applications, APIs, or other means
                through which Users engage with the FleetBlox platform.
              </p>
              <p className="text-[#7D7D7D]">
                This Policy governs the collection, processing, and storage of
                Personal Data by After20solutions Inc. irrespective of the
                geographic location of the User or the data processing/storage
                location. Specifically, this Policy governs the following:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Personal Data Collection:</strong> Information
                  provided by Users during their access or use of the Services,
                  including personal identification details, usage information,
                  vehicle data, and payment details.
                </li>
                <li>
                  <strong>Personal Data Processing:</strong> Processing of
                  Personal Data related to vehicle performance, fleet status,
                  operational data, and usage data, including data derived from
                  vehicle telemetry and diagnostics.
                </li>
                <li>
                  <strong>Personal Data Storage:</strong> The storage,
                  retention, and safeguarding of Personal Data associated with
                  fleet management operations within the FleetBlox platform.
                </li>
                <li>
                  <strong>Personal Data Sharing and Disclosure:</strong> The
                  sharing, transfer, or disclosure of Personal Data to
                  third-party service providers, business partners, regulatory
                  bodies, or other parties in accordance with the terms
                  described in this Privacy Policy.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                This Privacy Policy is drafted in accordance with the relevant
                data protection legislation, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>General Data Protection Regulation (GDPR)</strong>{" "}
                  (EU) 2016/679
                </li>
                <li>
                  <strong>California Consumer Privacy Act (CCPA)</strong>
                </li>
                <li>
                  <strong>
                    Personal Information Protection and Electronic Documents Act
                    (PIPEDA)
                  </strong>
                </li>
                <li>
                  <strong>California Privacy Rights Act (CPRA)</strong>
                </li>
                <li>
                  <strong>Brazilian General Data Protection Law (LGPD)</strong>
                </li>
                <li>
                  <strong>
                    Other Relevant Local Privacy and Data Protection Laws
                  </strong>
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                By using FleetBlox Services, you expressly acknowledge that this
                Policy applies to the collection, processing, and storage of
                Personal Data irrespective of your location, and that
                After20solutions Inc. processes Personal Data in accordance with
                international and regional data protection laws.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section id="information-collection" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              3. INFORMATION WE COLLECT
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                In the course of providing FleetBlox Services, After20solutions
                Inc. collects, processes, and stores various types of Personal
                Data that are essential for the proper functioning of the
                platform and for enhancing User experience. The data we collect
                is classified into the following categories:
              </p>
              <p className="text-[#7D7D7D]">
                <strong>Personal Information</strong>
                <br />
                We collect Personal Data that you provide directly when
                registering for or interacting with our platform:
                <br />
                <strong>Account Information:</strong> This includes your full
                name, email address, company name, phone number, job title, and
                other contact details. This data is essential for account
                creation, service management, and effective communication with
                Users.
                <br />
                <strong>Payment Information:</strong> For transactions,
                subscription services, and billing purposes, we collect billing
                data such as credit card details, billing addresses, and payment
                method information. Payment information is processed securely by
                third-party payment processors (e.g., Stripe), in compliance
                with PCI DSS and applicable data protection laws.
              </p>
              <p className="text-[#7D7D7D]">
                <strong>Vehicle Data</strong>
                <br />
                As part of the vehicle fleet management services we provide, we
                collect Telematics Data from vehicles in real-time. This data
                includes:
                <br />
                <strong>Vehicle Identification Number (VIN):</strong> A unique
                identifier for each vehicle, enabling us to manage fleet data on
                a vehicle-specific basis.
                <br />
                <strong>GPS Location Data:</strong> Real-time location
                information (latitude, longitude, timestamp) of each vehicle in
                the fleet. This data is crucial for real-time tracking, route
                management, and operational efficiency.
                <br />
                <strong>Operational Data:</strong> Data reflecting the
                performance and condition of each vehicle, such as:
                <br />
                Fuel levels, tire pressure, engine diagnostics
                <br />
                Maintenance schedules, service records
                <br />
                Performance metrics, e.g., mileage, speed, braking efficiency
                <br />
                This data is processed to ensure the fleet operates optimally,
                predict maintenance needs, and enhance vehicle safety.
              </p>
              <p className="text-[#7D7D7D]">
                <strong>Usage Data</strong>
                <br />
                To better understand how you interact with the FleetBlox
                platform, we collect usage data including:
                <br />
                <strong>Device Information:</strong> Data about the device used
                to access the platform (smartphones, tablets, desktop
                computers), operating system, browser type, and device settings.
                <br />
                <strong>IP Address:</strong> The IP address assigned to the
                device when accessing the platform. This data is used for
                troubleshooting, security, and location-based analysis.
                <br />
                <strong>Website Interaction:</strong> Data concerning your
                activity on the platform, such as pages visited, time spent,
                clicks, and interactions with content. This data is used to
                enhance platform performance and User experience.
              </p>
              <p className="text-[#7D7D7D]">
                <strong>Location Data</strong>
                <br />
                We collect Location Data to provide real-time tracking of
                vehicles within your fleet:
                <br />
                <strong>Real-Time Tracking:</strong> GPS-based tracking to
                monitor routes, manage operations, and ensure vehicles are
                operating efficiently within parameters such as time, location,
                and performance.
                <br />
                <strong>Fleet Operations Data:</strong> Detailed operational
                status of vehicles, including anomalies detected, route
                information, speed, and time.
                <br />
                <strong>Routing Information:</strong> Data about routes taken,
                including travel time, detours, delays, and other relevant
                parameters, for route optimization and cost reduction.
              </p>
              <p className="text-[#7D7D7D]">
                <strong>Legal Compliance and Data Protection</strong>
                <br />
                We process the above Personal Data in compliance with relevant
                data protection laws, ensuring lawful, fair, and transparent
                processing in line with:
                <br />
                General Data Protection Regulation (GDPR) (EU) 2016/679
                <br />
                California Consumer Privacy Act (CCPA)
                <br />
                Personal Information Protection and Electronic Documents Act
                (PIPEDA)
                <br />
                We adhere to the principles of data minimization and purpose
                limitation, ensuring data is adequate, relevant, and limited to
                what is necessary for providing FleetBlox Services. All data is
                processed with appropriate safeguards to maintain its security
                and confidentiality.
              </p>
              <p className="text-[#7D7D7D]">
                <strong>How We Process and Security Measures</strong>
                <br />
                1. <strong>Target Jurisdictions:</strong> FleetBlox operates
                globally and collects or processes data from Users in the
                following countries and regions. Our data handling practices
                comply with applicable laws and regulations in each
                jurisdiction, including but not limited to:
                <br />
                • United States (including data residency and processing)
                <br />
                • Canada
                <br />
                • European Union (EU) &amp; European Economic Area (EEA) –
                GDPR-compliant practices
                <br />
                • United Kingdom – In compliance with UK GDPR
                <br />
                2. <strong>Data Storage Locations:</strong> Our infrastructure
                is hosted primarily in secure facilities in the following
                locations:
                <br />
                • United States (e.g., AWS regions such as US-East/US-West)
                <br />
                • [Optional: AWS EU or Asia-Pacific regions]
                <br />
                • Cloudflare/Amplify or CDN nodes for global performance
                <br />
                3. <strong>International Transfers:</strong> If you are located
                outside the United States, your data may be transferred to,
                stored, and processed in the United States or other countries
                where our service providers are located. We ensure these
                transfers comply with applicable data protection laws, using
                Standard Contractual Clauses (SCCs) or other approved
                mechanisms.
              </p>
              <p className="text-[#7D7D7D]">
                <strong>Security Measures</strong>
                <br />
                We take significant measures to protect your data, implementing
                a combination of technical, organizational, and administrative
                controls:
                <br />
                <strong>Data Encryption</strong>
                <br />
                In Transit: We use TLS (Transport Layer Security) for encrypted
                data transmission between your browser and our servers.
                <br />
                At Rest: Data stored in our AWS infrastructure is encrypted
                using AES-256.
                <br />
                <strong>Access Control</strong>
                <br />
                • Restricted system access based on roles and the
                least-privilege principle.
                <br />
                • Multi-factor authentication (MFA) is required for all
                administrative access.
                <br />
                • Sensitive data access is logged, monitored, and analyzed for
                anomalies.
                <br />
                <strong>Network &amp; Infrastructure Security</strong>
                <br />
                • Hosted in AWS US East (N. Virginia) with robust physical and
                network security measures.
                <br />
                • Virtual Private Cloud (VPC), firewalls, and security groups
                are used to isolate and protect resources.
                <br />
                • Regular software patching and vulnerability management as part
                of our DevOps workflows.
                <br />
                <strong>Incident Monitoring &amp; Response</strong>
                <br />
                • 24/7 monitoring of our systems for security, performance, and
                uptime.
                <br />
                • An established incident response plan to address potential
                data breaches or disruptions promptly.
                <br />
                <strong>Security Certifications</strong>
                <br />• While FleetBlox is not currently SOC 2 or ISO 27001
                certified, we follow industry-standard practices and leverage
                AWS infrastructure, which holds certifications for SOC 1, SOC 2,
                SOC 3; ISO/IEC 27001, 27017, 27018; PCI DSS, FedRAMP, and
                others.
              </p>
            </div>
          </section>

          {/* Sharing and Disclosure */}
          <section id="purpose-collection-use" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              4. PURPOSE OF DATA COLLECTION AND USE
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                After20solutions Inc. processes your Personal Data for the
                following lawful, specified, and legitimate purposes, in
                accordance with applicable data protection laws, including but
                not limited to the General Data Protection Regulation (GDPR)
                (EU) 2016/679, California Consumer Privacy Act (CCPA), and
                Personal Information Protection and Electronic Documents Act
                (PIPEDA). These purposes include, but are not limited to, the
                following:
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                1. Service Provision
              </h3>
              <p className="text-[#7D7D7D]">
                We collect and process Personal Data in order to provide,
                operate, and enhance the FleetBlox Services, which include, but
                are not limited to, the following:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Real-Time Data Streaming:</strong> Continuous
                  collection and transmission of telematics and diagnostic data
                  from vehicles in your fleet to provide up-to-date information
                  regarding the operational status of each vehicle. This
                  includes, but is not limited to, GPS location, fuel levels,
                  tire pressure, engine diagnostics, and other vital vehicle
                  health metrics.
                  <br />
                  <em>Legal Basis:</em> The processing is necessary for the
                  performance of a contract to which the data subject is a
                  party, pursuant to Article 6(1)(b) of the GDPR.
                </li>
                <li>
                  <strong>Vehicle Diagnostics:</strong> Monitoring and analyzing
                  the health and performance of your fleet&apos;s vehicles,
                  including, but not limited to, engine diagnostics, fuel
                  consumption, tire pressure, and predictive maintenance needs.
                  <br />
                  <em>Legal Basis:</em> The processing is necessary for the
                  performance of a contract, pursuant to Article 6(1)(b) of the
                  GDPR.
                </li>
                <li>
                  <strong>Predictive Maintenance:</strong> Using collected
                  vehicle data to anticipate when a vehicle will require
                  maintenance or repairs. This minimizes downtime and ensures
                  that vehicles remain operational, preventing unexpected
                  vehicle failures.
                  <br />
                  <em>Legal Basis:</em> The processing is necessary for the
                  performance of a contract, pursuant to Article 6(1)(b), and
                  may be based on consent in the case of optional data
                  collection.
                </li>
                <li>
                  <strong>Fleet Performance Optimization:</strong> Analyzing
                  operational data to optimize routes, reduce fuel consumption,
                  extend vehicle lifespan, and improve the overall operational
                  efficiency of the fleet.
                  <br />
                  <em>Legal Basis:</em> The processing is necessary for the
                  legitimate interests pursued by After20solutions Inc., namely,
                  improving the efficiency of fleet management, pursuant to
                  Article 6(1)(f) of the GDPR.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2. Improvement of Services
              </h3>
              <p className="text-[#7D7D7D]">
                We process Personal Data to enhance, improve, and further
                develop the functionality, security, and overall user experience
                of our platform, as follows:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Platform Development:</strong> Analyzing how Users
                  interact with the platform to identify areas for improvement,
                  and implementing updates or new features that better serve
                  User&apos;s needs and preferences.
                  <br />
                  <em>Legal Basis:</em> The processing is necessary for the
                  legitimate interests pursued by After20solutions Inc. in
                  enhancing the user experience and continuously improving
                  services, pursuant to Article 6(1)(f) of the GDPR.
                </li>
                <li>
                  <strong>Security Enhancements:</strong> Continuously
                  monitoring system usage and user behavior for potential
                  security vulnerabilities, improving data protection
                  mechanisms, and ensuring the confidentiality, integrity, and
                  availability of all Personal Data processed.
                  <br />
                  <em>Legal Basis:</em> The processing is necessary for the
                  performance of a contract and for the legitimate interests
                  pursued by After20solutions Inc., specifically ensuring
                  platform security, pursuant to Article 6(1)(b) and Article
                  6(1)(f) of the GDPR.
                </li>
                <li>
                  <strong>User Experience Optimization:</strong> Analyzing usage
                  data (e.g., device type, operating system, IP address, pages
                  visited) to identify usability pain points, optimize the user
                  interface, improve accessibility, and ultimately enhance the
                  overall user experience.
                  <br />
                  <em>Legal Basis:</em> The processing is based on User consent,
                  pursuant to Article 6(1)(a) of the GDPR, or for the legitimate
                  interests of After20solutions Inc. in improving services,
                  pursuant to Article 6(1)(f).
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3. Marketing and Communications
              </h3>
              <p className="text-[#7D7D7D]">
                We may process Personal Data for marketing and communications
                purposes, provided that you have explicitly consented to such
                processing, as set out below:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Promotional Content:</strong> Sending you updates,
                  newsletters, and promotional materials about our products and
                  services, including but not limited to information about new
                  features, services, or special offers.
                  <br />
                  <em>Legal Basis:</em> Processing is based on your explicit
                  consent, pursuant to Article 6(1)(a) of the GDPR, and in
                  accordance with the requirements of CCPA and PIPEDA.
                </li>
                <li>
                  <strong>Service Updates:</strong> Communicating necessary
                  updates regarding the functionality or availability of the
                  Services, including notices regarding scheduled maintenance,
                  product upgrades, and security-related notifications.
                  <br />
                  <em>Legal Basis:</em> Processing is necessary for the
                  performance of a contract, pursuant to Article 6(1)(b) of the
                  GDPR.
                </li>
                <li>
                  <strong>Targeted Communications:</strong> Using data analysis
                  and segmentation techniques to personalize content and offers,
                  ensuring that marketing communications are relevant and
                  tailored to User preferences and needs.
                  <br />
                  <em>Legal Basis:</em> Processing is based on consent or
                  legitimate interests in marketing activities, pursuant to
                  Article 6(1)(a) and Article 6(1)(f) of the GDPR.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4. Compliance with Legal and Regulatory Requirements
              </h3>
              <p className="text-[#7D7D7D]">
                We process Personal Data in order to comply with applicable
                legal, regulatory, and contractual obligations, including but
                not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Vehicle Compliance:</strong> Ensuring that the
                  vehicles in your fleet comply with relevant regulatory
                  requirements such as emission standards, safety checks, and
                  other industry-specific regulations.
                  <br />
                  <em>Legal Basis:</em> Processing is necessary for compliance
                  with a legal obligation, pursuant to Article 6(1)(c) of the
                  GDPR.
                </li>
                <li>
                  <strong>Maintenance Records:</strong> Keeping accurate records
                  of maintenance activities, inspections, and repairs in
                  accordance with legal or contractual obligations, and ensuring
                  that these records are kept up-to-date.
                  <br />
                  <em>Legal Basis:</em> Processing is necessary for compliance
                  with a legal obligation, pursuant to Article 6(1)(c) of the
                  GDPR.
                </li>
                <li>
                  <strong>Safety Checks:</strong> Processing data related to
                  vehicle health and safety, including compliance with safety
                  inspections, certifications, and monitoring for operational
                  risks that may compromise safety.
                  <br />
                  <em>Legal Basis:</em> Processing is necessary for the purposes
                  of compliance with legal obligations concerning safety and
                  risk prevention, pursuant to Article 6(1)(c).
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5. Analytics and Insights
              </h3>
              <p className="text-[#7D7D7D]">
                We process Personal Data for analytical purposes, which enables
                us to offer insights, enhance fleet management operations, and
                improve overall efficiency, including:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Fleet Performance Tracking:</strong> Monitoring and
                  analyzing fleet performance, including metrics like fuel
                  consumption, route optimization, and vehicle usage to ensure
                  that assets are fully optimized for operational efficiency.
                  <br />
                  <em>Legal Basis:</em> Processing is necessary for the
                  legitimate interests of After20solutions Inc., such as
                  improving fleet management operations, pursuant to Article
                  6(1)(f) of the GDPR.
                </li>
                <li>
                  <strong>Identification of Inefficiencies:</strong> Identifying
                  inefficiencies such as underutilized vehicles, excessive fuel
                  consumption, or unplanned downtime, and providing actionable
                  recommendations to improve fleet performance and
                  cost-effectiveness.
                  <br />
                  <em>Legal Basis:</em> Processing is necessary for the
                  legitimate interests of After20solutions Inc. in enhancing
                  operational efficiency, pursuant to Article 6(1)(f) of the
                  GDPR.
                </li>
                <li>
                  <strong>Cost Management and ROI Insights:</strong> Delivering
                  insights into fleet-related costs, including maintenance,
                  fuel, labor, and operational expenses, and providing
                  recommendations to improve ROI by optimizing the fleet&apos;s
                  operational performance.
                  <br />
                  <em>Legal Basis:</em> Processing is necessary for the
                  legitimate interests of After20solutions Inc. in assisting
                  Users in maximizing fleet productivity and minimizing
                  operational costs, pursuant to Article 6(1)(f) of the GDPR.
                </li>
              </ul>
            </div>
          </section>

          {/* Legal Basis for Processing Personal Data */}
          <section id="legal-basis-processing" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              5. LEGAL BASIS FOR PROCESSING PERSONAL DATA
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                After20solutions Inc. processes your Personal Data in accordance
                with the applicable data protection laws, including but not
                limited to the General Data Protection Regulation (GDPR) (EU)
                2016/679, the California Consumer Privacy Act (CCPA), and the
                Personal Information Protection and Electronic Documents Act
                (PIPEDA). The legal grounds for the processing of your Personal
                Data are as follows:
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                1. Consent
              </h3>
              <p className="text-[#7D7D7D]">
                We process your Personal Data where you have provided explicit,
                informed, and unequivocal consent. For example, you may give
                consent when you agree to receive marketing communications,
                newsletters, or use specific service features that require data
                processing. You have the right to withdraw your consent at any
                time. Such withdrawal will not affect the lawfulness of
                processing based on consent before its withdrawal, as provided
                under Article 7 of the GDPR, Section 1798.120 of the CCPA, and
                Section 6.1 of PIPEDA.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 6(1)(a) of the GDPR, Section 1798.120 of
                the CCPA, and Section 6.1 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2. Contractual Necessity
              </h3>
              <p className="text-[#7D7D7D]">
                We process your Personal Data when it is necessary for the
                performance of a contract to which you are a party. This
                includes providing you with fleet management services, real-time
                vehicle diagnostics, predictive maintenance, and other
                operational features. Additionally, we process your Personal
                Data to fulfill our contractual obligations under any service
                agreement, such as managing vehicle maintenance schedules, fleet
                performance reports, and other contractually defined services.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 6(1)(b) of the GDPR, Section
                1798.145(a)(1)(A) of the CCPA, and Section 5(3) of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3. Legal Obligation
              </h3>
              <p className="text-[#7D7D7D]">
                We process your Personal Data to comply with legal obligations
                imposed by relevant local, national, or international laws. This
                includes compliance with vehicle compliance regulations, safety
                checks, regulatory reporting requirements, and other statutory
                duties. We also retain your Personal Data to fulfill obligations
                such as regulatory authoritie&apos;s requirements, ensuring
                vehicle standards, and meeting statutory obligations under laws
                such as the Ontario Highway Traffic Act and similar regulations.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 6(1)(c) of the GDPR, Section 1798.150(b) of
                the CCPA, and Section 7(2) of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4. Legitimate Interests
              </h3>
              <p className="text-[#7D7D7D]">
                We process your Personal Data based on our legitimate interests,
                which include but are not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Service Improvement:</strong> Improving and enhancing
                  our Services, ensuring they meet your operational needs and
                  preferences.
                </li>
                <li>
                  <strong>Security:</strong> Ensuring the security of our
                  platform, detecting and preventing fraud, unauthorized access,
                  and criminal activities.
                </li>
                <li>
                  <strong>User Experience:</strong> Analyzing usage and
                  interaction data to enhance user experience and operational
                  efficiency.
                </li>
                <li>
                  <strong>Platform Operation and Risk Management:</strong>{" "}
                  Ensuring the integrity and security of our platform, including
                  risk assessment, fraud prevention, and maintaining data
                  privacy standards.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                We ensure that your rights and freedoms are not overridden by
                our legitimate interests, and we assess the necessity and
                proportionality of the processing as part of our legitimate
                interest assessments.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 6(1)(f) of the GDPR, Section 1798.145(c) of
                the CCPA, and Section 5(3)(b) of PIPEDA.
              </p>
            </div>
          </section>

          {/* Data Sharing and Disclosure */}
          <section id="sharing-disclosure" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              6. DATA SHARING AND DISCLOSURE
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                We may disclose your Personal Data to the following parties, in
                compliance with applicable legal provisions and safeguards, as
                required by data protection laws:
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                1. Service Providers
              </h3>
              <p className="text-[#7D7D7D]">
                We may share your Personal Data with third-party service
                providers who assist us in providing our Services, including but
                not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>Cloud hosting providers</li>
                <li>Payment processors</li>
                <li>Data analytics firms</li>
                <li>Fleet monitoring and maintenance service providers</li>
              </ul>
              <p className="text-[#7D7D7D]">
                These third-party service providers are contractually bound to
                ensure the confidentiality and security of your Personal Data.
                They are authorized to process the data solely in accordance
                with our instructions and applicable data protection laws,
                including Article 28 of the GDPR and Section 1798.145(c) of the
                CCPA.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 28 of the GDPR, Section 1798.145(c) of the
                CCPA, and Section 5(3) of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2. Legal Compliance
              </h3>
              <p className="text-[#7D7D7D]">
                We may disclose your Personal Data if required by law,
                including, but not limited to, in response to valid subpoenas,
                court orders, or governmental requests. Such disclosures may be
                required to protect the rights, property, and safety of
                After20solutions Inc., our Users, or others. This may include
                compliance with PIPEDA, GDPR, and CCPA provisions.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Compliance with a legal obligation pursuant to
                Article 6(1)(c) of the GDPR, Section 1798.150(b) of the CCPA,
                and Section 7(2) of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3. Business Transfers
              </h3>
              <p className="text-[#7D7D7D]">
                In the event of a merger, acquisition, or sale of all or part of
                our assets, your Personal Data may be transferred as part of the
                transaction. We will provide notice of such changes in ownership
                and ensure that the acquirer or transferee agrees to abide by
                the terms of this Privacy Policy or a substantially similar
                policy. In such cases, we will ensure that the transfer complies
                with applicable laws, and appropriate safeguards are put in
                place to protect your Personal Data.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Legitimate interests pursuant to Article 6(1)(f) of
                the GDPR, Section 1798.145(c) of the CCPA, and Section 5(3)(b)
                of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4. No Sale of Personal Data
              </h3>
              <p className="text-[#7D7D7D]">
                We do not sell, trade, or rent your Personal Data to third
                parties for their own marketing purposes without your explicit
                consent. All data processing activities related to marketing are
                based on your explicit consent, in compliance with Article
                6(1)(a) of the GDPR, Section 1798.120 of the CCPA, and Section
                6.1 of PIPEDA.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Consent pursuant to Article 6(1)(a) of the GDPR,
                Section 1798.120 of the CCPA, and Section 6.1 of PIPEDA.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section id="data-retention" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              7. DATA RETENTION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                We retain your Personal Data only for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, comply
                with legal obligations, resolve disputes, and enforce our
                agreements. When information is no longer needed, we securely
                delete or anonymize it.
              </p>
              <p className="text-[#7D7D7D]">
                <strong>Retention Periods</strong>
                <br />
                The specific retention periods for different types of Personal
                Data are as follows:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Account Information:</strong> Retained for the
                  duration of your account plus 7 years for legal compliance and
                  audit purposes.
                </li>
                <li>
                  <strong>Vehicle Data:</strong> Retained for 3 years from the
                  date of collection, after which it is anonymized for
                  analytical purposes.
                </li>
                <li>
                  <strong>Payment Information:</strong> Retained for 7 years in
                  accordance with financial regulations and tax requirements.
                </li>
                <li>
                  <strong>Usage Data:</strong> Retained for 2 years for service
                  improvement and analytics, then anonymized.
                </li>
                <li>
                  <strong>Location Data:</strong> Retained for 1 year for
                  operational purposes, then securely deleted.
                </li>
                <li>
                  <strong>Communication Records:</strong> Retained for 3 years
                  for customer service and legal compliance.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                <strong>Data Deletion and Anonymization</strong>
                <br />
                When Personal Data reaches the end of its retention period, we
                implement secure deletion or anonymization processes:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Secure Deletion:</strong> Personal Data is permanently
                  deleted using industry-standard secure deletion methods that
                  prevent recovery.
                </li>
                <li>
                  <strong>Anonymization:</strong> Where data is retained for
                  analytical purposes, we remove all identifying information to
                  ensure individuals cannot be re-identified.
                </li>
                <li>
                  <strong>Backup Data:</strong> Backup copies are also subject
                  to the same retention policies and are deleted or anonymized
                  accordingly.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                <strong>Legal Basis for Retention</strong>
                <br />
                Our data retention practices are based on:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Contractual Necessity:</strong> Retaining data
                  necessary for the performance of our services and contractual
                  obligations.
                </li>
                <li>
                  <strong>Legal Obligations:</strong> Compliance with applicable
                  laws, regulations, and industry standards requiring data
                  retention.
                </li>
                <li>
                  <strong>Legitimate Interests:</strong> Retaining data for
                  business operations, security, and fraud prevention within
                  reasonable timeframes.
                </li>
                <li>
                  <strong>Consent:</strong> Where you have provided explicit
                  consent for specific retention periods.
                </li>
              </ul>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 5(1)(e) of the GDPR (storage limitation),
                Section 1798.105 of the CCPA (right to deletion), and Section
                4.5 of PIPEDA (limiting collection, use, and retention).
              </p>
            </div>
          </section>

          {/* Security Measures */}
          <section id="security-measures" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              8. DATA SECURITY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                We implement appropriate physical, technical, and organizational
                measures designed to ensure the security and confidentiality of
                your Personal Data and to protect it from unauthorized access,
                use, disclosure, alteration, or destruction. These measures
                include, but are not limited to:
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                1. Encryption
              </h3>
              <p className="text-[#7D7D7D]">
                To safeguard your Personal Data, we ensure that all data is
                encrypted:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>In Transit:</strong> All data transmitted between your
                  browser, the FleetBlox platform, and our servers is encrypted
                  using Transport Layer Security (TLS) to protect it from
                  unauthorized interception during transmission.
                </li>
                <li>
                  <strong>At Rest:</strong> Data stored within our systems,
                  including cloud infrastructure, is encrypted using AES-256
                  (Advanced Encryption Standard with a 256-bit key), which is a
                  military-grade encryption standard recognized globally for its
                  strength in safeguarding sensitive data.
                </li>
              </ul>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 32 (Security of Processing) of the GDPR,
                Section 1798.150(a) of the CCPA, and Section 7 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2. Access Controls
              </h3>
              <p className="text-[#7D7D7D]">
                We implement role-based access control (RBAC) to ensure that
                only authorized personnel have access to Personal Data. These
                access controls include:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Least-Privilege Principle:</strong> Ensuring that
                  access to data is limited to only those individuals who
                  require it for their specific job functions.
                </li>
                <li>
                  <strong>Multi-Factor Authentication (MFA):</strong> All
                  administrative access to systems containing Personal Data is
                  protected through multi-factor authentication to add an
                  additional layer of security.
                </li>
                <li>
                  <strong>Monitoring and Logging:</strong> Sensitive data access
                  is logged, and anomaly detection systems are in place to flag
                  any suspicious activities.
                </li>
              </ul>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 32(4) (Security of Processing) of the GDPR,
                Section 1798.150(a) of the CCPA, and Section 7 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3. Regular Security Audits
              </h3>
              <p className="text-[#7D7D7D]">
                We conduct periodic security audits and vulnerability
                assessments to identify and mitigate potential risks and
                security breaches. These assessments are designed to ensure that
                our platform is continuously protected against emerging threats
                and vulnerabilities.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 32(1) (Security of Processing) of the GDPR,
                Section 1798.150(a) of the CCPA, and Section 7 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4. Network and Infrastructure Security
              </h3>
              <p className="text-[#7D7D7D]">
                Our network security measures include:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Virtual Private Cloud (VPC):</strong> Our
                  infrastructure is hosted within a Virtual Private Cloud (VPC),
                  which ensures that resources are isolated and protected from
                  unauthorized access.
                </li>
                <li>
                  <strong>Firewalls and Security Groups:</strong> We use
                  firewalls and security groups to restrict network access based
                  on predefined rules and ensure that only authorized traffic
                  reaches critical infrastructure.
                </li>
                <li>
                  <strong>
                    Regular Software Patching and Vulnerability Management:
                  </strong>{" "}
                  We implement a standard DevOps workflow, including regular
                  software patching and proactive vulnerability management, to
                  ensure that all components of our platform remain secure and
                  up-to-date.
                </li>
              </ul>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 32 (Security of Processing) of the GDPR,
                Section 1798.150(a) of the CCPA, and Section 7 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5. Application Security
              </h3>
              <p className="text-[#7D7D7D]">
                We employ robust application security measures such as:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Routine Code Reviews:</strong> Our development process
                  includes routine code reviews and dependency scanning to
                  identify vulnerabilities before the code is deployed.
                </li>
                <li>
                  <strong>Continuous Integration (CI):</strong> Our CI pipeline
                  includes automated static and dynamic analysis tools to assess
                  the security of the application code continuously.
                </li>
                <li>
                  <strong>Security Testing:</strong> Regular security testing is
                  performed to ensure that our applications are secure and that
                  vulnerabilities are detected and mitigated.
                </li>
              </ul>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 32(1) (Security of Processing) of the GDPR,
                Section 1798.150(a) of the CCPA, and Section 7 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6. Monitoring &amp; Incident Response
              </h3>
              <p className="text-[#7D7D7D]">
                Our platform is monitored 24/7 for performance, uptime, and
                security events. We have a comprehensive incident response plan
                in place, which includes:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Data Breach Response:</strong> In the event of a data
                  breach, we will notify the relevant authorities, affected
                  individuals, and other necessary parties in compliance with
                  GDPR Article 33 and CCPA Section 1798.82.
                </li>
                <li>
                  <strong>Security Events:</strong> We also monitor for fraud,
                  unauthorized access, and other criminal activities to ensure
                  the protection of both Personal Data and platform integrity.
                </li>
              </ul>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 33 (Notification of a Personal Data Breach
                to the Supervisory Authority) of the GDPR, Section 1798.82 of
                the CCPA, and Section 10 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                7. Security Certifications
              </h3>
              <p className="text-[#7D7D7D]">
                While FleetBlox is not currently SOC 2 or ISO 27001 certified,
                we follow industry-standard security practices and leverage
                Amazon Web Services (AWS) infrastructure, which is certified
                for:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>SOC 1, SOC 2, SOC 3</li>
                <li>ISO/IEC 27001, 27017, 27018</li>
                <li>PCI DSS, FedRAMP, and others</li>
              </ul>
              <p className="text-[#7D7D7D]">
                For more information on AWS security compliance, please visit
                the{" "}
                <a
                  href="https://aws.amazon.com/compliance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0336BC] hover:underline"
                >
                  AWS Compliance Programs
                </a>
                .
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 32 (Security of Processing) of the GDPR,
                Section 1798.150(a) of the CCPA, and Section 7 of PIPEDA.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              9. USER RIGHTS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                Under applicable data protection laws, including but not limited
                to the General Data Protection Regulation (GDPR) (EU) 2016/679,
                California Consumer Privacy Act (CCPA), and Personal Information
                Protection and Electronic Documents Act (PIPEDA) (Canada), you
                have the following rights regarding your Personal Data:
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                1. Right to Access
              </h3>
              <p className="text-[#7D7D7D]">
                You have the right to request a copy of the Personal Data we
                hold about you, including the purposes for which we are
                processing it, and the categories of Personal Data concerned.
                Upon request, we will provide you with a copy of your Personal
                Data, free of charge, in accordance with applicable legal
                provisions.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 15 of the GDPR, Section 1798.100 of the
                CCPA, and Section 8 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2. Right to Rectification
              </h3>
              <p className="text-[#7D7D7D]">
                You have the right to request the correction of inaccurate or
                incomplete Personal Data held by us. We will take reasonable
                steps to ensure that any information we hold about you is
                accurate and up-to-date.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 16 of the GDPR, Section 1798.105 of the
                CCPA, and Section 10 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3. Right to Erasure (Right to be Forgotten)
              </h3>
              <p className="text-[#7D7D7D]">
                You may request that we delete your Personal Data when it is no
                longer necessary for the purposes for which it was collected or
                processed, or when you withdraw your consent (if applicable) or
                object to processing. The right to erasure does not apply in
                cases where processing is required for compliance with a legal
                obligation or for the establishment, exercise, or defense of
                legal claims.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 17 of the GDPR, Section 1798.105 of the
                CCPA, and Section 10 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4. Right to Data Portability
              </h3>
              <p className="text-[#7D7D7D]">
                You have the right to receive your Personal Data in a
                structured, commonly used, and machine-readable format, and to
                transmit that data to another data controller, where technically
                feasible. This right applies where the processing of Personal
                Data is based on consent or a contract.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 20 of the GDPR, Section 1798.130 of the
                CCPA, and Section 8 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5. Right to Object
              </h3>
              <p className="text-[#7D7D7D]">
                You may object to the processing of your Personal Data in
                certain circumstances, including where we process your Personal
                Data based on legitimate interests or for direct marketing
                purposes. Upon receiving your objection, we will cease
                processing your Personal Data unless we have compelling
                legitimate grounds for processing that override your rights and
                freedoms.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 21 of the GDPR, Section 1798.120 of the
                CCPA, and Section 10 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6. Right to Withdraw Consent
              </h3>
              <p className="text-[#7D7D7D]">
                Where we have obtained your consent to process your Personal
                Data, you have the right to withdraw that consent at any time.
                The withdrawal of consent will not affect the lawfulness of
                processing based on consent before its withdrawal. You may
                withdraw consent by contacting us via the contact information
                provided below.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 7(3) of the GDPR, Section 1798.135 of the
                CCPA, and Section 8 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                Exercising Your Rights
              </h3>
              <p className="text-[#7D7D7D]">
                To exercise any of the rights listed above, or if you have any
                concerns regarding our processing of your Personal Data, please
                contact us at the contact information provided below. We will
                respond to your request in accordance with applicable data
                protection laws and may require additional information to verify
                your identity before processing your request.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 12 of the GDPR, Section 1798.130 of the
                CCPA, and Section 10 of PIPEDA.
              </p>
            </div>
          </section>

          {/* International Data Transfers */}
          <section id="international-transfers" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              10. INTERNATIONAL DATA TRANSFERS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                As part of the provision of our Services, your Personal Data may
                be transferred to and stored in countries other than your
                country of residence. These jurisdictions may include, but are
                not limited to, the United States, the European Union (EU),
                Canada, and other countries that may not have the same level of
                data protection laws as your home country.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                International Transfers of Personal Data
              </h3>
              <p className="text-[#7D7D7D]">
                We ensure that appropriate safeguards are in place to protect
                your Personal Data when it is transferred internationally. These
                safeguards may include the use of Standard Contractual Clauses
                (SCCs), the EU-U.S. Privacy Shield Framework, or other legally
                approved mechanisms.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 44-50 of the GDPR, Section 1798.140 of the
                CCPA, and Section 7 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                Where We Store and Process Your Data
              </h3>
              <p className="text-[#7D7D7D]">
                All primary Personal Data (including user, vehicle, and
                operational data) is stored and processed in secure cloud
                infrastructure, including, but not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>
                    Amazon Web Services (AWS) U.S. East (N. Virginia) Region
                  </strong>{" "}
                  – us-east-1.
                </li>
                <li>
                  <strong>Backup and redundancy</strong> may also include secure
                  replication across other AWS regions within the U.S., but not
                  outside the United States.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                Transfers to Third-Party Providers
              </h3>
              <p className="text-[#7D7D7D]">
                Your Personal Data may be transferred to, and processed by,
                third-party service providers that assist us in providing our
                Services. This may include:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>Payment Processors</li>
                <li>Data Analytics Providers</li>
                <li>Hosting Providers</li>
                <li>Other Service Providers</li>
              </ul>
              <p className="text-[#7D7D7D]">
                We ensure that such transfers are conducted in compliance with
                applicable data protection laws and are subject to Data
                Processing Agreements (DPAs), which include relevant security
                and privacy provisions.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 44-50 of the GDPR, Section 1798.140 of the
                CCPA, and Section 7 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                Safeguards for International Transfers
              </h3>
              <p className="text-[#7D7D7D]">
                To protect your Personal Data when it is transferred
                internationally, we implement safeguards such as:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4">
                <li>
                  <strong>Standard Contractual Clauses (SCCs)</strong> issued by
                  the European Commission or equivalent frameworks, where
                  required.
                </li>
                <li>
                  <strong>Data Processing Agreements (DPAs)</strong> with all
                  third-party vendors and subprocessors.
                </li>
                <li>
                  <strong>Encryption of Personal Data</strong> both at rest and
                  in transit, utilizing industry-standard encryption protocols
                  (e.g., TLS and AES-256).
                </li>
                <li>
                  <strong>Access Controls and Audit Logs</strong> to prevent
                  unauthorized access.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                By using our Services, you consent to the transfer of your
                Personal Data to these countries and the processing of such data
                in accordance with the terms of this Privacy Policy.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 44-50 of the GDPR, Section 1798.140 of the
                CCPA, and Section 7 of PIPEDA.
              </p>
            </div>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section id="cookies" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              11. COOKIES AND TRACKING TECHNOLOGIES
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                To enhance your user experience and to analyze and optimize our
                Services, we use various tracking technologies, including
                cookies and web beacons. These technologies allow us to collect
                data on how users interact with our platform, improve our
                content and services, and personalize your experience.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                Cookies
              </h3>
              <p className="text-[#7D7D7D]">
                Cookies are small text files that are placed on your device when
                you visit our platform. They store information that helps us
                recognize your device and retain certain preferences, which
                allows us to provide a more personalized experience upon your
                return to our platform.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 6(1)(f) of the GDPR, Section 1798.135 of
                the CCPA, and Section 10 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                Web Beacons
              </h3>
              <p className="text-[#7D7D7D]">
                Web beacons are small, transparent images embedded in web pages
                or emails that track user activity, such as whether an email was
                opened or whether a specific page was visited. Web beacons help
                us measure the effectiveness of our communications and analyze
                user behavior.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 6(1)(f) of the GDPR, Section 1798.135 of
                the CCPA, and Section 10 of PIPEDA.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                Managing Cookies
              </h3>
              <p className="text-[#7D7D7D]">
                You can control the use of cookies through your browser
                settings. Most browsers allow you to accept or reject all
                cookies or receive a notification when a cookie is being sent.
                However, please note that if you choose to disable cookies, some
                features of the Services may not function as intended, and your
                user experience may be affected.
              </p>
              <p className="text-[#7D7D7D]">
                By continuing to use our platform, you consent to the use of
                cookies and other tracking technologies as described in this
                Privacy Policy.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 6(1)(a) (Consent) of the GDPR, Section
                1798.135 of the CCPA, and Section 10 of PIPEDA.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section id="children-privacy" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              12. CHILDREN&apos;S PRIVACY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                Our Services are not intended for use by children under the age
                of 16. In compliance with applicable data protection laws,
                including but not limited to the General Data Protection
                Regulation (GDPR) (EU) 2016/679, the California Consumer Privacy
                Act (CCPA), and other relevant national and international
                privacy laws, we do not knowingly collect, process, or solicit
                Personal Data from children.
              </p>
              <p className="text-[#7D7D7D]">
                If we learn that we have inadvertently collected Personal Data
                from a child under the age of 16, we will take immediate steps
                to delete such data from our records, in accordance with
                applicable privacy laws and regulations.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 8 of the GDPR, Section 1798.120 of the
                CCPA, and Section 10 of PIPEDA (Canada).
              </p>
              <p className="text-[#7D7D7D]">
                If you believe that we have collected Personal Data from a
                child, please contact us at{" "}
                <a
                  href="mailto:Privacy@fleetblox.com"
                  className="text-[#0336BC] hover:underline"
                >
                  Privacy@fleetblox.com
                </a>
                , and we will take appropriate action, including but not limited
                to the deletion of such data and ensuring that further
                collection of data from minors is prohibited.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Rights: Article 8 of the GDPR, Section 1798.120 of the
                CCPA.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section id="third-party-services" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              13. THIRD-PARTY LINKS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                Our platform may contain links to third-party websites,
                applications, or services that are not operated or controlled by
                us. These third-party sites, applications, or services are
                governed by their own privacy policies, terms of service, and
                practices, which may differ from those set forth in this Privacy
                Policy.
              </p>
              <p className="text-[#7D7D7D]">
                We do not assume any responsibility or liability for the
                content, privacy practices, or policies of any third-party
                sites. As such, we encourage you to review the privacy policy of
                any third-party site before disclosing any Personal Data or
                engaging with their services. The inclusion of a third-party
                link on our platform does not imply endorsement, association, or
                approval of the third-party site by us.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 12 of the GDPR, Section 1798.135 of the
                CCPA, and Section 8 of PIPEDA.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section id="children-privacy" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              12. CHILDREN&apos;S PRIVACY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                Our services are not intended for children under the age of 13.
                We do not knowingly collect personal information from children
                under 13. If we become aware that we have collected such
                information, we will take steps to delete it promptly.
              </p>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section id="changes-policy" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              14. CHANGES TO THIS PRIVACY POLICY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                We reserve the right to update, amend, or modify this Privacy
                Policy periodically, in accordance with legal, regulatory, or
                operational changes. Any changes made to this Privacy Policy
                will be reflected in an updated version posted on this page. The
                updated version will include a revised Effective Date to
                indicate the date of the latest revision.
              </p>
              <p className="text-[#7D7D7D]">
                We encourage you to review this Privacy Policy periodically to
                stay informed about how we collect, process, and protect your
                Personal Data. Continued use of our Services after any such
                changes constitutes your acceptance of the updated Privacy
                Policy.
              </p>
              <p className="text-[#7D7D7D]">
                In the event of significant changes, we may also notify you
                through alternative means, such as a prominent notice on our
                platform or through email communication.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 13 of the GDPR, Section 1798.135 of the
                CCPA, and Section 10 of PIPEDA.
              </p>
            </div>
          </section>

          {/* Governing Law and Jurisdiction */}
          <section id="jurisdiction" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              15. GOVERNING LAW AND JURISDICTION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                This Privacy Policy shall be governed by and construed in
                accordance with the laws of the Province of Ontario, Canada,
                without regard to its conflict of law principles. The parties
                expressly agree that any legal actions, suits, or proceedings
                arising out of or related to this Privacy Policy, or the
                collection, processing, or use of your Personal Data, shall be
                exclusively subject to the jurisdiction of the courts located in
                Toronto, Ontario, Canada.
              </p>
              <p className="text-[#7D7D7D]">
                By accessing or using our Services, you consent to the
                jurisdiction of the Ontario courts, and agree that any disputes
                or claims related to this Privacy Policy shall be resolved
                exclusively in the appropriate courts located within that
                jurisdiction. You further agree to submit to the personal
                jurisdiction of such courts and waive any objection to the venue
                or jurisdiction of any such actions, suits, or proceedings.
              </p>
              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 4 of the GDPR, Section 1798.150 of the
                CCPA, and Section 7 of PIPEDA.
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section id="contact" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              16. CONTACT US
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy, or if you wish to exercise your rights under
                applicable data protection laws, including those related to
                access, correction, deletion, or restriction of your Personal
                Data, please contact us using the information below:
              </p>

              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h3 className="text-[16px] sm:text-[18px] text-[#04082C] font-bold mb-2">
                  Contact Information:
                </h3>
                <p>
                  <strong>Company:</strong> After20solutions Inc.
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:Privacy@fleetblox.com"
                    className="text-[#0336BC] hover:underline"
                  >
                    Privacy@fleetblox.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> [Phone number to be provided]
                </p>
              </div>

              <p className="text-[#7D7D7D]">
                We are committed to addressing any inquiries or concerns
                promptly and transparently. If you are dissatisfied with our
                response or feel that we have not adequately addressed your
                concerns, you have the right to lodge a complaint with the
                Office of the Privacy Commissioner of Canada (OPC) or any other
                relevant data protection authority depending on your
                jurisdiction.
              </p>

              <p className="text-[#04082C] font-semibold text-[14px] sm:text-[16px]">
                Legal Basis: Article 12 of the GDPR, Section 1798.130 of the
                CCPA, and Section 10 of PIPEDA.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Floating Navigation Buttons - Desktop Only */}
      <div className="hidden lg:block fixed right-8 bottom-0 transform -translate-y-1/2 z-50">
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

export default PrivacyPolicy;
