"use client";
import React, { useState, useEffect, useMemo } from "react";

const EndUserLicenseAgreement = () => {
  const [activeSection, setActiveSection] = useState("");

  const keyContents = useMemo(
    () => [
      { id: "introduction", title: "Introduction" },
      { id: "definitions", title: "Definitions" },
      { id: "grant-license", title: "Grant of License" },
      { id: "restrictions", title: "Restrictions on Use" },
      {
        id: "intellectual-property",
        title: "Intellectual Property and Ownership",
      },
      { id: "user-rights", title: "User Rights and Obligations" },
      { id: "payment", title: "Payment and Fees" },
      { id: "termination", title: "Termination" },
      { id: "liability", title: "Liability and Indemnification" },
      { id: "privacy", title: "Privacy and Data Usage" },
      { id: "governing-law", title: "Governing Law and Jurisdiction" },
      { id: "force-majeure", title: "Force Majeure" },
      { id: "severability", title: "Severability" },
      { id: "entire-agreement", title: "Entire Agreement" },
      { id: "amendments", title: "Amendments" },
      { id: "support", title: "Support and Maintenance" },
      { id: "dispute-resolution", title: "Dispute Resolution" },
      { id: "notices", title: "Notices" },
      { id: "execution", title: "Execution and Effectiveness" },
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
        // Mobile menu not used in this component
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
        {/* Main Content */}
        <div className="lg:w-full px-2 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Introduction */}
          <section id="introduction" className="mb-6 lg:mb-8">
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-[#04082C] font-semibold">
                This End-User License Agreement (the &ldquo;Agreement&rdquo;) is
                entered into as of the Effective Date June 20, 2025 by and
                between After20solutions Inc., a corporation duly organized and
                existing under the laws of the Province of Ontario, Canada
                (hereinafter referred to as the &ldquo;Licensor,&rdquo;
                &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), and
                the individual or entity accessing, installing, or otherwise
                utilizing the software application known as
                &ldquo;Fleetblox&rdquo; (the &ldquo;Software&rdquo;)
                (hereinafter referred to as the &ldquo;Licensee,&rdquo;
                &ldquo;you,&rdquo; or &ldquo;your&rdquo;).
              </p>
              <p className="text-[#7D7D7D]">
                <strong>WHEREAS,</strong> the Licensor is the sole and exclusive
                owner of all right, title, and interest in and to the Software,
                and the Licensee desires to obtain a limited, non-exclusive,
                non-transferable license to use the Software, in accordance with
                the terms and conditions set forth in this Agreement; and
              </p>
              <p className="text-[#7D7D7D]">
                <strong>WHEREAS,</strong> by executing or otherwise agreeing to
                this Agreement, the Licensee acknowledges and agrees to be
                legally bound by the terms and conditions hereinafter set forth,
                including any and all amendments or modifications made hereto,
                whether in writing or otherwise duly authorized.
              </p>
              <p className="text-[#7D7D7D]">
                <strong>NOW, THEREFORE,</strong> in consideration of the mutual
                covenants, promises, and representations herein contained, and
                for other good and valuable consideration, the parties hereto
                agree as follows:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  <strong>Grant of License:</strong> The Licensor hereby grants
                  to the Licensee a limited, non-exclusive, non-transferable,
                  revocable license to access, install, and use the Software
                  solely in accordance with the terms and conditions of this
                  Agreement.
                </li>
                <li>
                  <strong>Binding Nature of Agreement:</strong> By accessing,
                  installing, or using the Software, the Licensee irrevocably
                  agrees to comply with and be bound by all the terms,
                  conditions, and provisions of this Agreement.
                </li>
                <li>
                  <strong>Authority to Bind:</strong> In the event that the
                  Licensee is an organization, the individual executing this
                  Agreement represents and warrants that they have the requisite
                  legal authority to bind said entity to the terms of this
                  Agreement.
                </li>
                <li>
                  <strong>Acknowledgment of Terms:</strong> The Licensee
                  acknowledges that by installing, accessing, or using the
                  Software, the Licensee is irrevocably bound by the terms of
                  this Agreement.
                </li>
                <li>
                  <strong>Severability:</strong> Should any provision of this
                  Agreement be determined to be invalid, illegal, or
                  unenforceable, the remaining provisions shall remain in full
                  force and effect.
                </li>
              </ul>
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
                have the meanings ascribed to them below:
              </p>
              <div className="space-y-4">
                <p className="text-[#7D7D7D]">
                  <strong>1.1 &ldquo;Software&rdquo;</strong> shall refer to the
                  cloud-based platform known as &ldquo;Fleetblox,&rdquo; which
                  provides a suite of fleet management services, including, but
                  not limited to, vehicle tracking, predictive maintenance,
                  diagnostics, and performance analytics. The Software is made
                  available on a Software as a Service (SaaS) basis and is
                  delivered through a web-based dashboard, accompanied by
                  optional mobile applications, as specified by the Licensor.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong>1.2 &ldquo;License&rdquo;</strong> shall mean the
                  non-exclusive, non-transferable, revocable, and limited right
                  granted to the Licensee to access and use the Software,
                  subject to and in accordance with the terms and conditions set
                  forth in this Agreement.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong>1.3 &ldquo;Licensor&rdquo;</strong> shall refer to
                  After20solutions Inc., a corporation duly incorporated and
                  existing under the laws of the Province of Ontario, Canada,
                  which owns, operates, and provides the Software to the
                  Licensee under the terms of this Agreement.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong>1.4 &ldquo;Licensee&rdquo;</strong> shall refer to the
                  individual or legal entity granted the License to access,
                  install, and use the Software in accordance with the terms of
                  this Agreement. For purposes hereof, &ldquo;Licensee&rdquo;
                  may refer to either an individual or an organization, as
                  applicable.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong>1.5 &ldquo;User&rdquo;</strong> shall refer to any
                  individual, employee, representative, or agent of the Licensee
                  who is authorized by the Licensee to access and use the
                  Software. Such users may include, without limitation, fleet
                  managers, system administrators, or other individuals granted
                  access to the Software in accordance with the terms of this
                  Agreement.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong>1.6 &ldquo;Subscription&rdquo;</strong> shall refer to
                  the subscription-based model by which the Licensee obtains
                  access to the Software, which may be provided on a monthly or
                  annual basis, as specified in the applicable Subscription
                  plan. The Subscription may include different levels of access,
                  functionality, and support, depending on the Licensee&apos;s
                  chosen plan.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong>1.7 &ldquo;Trial Account&rdquo;</strong> shall refer
                  to a limited, temporary account granted by the Licensor to
                  prospective Licensees for the purpose of evaluating the
                  Software. Trial Accounts are typically subject to certain
                  limitations, including but not limited to restricted features,
                  functionality, and duration, and are provided solely for the
                  purpose of assessment and evaluation.
                </p>
                <p className="text-[#7D7D7D]">
                  <strong>1.8 &ldquo;Third-Party Services&rdquo;</strong> shall
                  refer to any external services, software, applications, or
                  components that are integrated into or utilized in conjunction
                  with the Software, including, without limitation, payment
                  processing services, analytics services, mapping and
                  geolocation services, or any other third-party functionality
                  that may be made available through the Software.
                </p>
              </div>
            </div>
          </section>

          {/* Grant of License */}
          <section id="grant-license" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              2. GRANT OF LICENSE
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                2.1 License Grant
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensor hereby grants to the Licensee a non-exclusive,
                non-transferable, revocable license to access and use the
                Software for the sole and limited purpose of fleet management
                and operational activities, in accordance with the terms,
                conditions, and restrictions set forth in this Agreement. The
                License granted hereunder does not confer any ownership rights
                in the Software, and the Licensee shall not acquire any right,
                title, or interest in the Software except as expressly provided
                in this Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2.2 Usage Rights
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee is hereby authorized to use the Software strictly
                for internal, non-commercial purposes, and solely within the
                scope and limits defined by the applicable Subscription Tier
                selected by the Licensee. The use of the Software is subject to
                any restrictions that may apply to vehicle slots, user access,
                functionality, or features as determined by the Licensee&apos;s
                chosen Subscription plan. The Licensee shall ensure that the
                Software is used in compliance with the restrictions and
                limitations set forth in this Agreement and shall not exceed the
                parameters specified in the Subscription Tier.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2.3 Trial Account
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensor may, at its sole discretion, offer the Licensee a
                Trial Account for the limited purpose of evaluating the
                Software. The terms of the Trial Account shall be governed by
                this Agreement, with specific limitations on features,
                functionalities, and the duration of the trial period. Upon the
                expiration of the trial period, the Licensee may be required to
                enter into a paid subscription plan to continue using the
                Software. The Licensor reserves the right to revoke or terminate
                the Trial Account at any time, without notice, and without
                liability.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                2.4 Duration of License
              </h3>
              <p className="text-[#7D7D7D]">
                The License granted under this Agreement shall remain in effect
                for the duration of the Subscription period, as selected by the
                Licensee, whether on a monthly or annual basis. The License
                shall automatically renew upon the expiration of the
                Subscription period unless terminated by either party in
                accordance with the termination provisions set forth herein. The
                Licensee may terminate the License at any time by notifying the
                Licensor in writing, subject to the terms of this Agreement.
              </p>
            </div>
          </section>

          {/* Restrictions on Use */}
          <section id="restrictions" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              3. RESTRICTIONS ON USE
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                3.1 Prohibited Uses
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee shall not, directly or indirectly, nor permit any
                third party to:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Reverse engineer, decompile, disassemble, or otherwise attempt
                  to derive, reconstruct, or discover the source code,
                  underlying structure, or algorithms of the Software by any
                  means or process, except to the extent expressly authorized by
                  applicable law.
                </li>
                <li>
                  Modify, adapt, alter, translate, or create derivative works
                  based on the Software or any part thereof, without the express
                  prior written consent of the Licensor.
                </li>
                <li>
                  Redistribute, resell, sublicense, lease, lend, assign, or
                  otherwise transfer the Software or any portion thereof, or
                  grant any rights to use the Software to any third party,
                  except as expressly permitted in this Agreement.
                </li>
                <li>
                  Use the Software for any unlawful, illegal, or unethical
                  purposes, including, but not limited to, unauthorized
                  surveillance, monitoring, tracking, or otherwise using the
                  Software in violation of any applicable laws or regulations,
                  or for any activity that could result in harm to individuals,
                  entities, or property.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.2 Vehicle Slot Restrictions
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee&apos;s rights to track and manage vehicles using
                the Software are strictly governed by the limitations imposed by
                the Subscription Tier selected by the Licensee. The number of
                vehicles that can be tracked and managed is explicitly specified
                in the applicable Subscription Tier. The Licensee shall not
                exceed the number of vehicle slots allocated under the
                Subscription and shall ensure that the use of the Software
                remains within the constraints of such limitations.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                3.3 Account Transferability
              </h3>
              <p className="text-[#7D7D7D]">
                The License granted under this Agreement is personal to the
                Licensee and is non-transferable. The Licensee shall not assign,
                sublicense, delegate, or otherwise transfer their rights under
                this Agreement to any third party without the prior written
                consent of the Licensor. Any attempted assignment or transfer
                without such consent shall be null and void, and the Licensor
                reserves the right to terminate the License immediately upon
                discovery of any such unauthorized transfer.
              </p>
            </div>
          </section>

          {/* Intellectual Property and Ownership */}
          <section id="intellectual-property" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              4. INTELLECTUAL PROPERTY AND OWNERSHIP
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                4.1 Ownership of Software
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensor retains, and shall continue to retain, all right,
                title, and interest in and to the Software, including but not
                limited to any modifications, enhancements, improvements,
                updates, and all intellectual property rights associated
                therewith. Such intellectual property rights shall include,
                without limitation, all copyrights, patents, trademarks, trade
                secrets, and any other proprietary rights, whether registered or
                unregistered, relating to the Software. The Licensee
                acknowledges that the Software and all related intellectual
                property are the exclusive property of the Licensor, and that
                the Licensee has no ownership rights therein, except for the
                limited License granted under this Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.2 Licensee&apos;s Data
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee shall retain ownership of all data provided,
                uploaded, or otherwise inputted into the Software by the
                Licensee, including but not limited to fleet data, vehicle
                details, driver information, and operational data
                (&ldquo;Licensee Data&rdquo;). Notwithstanding the foregoing,
                the Licensee hereby grants the Licensor a limited, revocable,
                non-exclusive, worldwide license to access, store, and process
                such Licensee Data solely for the purpose of providing the
                services and functionalities set forth in this Agreement,
                including for the purpose of improving the Software or providing
                support. The Licensor shall take commercially reasonable
                measures to protect the confidentiality and security of Licensee
                Data and shall not use such data for any other purpose without
                the prior written consent of the Licensee, except as required by
                law.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                4.3 No Rights to Software Source Code
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee acknowledges and agrees that the Licensee has no
                right, title, or interest in or to the source code of the
                Software, and that the Software is proprietary to the Licensor.
                The Licensee further agrees not to (i) copy, modify, or
                distribute the Software; (ii) reverse engineer, decompile,
                disassemble, or otherwise attempt to derive the source code,
                object code, or underlying structure or algorithms of the
                Software; or (iii) create any derivative works based on the
                Software, except as expressly permitted by this Agreement. Any
                unauthorized use or attempt to reverse engineer the Software
                constitutes a material breach of this Agreement.
              </p>
            </div>
          </section>

          {/* User Rights and Obligations */}
          <section id="user-rights" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              5. USER RIGHTS AND OBLIGATIONS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                5.1 Licensee&apos;s Rights
              </h3>
              <p className="text-[#7D7D7D]">
                Subject to the terms, conditions, and limitations set forth in
                this Agreement, the Licensee is hereby granted a limited,
                non-exclusive, non-transferable right to access and use the
                Software solely for the purposes expressly outlined herein. Such
                access and use shall be in accordance with the scope, features,
                and functionalities defined by the Licensee&apos;s selected
                Subscription Tier, and in no event shall the Licensee exceed the
                limits or use the Software in a manner inconsistent with the
                terms of this Agreement.
              </p>
              <p className="text-[#7D7D7D]">
                The Licensee shall be solely responsible for ensuring that only
                those individuals who are duly authorized, including but not
                limited to employees, contractors, or agents of the Licensee,
                shall access and use the Software. The Licensee further
                undertakes to ensure that any and all authorized users abide by
                and comply with all the terms, provisions, and conditions of
                this Agreement, and shall be responsible for any actions or
                omissions of such authorized users that constitute a breach of
                this Agreement. The Licensee shall immediately notify the
                Licensor in writing of any unauthorized use of the Software or
                any other breach of this Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.2 Confidentiality
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee acknowledges and agrees that they are solely
                responsible for maintaining the confidentiality, integrity, and
                security of all account credentials, including but not limited
                to usernames, passwords, authentication tokens, and any other
                security-related information provided by the Licensor
                (collectively, the &ldquo;Credentials&rdquo;). The Licensee
                shall adopt all reasonable measures, including securing access
                to the Licensee&apos;s computer systems, devices, and accounts,
                to prevent unauthorized access to the Software or the
                Licensee&apos;s account.
              </p>
              <p className="text-[#7D7D7D]">
                In the event that the Licensee becomes aware of, or has reason
                to suspect, any unauthorized access, use, or disclosure of their
                Credentials, or any other breach of security in relation to the
                Software, the Licensee agrees to immediately notify the Licensor
                in writing, without undue delay, and shall cooperate with the
                Licensor in any investigation or remediation efforts.
                Notwithstanding the foregoing, the Licensee shall be solely
                liable for any and all actions or omissions occurring under
                their account, regardless of whether such actions or omissions
                were authorized, and the Licensor shall bear no responsibility
                for any loss, damages, or liabilities incurred by the Licensee
                as a result of any such unauthorized access, disclosure, or use.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.3 Compliance with Laws and Regulations
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee warrants, represents, and covenants that in their
                use of the Software, they shall comply with all applicable
                local, national, international, and foreign laws, statutes,
                ordinances, regulations, and rules, including but not limited to
                those relating to data protection, privacy, cybersecurity,
                intellectual property, and any other relevant legislative or
                regulatory framework that governs the Licensee&apos;s activities
                in connection with the Software.
              </p>
              <p className="text-[#7D7D7D]">
                Without limiting the generality of the foregoing, the Licensee
                agrees to comply with all applicable data protection and privacy
                laws, including but not limited to the General Data Protection
                Regulation (GDPR) in the European Union, the California Consumer
                Privacy Act (CCPA), and any other jurisdictional laws regulating
                the collection, processing, storage, and transfer of personal
                data. The Licensee further agrees that they shall not use the
                Software in any manner that would contravene any applicable laws
                or regulations, including, but not limited to, engaging in
                unlawful activities such as fraud, harassment, unauthorized
                surveillance, or the tracking of individuals without proper
                consent.
              </p>
              <p className="text-[#7D7D7D]">
                The Licensee shall indemnify, defend, and hold the Licensor
                harmless from any and all liabilities, losses, damages, claims,
                expenses, or costs (including legal fees) arising from or in
                connection with the Licensee&apos;s failure to comply with any
                such laws, regulations, or obligations.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.4 Restrictions on Unauthorized Use
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee further agrees not to, nor permit any third party
                to: (i) bypass, disable, or interfere with any security measures
                or controls employed by the Software; (ii) use the Software for
                purposes that may cause harm, damage, or degradation to the
                Software, its systems, or any associated third-party services;
                (iii) engage in any activity that could impair the ability of
                the Licensor or other users to access and utilize the Software
                as intended; or (iv) use the Software in any manner that could
                result in the infringement of the intellectual property rights
                or other proprietary rights of the Licensor or any third party.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                5.5 Reporting of Violations
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee agrees to promptly report to the Licensor any known
                or suspected breaches of this Agreement, including but not
                limited to any unauthorized use, access, or disclosure of the
                Software or its data. The Licensee agrees to cooperate fully
                with the Licensor in investigating such breaches and mitigating
                any potential harm that may arise therefrom. The Licensee
                acknowledges that failure to comply with the provisions set
                forth in this Agreement may result in the suspension or
                termination of access to the Software, in addition to any other
                legal remedies available to the Licensor under applicable law.
              </p>
            </div>
          </section>

          {/* Payment and Fees */}
          <section id="payment" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              6. PAYMENT AND FEES
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                6.1 Subscription Fees
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee hereby agrees to pay the Subscription Fees as
                specified in the applicable pricing plan for the Software. The
                Subscription Fees are due and payable in advance, either on a
                monthly or annual basis, as determined by the Licensee&apos;s
                selection of the Subscription Tier. The Licensee acknowledges
                that the Subscription Fees are subject to change, and the
                Licensor reserves the right to modify such fees at its
                discretion, provided that any such change shall not affect the
                Subscription Fees for the current billing cycle unless the
                Licensee consents to such modifications in writing or through
                continued use of the Software following notice of such changes.
                All Subscription Fees shall be paid in accordance with the terms
                of the applicable pricing plan, and the Licensee agrees to
                promptly remit payment upon the due date of each billing cycle.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6.2 Payment Processing
              </h3>
              <p className="text-[#7D7D7D]">
                Payments for Subscription Fees will be processed securely
                through third-party payment processors or service providers,
                including but not limited to credit card payment systems, bank
                transfers, or invoicing, depending on the payment options
                selected by the Licensee. The Licensee hereby authorizes the
                Licensor to charge the designated payment method provided by the
                Licensee for the full amount of the Subscription Fees due, and
                for any additional fees or charges incurred in connection with
                the use of the Software. The Licensee shall ensure that all
                payment information provided to the Licensor or its payment
                processing partners is accurate, complete, and up-to-date, and
                agrees to promptly update any information in the event of
                changes to the payment method or billing details. In the event
                that any payment fails or is declined, the Licensee agrees to
                promptly provide an alternative payment method, and the Licensor
                may, at its sole discretion, suspend or terminate the
                Licensee&apos;s access to the Software until the outstanding
                payment is rectified.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6.3 Refunds
              </h3>
              <p className="text-[#7D7D7D]">
                Except where otherwise required by applicable law or regulation,
                Subscription Fees are strictly non-refundable. The Licensee
                acknowledges and agrees that no refunds shall be issued for any
                payments made for the Software, including but not limited to
                situations where the Licensee cancels the Subscription prior to
                the end of the applicable billing cycle. In the event of
                termination or cancellation of the Licensee&apos;s Subscription,
                the Licensee shall retain access to the Software until the
                conclusion of the current billing period, at which point the
                Licensee&apos;s access to the Software will cease, and no
                further fees will be charged for subsequent billing periods. The
                Licensee expressly waives any right to a refund, credit, or
                pro-rata adjustment of any Subscription Fees paid, unless such a
                refund is required by applicable law or as otherwise explicitly
                stated in this Agreement.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                6.4 Late Payments and Suspension of Service
              </h3>
              <p className="text-[#7D7D7D]">
                In the event that the Licensee fails to make any payment due
                under this Agreement within the time period specified in the
                applicable billing cycle, the Licensor reserves the right to
                charge interest on any overdue amounts at the rate of 1.5% per
                month, or the maximum rate permitted by applicable law,
                whichever is lower. The Licensor further reserves the right to
                suspend or terminate the Licensee&apos;s access to the Software
                until such overdue payments are made in full, and may take any
                additional legal action necessary to collect the outstanding
                fees. The Licensee acknowledges that the Licensor shall not be
                liable for any loss, damage, or interruption of services
                resulting from such suspension or termination.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section id="termination" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              7. TERMINATION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                7.1 Termination by Licensor
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensor reserves the absolute right to terminate this
                Agreement, revoke the License, and suspend or deny the
                Licensee&apos;s access to the Software with immediate effect,
                without prejudice to any other remedies available to the
                Licensor, in the event of any of the following circumstances:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  A material breach of any provision of this Agreement by the
                  Licensee, which remains uncured after the Licensee has been
                  provided with written notice of such breach and a reasonable
                  opportunity to cure it.
                </li>
                <li>
                  Failure by the Licensee to remit payment of Subscription Fees
                  in accordance with the terms of this Agreement, including any
                  failure to make payments within the timeframes specified in
                  the applicable billing cycle.
                </li>
                <li>
                  Any use of the Software by the Licensee for illegal, unlawful,
                  or unethical activities, including but not limited to
                  unauthorized surveillance, data theft, fraud, or any conduct
                  that may violate any applicable laws or the rights of third
                  parties.
                </li>
              </ul>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                7.2 Termination by Licensee
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee may terminate this Agreement and the License by
                providing the Licensor with written notice of such termination,
                in accordance with the provisions outlined herein. Upon receipt
                of such notice, the License will be deemed terminated, and the
                Licensee&apos;s access to the Software shall be restricted
                accordingly. The Licensee may, at their discretion, request a
                copy of their data prior to termination. The Licensor shall make
                reasonable efforts to provide the requested data in a commonly
                available and machine-readable format, subject to any applicable
                data retention policies or legal obligations.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                7.3 Effect of Termination
              </h3>
              <p className="text-[#7D7D7D]">
                Upon the termination of this Agreement, regardless of the party
                initiating such termination, the Licensee shall immediately
                cease all use of the Software. Furthermore, upon request by the
                Licensee, the Licensor will make commercially reasonable efforts
                to assist the Licensee in exporting or retrieving their data
                prior to its deletion, subject to any limitations imposed by the
                Licensor&apos;s data retention policies, applicable laws, or
                technical constraints. The Licensee acknowledges that, following
                termination, their access to the Software will be permanently
                disabled, and the Licensor shall have no further obligation to
                provide access to the Software or data.
              </p>
            </div>
          </section>

          {/* Liability and Indemnification */}
          <section id="liability" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              8. LIABILITY AND INDEMNIFICATION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                8.1 Limitation of Liability
              </h3>
              <p className="text-[#7D7D7D]">
                To the fullest extent permitted by applicable law, the Licensor
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages arising out of or in
                connection with the use, inability to use, or performance of the
                Software, including but not limited to loss of data, loss of
                business profits, business interruption, loss of revenue, or
                other economic damages, regardless of whether such damages were
                foreseeable or the Licensor was advised of the possibility of
                such damages. In no event shall the Licensor&apos;s total
                liability under this Agreement exceed the total amount paid by
                the Licensee for the Software during the six (6) month period
                immediately preceding the event giving rise to the claim.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                8.2 Indemnification
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee agrees to indemnify, defend, and hold harmless the
                Licensor, its affiliates, officers, directors, employees,
                agents, and contractors from and against any and all claims,
                damages, liabilities, losses, expenses, or costs, including
                reasonable legal fees, arising out of or in connection with:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  The Licensee&apos;s misuse, unauthorized use, or wrongful use
                  of the Software.
                </li>
                <li>
                  Any breach or alleged breach of the Licensee&apos;s
                  obligations, representations, or warranties under this
                  Agreement.
                </li>
                <li>
                  The violation of any applicable laws, regulations, or
                  third-party rights arising from the Licensee&apos;s use of the
                  Software.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                The Licensee shall cooperate with the Licensor in the defense of
                any such claims and shall provide the Licensor with all
                necessary assistance, including access to documents, witnesses,
                and other materials relevant to the defense.
              </p>
            </div>
          </section>

          {/* Privacy and Data Usage */}
          <section id="privacy" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              9. PRIVACY AND DATA USAGE
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                9.1 Privacy Policy
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee acknowledges and agrees that the collection, use,
                processing, and storage of Personal Data (as defined under
                applicable data protection laws) in connection with the Software
                shall be governed by the Licensor&apos;s Privacy Policy, which
                is incorporated herein by reference. The Licensee agrees to
                review the Privacy Policy and abide by its terms, and consents
                to the collection and processing of data in accordance with the
                terms set forth therein. The Privacy Policy may be amended by
                the Licensor from time to time, and any such amendments shall be
                posted on the Licensor&apos;s website, with an effective date
                specified therein.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                9.2 Data Processing
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensor may collect, store, and process data provided by
                the Licensee, including but not limited to fleet data, vehicle
                information, location data, user behavior data, and any other
                data generated in connection with the use of the Software. The
                Licensee expressly grants the Licensor the right to process such
                data for the purpose of providing the Software services and
                fulfilling its obligations under this Agreement. The Licensor
                shall ensure that any data processing is conducted in compliance
                with applicable data protection laws and regulations, including
                but not limited to the General Data Protection Regulation (GDPR)
                and the California Consumer Privacy Act (CCPA), where
                applicable.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                9.3 Third-Party Services
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensee acknowledges and agrees that the Software may
                integrate with third-party services, such as payment processors,
                analytics providers, mapping tools, or other services
                (collectively, &ldquo;Third-Party Services&rdquo;). These
                Third-Party Services may have access to the Licensee&apos;s
                data, and the Licensee agrees that such Third-Party Services
                shall be governed by their own respective privacy policies. The
                Licensor shall not be responsible for the actions, omissions, or
                privacy practices of any Third-Party Services, and the Licensee
                is encouraged to review the privacy policies of such Third-Party
                Services prior to engaging with them.
              </p>
            </div>
          </section>

          {/* Governing Law and Jurisdiction */}
          <section id="governing-law" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              10. GOVERNING LAW AND JURISDICTION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                10.1 Governing Law
              </h3>
              <p className="text-[#7D7D7D]">
                This Agreement shall be governed by and construed in accordance
                with the laws of the Province of Ontario, Canada, without regard
                to its conflicts of law principles. The parties expressly agree
                that any action or proceeding arising out of or related to this
                Agreement shall be subject to the laws of the Province of
                Ontario, and shall not be governed by the Uniform Commercial
                Code or the Convention on Contracts for the International Sale
                of Goods.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                10.2 Jurisdiction
              </h3>
              <p className="text-[#7D7D7D]">
                The parties irrevocably submit to the exclusive jurisdiction of
                the courts located in Toronto, Ontario, Canada, for the
                resolution of any disputes, claims, or legal proceedings arising
                out of or in connection with this Agreement. The Licensee agrees
                that any legal action arising out of or relating to this
                Agreement shall be commenced exclusively in the courts located
                in Toronto, Ontario, and the Licensee hereby waives any
                objection to the jurisdiction or venue of such courts.
              </p>
            </div>
          </section>

          {/* Force Majeure */}
          <section id="force-majeure" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              11. FORCE MAJEURE
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                11.1 Force Majeure
              </h3>
              <p className="text-[#7D7D7D]">
                Neither party shall be held liable for any failure or delay in
                the performance of any of its obligations under this Agreement
                (including, without limitation, the provision of the Software or
                any related services) due to events or circumstances beyond its
                reasonable control (a &ldquo;Force Majeure Event&rdquo;),
                provided that such failure or delay is not caused by the fault
                or negligence of the affected party.
              </p>
              <p className="text-[#7D7D7D]">
                A Force Majeure Event shall include, but not be limited to, the
                following events:
              </p>
              <ul className="list-disc list-inside text-[#7D7D7D] space-y-2 ml-4">
                <li>
                  Acts of God, natural disasters, or severe weather conditions
                  (including earthquakes, floods, hurricanes, and tornadoes);
                </li>
                <li>
                  Acts of terrorism, war (whether declared or undeclared), armed
                  conflicts, civil unrest, or acts of violence;
                </li>
                <li>
                  Any law, regulation, or governmental order, decree, or act
                  that restricts, prohibits, or renders impossible the
                  performance of the affected party&apos;s obligations under
                  this Agreement;
                </li>
                <li>
                  Strikes, lockouts, labor disputes, or industrial actions;
                </li>
                <li>
                  Disruptions or failures in telecommunications, internet
                  services, or power outages;
                </li>
                <li>
                  Failure or disruption of third-party service providers,
                  contractors, or suppliers;
                </li>
                <li>Epidemics, pandemics, or public health emergencies;</li>
                <li>
                  Any other event or circumstance that is beyond the reasonable
                  control of the affected party and that renders it impossible
                  or commercially impractical to perform its obligations under
                  this Agreement.
                </li>
              </ul>
              <p className="text-[#7D7D7D]">
                In the event of a Force Majeure Event, the affected party shall
                promptly notify the other party in writing of the occurrence of
                such event, providing reasonable details of the nature of the
                Force Majeure Event, the expected duration of its impact, and
                the steps being taken by the affected party to mitigate or
                remedy the effects thereof. The affected party shall make
                reasonable efforts to minimize the disruption to its obligations
                under this Agreement and shall resume performance as soon as
                reasonably possible once the Force Majeure Event has concluded
                or been mitigated.
              </p>
            </div>
          </section>

          {/* Severability */}
          <section id="severability" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              12. SEVERABILITY
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                12.1 Severability
              </h3>
              <p className="text-[#7D7D7D]">
                If any provision of this Agreement is held to be invalid,
                illegal, or unenforceable by a court of competent jurisdiction
                or any other authority with proper jurisdiction, in whole or in
                part, such provision shall be modified or amended to the extent
                necessary to make it valid and enforceable while preserving the
                intent of the original provision. The remainder of the Agreement
                shall remain in full force and effect, and the invalidity,
                illegality, or unenforceability of any provision shall not
                affect or impair the validity or enforceability of the other
                provisions, which shall continue to be fully effective and
                binding on the parties as if such invalid, illegal, or
                unenforceable provision had never been part of this Agreement.
              </p>
              <p className="text-[#7D7D7D]">
                In the event that any provision is determined to be invalid or
                unenforceable, the parties agree to negotiate in good faith to
                replace such invalid or unenforceable provision with a valid
                provision that most closely reflects the economic and legal
                intent of the original provision. The invalidity or
                unenforceability of any provision shall not affect the validity
                of the remainder of the Agreement, and the Agreement shall be
                interpreted as if such provision had been omitted.
              </p>
              <p className="text-[#7D7D7D]">
                In addition, should the invalid or unenforceable provision be of
                a nature such that its removal materially alters the balance of
                the rights and obligations of the parties under this Agreement,
                the parties agree to modify the terms of this Agreement in a
                manner that restores the original balance of the parties&apos;
                rights and obligations to the extent possible and consistent
                with the intent of the Agreement.
              </p>
            </div>
          </section>

          {/* Entire Agreement */}
          <section id="entire-agreement" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              13. ENTIRE AGREEMENT
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                13.1 Entire Agreement
              </h3>
              <p className="text-[#7D7D7D]">
                This Agreement, including all schedules, exhibits, appendices,
                and any documents incorporated herein by reference (such as the
                Privacy Policy and any other policies referenced herein),
                constitutes the complete, final, and exclusive understanding and
                agreement between the parties with respect to the subject matter
                hereof. It supersedes and replaces any prior or contemporaneous
                agreements, representations, understandings, or communications,
                whether written or oral, between the parties concerning the
                subject matter of this Agreement.
              </p>
              <p className="text-[#7D7D7D]">
                The parties acknowledge that they have not relied upon any
                statements, representations, or warranties not expressly set
                forth in this Agreement, and no modification or waiver of any
                term or provision of this Agreement shall be binding unless
                executed in writing and signed by duly authorized
                representatives of both parties.
              </p>
            </div>
          </section>

          {/* Amendments */}
          <section id="amendments" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              14. AMENDMENTS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                14.1 Amendments
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensor expressly reserves the right, at its sole
                discretion, to modify, amend, or update the terms and conditions
                of this Agreement at any time. Any such modification or
                amendment shall become effective upon the Licensor providing
                written notice to the Licensee, either by email, through a
                notification on the Software, or through another method of
                communication deemed appropriate by the Licensor. The Licensee
                agrees to be bound by any such modifications, amendments, or
                updates once they have been duly communicated. The continued use
                of the Software by the Licensee following such notification
                shall constitute the Licensee&apos;s express acceptance of the
                revised terms and conditions, and the Licensee&apos;s agreement
                to be legally bound by them. If the Licensee does not agree to
                any such modification or amendment, the Licensee must
                immediately cease using the Software and may terminate the
                Agreement in accordance with the termination provisions set
                forth herein.
              </p>
            </div>
          </section>

          {/* Support and Maintenance */}
          <section id="support" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              15. SUPPORT AND MAINTENANCE
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                15.1 Support
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensor shall provide customer support services to the
                Licensee in accordance with the terms of the Licensee&apos;s
                selected Subscription plan. Support services may include, but
                are not limited to, email support, telephone support, and access
                to an online knowledge base. The Licensor will make commercially
                reasonable efforts to respond to inquiries, issues, or technical
                problems raised by the Licensee within a reasonable timeframe
                based on the nature and severity of the issue. However, the
                Licensor does not guarantee response times or resolution times,
                and support is provided solely as an adjunct to the Software.
              </p>
              <p className="text-[#7D7D7D]">
                The scope and level of support available to the Licensee may
                vary depending on the Licensee&apos;s Subscription plan, and the
                Licensee acknowledges that higher levels of support may be
                subject to additional fees as outlined in the applicable pricing
                plan. The Licensor reserves the right to modify the availability
                and scope of support services at its sole discretion, provided
                that any such changes shall not materially impair the
                Licensee&apos;s ability to use the Software.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                15.2 Updates and Maintenance
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensor shall provide periodic updates to the Software,
                which may include security patches, bug fixes, performance
                improvements, and feature enhancements, in its sole discretion.
                The Licensee acknowledges that the Licensor is not obligated to
                provide updates or maintenance to the Software, and the
                provision of such updates or maintenance is subject to the
                Licensor&apos;s internal development and maintenance schedule.
              </p>
              <p className="text-[#7D7D7D]">
                Updates shall be made available to the Licensee at no additional
                cost, subject to the terms of the Licensee&apos;s Subscription.
                The Licensee agrees to install updates as soon as reasonably
                possible after they are made available. The Licensor reserves
                the right to modify, discontinue, or limit access to updates,
                features, or functionalities in future versions of the Software,
                provided that such changes do not materially diminish the core
                functionality of the Software that the Licensee is entitled to
                under this Agreement.
              </p>
              <p className="text-[#7D7D7D]">
                The Licensor shall not be liable for any failure of the Licensee
                to properly implement or utilize updates, nor shall the Licensor
                be responsible for any issues that arise due to the
                Licensee&apos;s failure to maintain up-to-date versions of the
                Software.
              </p>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section id="dispute-resolution" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              16. DISPUTE RESOLUTION
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                16.1 Dispute Resolution
              </h3>
              <p className="text-[#7D7D7D]">
                In the event that any dispute, controversy, or claim arises out
                of or in connection with this Agreement, or the breach,
                termination, or validity thereof (a &ldquo;Dispute&rdquo;), the
                parties agree that they will first seek to resolve such Dispute
                through good-faith negotiations. Each party agrees to make
                reasonable efforts to resolve the Dispute amicably, and to
                cooperate with the other party in providing necessary
                information, documentation, and context to assist in the
                resolution of the Dispute.
              </p>
              <p className="text-[#7D7D7D]">
                If the Dispute cannot be resolved through good-faith
                negotiations within a period of thirty (30) days from the date
                that one party provides written notice of the Dispute to the
                other party, the Dispute shall be resolved exclusively through
                binding arbitration, in accordance with the rules of the Ontario
                Arbitration Association then in effect. The arbitration shall be
                conducted by a sole arbitrator, and the seat of arbitration
                shall be in Toronto, Ontario, Canada. The language of the
                arbitration shall be English. The arbitration proceedings shall
                be confidential, and the arbitrator&apos;s decision shall be
                final and binding upon the parties, with no right of appeal
                except as provided under the applicable arbitration laws.
              </p>
              <p className="text-[#7D7D7D]">
                Notwithstanding the foregoing, either party may seek injunctive
                or equitable relief from any court of competent jurisdiction if
                the party believes that immediate relief is necessary to prevent
                irreparable harm. The courts of Ontario, Canada, shall have
                exclusive jurisdiction over any such proceedings for injunctive
                or equitable relief. The Licensee and the Licensor expressly
                agree to submit to the exclusive jurisdiction of the courts of
                Ontario, Canada, for any matters that are not subject to
                arbitration under this provision.
              </p>
            </div>
          </section>

          {/* Notices */}
          <section id="notices" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              17. NOTICES
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                17.1 Notices
              </h3>
              <p className="text-[#7D7D7D]">
                All notices, requests, consents, approvals, or communications
                required or permitted under this Agreement shall be in writing
                and shall be deemed to have been duly given when (a) delivered
                in person, (b) sent by confirmed facsimile or email (with
                receipt confirmation), or (c) sent by a recognized overnight
                courier service (e.g., FedEx, UPS), to the respective contact
                details provided by the parties at the time of registration or
                to such other address or contact details as may be specified by
                either party by written notice to the other.
              </p>
              <p className="text-[#7D7D7D]">
                Notices shall be sent to the Licensor&apos;s and the
                Licensee&apos;s designated contact address or email address as
                specified during the registration or otherwise updated in
                writing by either party. Notices shall be deemed effective upon
                receipt, unless a longer period is specified within this
                Agreement or applicable law.
              </p>
              <p className="text-[#7D7D7D]">
                The Licensee agrees to promptly notify the Licensor of any
                changes to the contact details provided during registration,
                including email address, physical address, and telephone number.
                The Licensor reserves the right to change its contact
                information, provided that such change is communicated to the
                Licensee in writing in accordance with the provisions of this
                section.
              </p>
            </div>
          </section>

          {/* Support and Updates */}
          <section id="support-updates" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              18. SUPPORT AND UPDATES
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                18.1 Updates
              </h3>
              <p className="text-[#7D7D7D]">
                The Licensor shall provide updates, including but not limited to
                security patches, software enhancements, bug fixes, and feature
                upgrades, to the Software in its sole discretion. Such updates
                may be provided automatically through the Software&apos;s web
                platform, or alternatively, via app store updates depending on
                the platform used by the Licensee. The Licensee acknowledges and
                agrees that updates may be mandatory to ensure the continued
                functionality, security, and optimal performance of the
                Software.
              </p>
              <p className="text-[#7D7D7D]">
                The frequency and nature of updates shall be determined by the
                Licensor, and the Licensee agrees to install such updates as
                soon as reasonably practicable after they become available. The
                Licensee further acknowledges that failure to implement updates
                may result in the Software&apos;s reduced functionality or
                exposure to security vulnerabilities. In the event that any
                update results in a material change to the Software&apos;s core
                functionality, the Licensor will provide the Licensee with prior
                notice of such change.
              </p>
              <p className="text-[#7D7D7D]">
                The Licensor shall not be liable for any failure of the Software
                to function correctly or for any disruption of service caused by
                the Licensee&apos;s failure to update the Software in a timely
                manner.
              </p>
            </div>
          </section>

          {/* Execution and Effectiveness */}
          <section id="execution" className="mb-6 lg:mb-8">
            <h2 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-3 lg:mb-4">
              19. EXECUTION AND EFFECTIVENESS
            </h2>
            <div className="text-[14px] sm:text-[16px] text-[#04082C] font-openSans leading-relaxed space-y-3 sm:space-y-4">
              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3">
                19.1 Execution
              </h3>
              <p className="text-[#7D7D7D]">
                This Agreement shall be deemed executed and effective as of the
                date of the Licensee&apos;s acceptance, as indicated by their
                accessing, downloading, installing, or otherwise using the
                Software. The parties acknowledge that they have read,
                understood, and agreed to be bound by the terms and conditions
                of this Agreement, which constitutes the full and entire
                understanding between them with respect to the Software and its
                use.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                19.2 Entire Agreement
              </h3>
              <p className="text-[#7D7D7D]">
                The parties affirm that this Agreement, including any documents
                incorporated by reference herein (such as the Privacy Policy and
                Terms of Service), constitutes the complete and exclusive
                understanding between the parties regarding the Software and
                supersedes all prior and contemporaneous discussions,
                agreements, or communications related to the Software, whether
                oral or written.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                19.3 Counterparts and Electronic Signatures
              </h3>
              <p className="text-[#7D7D7D]">
                This Agreement may be executed in counterparts, each of which
                shall be deemed an original, and all of which together shall
                constitute one and the same instrument. The parties agree that
                the electronic execution of this Agreement, including by means
                of clicking &ldquo;I agree&rdquo; or similar action, shall have
                the same legal effect as an original signature and shall be
                binding upon the parties as if physically executed.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                19.4 Governing Language
              </h3>
              <p className="text-[#7D7D7D]">
                The parties acknowledge and agree that this Agreement is drafted
                in the English language, and that the English language version
                shall prevail in the event of any conflict or inconsistency with
                any translation.
              </p>

              <h3 className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#04082C] font-bold mb-2 lg:mb-3 mt-4 lg:mt-6">
                19.5 Acknowledgement
              </h3>
              <p className="text-[#7D7D7D]">
                By using the Software, the Licensee acknowledges that they have
                had the opportunity to review this Agreement, consult with legal
                counsel, and voluntarily enter into this legally binding
                Agreement.
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

export default EndUserLicenseAgreement;
