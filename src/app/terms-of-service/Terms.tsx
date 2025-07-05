"use client";
import { useState, useEffect, useMemo } from "react";

const TermsAndService = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Responsive class configurations
  //   const responsiveClasses = {
  //     h2: "text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4",
  //     h3: "text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6",
  //     h4: "text-[14px] sm:text-[16px] lg:text-[18px] text-[#04082C] font-bold mb-2",
  //     text: "text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4",
  //     textGray: "text-[#7D7D7D] text-[14px] sm:text-[16px]",
  //     section: "mb-6 lg:mb-8",
  //     list: "list-disc list-inside text-[#7D7D7D] space-y-2 ml-2 sm:ml-4 text-[14px] sm:text-[16px]",
  //   };

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
      const scrollPosition = window.scrollY + (isMobile ? 80 : 100);

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
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

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [keyContents]);

  return (
    <section className="min-h-screen w-full bg-gray-100 p-2 sm:p-4">
      {/* heading section */}
      <div className="flex flex-col items-center justify-center p-4 sm:p-8 max-w-2xl h-[300px] sm:h-[400px] w-full mx-auto">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[52px] font-montserrat text-[#04082C] font-bold mb-4 text-center">
          Terms of Service
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

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.7 Data Retention Upon Account Closure
              </h3>
              <p className="text-[#7D7D7D]">
                Upon account termination or closure, whether initiated by the
                User or FleetBlox, certain account data and information may be
                retained by FleetBlox for the following purposes:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>Compliance with legal, regulatory, or tax obligations;</li>
                <li>Resolution of disputes, claims, or legal proceedings;</li>
                <li>Fraud prevention and security purposes;</li>
                <li>Business record-keeping and analytics;</li>
                <li>
                  Any other legitimate business purpose as determined by
                  FleetBlox.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-3">
                Users acknowledge that certain data may be permanently deleted
                upon account closure, and FleetBlox shall not be responsible for
                recovering or restoring such data once deleted. Users are
                advised to export or backup any important data before closing
                their accounts.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.8 Multiple Account Restrictions
              </h3>
              <p className="text-[#7D7D7D]">
                Each User is permitted to maintain only one active account on
                the FleetBlox platform unless explicitly authorized by FleetBlox
                in writing. Users are prohibited from creating multiple accounts
                to circumvent account restrictions, payment obligations, or
                other limitations imposed by FleetBlox. Discovery of multiple
                unauthorized accounts may result in the suspension or
                termination of all associated accounts.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.9 Age and Legal Capacity Requirements
              </h3>
              <p className="text-[#7D7D7D]">
                Users must be at least 18 years of age (or the age of majority
                in their jurisdiction, whichever is higher) and possess the
                legal capacity to enter into binding contracts. Users under the
                age of 18 may only access the Services under the supervision and
                with the express consent of a parent or legal guardian who
                agrees to be bound by this Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.10 Account Transfer and Assignment
              </h3>
              <p className="text-[#7D7D7D]">
                User accounts are personal to the registered User and may not be
                transferred, assigned, or shared with third parties without the
                prior written consent of FleetBlox. Any attempted transfer or
                assignment without such consent shall be deemed void and may
                result in account termination.
              </p>
            </div>
          </section>

          {/* Payment Terms */}
          <section id="payment" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              4. PAYMENT TERMS AND FINANCIAL OBLIGATIONS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                4.1 Subscription Plans and Pricing Structure
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox offers various subscription-based service plans
                designed to accommodate the diverse needs of fleet operators and
                businesses. The available subscription plans include monthly and
                annual billing options, with pricing based on factors such as
                the number of vehicles, feature sets, and additional services
                selected by the User.
              </p>
              <p className="text-[#7D7D7D]">
                The specific pricing, features, and terms associated with each
                subscription plan are detailed on the FleetBlox website and may
                be updated periodically at FleetBlox&apos;s discretion. Users
                acknowledge that subscription fees are payable in advance for
                each billing period and that access to the Services is
                contingent upon current and up-to-date payment of all applicable
                fees.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.2 Payment Methods and Processing
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox accepts payments via credit card, debit card, bank
                transfer, and other payment methods as specified on the
                platform. All payment processing is conducted through
                third-party payment processors that comply with Payment Card
                Industry Data Security Standards (PCI DSS) and other applicable
                security standards.
              </p>
              <p className="text-[#7D7D7D]">
                By providing payment information, Users authorize FleetBlox and
                its payment processors to charge the specified payment method
                for all applicable fees, including subscription fees, activation
                fees, usage-based charges, and any other costs associated with
                the Services. Users are responsible for ensuring that their
                payment information is current, accurate, and valid.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.3 Billing Cycles and Automatic Renewal
              </h3>
              <p className="text-[#7D7D7D]">
                Subscription services are billed on a recurring basis according
                to the selected billing cycle (monthly or annual). Unless
                otherwise specified, all subscriptions will automatically renew
                at the end of each billing period for the same duration and at
                the then-current pricing.
              </p>
              <p className="text-[#7D7D7D]">
                Users who wish to cancel their subscription must provide notice
                of cancellation at least thirty (30) days prior to the end of
                the current billing period to avoid charges for the subsequent
                period. Cancellation notices must be submitted through the
                account management interface or by contacting FleetBlox customer
                support.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.4 Late Payments and Account Suspension
              </h3>
              <p className="text-[#7D7D7D]">
                In the event of non-payment or failed payment processing,
                FleetBlox reserves the right to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Suspend or restrict access to the Services until payment is
                  received;
                </li>
                <li>
                  Charge late fees and interest on overdue amounts as permitted
                  by applicable law;
                </li>
                <li>
                  Engage third-party collection agencies or legal counsel to
                  recover outstanding debts;
                </li>
                <li>
                  Terminate the User&apos;s account and access to the Services.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-3">
                Users remain liable for all outstanding charges, fees, and costs
                associated with their account, including collection costs and
                legal fees, even after account termination.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.5 Refund Policy and Exceptions
              </h3>
              <p className="text-[#7D7D7D]">
                All payments made to FleetBlox, including subscription fees,
                activation fees, and usage-based charges, are generally
                non-refundable. However, FleetBlox may, at its sole discretion,
                provide refunds in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Material breach of this Agreement by FleetBlox that is not
                  remedied within thirty (30) days of written notice;
                </li>
                <li>
                  Extended service outages or technical failures that
                  substantially impair the User&apos;s ability to access the
                  Services;
                </li>
                <li>
                  Where required by applicable consumer protection laws or
                  regulations;
                </li>
                <li>
                  Duplicate charges or billing errors that are verifiable and
                  documented.
                </li>
              </ul>
              <p className="text-[#7D7D7D] mt-3">
                Refund requests must be submitted in writing within thirty (30)
                days of the charge in question and must include documentation
                supporting the basis for the refund request.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.6 Taxes and Additional Charges
              </h3>
              <p className="text-[#7D7D7D]">
                All fees and charges are exclusive of taxes, duties, levies,
                tariffs, and other governmental charges (collectively,
                &ldquo;Taxes&rdquo;). Users are responsible for payment of all
                applicable Taxes associated with their use of the Services,
                including but not limited to sales tax, use tax, value-added tax
                (VAT), goods and services tax (GST), and any other taxes imposed
                by governmental authorities.
              </p>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right to collect applicable Taxes from
                Users where required by law. Users agree to provide any tax
                identification numbers, certificates, or other documentation
                reasonably requested by FleetBlox for tax compliance purposes.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.7 Price Changes and Modifications
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right to modify its pricing structure,
                subscription fees, and other charges at any time. Price changes
                will be communicated to Users at least thirty (30) days in
                advance of the effective date of such changes. Continued use of
                the Services after the effective date of price changes
                constitutes acceptance of the new pricing.
              </p>
              <p className="text-[#7D7D7D]">
                Users who do not agree to price changes may cancel their
                subscription in accordance with the cancellation procedures set
                forth in this Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.8 Currency and Exchange Rates
              </h3>
              <p className="text-[#7D7D7D]">
                All fees and charges are denominated in Canadian Dollars (CAD)
                unless otherwise specified. For Users paying in currencies other
                than CAD, exchange rates will be determined by the applicable
                payment processor at the time of transaction. FleetBlox is not
                responsible for currency fluctuations or exchange rate
                variations that may affect the final amount charged to the
                User&apos;s payment method.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.9 Disputed Charges and Chargebacks
              </h3>
              <p className="text-[#7D7D7D]">
                Users who dispute charges must first contact FleetBlox customer
                support to attempt to resolve the dispute before initiating
                chargeback proceedings with their financial institution.
                Initiating a chargeback without first attempting to resolve the
                dispute through FleetBlox may result in immediate account
                suspension or termination.
              </p>
              <p className="text-[#7D7D7D]">
                FleetBlox reserves the right to contest any chargebacks that it
                deems to be invalid or fraudulent and may pursue collection of
                disputed amounts through appropriate legal channels.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.10 Enterprise and Custom Pricing
              </h3>
              <p className="text-[#7D7D7D]">
                For enterprise customers or Users requiring custom service
                configurations, FleetBlox may offer specialized pricing
                arrangements, volume discounts, or custom payment terms. Such
                arrangements will be documented in separate written agreements
                that supplement this Terms of Service Agreement.
              </p>
            </div>
          </section>

          {/* Intellectual Property Rights */}
          <section id="intellectual-property" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              5. INTELLECTUAL PROPERTY RIGHTS AND OWNERSHIP
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                5.1 FleetBlox Intellectual Property Ownership
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox and its licensors retain all rights, title, and
                interest in and to the FleetBlox platform, Services, software,
                technology, algorithms, user interfaces, designs, trademarks,
                service marks, trade names, logos, copyrights, patents, trade
                secrets, know-how, and all other intellectual property rights
                related thereto (collectively, the &ldquo;FleetBlox IP&rdquo;).
              </p>
              <p className="text-[#7D7D7D]">
                The FleetBlox IP is protected by copyright, trademark, patent,
                trade secret, and other intellectual property laws of Canada,
                the United States, the European Union, and other jurisdictions.
                No rights in the FleetBlox IP are granted to Users except as
                expressly set forth in this Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.2 Limited License Grant to Users
              </h3>
              <p className="text-[#7D7D7D]">
                Subject to the terms and conditions of this Agreement, FleetBlox
                grants each User a limited, non-exclusive, non-transferable,
                non-sublicensable, and revocable license to access and use the
                Services solely for the User&apos;s internal business purposes
                and in accordance with the terms hereof.
              </p>
              <p className="text-[#7D7D7D]">
                This license does not permit Users to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Copy, modify, distribute, sell, or lease any part of the
                  Services or included software;
                </li>
                <li>
                  Reverse engineer, decompile, disassemble, or attempt to derive
                  the source code of the Services;
                </li>
                <li>
                  Remove, alter, or obscure any proprietary notices, labels, or
                  marks on the Services;
                </li>
                <li>
                  Use the Services to develop competing products or services;
                </li>
                <li>
                  Access the Services through automated means, including bots,
                  scrapers, or other unauthorized tools;
                </li>
                <li>
                  Sublicense, resell, or otherwise make the Services available
                  to third parties.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.3 User Data and Content Ownership
              </h3>
              <p className="text-[#7D7D7D]">
                Users retain ownership of their data, content, and information
                that they provide, upload, or input into the FleetBlox platform
                (&ldquo;User Content&rdquo;). However, by using the Services,
                Users grant FleetBlox a worldwide, non-exclusive, royalty-free
                license to use, process, store, and analyze User Content solely
                for the purposes of providing the Services, improving the
                platform, and fulfilling FleetBlox&apos;s obligations under this
                Agreement.
              </p>
              <p className="text-[#7D7D7D]">
                Users represent and warrant that they have all necessary rights,
                permissions, and authority to provide User Content to FleetBlox
                and to grant the license set forth herein.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.4 Feedback and Suggestions
              </h3>
              <p className="text-[#7D7D7D]">
                If Users provide FleetBlox with any feedback, suggestions,
                recommendations, or ideas regarding the Services
                (&ldquo;Feedback&rdquo;), Users acknowledge and agree that such
                Feedback may be used by FleetBlox without restriction and
                without compensation to the User. Users hereby assign to
                FleetBlox all rights in such Feedback and waive any claims
                relating to any intellectual property rights in such Feedback.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.5 Third-Party Intellectual Property
              </h3>
              <p className="text-[#7D7D7D]">
                The Services may incorporate or integrate with third-party
                software, services, or content that is subject to separate
                intellectual property rights. Users acknowledge that such
                third-party intellectual property is owned by the respective
                third parties and is used by FleetBlox under appropriate
                licenses or agreements.
              </p>
              <p className="text-[#7D7D7D]">
                Users agree not to infringe upon the intellectual property
                rights of any third party in connection with their use of the
                Services and acknowledge that FleetBlox is not responsible for
                any third-party intellectual property infringement claims
                arising from User&apos;s use of the Services.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.6 Trademark Usage and Brand Guidelines
              </h3>
              <p className="text-[#7D7D7D]">
                The FleetBlox name, logo, and other identifying marks are
                trademarks of After20solutions Inc. Users are not permitted to
                use FleetBlox trademarks, service marks, or logos without the
                prior written consent of FleetBlox. Any unauthorized use of
                FleetBlox trademarks may constitute trademark infringement and
                unfair competition under applicable laws.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.7 Digital Millennium Copyright Act (DMCA) Compliance
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox respects the intellectual property rights of others
                and complies with the Digital Millennium Copyright Act (DMCA)
                and similar copyright laws in other jurisdictions. If you
                believe that content available through the Services infringes
                your copyright, you may submit a DMCA takedown notice to
                FleetBlox&apos;s designated copyright agent.
              </p>
              <p className="text-[#7D7D7D]">DMCA notices should include:</p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  A physical or electronic signature of the copyright owner or
                  authorized representative;
                </li>
                <li>
                  Identification of the copyrighted work claimed to be
                  infringed;
                </li>
                <li>
                  Identification of the allegedly infringing material and its
                  location on the Services;
                </li>
                <li>Contact information for the complaining party;</li>
                <li>
                  A statement of good faith belief that the use is not
                  authorized;
                </li>
                <li>
                  A statement of accuracy and authority to act on behalf of the
                  copyright owner.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.8 Vehicle Manufacturer Integration and Compatibility
              </h3>
              <p className="text-[#7D7D7D]">
                The FleetBlox Services may integrate with vehicle systems and
                data provided by Original Equipment Manufacturers (OEMs) and
                other third-party vehicle technology providers. FleetBlox does
                not own or control the intellectual property associated with
                such vehicle systems, and the availability of certain features
                may depend on the compatibility and cooperation of third-party
                vehicle manufacturers.
              </p>
              <p className="text-[#7D7D7D]">
                Users acknowledge that not all vehicle makes and models may be
                compatible with the FleetBlox platform, and FleetBlox makes no
                warranty regarding the availability, compatibility, or
                performance of the Services with specific vehicles or OEM
                systems. No refunds will be issued for vehicle connection
                issues, incompatibility, or limitations in functionality due to
                vehicle manufacturer restrictions.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.9 Open Source Software
              </h3>
              <p className="text-[#7D7D7D]">
                The Services may incorporate open source software components
                that are subject to separate license terms. Users acknowledge
                that such open source components are governed by their
                respective license agreements, and FleetBlox shall comply with
                all applicable open source license requirements.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.10 Intellectual Property Indemnification
              </h3>
              <p className="text-[#7D7D7D]">
                Users agree to indemnify, defend, and hold harmless FleetBlox
                from any claims, damages, losses, or expenses arising from:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  User Content that infringes the intellectual property rights
                  of third parties;
                </li>
                <li>
                  User&apos;s unauthorized use of FleetBlox intellectual
                  property;
                </li>
                <li>
                  User&apos;s violation of any intellectual property provisions
                  of this Agreement;
                </li>
                <li>
                  Any modifications or derivative works created by User based on
                  the Services.
                </li>
              </ul>
            </div>
          </section>

          {/* Data Protection and Privacy */}
          <section id="data-protection" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              6. DATA PROTECTION AND PRIVACY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                6.1 Commitment to Data Protection
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox is committed to safeguarding Personal Data in
                compliance with GDPR, CCPA, and PIPEDA regulations.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                6.2 Data Usage
              </h3>
              <p className="text-[#7D7D7D]">
                Personal Data is used for service provision, security
                enhancements, legal compliance, and platform improvement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                6.3 User Rights
              </h3>
              <p className="text-[#7D7D7D]">
                Users have rights to access, rectification, erasure, data
                portability, objection, and restriction of processing.
              </p>
            </div>
          </section>

          {/* Account Termination and Data Handling */}
          <section id="termination" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              7. ACCOUNT TERMINATION AND DATA HANDLING
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                7.1 User-Initiated Termination
              </h3>
              <p>
                Users may terminate their accounts at any time by providing
                written notice to FleetBlox.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                7.2 FleetBlox-Initiated Termination
              </h3>
              <p>
                FleetBlox may terminate accounts for violation of terms,
                inactivity, non-payment, or service delivery impediments.
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
                Users must use the Services lawfully and are prohibited from
                fraudulent conduct, security breaches, and interference with
                service performance.
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
                The Services are provided &ldquo;as-is&rdquo; and &ldquo;as
                available&rdquo; without warranties of any kind.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                9.2 Limitation of Liability
              </h3>
              <p className="text-[#7D7D7D]">
                FleetBlox&apos;s total liability shall not exceed the amount
                paid by the User during the 12-month period preceding the event.
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
                Any disputes shall be resolved through binding arbitration in
                Toronto, Ontario, Canada, in accordance with Canadian
                Arbitration Association rules.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                10.2 Class Action Waiver
              </h3>
              <p className="text-[#7D7D7D]">
                Users waive any right to participate in class actions. All
                disputes will be resolved individually.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                10.3 Governing Law
              </h3>
              <p className="text-[#7D7D7D]">
                This Agreement shall be governed by the laws of the Province of
                Ontario, Canada.
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
              <p>
                Users agree to indemnify and hold harmless FleetBlox from claims
                arising from breach of this Agreement, misuse of Services, or
                infringement of third-party rights.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                11.2 Defense of Claims
              </h3>
              <p>
                FleetBlox reserves the right to control defense and settlement
                of indemnified claims with User cooperation.
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
                FleetBlox reserves the right to modify this Agreement at any
                time. Changes will be communicated via email or platform
                notification.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                12.2 Notification of Significant Changes
              </h3>
              <p className="text-[#7D7D7D]">
                Significant changes will receive at least 14 days&apos; prior
                notice before taking effect.
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
                Services may integrate with third-party providers including OEMs
                and payment processors. FleetBlox does not control these
                services.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                13.2 User Acceptance of Third-Party Terms
              </h3>
              <p>
                Users must comply with third-party provider terms and conditions
                when using integrated services.
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
                Neither party is liable for failure to perform due to events
                beyond reasonable control, including natural disasters,
                government acts, power failures, or pandemics.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                14.2 Notice of Force Majeure
              </h3>
              <p>
                The affected party must promptly notify the other party of any
                Force Majeure Event and provide reasonable details.
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
                15.1 Use of Cookies
              </h3>
              <p>
                FleetBlox uses cookies and tracking technologies to enhance
                platform functionality, analyze traffic, and improve user
                experience.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                15.2 Types of Cookies
              </h3>
              <p>
                We use strictly necessary, performance, functional, and
                targeting/advertising cookies.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                15.3 User Control
              </h3>
              <p>
                Users can control cookie preferences through browser settings,
                though this may impact platform functionality.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section id="children-privacy" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              16. CHILDREN&apos;S PRIVACY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                16.1 Intentions Regarding Minors
              </h3>
              <p>
                FleetBlox Services are not intended for children under 16. We do
                not knowingly collect data from minors.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                16.2 Action on Inadvertent Collection
              </h3>
              <p>
                If we discover inadvertent collection of minor&apos;s data, we
                will promptly delete it in compliance with applicable laws.
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
                17.1 Third-Party Sites
              </h3>
              <p>
                FleetBlox may provide links to third-party websites for
                convenience. These sites operate independently with their own
                privacy policies.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                17.2 Exclusion of Liability
              </h3>
              <p>
                FleetBlox disclaims liability for third-party site content or
                privacy practices.
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
                This Agreement is governed by the laws of the Province of
                Ontario, Canada, without regard to conflict of law provisions.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                18.2 Exclusive Jurisdiction
              </h3>
              <p>
                Users agree to submit legal disputes to the exclusive
                jurisdiction of courts in Toronto, Ontario, Canada.
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
                FleetBlox retains Personal Data as necessary to fulfill
                collection purposes and comply with legal obligations.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                19.2 User Requests for Deletion
              </h3>
              <p>
                Users may request data deletion, which will be processed
                according to applicable laws and retention requirements.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                19.3 Data Anonymization
              </h3>
              <p>
                Upon deletion, FleetBlox may anonymize data for statistical
                analysis and business intelligence purposes.
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
                FleetBlox employs comprehensive technical, administrative, and
                physical measures to protect Personal Data.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                20.2 Encryption
              </h3>
              <p>
                All data is encrypted using TLS during transmission and AES-256
                for stored data.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                20.3 Access Control
              </h3>
              <p>
                Access is limited to authorized personnel using role-based
                access control and multi-factor authentication.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                20.4 Security Audits
              </h3>
              <p>
                Regular security audits, vulnerability assessments, and
                penetration testing ensure continuous platform security.
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
                For questions regarding this Agreement or data handling
                practices, contact FleetBlox at:
              </p>
              <div className="space-y-2 pl-4">
                <p>
                  <strong>Email:</strong> [Insert Email Address]
                </p>
                <p>
                  <strong>Phone:</strong> [Insert Phone Number]
                </p>
                <p>
                  <strong>Mailing Address:</strong> [Insert Mailing Address]
                </p>
                <p>
                  <strong>Support Email:</strong> [Insert Support Email Address]
                </p>
              </div>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                21.2 Filing Complaints
              </h3>
              <p>
                Users dissatisfied with data handling may lodge complaints with
                appropriate data protection authorities in their jurisdiction.
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default TermsAndService;
