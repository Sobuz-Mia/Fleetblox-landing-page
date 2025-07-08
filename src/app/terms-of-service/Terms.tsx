"use client";
import { useState, useEffect, useMemo } from "react";

const TermsAndService = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const keyContents = useMemo(
    () => [
      { id: "introduction", title: "Introduction" },
      { id: "definitions", title: "Definitions" },
      { id: "scope", title: "Scope and Applicability" },
      { id: "account", title: "Account Creation" },
      { id: "payment", title: "Payment Terms" },
      { id: "intellectual-property", title: "Intellectual Property" },
      { id: "data-protection", title: "Data Protection" },
      { id: "termination", title: "Account Termination" },
      { id: "acceptable-use", title: "Acceptable Use" },
      { id: "limitation", title: "Limitation of Liability" },
      { id: "dispute-resolution", title: "Dispute Resolution" },
      { id: "indemnification", title: "Indemnification" },
      { id: "modifications", title: "Modifications" },
      { id: "third-party", title: "Third-Party Services" },
      { id: "force-majeure", title: "Force Majeure" },
      { id: "cookies", title: "Cookies" },
      { id: "children-privacy", title: "Children's Privacy" },
      { id: "third-party-links", title: "Third-Party Links" },
      { id: "governing-law", title: "Governing Law" },
      { id: "data-retention", title: "Data Retention" },
      { id: "security", title: "Security Measures" },
      { id: "contact", title: "Contact Information" },
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
      {/* <div className="flex flex-col items-center justify-center p-4 sm:p-8 max-w-2xl h-[300px] sm:h-[400px] w-full mx-auto">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[52px] font-montserrat text-[#04082C] font-bold mb-4 text-center">
          Terms of Service
        </h1>
        <p className="text-[12px] sm:text-[14px] text-[#0336BC] font-openSans font-bold text-center">
          Effective: June 20, 2025
        </p>
      </div> */}

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
        {/* <div
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
        </div> */}

        {/* Main Content */}
        <div className="lg:w-full px-2 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Header */}

          {/* Introduction */}
          <section id="introduction" className="mb-6 lg:mb-8">
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#04082C] font-semibold">
                This Terms of Service Agreement (hereinafter referred to as the
                &ldquo;Agreement&rdquo;) is entered into as of the Effective
                Date set forth above, by and between After20solutions Inc., a
                corporation duly incorporated and existing under the laws of the
                Province of Ontario, Canada, having its principal place of
                business located at [Insert Address] (hereinafter referred to as
                &ldquo;FleetBlox,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
                &ldquo;us&rdquo;), and the individual or entity (hereinafter
                referred to as &ldquo;User,&rdquo; &ldquo;you,&rdquo; or
                &ldquo;your&rdquo;) who accesses, subscribes to, or otherwise
                uses the FleetBlox platform, software services, and any
                associated products, including but not limited to, fleet
                management, vehicle tracking, predictive maintenance, and
                operational optimization tools (the &ldquo;Services&rdquo;).
              </p>
              <p className="text-[#7D7D7D]">
                By accessing or utilizing the Services, whether via the
                FleetBlox web-based platform, mobile application, APIs, or any
                other method provided by FleetBlox (the &ldquo;Platform&rdquo;),
                you acknowledge and agree to be bound by all of the terms,
                conditions, and provisions of this Agreement, including any
                future amendments, updates, or modifications that may be made in
                accordance with the provisions hereof.
              </p>
              <p className="text-[#7D7D7D]">
                This Agreement, together with any other agreements, policies, or
                documents expressly referenced herein, governs your use of the
                FleetBlox Services and constitutes the complete, exclusive, and
                legally binding understanding between the parties concerning the
                subject matter hereof. If you are accessing or using the
                Services on behalf of a corporate entity or other legal
                structure, you represent and warrant that you have the authority
                to bind such entity or legal structure to the terms and
                conditions of this Agreement.
              </p>
              <p className="text-[#7D7D7D]">
                By continuing to use the Services, you further acknowledge and
                affirm that you have read, understood, and agreed to comply with
                the terms and conditions herein, including the data processing
                and privacy clauses, which govern the collection, use, and
                storage of your personal data as part of the Services.
              </p>
            </div>
          </section>

          {/* Definitions */}
          <section id="definitions" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              1. DEFINITIONS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#7D7D7D]">
                For the purposes of this Agreement, the following terms shall
                have the respective meanings ascribed to them, unless the
                context otherwise requires:
              </p>
              <div className="space-y-3">
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Services&rdquo;
                  </strong>{" "}
                  refers to the complete suite of services, features, and
                  functionalities provided by <strong>FleetBlox</strong>,
                  including but not limited to fleet management, real-time
                  vehicle tracking, telematics and vehicle diagnostics,
                  predictive maintenance, performance analytics, optimization
                  tools, third-party service integrations, and original
                  equipment manufacturer (OEM) integrations. The Services are
                  accessible through
                  <strong>FleetBlox</strong>&apos;s web platform, mobile
                  applications, APIs, and any other interface or medium
                  authorized by <strong>FleetBlox</strong> for the provision of
                  such services.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">&ldquo;User&rdquo;</strong>{" "}
                  refers to any individual, entity, or organization that
                  registers for, accesses, or uses the Services, including but
                  not limited to{" "}
                  <strong>
                    Fleet Managers, Administrators (Admins), Authorized
                    Personnel,
                  </strong>{" "}
                  or any representative, employee, contractor, or affiliate
                  acting on behalf of the User. A User may be a natural person,
                  a corporate entity, or any legal structure authorized to
                  utilize the Services.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Personal Data&rdquo;
                  </strong>{" "}
                  refers to any information relating to an identified or
                  identifiable individual, as defined under applicable data
                  protection laws, including but not limited to the{" "}
                  <strong>
                    General Data Protection Regulation (GDPR) (EU) 2016/679, the
                    California Consumer Privacy Act (CCPA), and the Personal
                    Information Protection and Electronic Documents Act
                    (PIPEDA).
                  </strong>{" "}
                  This includes, but is not limited to, personal identifiers,
                  contact information, vehicle data, operational and diagnostic
                  data, and any other information that can be used to identify
                  an individual directly or indirectly.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Data Controller&rdquo;
                  </strong>{" "}
                  refers to FleetBlox, the party that determines the purposes
                  and means of the processing of Personal Data in accordance
                  with applicable data protection laws. FleetBlox is responsible
                  for ensuring compliance with the relevant data protection
                  regulations.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Data Processor&rdquo;
                  </strong>{" "}
                  refers to any third party or entity, engaged by FleetBlox to
                  process Personal Data on its behalf in accordance with
                  instructions provided by FleetBlox. Data Processors include,
                  but are not limited to, service providers for hosting, payment
                  processing, or analytics.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Account&rdquo;
                  </strong>{" "}
                  refers to the registration and user profile created by a User
                  in order to access and utilize the Services. An Account
                  includes login credentials, profile information, and any
                  associated data linked to the User&apos;s access and use of
                  the Services.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Subscription&rdquo;
                  </strong>{" "}
                  refers to the paid agreement between FleetBlox and the User
                  for access to the Services, which is subject to payment terms
                  and conditions, including recurring payment intervals (e.g.,
                  monthly or annually), and any applicable fees for additional
                  features or capacity.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Vehicle Data&rdquo;
                  </strong>{" "}
                  refers to any data collected from the vehicles in the
                  User&apos;s fleet, including but not limited to, real-time GPS
                  location, vehicle diagnostics, fuel levels, engine status,
                  tire pressure, mileage, and other operational data.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Telematics Data&rdquo;
                  </strong>{" "}
                  refers to the data transmitted from a vehicle&apos;s onboard
                  systems and sensors, typically collected in real-time, which
                  includes data related to the vehicle&apos;s location, speed,
                  fuel consumption, tire condition, engine performance, and
                  other vehicle parameters relevant to fleet management.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;OEM Integration&rdquo;
                  </strong>{" "}
                  refers to the interface and connectivity between the FleetBlox
                  platform and the Original Equipment Manufacturer&apos;s (OEM)
                  software, enabling seamless integration of vehicle data and
                  diagnostics directly from the vehicle&apos;s onboard systems
                  into the FleetBlox platform.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Third-Party Service Providers&rdquo;
                  </strong>{" "}
                  refers to external vendors, contractors, or entities that
                  provide services that support the FleetBlox platform. These
                  may include cloud hosting providers, data storage services,
                  payment processors, API providers, and other service providers
                  integrated into the platform.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">&ldquo;API&rdquo;</strong>{" "}
                  (Application Programming Interface) refers to the set of
                  protocols, tools, and definitions that allow the FleetBlox
                  platform to interact with third-party services or external
                  software, facilitating data exchange, integration, and
                  interoperability between systems.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Fleet Manager&rdquo;
                  </strong>{" "}
                  refers to an individual user role within the FleetBlox
                  platform that has limited access and permissions to manage and
                  monitor vehicle data, fleet performance, and operational
                  tasks, as designated by an Admin or Owner.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Admin&rdquo; or Administrator
                  </strong>{" "}
                  refers to an individual or entity that has full access to the
                  FleetBlox platform and is authorized to manage user accounts,
                  roles, permissions, settings, and other aspects of the
                  platform on behalf of the User.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Authorized User&rdquo;
                  </strong>{" "}
                  refers to any individual who has been granted permission by
                  the Admin to access and use certain aspects of the FleetBlox
                  platform, including fleet data, reports, or vehicle-specific
                  information, within the scope of their role.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Usage Data&rdquo;
                  </strong>{" "}
                  refers to information collected about the User&apos;s
                  interaction with the FleetBlox platform, including data
                  regarding logins, frequency of use, features accessed, pages
                  visited, and other behavioral metrics that help FleetBlox
                  improve the platform&apos;s functionality and user experience.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Legal Obligations&rdquo;
                  </strong>{" "}
                  refers to any statutory or regulatory requirements to which
                  FleetBlox is subject, which necessitate the collection,
                  storage, or disclosure of Personal Data or other information
                  to government authorities, law enforcement, or regulatory
                  bodies.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    &ldquo;Security Incident&rdquo;
                  </strong>{" "}
                  refers to any event that compromises the confidentiality,
                  integrity, or availability of Personal Data or other
                  information stored or processed by FleetBlox. This includes,
                  but is not limited to, data breaches, unauthorized access,
                  data loss, and service disruptions that may impact the
                  platform&apos;s operation or the security of its users.
                </p>
              </div>
            </div>
          </section>

          {/* Scope and Applicability */}
          <section id="scope" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              2. SCOPE AND APPLICABILITY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                2.1 Introduction and Scope of Agreement
              </h3>
              <p className="text-[#7D7D7D]">
                This Terms of Service Agreement (the &ldquo;Agreement&rdquo;)
                constitutes a legally binding agreement between After20solutions
                Inc., a corporation duly incorporated under the laws of the
                Province of Ontario, Canada, doing business as FleetBlox
                (hereinafter referred to as &ldquo;FleetBlox,&rdquo;
                &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), and
                the individual or entity (hereinafter referred to as
                &ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;)
                who accesses, subscribes to, or otherwise uses the FleetBlox
                platform, software services, and any associated products or
                functionalities, including but not limited to fleet management,
                vehicle tracking, predictive maintenance, and operational
                optimization tools (the &ldquo;Services&rdquo;).
              </p>
              <p className="text-[#7D7D7D]">
                By accessing or utilizing the Services, whether via the
                FleetBlox web-based platform, mobile application, application
                programming interfaces (APIs), or any other method provided by
                FleetBlox (the &ldquo;Platform&rdquo;), you acknowledge and
                agree to be bound by all of the terms, conditions, and
                provisions set forth in this Agreement, including any future
                amendments, updates, or modifications made in accordance with
                the terms hereof.
              </p>
              <p className="text-[#7D7D7D]">
                This Agreement governs the use of the FleetBlox Services and
                constitutes the complete, exclusive, and legally binding
                understanding between the parties concerning the subject matter
                hereof. If you are accessing or using the Services on behalf of
                a corporate entity, governmental agency, or other legal
                structure, you represent and warrant that you have the authority
                to bind such entity or legal structure to the terms and
                conditions of this Agreement.
              </p>
              <p className="text-[#7D7D7D]">
                By continuing to use the Services, you further acknowledge and
                affirm that you have read, understood, and agreed to comply with
                the terms and conditions herein, including the data processing
                and privacy clauses, which govern the collection, use, and
                storage of your personal data as part of the Services.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2.2 Geographical Scope of Service
              </h3>
              <p className="text-[#7D7D7D]">
                The terms of this Agreement apply to all Users of FleetBlox
                Services, irrespective of their geographical location, provided
                that the Services are available in certain jurisdictions. The
                Services are available to users located within the following
                countries (the &ldquo;Eligible Jurisdictions&rdquo;):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 text-[#7D7D7D] text-[14px] sm:text-[16px]">
                <span>Austria</span>
                <span>Belgium</span>
                <span>Bulgaria</span>
                <span>Canada</span>
                <span>Croatia</span>
                <span>Cyprus</span>
                <span>Czech Republic</span>
                <span>Denmark</span>
                <span>Estonia</span>
                <span>Finland</span>
                <span>France</span>
                <span>Germany</span>
                <span>Greece</span>
                <span>Hungary</span>
                <span>Iceland</span>
                <span>Ireland</span>
                <span>Italy</span>
                <span>Latvia</span>
                <span>Lithuania</span>
                <span>Luxembourg</span>
                <span>Malta</span>
                <span>Netherlands</span>
                <span>Norway</span>
                <span>Poland</span>
                <span>Portugal</span>
                <span>Romania</span>
                <span>Slovakia</span>
                <span>Slovenia</span>
                <span>Spain</span>
                <span>Sweden</span>
                <span>Switzerland</span>
                <span>United Kingdom</span>
                <span>United States</span>
              </div>
              <p className="text-[#7D7D7D] mt-4">
                By agreeing to the terms of this Agreement, Users located in the
                Eligible Jurisdictions consent to the processing, transfer, and
                storage of their data in compliance with the relevant data
                protection laws in those jurisdictions.
              </p>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right, at its sole discretion, to modify
                or expand the list of Eligible Jurisdictions from time to time.
                Users from countries or regions not included in the above list
                may not be able to access or utilize the FleetBlox platform or
                Services, and FleetBlox shall have the right to deny access to
                Users in such countries or regions. If a User is unsure of the
                jurisdictional eligibility of their location, they should
                contact FleetBlox for further clarification before proceeding
                with registration.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2.3 Service Features and Scope of Use
              </h3>
              <p className="text-[#7D7D7D]">
                The FleetBlox Services, which are provided through the Platform,
                include a comprehensive suite of tools and functionalities
                designed for the management, optimization, and operational
                oversight of vehicle fleets. The following describes the
                principal services provided by FleetBlox:
              </p>
              <div className="space-y-3 mt-3">
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    Real-Time Vehicle Tracking:
                  </strong>{" "}
                  Continuous, real-time tracking of vehicles within the fleet
                  via GPS technology. This feature provides precise updates on
                  vehicle location, speed, fuel levels, and other key
                  operational parameters, enabling efficient fleet management
                  and real-time decision-making.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    Predictive Maintenance and Vehicle Diagnostics:
                  </strong>{" "}
                  FleetBlox utilizes advanced telematics and diagnostics tools
                  to monitor vehicle health and performance, providing proactive
                  alerts on maintenance needs, potential vehicle malfunctions,
                  or system failures before they result in downtime or service
                  interruptions. These tools aim to reduce costs associated with
                  unscheduled repairs and maximize vehicle lifespan.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    Performance Analytics and Optimization Tools:
                  </strong>{" "}
                  The platform collects and analyzes operational data from your
                  fleet, including but not limited to fuel consumption, mileage,
                  route optimization, and performance metrics. This data is then
                  processed into actionable insights designed to improve
                  operational efficiency, minimize fuel expenditure, and enhance
                  sustainability efforts.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    Integration with Third-Party Providers, Including OEMs and
                    Payment Processors:
                  </strong>{" "}
                  FleetBlox offers seamless integration with third-party
                  vendors, including Original Equipment Manufacturers (OEMs),
                  payment processors, and other service providers. These
                  integrations allow FleetBlox to synchronize vehicle data
                  directly from OEM systems, facilitating real-time diagnostics
                  and performance reporting.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    Customizable User Roles and Access Permissions:
                  </strong>{" "}
                  FleetBlox provides administrators with the ability to create
                  and customize user roles, define access levels, and manage
                  permissions. This feature ensures that access to the platform
                  is controlled and tailored based on the user&apos;s role
                  within the organization, offering flexibility and security in
                  fleet management operations.
                </p>
              </div>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2.4 Platform Accessibility and Compatibility
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox provides access to its Services through the following
                interfaces:
              </p>
              <div className="space-y-3 mt-3">
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    Web-Based Platform:
                  </strong>{" "}
                  Users can access the platform through compatible web browsers
                  on desktop or laptop devices. The web-based platform serves as
                  the primary interface for managing vehicle fleets, tracking
                  performance metrics, and accessing analytics tools.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    Mobile Applications:
                  </strong>{" "}
                  FleetBlox offers mobile applications for iOS and Android
                  devices, providing fleet managers and operators with real-time
                  updates, fleet performance tracking, and instant access to
                  data on the go.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong className="text-[#333333]">
                    Application Programming Interfaces (APIs):
                  </strong>{" "}
                  FleetBlox provides APIs for integration with third-party
                  services and custom-built applications. These APIs enable
                  seamless data exchange and extend the platform&apos;s
                  functionality beyond standard usage.
                </p>
              </div>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2.5 User Consent to Terms and Data Processing
              </h3>
              <p className="text-[#7D7D7D]">
                By continuing to access or use the FleetBlox Services, Users
                expressly consent to the collection, processing, and storage of
                their Personal Data in accordance with this Agreement. FleetBlox
                may update the terms of this Agreement or its privacy policy
                from time to time, and Users will be notified of such changes.
                Continued use of the Services after such updates will be deemed
                acceptance of the revised terms.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2.6 Modifications to the Agreement
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right to modify, amend, or update this
                Agreement at its sole discretion. When changes to this Agreement
                are made, FleetBlox will provide notice to Users of such changes
                by updating the effective date or directly notifying Users
                through their registered contact information or via the
                Platform. By continuing to use the Services after such updates,
                Users agree to the modified terms.
              </p>
              <p className="text-[#7D7D7D]">
                In the event that a conflict arises between this Agreement and
                any other agreements, terms, or policies governing the use of
                the FleetBlox Services, this Agreement shall govern, unless
                otherwise specified.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2.7 Restrictions on Use
              </h3>
              <p className="text-[#7D7D7D]">
                Users acknowledge that FleetBlox Services are provided solely
                for lawful purposes and are intended for use in jurisdictions
                where access to such Services is not prohibited by local laws.
                Users agree not to engage in any illegal, unlawful, or
                unauthorized activity while using the Services. The use of the
                Services is subject to compliance with all applicable local,
                state, and national laws, and Users are responsible for ensuring
                that their use of the platform complies with such laws.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2.8 Digital Key Control
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox provides a Digital Key functionality (hereinafter
                referred to as the &ldquo;Digital Key Feature&rdquo;) that
                allows authorized users (the &ldquo;User&rdquo;) to remotely
                execute certain vehicle-related functions. These functions
                include, but are not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 mt-3 ml-4">
                <li>
                  Initiating or halting the charging process of a vehicle;
                </li>
                <li>
                  Locking or unlocking vehicle doors and other secured areas of
                  the vehicle;
                </li>
                <li>
                  Activating or deactivating specific vehicle systems as made
                  available through the Platform.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-3">
                By utilizing the Digital Key Feature, the User acknowledges,
                agrees, and accepts full responsibility for any and all actions
                performed through the use of the Digital Key. The User agrees to
                utilize the Digital Key Feature solely for lawful purposes and
                in accordance with this Agreement, and shall bear sole
                responsibility for ensuring that the Digital Key is used in
                compliance with the manufacturer&apos;s instructions and the
                applicable laws and regulations governing its use.
              </p>

              <div className="mt-4">
                <h4 className="text-[18px] text-[#04082C] font-bold mb-2">
                  Security and Access Control:
                </h4>
                <p className="text-[#7D7D7D]">
                  The User further agrees to maintain the confidentiality of
                  their access credentials associated with the Digital Key
                  Feature, including but not limited to passwords, encryption
                  keys, or any other form of authentication provided by
                  FleetBlox for use with the Platform. The User is solely
                  responsible for all activities occurring under their account,
                  whether authorized or unauthorized. The User shall promptly
                  notify FleetBlox of any unauthorized access, suspected breach,
                  or misuse of their credentials or account, and agrees to
                  cooperate with FleetBlox in investigating any potential
                  breaches of security.
                </p>
              </div>

              <div className="mt-4">
                <h4 className="text-[18px] text-[#04082C] font-bold mb-2">
                  Liability Limitations:
                </h4>
                <p className="text-[#7D7D7D]">
                  FleetBlox shall not be held liable for any loss, damage,
                  injury, or claim arising out of or related to:
                </p>
                <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 mt-3 ml-4">
                  <li>
                    Unauthorized access to the Digital Key Feature due to the
                    User’s failure to adequately protect their account
                    credentials;
                  </li>
                  <li>
                    Vehicle damage or loss, whether physical or financial,
                    resulting from the use or misuse of the Digital Key Feature;
                  </li>
                  <li>
                    Malfunctions, failures, or inaccuracies in vehicle
                    performance or connectivity resulting from the activation or
                    deactivation of vehicle systems via the Digital Key Feature;
                  </li>
                  <li>
                    Any breach, compromise, or alteration of vehicle data,
                    including but not limited to the loss of data or vehicle
                    diagnostics, arising from the use of the Digital Key
                    Feature.
                  </li>
                </ul>
                <p className="text-[#7D7D7D] mt-3">
                  In no event shall FleetBlox be held liable for any indirect,
                  consequential, incidental, special, or punitive damages, or
                  for any loss of business opportunities, profits, data, or
                  goodwill resulting from the use or misuse of the Digital Key
                  Feature.
                </p>
              </div>

              <div className="mt-4">
                <h4 className="text-[18px] text-[#04082C] font-bold mb-2">
                  Vehicle Compatibility:
                </h4>
                <p className="text-[#7D7D7D]">
                  The Digital Key Feature may not be available for all vehicle
                  makes and models. The availability and functionality of the
                  Digital Key Feature depend on various factors, including but
                  not limited to:
                </p>
                <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 mt-3 ml-4">
                  <li>
                    The technical capabilities of the vehicle’s manufacturer
                    (Original Equipment Manufacturer or &quot;OEM&quot;);
                  </li>
                  <li>
                    The vehicle’s onboard connectivity and the level of
                    integration supported by the vehicle’s systems;
                  </li>
                  <li>
                    FleetBlox’s compatibility with OEM platforms, APIs, or other
                    integration systems used by the vehicle.
                  </li>
                </ul>
                <p className="text-[#7D7D7D] mt-3">
                  FleetBlox makes no representations or warranties regarding the
                  availability, compatibility, or performance of the Digital Key
                  Feature with specific vehicle brands, models, or OEM systems.
                  It is the User’s responsibility to verify the compatibility of
                  their vehicles with the FleetBlox platform and the Digital Key
                  Feature prior to subscribing to the Services.
                </p>
              </div>

              <div className="mt-4">
                <h4 className="text-[18px] text-[#04082C] font-bold mb-2">
                  No Warranty of Functionality:
                </h4>
                <p className="text-[#7D7D7D]">
                  FleetBlox does not warrant that the Digital Key Feature will
                  be available at all times or without interruption. FleetBlox
                  further disclaims any liability for issues or failures arising
                  from the Digital Key Feature’s functionality, including but
                  not limited to disruptions in vehicle connectivity, failure to
                  execute commands, or errors in data transmission between the
                  vehicle and the platform.
                </p>
              </div>

              <div className="mt-4">
                <h4 className="text-[18px] text-[#04082C] font-bold mb-2">
                  Third-Party Vehicles and Integrations:
                </h4>
                <p className="text-[#7D7D7D]">
                  The Digital Key Feature may require the use of third-party
                  systems, OEM integrations, or vehicle-specific software.
                  FleetBlox does not control or assume responsibility for the
                  actions or performance of such third-party services or
                  systems. The User agrees that FleetBlox is not liable for any
                  issues arising from third-party vehicles, APIs, OEM systems,
                  or third-party integrations with the FleetBlox platform
                </p>
              </div>

              <div className="mt-4">
                <h4 className="text-[18px] text-[#04082C] font-bold mb-2">
                  User Indemnification:
                </h4>
                <p className="text-[#7D7D7D]">
                  The User agrees to indemnify, defend, and hold harmless
                  FleetBlox, its affiliates, employees, officers, directors,
                  agents, and assigns from and against any and all claims,
                  losses, damages, liabilities, expenses, and costs (including
                  reasonable attorneys’ fees) arising from:
                </p>
                <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 mt-3 ml-4">
                  <li>
                    The User’s use or misuse of the Digital Key Feature,
                    including any failure to secure their credentials;
                  </li>
                  <li>
                    Unauthorized access or use of the User’s account or
                    credentials;
                  </li>
                  <li>
                    Damage to or loss of vehicles or property resulting from the
                    activation or deactivation of vehicle systems via the
                    Digital Key Feature;
                  </li>
                  <li>
                    The User’s failure to ensure that the vehicle’s manufacturer
                    and systems are compatible with the Digital Key Feature.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Account Creation and Registration Process */}
          <section id="account" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              3. ACCOUNT CREATION AND REGISTRATION PROCESS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                3.1 Account Registration Requirements
              </h3>
              <p className="text-[#7D7D7D]">
                In order to access and utilize the FleetBlox Services, you must
                first create an account. By doing so, you affirm and represent
                that you are at least eighteen (18) years of age, and are
                legally capable of entering into binding agreements under
                applicable laws. If you are registering on behalf of an entity,
                you confirm that you have the legal authority to bind that
                entity to the terms of this Agreement. FleetBlox reserves the
                right to reject or terminate any account created by an
                individual who does not meet the eligibility requirements.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.2 Account Security and Credential Management
              </h3>
              <p className="text-[#7D7D7D]">
                When registering for an account, you agree to provide accurate,
                current, and complete information as required during the
                registration process. This includes, but is not limited to, your
                name, business name (if applicable), email address, physical
                address, contact details, and any other information necessary to
                create and manage your account. You further agree to update this
                information promptly to maintain its accuracy. Failure to
                provide accurate or up-to-date information may result in the
                suspension or termination of your account, as outlined in
                Section 3.4.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.3 Account Security and Credentials
              </h3>
              <p className="text-[#7D7D7D]">
                Upon account creation, you will be required to choose a password
                and secure your account credentials. You are solely responsible
                for maintaining the confidentiality of your account credentials,
                including your username and password. You agree to immediately
                notify FleetBlox of any unauthorized use or suspected breach
                o3.4 Account Suspension or Termination f your account. FleetBlox
                is not liable for any loss or damage arising from your failure
                to comply with this responsibility.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.4 Account Suspension or Termination
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right to suspend, terminate, or restrict
                your account and access to the FleetBlox Services if:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  <strong>Inactivity:</strong> Your account has been inactive
                  for an extended period, as determined by FleetBlox in its sole
                  discretion. Inactivity is generally defined as failing to
                  access the Services for a continuous period of 60 days or
                  longer. FleetBlox may send a notification to the registered
                  email address before suspending or terminating an inactive
                  account, but is not obligated to do so.
                </li>
                <li>
                  <strong>Violation of Terms: </strong> Your account has been
                  used in a manner that violates the provisions of this
                  Agreement, including engaging in prohibited activities
                  outlined in Section [X] (e.g., illegal conduct, misuse of
                  Services, violation of intellectual property rights, etc.).
                </li>
                <li>
                  <strong>Fraudulent or Unlawful Use:</strong> Any fraudulent
                  activity or unlawful conduct associated with your account,
                  including but not limited to providing false information
                  during the account registration process, using the account for
                  illegal purposes, or engaging in activities that infringe upon
                  the rights of third parties.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-3">
                In the event of account termination, whether due to inactivity
                or violation of this Agreement, FleetBlox may retain some of
                your Personal Data, as required by law or for legitimate
                business purposes, including for dispute resolution, compliance,
                and prevention of fraud. FleetBlox will make reasonable efforts
                to notify you of any such action taken, but reserves the right
                to act without notice where necessary to protect the integrity
                and security of the platform.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.5 User Responsibility for Account Maintenance
              </h3>
              <p className="text-[#7D7D7D]">
                You are solely responsible for ensuring the proper maintenance
                and security of your account. This includes updating your
                contact information, promptly responding to communication
                requests, and ensuring the protection of your account
                credentials. If you believe your account has been compromised or
                used without authorization, you agree to notify FleetBlox
                immediately so that corrective actions can be taken.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.6 Rights of FleetBlox in Account Management
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right, at its sole discretion, to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Suspend or terminate your account for any reason, with or
                  without cause, subject to applicable notice requirements and
                  to the extent permissible under applicable law.
                </li>
                <li>
                  Implement technical and administrative measures to ensure that
                  your account is being used in accordance with the terms of
                  this Agreement, and to prevent misuse of the FleetBlox
                  Services.
                </li>
              </ul>
            </div>
          </section>

          {/* Payment Terms */}
          <section id="payment" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              4. PAYMENT TERMS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                4.1 Subscription Plans
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox offers subscription-based access to its Services,
                which are available under two primary subscription plans:
                monthly and annual. Subscription fees are set at the rates
                specified on the FleetBlox platform or as otherwise agreed upon
                between FleetBlox and the User. Subscription fees must be paid
                in advance at the beginning of each billing cycle. By
                subscribing to the Services, you agree to pay the applicable
                fees as outlined during the registration process or as agreed
                under the terms of your Service agreement. In addition to
                recurring subscription fees,{" "}
                <strong>
                  FleetBlox charges a one-time, non-refundable account
                  activation fee upon registration.
                </strong>{" "}
                This fee enables initial account setup and platform onboarding.
              </p>
              <p className="text-[#7D7D7D]">
                Further,{" "}
                <strong>
                  FleetBlox’s subscription model is based on the number of
                  vehicle slots purchased by the User. Each slot enables the
                  connection and management of a single vehicle
                </strong>{" "}
                on the FleetBlox platform. Users intending to manage multiple
                vehicles must subscribe to a corresponding number of slots.
                Subscription fees will scale accordingly based on the number of
                active slots in the User’s account.
              </p>
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.2 Payment Methods and Processing
              </h3>
              <p className="text-[#7D7D7D]">
                All payments made under this Agreement are processed by
                third-party payment processors who are compliant with applicable
                data protection laws and Payment Card Industry Data Security
                Standards (PCI DSS). FleetBlox does not store or manage payment
                card information directly. By providing payment credentials, you
                authorize FleetBlox and its designated payment processor(s) to
                charge the applicable subscription fees and any additional
                charges in accordance with this Agreement.
              </p>
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.3 Subscription Plan Upgrades and Downgrades
              </h3>
              <p className="text-[#7D7D7D]">
                Users may request changes to their subscription plan, including
                upgrades or downgrades in the number of vehicle slots, at any
                time. FleetBlox will process such requests in accordance with
                the following terms:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Upgrades: Users upgrading their subscription (e.g., adding
                  vehicle slots or switching to a higher-tier plan) will be
                  charged a prorated fee for the difference in cost for the
                  remainder of the current billing cycle. The upgraded plan will
                  take effect immediately.
                </li>
                <li>
                  Downgrades: Downgrades (e.g., reducing vehicle slots or
                  selecting a lower-tier plan) will take effect at the beginning
                  of the next billing cycle. No refunds or prorated credits will
                  be issued for the unused portion of the previous plan.
                </li>
              </ul>
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.4 Non-Payment and Suspension of Services
              </h3>
              <p className="text-[#7D7D7D]">
                Failure to remit payment within 10 calendar days of the due date
                will result in the suspension of Services. FleetBlox reserves
                the right to take the following actions:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Suspend all or part of the User’s access to the Services until
                  outstanding payments are received.
                </li>
                <li>
                  Charge a late fee or interest at the maximum rate permitted by
                  law or as specified in the applicable invoice or billing
                  notice.
                </li>
                <li>
                  Permanently terminate access to the Services if payment
                  remains unpaid for a continuous period of 30 calendar days
                  following suspension.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-3">
                FleetBlox will not be liable for any business interruption, loss
                of data, or other damages resulting from such suspension or
                termination. Users remain liable for payment obligations
                incurred prior to and during any suspension.
              </p>
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.5 Refund Policy
              </h3>
              <p className="text-[#7D7D7D]">
                All payments, including subscription fees and the initial
                account activation fee, are <strong>non-refundable</strong>,
                except in cases of:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>A material breach of this Agreement by FleetBlox, or</li>
                <li>Where otherwise required by applicable law.</li>
              </ul>
              <p className="text-[#7D7D7D] mt-3">
                Users canceling their subscription mid-cycle or downgrading
                plans are not entitled to any partial refunds or credits unless
                explicitly provided in writing by FleetBlox. Users are
                encouraged to review their subscription and vehicle slot
                requirements before committing to payment.
              </p>
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.6 Taxes and Other Charges
              </h3>
              <p className="text-[#7D7D7D]">
                All fees listed are exclusive of taxes, levies, duties, or
                similar governmental assessments. Users are responsible for
                paying any such applicable taxes, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 mt-3 ml-4   ">
                <li>Sales tax</li>
                <li>Value Added Tax (VAT)</li>
                <li>Goods and Services Tax (GST)</li>
                <li>
                  Any other local, state, or international taxes imposed based
                  on their use of the Services.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                FleetBlox may collect and remit such taxes if required by
                applicable law.
              </p>
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.7 Modification of Subscription Fees
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right to adjust its pricing, including
                subscription and activation fees, or introduce new fee
                structures. In the event of any price increase, FleetBlox will
                provide Users with a 30-day advance notice by email and/or
                through an in-app notification.
              </p>
              <p className="text-[#7D7D7D]">
                If you do not accept the revised pricing, you may cancel your
                subscription prior to the effective date of the fee change.
                Continued use of the Services after the new pricing takes effect
                will constitute your acceptance of the new rates.
              </p>
            </div>
          </section>

          {/* Intellectual Property Rights */}
          <section id="intellectual-property" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              5. INTELLECTUAL PROPERTY RIGHTS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                5.1 Ownership of Services
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox retains all rights, title, and interest, including,
                but not limited to, copyrights, trademarks, patents, trade
                secrets, and any other intellectual property rights in and to
                all aspects of the Services, including the software, platform,
                underlying technology, content, design, and any related
                materials (hereinafter referred to as &ldquo;Intellectual
                Property&rdquo;). FleetBlox does not transfer ownership of its
                Intellectual Property to the User under this Agreement. The User
                acknowledges and agrees that FleetBlox and its licensors retain
                all right, title, and interest in the Intellectual Property
                associated with the Services, and that no ownership rights in
                such Intellectual Property are transferred to the User by this
                Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.2 User License
              </h3>
              <p className="text-[#7D7D7D]">
                Subject to the terms and conditions of this Agreement, FleetBlox
                grants Users a limited, non-exclusive, non-transferable, and
                revocable license to access and use the Services solely for the
                intended purposes for which they are made available. This
                license is granted exclusively for the purpose of using the
                Services in accordance with the functionality provided, and does
                not grant the User any rights to:
              </p>

              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Copy, modify, adapt, or create derivative works based on the
                  Services or any part thereof.
                </li>
                <li>
                  Sublicense, distribute, rent, lease, or otherwise transfer
                  access to the Services in whole or in part, except as
                  explicitly permitted by this Agreement.
                </li>
                <li>
                  Exploit the Intellectual Property of FleetBlox for any other
                  purposes without express written consent from FleetBlox.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.3 User Data
              </h3>
              <p className="text-[#7D7D7D]">
                The User retains full ownership of all Personal Data and other
                content (collectively, &quot;User Data&quot;) uploaded, stored,
                or submitted to the FleetBlox platform, subject to the terms of
                this Agreement and any applicable privacy policies. FleetBlox
                may, however, anonymize and aggregate User Data for the purposes
                of internal analysis, service improvement, research, and
                enhancing the performance of the Services. Any aggregated or
                anonymized data processed by FleetBlox will no longer be
                identifiable to a specific individual or organization, thereby
                ensuring the User’s ownership rights over their data are not
                infringed upon.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.4 Restrictions on Use of Intellectual Property
              </h3>
              <p className="text-[#7D7D7D]">
                Users acknowledge that the Intellectual Property associated with
                the Services is the exclusive property of FleetBlox or its
                licensors, and that they will not:
              </p>

              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Reverse engineer, decompile, disassemble, or otherwise attempt
                  to derive the source code or underlying structure of the
                  Services or any part thereof.
                </li>
                <li>
                  Modify, adapt, or create derivative works based on the
                  Services or any part thereof, without the express written
                  consent of FleetBlox.
                </li>
                <li>
                  Rent, lease, sublicense, distribute, or otherwise transfer
                  access to the Services, in whole or in part, except as
                  expressly permitted by this Agreement.
                </li>
                <li>
                  Use any part of the Services for unlawful or unauthorized
                  purposes, including, but not limited to, any activity that
                  would infringe upon the rights of FleetBlox, its affiliates,
                  or third-party intellectual property rights.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.5 Vehicle Compatibility Disclaimer
              </h3>
              <p className="text-[#7D7D7D]">
                While FleetBlox supports a wide range of vehicle makes and
                models, it is important to note that not all vehicle makes and
                models are compatible with the FleetBlox platform. FleetBlox
                provides a compatibility list to assist Users in determining
                whether their vehicles are supported by the platform; however,
                Users are solely responsible for verifying compatibility prior
                to subscription. FleetBlox makes no warranties, representations,
                or guarantees regarding the compatibility of all vehicle brands
                or models.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.6 Important Notices Regarding Vehicle Compatibility:
              </h3>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  <strong>No Refunds for Vehicle Connection Issues:</strong>
                  In the event that a User is unable to connect their vehicle(s)
                  to the platform, FleetBlox will not issue any refunds. It is
                  the responsibility of the User to ensure compatibility before
                  subscription.
                </li>
                <li>
                  <strong>OEM Credentials:</strong>
                  If a User is unable to retrieve the necessary OEM credentials,
                  or if their fleet is ultimately deemed incompatible with the
                  platform, FleetBlox will not be held liable for any issues
                  arising from such incompatibility. No refunds will be issued
                  under these circumstances. FleetBlox will provide reasonable
                  support and troubleshooting guidance if Users encounter
                  technical difficulties, but does not guarantee compatibility
                  for all vehicles or OEM systems.
                </li>
                <li>
                  <strong>Verification of Vehicle Compatibility: </strong>
                  Users acknowledge that they have reviewed the compatibility
                  list and verified whether their fleet is supported.
                  FleetBlox’s compatibility list is provided for informational
                  purposes only and is subject to change. Users are responsible
                  for maintaining the most current information regarding
                  compatibility and ensuring that their fleet meets the
                  platform’s requirements.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text 5.7 Digital Millennium Copyright Act (DMCA) Compliance-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.7 User Responsibility Regarding Vehicle Integration
              </h3>
              <p className="text-[#7D7D7D]">
                Users are solely responsible for ensuring that their vehicles
                are properly integrated with the FleetBlox platform, including
                obtaining any necessary OEM credentials and ensuring that their
                fleet meets the platform’s specifications. FleetBlox is not
                responsible for any issues related to vehicle integration,
                including the failure to connect vehicles, the inability to
                retrieve OEM credentials, or compatibility issues with any
                specific vehicle brand or model. FleetBlox does not guarantee
                that any vehicles will be compatible with the platform.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.8 Limitation of Liability Related to Vehicle Compatibility
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox shall not be liable for any damages, losses, or
                inconveniences caused by vehicle compatibility issues, including
                but not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>Inability to connect vehicles to the platform.</li>
                <li>Inability to retrieve or verify OEM credentials.</li>
                <li>
                  Compatibility issues between the FleetBlox platform and
                  certain vehicle makes, models, or OEM systems.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                Users are encouraged to contact FleetBlox support for assistance
                with technical difficulties but understand that FleetBlox cannot
                guarantee a solution in cases of incompatibility.
              </p>
            </div>
          </section>

          {/* Data Protection and Privacy */}
          <section id="data-protection" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              6. DATA PROTECTION AND PRIVACY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                6.1 Commitment to Data Protection
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox is committed to safeguarding the privacy and
                confidentiality of your Personal Data in full compliance with
                applicable data protection laws, regulations, and standards.
                These include, but are not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>General Data Protection Regulation (GDPR) (EU) 2016/679</li>
                <li>California Consumer Privacy Act (CCPA)</li>
                <li>
                  Personal Information Protection and Electronic Documents Act
                  (PIPEDA) (Canada)
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                In compliance with these regulations, FleetBlox ensures that all
                data processing activities are conducted in a lawful, fair,
                transparent, and secure manner, and that data subjects&apos;
                rights are fully respected.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6.2 Data Usage
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox collects, processes, and stores Personal Data provided
                by Users in accordance with the principles of data minimization
                and purpose limitation. Personal Data is used for the following
                purposes:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  <strong className="text-[#333333]">
                    Provision of Services:
                  </strong>{" "}
                  To enable, maintain, and enhance the core Services provided by
                  FleetBlox, such as fleet management, predictive maintenance,
                  real-time vehicle tracking, and performance optimization
                  tools.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Security Enhancements:
                  </strong>{" "}
                  To monitor and safeguard the integrity and security of the
                  platform by detecting and preventing unauthorized access,
                  fraud, misuse, and other potential risks.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Compliance with Legal Obligations:
                  </strong>{" "}
                  To comply with statutory obligations, including regulatory
                  reporting, vehicle compliance checks, record-keeping for
                  audits, and other requirements under applicable law.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Platform Improvement:
                  </strong>{" "}
                  To analyze usage data and platform performance, which assists
                  in optimizing the functionality and user experience of the
                  Services.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                FleetBlox will not process your Personal Data in a manner that
                is incompatible with the above-stated purposes. All processing
                activities are conducted in compliance with applicable data
                protection laws and regulations.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6.3 Data Retention
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox will retain Personal Data only for as long as is
                necessary to fulfill the purposes for which it was collected and
                to comply with legal, regulatory, or contractual obligations.
                The following retention guidelines apply:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  <strong className="text-[#333333]">
                    Retention for Service Provision:
                  </strong>{" "}
                  Personal Data will be retained for the duration of the
                  User&apos;s active subscription to the Services.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Retention for Compliance:
                  </strong>{" "}
                  Data will be retained for periods necessary to meet
                  FleetBlox&apos;s legal, regulatory, or compliance
                  requirements, including the maintenance of transaction records
                  or other legal obligations.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Post-Termination Retention:
                  </strong>{" "}
                  Upon account termination or user inactivity, FleetBlox will
                  securely delete or anonymize Personal Data, unless it is
                  required for legal, regulatory, or operational purposes. In
                  certain cases, data may be retained for longer periods, where
                  legally required.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6.4 User Rights
              </h3>
              <p className="text-[#7D7D7D]">
                Under applicable data protection laws, Users are entitled to the
                following rights regarding their Personal Data:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  <strong className="text-[#333333]">Right to Access:</strong>{" "}
                  Users have the right to request a copy of the Personal Data
                  held by FleetBlox and obtain information on how such data is
                  processed.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Right to Rectification:
                  </strong>{" "}
                  Users may request the correction of any inaccurate or
                  incomplete Personal Data held by FleetBlox.
                </li>
                <li>
                  <strong className="text-[#333333]">Right to Erasure:</strong>{" "}
                  Users may request that their Personal Data be deleted when it
                  is no longer necessary for the purposes for which it was
                  collected or processed, subject to any applicable legal or
                  contractual retention obligations.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Right to Data Portability:
                  </strong>{" "}
                  Users have the right to request a copy of their Personal Data
                  in a structured, commonly used, machine-readable format, and
                  may request its transfer to another service provider, where
                  technically feasible.
                </li>
                <li>
                  <strong className="text-[#333333]">Right to Object:</strong>{" "}
                  Users may object to the processing of their Personal Data,
                  including for direct marketing or profiling purposes.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Right to Restrict Processing:
                  </strong>{" "}
                  Users may request the restriction of the processing of their
                  Personal Data under specific circumstances, such as when the
                  accuracy of the data is contested, or the processing is
                  unlawful but the User opposes erasure.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                To exercise any of these rights, Users may contact FleetBlox
                through the contact details provided in this Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6.5 User-Controlled Data Retrieval
              </h3>
              <p className="text-[#7D7D7D]">
                The fleet owner (User) is solely responsible for determining
                what data will be retrieved from the vehicles in their fleet.
                FleetBlox serves solely as a facilitator for the collection and
                processing of vehicle data. FleetBlox makes no representations
                or warranties regarding the nature or type of data retrieved
                from vehicles, nor does it exercise control over the data once
                it has been retrieved.
              </p>
              <p className="text-[#7D7D7D]">
                It is the responsibility of the User to ensure that any data
                they wish to retrieve from their vehicles complies with
                applicable privacy laws, including but not limited to data
                protection, confidentiality, and consent laws. FleetBlox is not
                responsible for the types of data that Users retrieve, nor is it
                responsible for the management, storage, or further processing
                of such data once it has been made available to the User.
              </p>
              <p className="text-[#7D7D7D]">
                Users must ensure that any data retrieval, processing, or usage
                complies with all relevant local, state, and international
                privacy laws and regulations. FleetBlox disclaims any liability
                for data retrieved or managed by Users outside the scope of this
                Agreement. Users are advised to consult with appropriate legal
                counsel to ensure compliance with applicable data protection
                laws.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6.6 Data Breach Notification
              </h3>
              <p className="text-[#7D7D7D]">
                In the event of a data breach or security incident affecting
                Personal Data, FleetBlox will promptly notify affected Users in
                accordance with applicable data protection laws, including the
                GDPR, CCPA, or PIPEDA, as required. FleetBlox will work
                diligently to mitigate any harm caused by such incidents,
                including offering necessary assistance to Users in responding
                to the breach.
              </p>
            </div>
          </section>

          {/* Account Termination and Data Handling */}
          <section id="termination" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              7. ACCOUNT TERMINATION AND DATA HANDLING
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                7.1 User-Initiated Termination
              </h3>
              <p>
                Users have the right to terminate their accounts at any time by
                providing written notice to FleetBlox through the designated
                support email address. Upon termination, all access to the
                Services will be immediately revoked. FleetBlox will, to the
                extent permitted by law and in compliance with applicable
                regulatory retention requirements, delete, anonymize, or
                securely archive any associated Personal Data. In cases where
                data retention is required for legal, compliance, or regulatory
                purposes, FleetBlox will retain such data in accordance with its
                legal obligations.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                7.2 FleetBlox-Initiated Termination
              </h3>
              <p>
                FleetBlox reserves the right to suspend, restrict, or terminate
                User accounts under the following circumstances:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  <strong>Violation of Terms and Conditions:</strong> If the
                  User fails to comply with any provision of this Agreement,
                  including misuse of the platform, breach of intellectual
                  property rights, or violation of the Acceptable Use Policy.
                </li>
                <li>
                  <strong>Inactivity:</strong> If the User&apos;s account has
                  been inactive for a prolonged period, as determined by
                  FleetBlox in its sole discretion. Inactivity is generally
                  defined as failure to access the Services for a continuous
                  period of [insert period, e.g., 60 days].
                </li>
                <li>
                  <strong>Non-Payment:</strong> If the User fails to make timely
                  payment for the Services as specified in the Agreement,
                  including subscription fees or additional charges.
                </li>
                <li>
                  <strong>Impediment to Service Delivery:</strong> If
                  circumstances arise that hinder FleetBlox’s ability to provide
                  the Services in a manner consistent with the Agreement, such
                  as technical issues or violations that compromise platform
                  integrity.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-3">
                In such cases, FleetBlox will provide reasonable notice to the
                User regarding the suspension or termination of their account.
                The User will be given a period of time to remedy the breach or
                non-compliance, as specified by FleetBlox. If the breach is not
                rectified within the specified period, FleetBlox may proceed
                with the termination of the User’s account, and the User will
                forfeit access to the Services.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                7.3 Data Retention Post-Termination
              </h3>
              <p className="text-[#7D7D7D]">
                Upon termination of a User’s account, FleetBlox may retain
                certain Personal Data for a period of up to 12 months, or longer
                if required by applicable law, for the purposes of legal
                compliance, regulatory reporting, dispute resolution, or
                business operations. Once this retention period has expired,
                FleetBlox will either anonymize, delete, or securely archive the
                data in compliance with applicable data protection laws and the
                provisions of this Agreement.
              </p>
              <p className="text-[#7D7D7D]">
                Notwithstanding the above, FleetBlox may retain data beyond the
                specified retention period if required for legal or regulatory
                purposes, or for the resolution of disputes and enforcement of
                legal obligations.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                7.4 User Responsibility to Back Up Data
              </h3>
              <p className="text-[#7D7D7D]">
                It is the sole responsibility of the User to back up any
                Personal Data or other data that they wish to retain prior to
                account termination. FleetBlox is not responsible for any loss
                of data following account termination, and makes no
                representations regarding the retention or retrieval of data
                once the account is closed. Users are strongly encouraged to
                back up their data, including vehicle-related information,
                performance data, and other relevant content, before initiating
                account termination.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                7.5 Technical Support for Incompatible Vehicles
              </h3>
              <p className="text-[#7D7D7D]">
                In the event that a User encounters technical difficulties
                related to vehicle compatibility, or issues with retrieving OEM
                credentials for integration with the FleetBlox platform,
                FleetBlox will provide reasonable technical support to assist in
                resolving such problems. However, FleetBlox makes no guarantees
                regarding the compatibility of all vehicle makes and models with
                the platform, nor does it assume responsibility for any issues
                arising from incompatible vehicles, third-party software, or
                integration systems.
              </p>
              <p className="text-[#7D7D7D]">
                FleetBlox’s support will be limited to assisting with
                troubleshooting steps, providing guidance on OEM credential
                retrieval, and ensuring that the platform operates as intended
                within the capabilities of the User’s fleet. Incompatibility or
                failure to retrieve necessary credentials will not be grounds
                for refund, and FleetBlox shall not be held liable for any
                inconvenience, technical issues, or operational disruptions
                resulting from incompatible vehicles or third-party systems.
              </p>
              <p className="text-[#7D7D7D]">
                Users are encouraged to verify compatibility with their fleet’s
                vehicles prior to registration and to consult FleetBlox’s
                compatibility list. If a User’s fleet is ultimately found to be
                incompatible, FleetBlox will not be responsible for any
                operational limitations or disruptions.
              </p>
            </div>
          </section>

          {/* Acceptable Use Policy */}
          <section id="acceptable-use" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              8. ACCEPTABLE USE POLICY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                8.1 Prohibited Activities
              </h3>
              <p className="text-[#7D7D7D]">
                Users agree to use the FleetBlox Services solely for lawful
                purposes and in a manner consistent with all applicable local,
                state, national, and international laws and regulations.
                Specifically, the following activities are strictly prohibited:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  <strong className="text-[#333333]">
                    Fraudulent Conduct:
                  </strong>{" "}
                  Engaging in fraudulent, deceptive, or otherwise unlawful
                  activities, including misrepresentation or intentionally
                  providing false information.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Platform Integrity:
                  </strong>{" "}
                  Reverse engineering, decompiling, disassembling, or attempting
                  to derive the source code or underlying structure of the
                  platform’s software or technology.
                </li>
                <li>
                  <strong className="text-[#333333]">Security Breaches:</strong>{" "}
                  Accessing or attempting to access any unauthorized areas of
                  the FleetBlox platform, systems, or data, or introducing any
                  form of malware, viruses, or other harmful code.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Interference with Service Performance:
                  </strong>{" "}
                  Interfering with or disrupting the integrity, functionality,
                  or operation of the FleetBlox platform or its underlying
                  infrastructure, including the introduction of viruses,
                  denial-of-service attacks, or other disruptive activities.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Abusive or Harassing Behavior:
                  </strong>{" "}
                  Engaging in any conduct that harasses, threatens, or
                  intimidates others or violates any laws related to harassment,
                  discrimination, or defamation.
                </li>
                <li>
                  <strong className="text-[#333333]">
                    Unauthorized Access or Use:
                  </strong>{" "}
                  Attempting to access, monitor, or retrieve data without
                  authorization, or impersonating another user.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                8.2 Administrator Responsibilities
              </h3>
              <p className="text-[#7D7D7D]">
                For organizations that create accounts for multiple users, the
                Admin is solely responsible for setting user permissions and
                ensuring that access is granted to authorized personnel only.
                Admins must ensure that their users comply with this Acceptable
                Use Policy and will be held liable for any breach of this
                Agreement by their authorized users.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                8.3 Fair Usage and Enforced Limits
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox may, at its sole discretion, impose reasonable
                limitations on the use of the Services to prevent abuse and to
                maintain optimal performance for all users. These limitations
                may include, but are not limited to, the number of vehicles that
                can be monitored per account, the number of simultaneous users,
                or the volume of data that can be processed. Violation of such
                limits or misuse of the platform may result in temporary or
                permanent suspension of access to the Services. FleetBlox will
                provide notice of any such restrictions.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section id="limitation" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              9. LIMITATION OF LIABILITY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                9.1 Disclaimer of Warranties
              </h3>
              <p className="text-[#7D7D7D]">
                The FleetBlox Services are provided &quot;as-is&quot; and
                &quot;as available.&quot; FleetBlox disclaims all warranties,
                express or implied, including but not limited to the implied
                warranties of merchantability, fitness for a particular purpose,
                and non-infringement. FleetBlox does not guarantee that the
                Services will be uninterrupted, error-free, or secure. The User
                acknowledges and agrees that FleetBlox does not warrant that the
                Services will meet their specific requirements or that any
                defects or errors will be corrected.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                9.2 Limitation of Liability
              </h3>
              <p className="text-[#7D7D7D]">
                In no event shall FleetBlox be liable for any indirect,
                incidental, consequential, special, punitive, or exemplary
                damages, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>Loss of data, vehicle damage, or system failure.</li>
                <li>Loss of profit, revenue, or business opportunities.</li>
                <li>
                  Any third-party claims or actions resulting from the use of
                  the Services, including third-party integrations or API
                  failures.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                The total liability of FleetBlox arising from this Agreement,
                whether in contract, tort (including negligence), or otherwise,
                shall not exceed the total amount paid by the User to FleetBlox
                for the Services during the 12-month period preceding the event
                giving rise to the liability.
              </p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section id="dispute-resolution" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              10. DISPUTE RESOLUTION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                10.1 Binding Arbitration
              </h3>
              <p className="text-[#7D7D7D]">
                Any dispute, claim, or controversy arising out of or in
                connection with this Agreement shall be resolved exclusively
                through binding arbitration. Arbitration shall be conducted in
                Toronto, Ontario, Canada, in accordance with the rules of the
                Canadian Arbitration Association, or another mutually
                agreed-upon arbitration body. The arbitration shall be conducted
                in English. The arbitrator’s decision shall be final and
                binding, and judgment may be entered thereon in any court having
                jurisdiction.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                10.2 Class Action Waiver
              </h3>
              <p className="text-[#7D7D7D]">
                By agreeing to this Agreement, the User irrevocably waives any
                right to participate in a class action or collective action
                arising from or in connection with this Agreement. All disputes
                will be resolved on an individual basis, and no dispute shall be
                arbitrated or litigated on a class-wide or consolidated basis.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                10.3 Governing Law
              </h3>
              <p className="text-[#7D7D7D]">
                This Agreement shall be governed by, and construed in accordance
                with, the laws of the Province of Ontario, Canada, without
                regard to its conflict of law principles. Any legal actions,
                suits, or proceedings arising from or related to this Agreement
                shall be exclusively subject to the jurisdiction of the courts
                located in Toronto, Ontario, Canada.
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section id="indemnification" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              11. INDEMNIFICATION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                11.1 Indemnification by User
              </h3>
              <p className="text-[#7D7D7D]">
                The User agrees to indemnify, defend, and hold harmless
                FleetBlox, its affiliates, officers, directors, employees,
                agents, and assigns from and against any and all claims, losses,
                damages, expenses, liabilities, and costs (including legal fees)
                arising out of:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Any breach of this Agreement by the User, including violations
                  of the Acceptable Use Policy.
                </li>
                <li>
                  The User’s use or misuse of the Services, including any
                  activities carried out by the User or their authorized
                  personnel.
                </li>
                <li>
                  Any infringement of third-party rights, including intellectual
                  property, privacy, or data protection rights.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                11.2 Defense of Claims
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right to control the defense and
                settlement of any indemnified claims, and the User agrees to
                cooperate fully with FleetBlox in the defense of such claims.
                The User shall not settle any indemnified claims without the
                prior written consent of FleetBlox.
              </p>
            </div>
          </section>

          {/* Modifications and Updates */}
          <section id="modifications" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              12. MODIFICATIONS AND UPDATES
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                12.1 Right to Modify
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right to modify, amend, or update this
                Agreement at any time, in its sole discretion. Any modifications
                or updates to this Agreement will be communicated to the User
                via email or through the FleetBlox platform, and will be
                effective upon posting.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                12.2 Notification of Significant Changes
              </h3>
              <p className="text-[#7D7D7D]">
                In the event of significant changes to the terms of this
                Agreement, FleetBlox will provide at least 14 days’ prior notice
                before the modified terms take effect. The continued use of the
                Services after the effective date of the modified Agreement
                constitutes acceptance of the new terms.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                12.3 User Withdrawal
              </h3>
              <p className="text-[#7D7D7D]">
                If the User does not accept the updated terms, they may
                terminate their account and cease using the Services, in
                accordance with the termination provisions set forth in Section
                7.
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section id="third-party" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              13. THIRD-PARTY SERVICES
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                13.1 Third-Party Integrations
              </h3>
              <p>
                The Services may integrate with third-party services, including
                but not limited to Original Equipment Manufacturers (OEMs),
                payment processors, and data analytics providers. FleetBlox does
                not control or assume responsibility for the actions, products,
                or services of any third-party providers.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                13.2 User Acceptance of Third-Party Terms
              </h3>
              <p>
                By utilizing the third-party services integrated with FleetBlox,
                the User agrees to comply with the terms and conditions of those
                third-party providers. FleetBlox is not liable for any issues
                arising from the failure or inadequacy of third-party services,
                including but not limited to service disruptions, data loss, or
                security breaches.
              </p>
            </div>
          </section>

          {/* Force Majeure */}
          <section id="force-majeure" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              14. FORCE MAJEURE
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                14.1 Force Majeure Event
              </h3>
              <p>
                Neither party shall be liable for failure to perform any of its
                obligations under this Agreement if such failure is caused by
                events beyond its reasonable control, including but not limited
                to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Natural disasters (e.g., hurricanes, floods, earthquakes,
                  fires).
                </li>
                <li>
                  Acts of government (e.g., regulatory changes, governmental
                  restrictions).
                </li>
                <li>
                  Power failures, internet outages, or telecommunication
                  failures.
                </li>
                <li>Acts of war, terrorism, or civil unrest.</li>
                <li>Pandemics or epidemics.</li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                14.2 Notice of Force Majeure
              </h3>
              <p>
                The affected party shall promptly notify the other party of any
                Force Majeure Event and provide reasonable details of the event
                and its expected duration. During the Force Majeure Event, the
                obligations of the affected party shall be suspended, but such
                suspension shall not exceed 30 days.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                14.3 Termination Due to Extended Force Majeure
              </h3>
              <p>
                If the Force Majeure Event continues for a period exceeding 30
                days, either party may terminate this Agreement without
                liability. Upon such termination, FleetBlox will retain User
                data for legal or regulatory purposes, as specified in this
                Agreement.
              </p>
            </div>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section id="cookies" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              15. COOKIES AND TRACKING TECHNOLOGIES
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                15.1 Use of Cookies and Tracking Technologies
              </h3>
              <p>
                In accordance with the principles of transparency and user
                consent, FleetBlox employs Cookies and similar tracking
                technologies (hereinafter referred to collectively as
                &quot;Cookies&quot;) to enhance the functionality of our
                platform, analyze website traffic, and improve user experience.
                These technologies help us collect data on user preferences and
                browsing patterns, providing us with insights necessary for
                optimizing the Services provided.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                15.2 Types of Cookies Utilized
              </h3>
              <p>FleetBlox may utilize the following types of Cookies:</p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  <strong>Strictly Necessary Cookies:</strong> Essential for the
                  platform’s operation and cannot be disabled.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Collect anonymous usage
                  information to improve platform performance.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> Remember user choices to
                  enhance user experience.
                </li>
                <li>
                  <strong>Targeting/Advertising Cookies:</strong> Track user
                  behavior to deliver customized content and ads.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                15.3 User Control Over Cookies
              </h3>
              <p>
                Users retain the ability to control their Cookie preferences
                through their browser settings. Disabling certain Cookies may
                impact platform functionality, and some Services may not be
                accessible without them. By continuing to use FleetBlox
                Services, you consent to the use of Cookies unless you opt out
                as described herein.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section id="children-privacy" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              16. CHILDREN’S PRIVACY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                16.1 Intentions Regarding Minors
              </h3>
              <p>
                The FleetBlox Services are not intended for children under the
                age of 16. As a platform provider, we do not knowingly collect,
                process, or solicit Personal Data from individuals under the age
                of 16.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                16.2 Action on Inadvertent Data Collection
              </h3>
              <p>
                In the event that we discover that we have inadvertently
                collected or processed Personal Data from a child under the age
                of 16, we will promptly take appropriate action to delete such
                data from our systems in compliance with applicable laws,
                including the Children’s Online Privacy Protection Act (COPPA)
                and similar regulatory requirements.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                16.3 Notification and User Responsibility
              </h3>
              <p>
                If you believe we may have collected such data, please contact
                FleetBlox immediately to enable us to take corrective action.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section id="third-party-links" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              17. THIRD-PARTY LINKS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                17.1 Third-Party Sites and Services
              </h3>
              <p>
                FleetBlox may provide links to third-party websites, services,
                or resources for your convenience. These Third-Party Sites
                operate independently of FleetBlox and are governed by their
                respective privacy policies and terms of service. FleetBlox
                makes no representations or warranties regarding the content,
                privacy practices, or operations of these Third-Party Sites.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                17.2 Exclusion of Liability
              </h3>
              <p>
                FleetBlox disclaims any liability for the privacy practices or
                the content of Third-Party Sites. Users are encouraged to read
                and understand the privacy policies of any Third-Party Sites
                before submitting any Personal Data.
              </p>
            </div>
          </section>

          {/* Governing Law and Jurisdiction */}
          <section id="governing-law" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              18. GOVERNING LAW AND JURISDICTION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                18.1 Governing Law
              </h3>
              <p>
                This Agreement, as well as any disputes arising therefrom or
                related thereto, shall be governed by and construed in
                accordance with the laws of the Province of Ontario, Canada,
                without regard to its conflict of law provisions.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                18.2 Exclusive Jurisdiction
              </h3>
              <p>
                By accessing and using the Services, Users agree to submit any
                legal disputes to the exclusive jurisdiction of the courts
                located in Toronto, Ontario, Canada. The parties further agree
                that any legal proceedings will be conducted exclusively within
                this jurisdiction, and each party irrevocably waives any
                objection to such venue.
              </p>
            </div>
          </section>

          {/* Data Retention and Deletion */}
          <section id="data-retention" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              19. DATA RETENTION AND DELETION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                19.1 Data Retention Period
              </h3>
              <p>
                FleetBlox will retain Personal Data for as long as necessary to
                fulfill the purposes for which it was collected, and to comply
                with any legal, regulatory, or contractual obligations. This
                includes retention for the purposes of providing the Services,
                fulfilling legal and contractual obligations, resolving
                disputes, enforcing agreements, and conducting audits.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                19.2 User Requests for Data Deletion
              </h3>
              <p>
                Users have the right to request the deletion of their Personal
                Data, and FleetBlox will comply with such requests subject to
                applicable laws and regulations, including retention periods
                required by law. Data deletion requests will be processed in
                accordance with our data retention policies.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                19.3 Regulatory Compliance and Retention Exceptions
              </h3>
              <p>
                Even after a request for deletion, certain data may be retained
                as required for compliance with legal and regulatory
                obligations, or to resolve disputes. This may include
                maintaining logs, transaction records, and other data as
                required by financial and tax regulations.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                19.4 Data Anonymization
              </h3>
              <p>
                Upon the deletion of any Personal Data, FleetBlox may anonymize
                data for statistical analysis, business intelligence, or other
                lawful purposes, ensuring that such data can no longer be linked
                back to any identifiable individual.
              </p>
            </div>
          </section>

          {/* Security Measures */}
          <section id="security" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              20. SECURITY MEASURES
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                20.1 Commitment to Data Security
              </h3>
              <p>
                FleetBlox takes the security and confidentiality of your
                Personal Data seriously. We employ a comprehensive set of
                technical, administrative, and physical measures designed to
                protect Personal Data against accidental, unlawful, or
                unauthorized access, disclosure, alteration, destruction, or
                loss.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                20.2 Encryption of Data
              </h3>
              <p>
                All Personal Data transmitted to and from FleetBlox is encrypted
                using Transport Layer Security (TLS) during transmission, and
                stored data is encrypted at rest using Advanced Encryption
                Standard (AES-256), an industry-recognized encryption protocol.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                20.3 Access Control
              </h3>
              <p>
                Access to Personal Data is limited to authorized personnel only.
                We implement role-based access control (RBAC) to restrict access
                to data based on the principle of least privilege.
                Administrative access is further secured through multi-factor
                authentication (MFA), providing an additional layer of
                protection.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                20.4 Incident Response and Breach Notification
              </h3>
              <p>
                FleetBlox maintains a robust incident response plan to address
                potential data breaches. In the event of a data breach, we will
                notify affected users as required by applicable law, including
                the General Data Protection Regulation (GDPR) and the California
                Consumer Privacy Act (CCPA).
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                20.5 Ongoing Security Audits
              </h3>
              <p>
                We conduct regular security audits, vulnerability assessments,
                and penetration testing to identify and mitigate risks. These
                audits are performed by internal and external security
                professionals to ensure the continuous security of the platform.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section id="contact" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              21. CONTACT INFORMATION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                21.1 Contacting FleetBlox
              </h3>
              <p>
                If you have any questions, concerns, or requests regarding this
                Agreement, your rights under applicable data protection laws, or
                our data handling practices, you may contact FleetBlox at the
                following:
              </p>
              <div className="space-y-2 pl-4">
                <p>
                  <strong>Email:</strong> info@fleetblox.com
                </p>
                <p>
                  <strong>Support Email:</strong> support@fleetblox.com
                </p>
              </div>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                21.2 Filing Complaints with Authorities
              </h3>
              <p>
                If you are dissatisfied with FleetBlox’s handling of your
                Personal Data, you have the right to lodge a complaint with the
                appropriate data protection authority in your jurisdiction. In
                Canada, this may be the Office of the Privacy Commissioner, and
                in the European Union, the relevant supervisory authority.
              </p>
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

export default TermsAndService;
