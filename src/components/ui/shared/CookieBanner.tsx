"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCookieConsent } from "@/providers/CookieConsentProvider";
import { Switch } from "@/components/ui/switch";

export default function CookieBanner() {
  const {
    consent,
    updateConsent,
    acceptAll,
    rejectAll,
    showConsentBanner,
    setShowConsentBanner,
    userRegion,
  } = useCookieConsent();

  const [showDetails, setShowDetails] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const pathname = usePathname();

  // Check if we're on the home page
  useEffect(() => {
    setIsHomePage(pathname === "/");
  }, [pathname]);

  // Don't render anything if banner shouldn't be shown or not on home page
  if (!showConsentBanner || !isHomePage) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl z-[9999] border-t border-gray-200 w-full sm:mx-auto sm:rounded-2xl sm:border-[1px] sm:max-w-[1200px] sm:w-[95%] sm:left-1/2 sm:transform sm:-translate-x-1/2">
      <div className="p-3 sm:p-4 md:p-6 max-w-none sm:max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:justify-between md:items-start md:gap-6">
          <div className="flex-1 w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-openSans font-semibold mb-2 text-gray-800">
              Cookie Preferences
            </h2>
            <p className="text-xs sm:text-sm font-openSans text-[#333] mb-3 leading-relaxed">
              We use cookies to enhance your browsing experience, serve
              personalized ads or content, and analyze our traffic. By clicking
              &apos;Accept All&apos;, you consent to our use of cookies.{" "}
              {userRegion === "eu" &&
                "For EU residents, your consent is required before we use certain types of cookies."}{" "}
              For more information, please read our{" "}
              <a
                href="/privacy-policy"
                className="text-blue-600 hover:text-blue-800 underline font-medium font-openSans"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms-of-service"
                className="text-blue-600 hover:text-blue-800 underline font-medium font-openSans"
              >
                Terms of service.
              </a>
            </p>

            {showDetails && (
              <div className="mb-3 space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="pr-2 flex-1 min-w-0">
                    <p className="font-medium font-openSans text-sm">
                      Necessary Cookies
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                      Essential for the website to function properly.
                    </p>
                  </div>
                  <Switch
                    checked={consent.necessary}
                    disabled
                    className="data-[state=checked]:bg-blue-600 ml-2 flex-shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <div className="pr-2 flex-1 min-w-0">
                    <p className="font-medium font-openSans text-sm">
                      Analytics Cookies
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <Switch
                    checked={consent.analytics}
                    onCheckedChange={(checked) =>
                      updateConsent("analytics", checked)
                    }
                    className="data-[state=checked]:bg-blue-600 ml-2 flex-shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <div className="pr-2 flex-1 min-w-0">
                    <p className="font-medium font-openSans text-sm">
                      Marketing Cookies
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                      Used to display personalized ads and content.
                    </p>
                  </div>
                  <Switch
                    checked={consent.marketing}
                    onCheckedChange={(checked) =>
                      updateConsent("marketing", checked)
                    }
                    className="data-[state=checked]:bg-blue-600 ml-2 flex-shrink-0"
                  />
                </div>

                <div className="flex items-center justify-between pb-2">
                  <div className="pr-2 flex-1 min-w-0">
                    <p className="font-medium font-openSans text-sm">
                      Preference Cookies
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                      Remember your settings and preferences.
                    </p>
                  </div>
                  <Switch
                    checked={consent.preferences}
                    onCheckedChange={(checked) =>
                      updateConsent("preferences", checked)
                    }
                    className="data-[state=checked]:bg-blue-600 ml-2 flex-shrink-0"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto md:items-end">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs sm:text-sm font-openSans text-blue-600 hover:text-blue-800 underline text-left md:text-right"
            >
              {showDetails ? "Hide Preferences" : "Customize Preferences"}
            </button>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <button
                onClick={rejectAll}
                className="px-3 py-2 text-xs sm:text-sm font-openSans font-semibold bg-gray-200 text-blue-600 rounded-md border border-gray-300 hover:bg-gray-300 transition duration-200 flex items-center justify-center min-h-[36px]"
              >
                Reject All
              </button>
              {showDetails && (
                <button
                  onClick={() => setShowConsentBanner(false)}
                  className="px-3 py-2 text-xs sm:text-sm font-openSans font-semibold bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 flex items-center justify-center min-h-[36px]"
                >
                  Save Preferences
                </button>
              )}
              <button
                onClick={() => {
                  acceptAll();
                  setShowConsentBanner(false);
                }}
                className="px-3 py-2 text-xs sm:text-sm bg-blue-600 font-openSans font-semibold text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center min-h-[36px]"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
