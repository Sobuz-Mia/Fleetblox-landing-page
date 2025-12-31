import { FC, useState } from "react";

type Props = {
  damageIntensity: Record<string, number>; // e.g., { "door-front-left-side": 3, ... }
  className?: string;
};

const CarDiagramSvg: FC<Props> = ({ damageIntensity, className = "" }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    part: "",
    intensity: 0,
  });
  const partKeyMap: Record<string, string> = {
    "Quarter-Panel_Right-Side": "Quarter-Panel_Right-Side",
    "Quarter-Panel_Left-Side": "Quarter-Panel_Left-Side",
    "Fender_Right-Side": "Fender_Right-Side",
    "Fender_Left-Side": "Fender_Left-Side",
    Roof: "Roof",
    "Side-Bumper_Rear-Left-Side": "Side-Bumper_Rear-Left-Side",
    "Side-Bumper_Rear-Right-Side": "Side-Bumper_Rear-Right-Side",
    "Side-Bumper_Front-Right-Side": "Side-Bumper_Front-Right-Side",
    "Side-Bumper_Front-Left-Side": "Side-Bumper_Front-Left-Side",
    Spoiler: "Spoiler",
    Trunk: "Trunk",
    Hood: "Hood",
    "Tail-Light_Right-Side": "Tail-Light_Right-Side",
    "Bumper_Rear-Side": "Bumper_Rear-Side",
    "Bumper_Front-Side": "Bumper_Front-Side",
    "Tail-Light_Left-Side": "Tail-Light_Left-Side",
    "Door_Rear-Right-Side": "Door_Rear-Right-Side",
    "Door_Front-Right-Side": "Door_Front-Right-Side",
    "Door_Rear-Left-Side": "Door_Rear-Left-Side",
    "Door_Front-Left-Side": "Door_Front-Left-Side",
    "Wheel_Front-Right-Side": "Wheel_Front-Right-Side",
    "Wheel_Rear-Right-Side": "Wheel_Rear-Right-Side",
    "Wheel_Front-Left-Side": "Wheel_Front-Left-Side",
    "Wheel_Rear-Left-Side": "Wheel_Rear-Left-Side",
    "Windshield_Front-Side": "Windshield_Front-Side",
    "Windshield_Rear-Side": "Windshield_Rear-Side",
    "Side-Rocker-Panel_Right-Side": "Side-Rocker-Panel_Right-Side",
    "Side-Rocker-Panel_Left-Side": "Side-Rocker-Panel_Left-Side",
    "Window_Front-Right-Side": "Window_Front-Right-Side",
    "Alloy-Rim_Front-Right-Side": "Alloy-Rim_Front-Right-Side",
    "Alloy-Rim_Rear-Right-Side": "Alloy-Rim_Rear-Right-Side",
    "Arch-Panel_Front-Right-Side": "Arch-Panel_Front-Right-Side",
    "Arch-Panel_Rear-Right-Side": "Arch-Panel_Rear-Right-Side",
    "Window_Rear-Right-Side": "Window_Rear-Right-Side",
    "Exterior-Door-Handle_Front-Right-Side":
      "Exterior-Door-Handle_Front-Right-Side",
    "Wiper_Front-Side": "Wiper_Front-Side",
    "Wiper_Rear-Side": "Wiper_Rear-Side",
    "Roof-Rail_Right-Side": "Roof-Rail_Right-Side",
    "Roof-Rail_Left-Side": "Roof-Rail_Left-Side",
    "Molding_Left-Side": "Molding_Left-Side",
    "Molding_Right-Side": "Molding_Right-Side",
    "Exterior-Door-Handle_Rear-Right-Side":
      "Exterior-Door-Handle_Rear-Right-Side",
    "Quarter-Glass_Right-Side": "Quarter-Glass_Right-Side",
    "Window_Front-Left-Side": "Window_Front-Left-Side",
    "Alloy-Rim_Front-Left-Side": "Alloy-Rim_Front-Left-Side",
    "Side-Mirror_Left-Side": "Side-Mirror_Left-Side",
    "Side-Mirror_Right-Side": "Side-Mirror_Right-Side",
    "Alloy-Rim_Rear-Left-Side": "Alloy-Rim_Rear-Left-Side",
    "Arch-Panel_Front-Left-Side": "Arch-Panel_Front-Left-Side",
    "Arch-Panel_Rear-Left-Side": "Arch-Panel_Rear-Left-Side",
    "Window_Rear-Left-Side": "Window_Rear-Left-Side",
    "Exterior-Door-Handle_Front-Left-Side":
      "Exterior-Door-Handle_Front-Left-Side",
    "Exterior-Door-Handle_Rear-Left-Side":
      "Exterior-Door-Handle_Rear-Left-Side",
    "Quarter-Glass_Left-Side": "Quarter-Glass_Left-Side",
    "Head-Light_Right-Side": "Head-Light_Right-Side",
    "Head-Light_Left-Side": "Head-Light_Left-Side",
    "Grille_Front-Side": "Grille_Front-Side",
    "Grille_Rear-Side": "Grille_Rear-Side",
    "Brake-Light": "Brake-Light",
    "License-Plate": "License-Plate",
    "Fuel-Cap": "Fuel-Cap",
    "Logo_Front-Side": "Logo_Front-Side",
    "Logo_Rear-Side": "Logo_Rear-Side",
    "Fog-Light_Rear-Left-Side": "Fog-Light_Rear-Left-Side",
    "Fog-Light_Front-Left-Side": "Fog-Light_Front-Left-Side",
    "Fog-Light_Rear-Right-Side": "Fog-Light_Rear-Right-Side",
    "Fog-Light_Front-Right-Side": "Fog-Light_Front-Right-Side",
    Antenna: "Antenna",
    "Indicator-Light_Right-Side": "Indicator-Light_Right-Side",
    "Indicator-Light_Left-Side": "Indicator-Light_Left-Side",
  };
  const getIntensityForPart = (partId: string): number => {
    const backendKey = partKeyMap[partId] || partId.toLowerCase(); // fallback to lowercase
    return damageIntensity[backendKey] ?? 0;
  };
  const getColorForIntensity = (intensity: number): string => {
    if (intensity === 0) return "#ffffff"; // No damage - light green
    if (intensity === 1) return "#FFE0E0"; // Low - light yellow
    if (intensity === 2) return "#FFC2C2"; // Medium - orange
    if (intensity === 3) return "#FFA3A3"; // High - deep orange
    if (intensity === 4) return "#FF8585"; // High - deep orange
    return "#FF6666"; // Very high (4+) - red
  };
  const getColorForPart = (partId: string): string => {
    const intensity = getIntensityForPart(partId);
    return getColorForIntensity(intensity);
  };
  //   const getDamageForPart = (id) => {
  //     return damageMap.get(id) ? damageMap.get(id) : [];
  //   };

  const showTooltip = (e: React.MouseEvent, partId: string) => {
    const intensity = getIntensityForPart(partId);
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      part: partId,
      intensity,
    });
  };
  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      <svg
        className={`${className}`}
        xmlns="http://www.w3.org/2000/svg"
        width="429"
        height="322"
        viewBox="0 0 429 322"
        fill="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M363.98 82.7018L363.99 82.7015H364C365.513 82.7015 366.61 82.1281 367.344 81.1585C368.092 80.1698 368.5 78.718 368.5 76.9146V54.2015L314.094 54.2031C310.761 55.4947 306.802 56.2028 303 56.2028C287.284 56.2028 274.5 44.0935 274.5 29.1028V26.2028H267.91C267.263 29.5959 266.468 37.7358 267.992 46.1133C268.757 50.3232 272.046 53.9748 275.958 56.8499C279.856 59.7146 284.284 61.7431 287.162 62.7298L287.5 62.8456V63.2028V76.2028V76.2808L287.476 76.3552L277.074 108.848L282.631 113.941C288.706 112.174 297.715 109.231 305.677 102.821C309.358 99.5589 315.372 94.6977 321.476 90.6971C324.529 88.6954 327.616 86.9019 330.452 85.6323C333.263 84.3735 335.885 83.6028 338.002 83.7023L363.98 82.7018Z"
          id="Quarter-Panel_Right-Side"
          fill={getColorForPart("Quarter-Panel_Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Quarter-Panel_Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M363.98 240.001L363.99 240.002H364C365.513 240.002 366.61 240.575 367.344 241.545C368.092 242.533 368.5 243.985 368.5 245.789V268.502L314.094 268.5C310.761 267.208 306.802 266.5 303 266.5C287.284 266.5 274.5 278.61 274.5 293.6V296.5H267.91C267.263 293.107 266.468 284.967 267.992 276.59C268.757 272.38 272.046 268.728 275.958 265.853C279.856 262.988 284.284 260.96 287.162 259.973L287.5 259.858V259.5V246.5V246.425L287.478 246.353L277.562 214.127L282.659 208.567C288.725 210.339 297.724 213.479 305.677 219.882C309.358 223.144 315.372 228.005 321.476 232.006C324.529 234.008 327.616 235.801 330.452 237.071C333.263 238.33 335.885 239.1 338.002 239.001L363.98 240.001Z"
          id="Quarter-Panel_Left-Side"
          fill={getColorForPart("Quarter-Panel_Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Quarter-Panel_Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M146.529 73.6701L146.5 73.5893V73.5037V26H128.001V29.3999C128.001 44.3907 115.216 56.5 99.5006 56.5C93.3312 56.5 87.4843 54.1476 82.8455 51.0039H55.2386L59.8655 62.5676C77.6458 66.4204 115.126 74.0169 122.071 75.0087L122.136 75.0181L122.197 75.0441C125.735 76.5609 129.763 78.9711 132.27 80.5792C134.847 82.2325 137.557 83.9881 140.326 85.7815C145.741 89.2898 151.38 92.9428 156.686 96.2586C164.715 101.276 171.93 105.487 176.421 107.25C176.625 107.33 176.866 107.251 176.992 107.042L180.812 100.679C175.551 97.5707 167.756 92.6467 160.917 87.6447C157.403 85.0744 154.132 82.4765 151.585 80.0887C149.059 77.7211 147.173 75.4963 146.529 73.6701Z"
          id="Fender_Right-Side"
          fill={getColorForPart("Fender_Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Fender_Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M147.029 249.334L147 249.415V249.5V296.504H128.501V293.604C128.501 278.613 115.717 266.504 100.001 266.504C93.8316 266.504 87.9848 268.856 83.3459 272H54.7792L59.8508 260.936C77.6374 257.078 115.626 248.987 122.571 247.995L122.683 247.979L122.778 247.916C127.201 244.967 128.347 244.238 130.26 243.022C130.94 242.591 131.716 242.097 132.77 241.421C140.379 236.539 149.162 230.992 157.176 226.227C165.201 221.455 172.421 217.488 176.918 215.749C177.124 215.669 177.367 215.749 177.492 215.958L181.312 222.325C176.051 225.433 168.256 230.357 161.418 235.359C157.904 237.93 154.633 240.527 152.085 242.915C149.559 245.283 147.674 247.508 147.029 249.334Z"
          id="Fender_Left-Side"
          fill={getColorForPart("Fender_Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Fender_Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M273.5 205.499H273.5H220.5C197.274 205.499 181.442 209.526 176.066 211.92L169.996 207.251L168.505 115.29L176.023 111.06C181.357 113.452 197.212 117.501 220.5 117.501H273.5H273.5C277.274 117.5 285.473 116.444 295.345 111.182L298.604 112.859C303.217 124.577 309.624 159.727 298.551 207.723L294.291 211.268C284.892 206.481 277.139 205.5 273.5 205.499Z"
          id="Roof"
          fill={getColorForPart("Roof")}
          onMouseMove={(e) => showTooltip(e, "Roof")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M370.5 268.453H370.499L313.774 268.4C325.528 275.852 329.998 284.496 330.498 290.452L331.445 298.976L369.473 296.95L369.486 296.949H369.5C372.468 296.949 375 294.118 375 290.453V274.453C375 272.583 374.591 271.076 373.839 270.049C373.103 269.043 372.006 268.453 370.5 268.453Z"
          id="Side-Bumper_Rear-Left-Side"
          fill={getColorForPart("Side-Bumper_Rear-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Side-Bumper_Rear-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M370 53.9453H369.999L314.257 53.9983C319.907 50.3402 323.793 46.0268 326.344 42.1104C329.107 37.8688 330.322 34.0655 330.498 32.0433L330.499 32.0354L330.499 32.0274L330.972 23.4243L368.973 25.4485L368.986 25.4492H369C371.968 25.4492 374.5 28.2808 374.5 31.9453V47.9453C374.5 49.8151 374.091 51.3229 373.339 52.3497C372.603 53.3558 371.506 53.9453 370 53.9453Z"
          id="Side-Bumper_Rear-Right-Side"
          fill={getColorForPart("Side-Bumper_Rear-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Side-Bumper_Rear-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M55.0234 51H84.9597C81.3669 48.3091 74.3098 42.2386 72.5105 33.602L72.5017 33.5595L72.5003 33.5161L72.0159 18.5023H44.7305C40.7765 23.1875 38.5 30.2475 38.5 38.813C38.5 42.5721 38.6205 46.4202 39.396 49.5349L55.0234 51Z"
          id="Side-Bumper_Front-Right-Side"
          fill={getColorForPart("Side-Bumper_Front-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Side-Bumper_Front-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M55.0234 272H84.9597C81.3669 274.691 74.3098 280.761 72.5105 289.398L72.5017 289.441L72.5003 289.484L72.0159 304.498H44.7305C40.7765 299.813 38.5 292.753 38.5 284.187C38.5 280.428 38.6205 276.58 39.396 273.465L55.0234 272Z"
          id="Side-Bumper_Front-Left-Side"
          fill={getColorForPart("Side-Bumper_Front-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Side-Bumper_Front-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M369.458 108.81V213.68C369.458 215.679 368.952 217.103 368.168 218.134C367.382 219.168 366.28 219.85 365.013 220.3C362.777 221.093 360.136 221.131 358.026 221.163C357.897 221.164 357.769 221.166 357.644 221.168L357.646 101.322C357.772 101.324 357.901 101.326 358.032 101.328C360.141 101.36 362.779 101.399 365.013 102.192C366.281 102.641 367.382 103.323 368.169 104.357C368.952 105.388 369.458 106.812 369.458 108.81Z"
          id="Spoiler"
          fill={getColorForPart("Spoiler")}
          onMouseMove={(e) => showTooltip(e, "Spoiler")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M362.5 108.778V213.221C362.5 217.333 359.595 220.594 356.074 220.686L325.502 221.487L325.899 100.513L356.076 101.313C359.596 101.406 362.5 104.667 362.5 108.778Z"
          id="Trunk"
          fill={getColorForPart("Trunk")}
          onMouseMove={(e) => showTooltip(e, "Trunk")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M45.5 196.809V125.783C45.5 114.715 53.8874 105.459 64.9023 104.395C86.8873 102.273 120.182 99.0865 127.5 98.5374V225.439L64.5334 218.167C53.6857 216.914 45.5 207.729 45.5 196.809Z"
          id="Hood"
          fill={getColorForPart("Hood")}
          onMouseMove={(e) => showTooltip(e, "Hood")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M389.905 99.336V130.082C389.905 131.341 388.346 132.152 387.219 131.4C382.881 128.503 377.955 126.299 374.538 125.052C373.915 124.825 373.5 124.245 373.5 123.599V99.044C373.5 98.2028 374.192 97.5261 375.033 97.5444L388.438 97.8363C389.253 97.8541 389.905 98.5203 389.905 99.336Z"
          id="Tail-Light_Right-Side"
          fill={getColorForPart("Tail-Light_Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Tail-Light_Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M401.995 225.071L402.077 224.5H401.5H395V205.5V119V98.5H401.5H402V98C402 97.6352 402.096 97.0546 402.288 96.3908C402.827 94.5294 404.884 93.7707 407.042 94.179L419.655 96.5653C420.445 96.7146 421.244 96.7311 422 96.741C422.043 96.7416 422.086 96.7421 422.128 96.7426C422.85 96.7517 423.532 96.7603 424.197 96.8604C426.574 97.2176 428.5 99.2645 428.5 101.861V221.254C428.5 224.106 426.298 226.36 423.616 226.594C423.149 226.635 422.678 226.636 422.182 226.638C422.122 226.638 422.061 226.638 421.999 226.638C421.446 226.641 420.863 226.649 420.281 226.728L405.571 228.716C404.915 228.804 404.254 228.795 403.704 228.636C403.164 228.479 402.753 228.188 402.519 227.713C402.054 226.771 401.91 225.665 401.995 225.071Z"
          id="Bumper_Rear-Side"
          fill={getColorForPart("Bumper_Rear-Side")}
          onMouseMove={(e) => showTooltip(e, "Bumper_Rear-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M0.5 101.446V221.322C0.5 225.093 3.29919 228.277 7.03852 228.76L27.1359 231.358C27.435 231.397 27.7 231.164 27.7 230.862V222.486V98.5V90.9406C27.7 90.8628 27.6832 90.8204 27.6704 90.7981C27.6576 90.7758 27.637 90.753 27.599 90.7314C27.5143 90.683 27.3495 90.6473 27.1185 90.6855L6.77735 94.0465C3.15619 94.6448 0.5 97.7759 0.5 101.446Z"
          id="Bumper_Front-Side"
          fill={getColorForPart("Bumper_Front-Side")}
          onMouseMove={(e) => showTooltip(e, "Bumper_Front-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M390.5 223V191.838C390.5 190.638 389.115 189.868 388.039 190.517C382.906 193.613 377.705 195.735 374.045 197.007C373.421 197.224 373.003 197.806 373.006 198.456L373.098 223.006C373.102 223.832 373.772 224.5 374.598 224.5H389C389.828 224.5 390.5 223.828 390.5 223Z"
          id="Tail-Light_Left-Side"
          fill={getColorForPart("Tail-Light_Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Tail-Light_Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M270.499 26H217.978C217.484 38.7401 217.025 66.6514 218.991 80.4248L223.923 111H279.15L291.497 77.9098V61.8003C291.388 61.7424 291.278 61.684 291.167 61.6249C287.471 59.6628 282.454 56.9996 278.296 51.8776C273.957 46.5324 270.586 38.5562 270.499 26Z"
          id="Door_Rear-Right-Side"
          fill={getColorForPart("Door_Rear-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Door_Rear-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M211.956 111H223.913L219.006 80.5796L219.006 80.5796L219.005 80.5707C217.025 66.7099 217.487 38.7487 217.98 26H143C142.575 26 141.84 26.2258 141.201 27.0148C140.564 27.8011 140 29.1782 140 31.5C140 35.7368 140.26 54.3354 140.436 66.8895C140.459 68.5447 140.481 70.0948 140.5 71.4931L140.5 71.5215L140.498 71.5498C140.43 72.2252 140.618 73.6099 142.168 75.976C143.716 78.3384 146.595 81.6368 151.825 86.1204C163.143 95.8212 186.649 108.506 211.956 111Z"
          id="Door_Front-Right-Side"
          fill={getColorForPart("Door_Front-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Door_Front-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M270.502 297H217.981C217.487 284.26 217.028 256.349 218.994 242.575L223.926 212H279.153L291.5 245.09V261.2C291.391 261.258 291.281 261.316 291.17 261.375C287.474 263.337 282.457 266 278.299 271.122C273.96 276.468 270.589 284.444 270.502 297Z"
          id="Door_Rear-Left-Side"
          fill={getColorForPart("Door_Rear-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Door_Rear-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M211.956 212H223.913L219.006 242.42L219.006 242.42L219.005 242.429C217.025 256.29 217.487 284.251 217.98 297H143C142.575 297 141.84 296.774 141.201 295.985C140.564 295.199 140 293.822 140 291.5C140 287.263 140.26 268.665 140.436 256.11C140.459 254.455 140.481 252.905 140.5 251.507L140.5 251.479L140.498 251.45C140.43 250.775 140.618 249.39 142.168 247.024C143.716 244.662 146.595 241.363 151.825 236.88C163.143 227.179 186.649 214.494 211.956 212Z"
          id="Door_Front-Left-Side"
          fill={getColorForPart("Door_Front-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Door_Front-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <circle
          cx="100"
          cy="25"
          r="24.5"
          id="Wheel_Front-Right-Side"
          fill={getColorForPart("Wheel_Front-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Wheel_Front-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <circle
          cx="303"
          cy="25"
          r="24.5"
          id="Wheel_Rear-Right-Side"
          fill={getColorForPart("Wheel_Rear-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Wheel_Rear-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <circle
          cx="25"
          cy="25"
          r="24.5"
          transform="matrix(1 0 0 -1 75 322)"
          id="Wheel_Front-Left-Side"
          fill={getColorForPart("Wheel_Front-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Wheel_Front-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <circle
          cx="25"
          cy="25"
          r="24.5"
          transform="matrix(1 0 0 -1 278 322)"
          id="Wheel_Rear-Left-Side"
          fill={getColorForPart("Wheel_Rear-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Wheel_Rear-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M112.999 142H113L112.999 141.988C112.836 135.457 115.445 117.581 127.228 98.5789L174.941 111.368C173.112 124.308 170.662 161.798 174.966 212.625L127.193 225.431C122.52 219.261 113.393 201.744 112.999 178.996V142Z"
          id="Windshield_Front-Side"
          fill={getColorForPart("Windshield_Front-Side")}
          onMouseMove={(e) => showTooltip(e, "Windshield_Front-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M294.622 211.238C294.62 211.237 294.618 211.236 294.616 211.235C300.525 193.511 302.121 173.374 301.562 155.235C301.007 137.227 298.327 121.154 295.607 111.315L310.667 105.971L325.674 100.646C331.122 118.76 338.526 167.498 325.629 221.901C325.34 221.834 324.931 221.738 324.426 221.617C323.374 221.366 321.906 221.008 320.241 220.582C316.908 219.73 312.8 218.61 309.663 217.527C306.581 216.464 302.721 214.846 299.624 213.489C298.077 212.812 296.724 212.201 295.757 211.76C295.274 211.539 294.887 211.361 294.622 211.238Z"
          id="Windshield_Rear-Side"
          fill={getColorForPart("Windshield_Rear-Side")}
          onMouseMove={(e) => showTooltip(e, "Windshield_Rear-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M275 19.5H128V26.0294H275V19.5Z"
          id="Side-Rocker-Panel_Right-Side"
          fill={getColorForPart("Side-Rocker-Panel_Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Side-Rocker-Panel_Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M275 303.5H128V296.971H275V303.5Z"
          id="Side-Rocker-Panel_Left-Side"
          fill={getColorForPart("Side-Rocker-Panel_Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Side-Rocker-Panel_Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M147.147 78.0254L213.59 79.4911L219.388 108H210.532C197.716 106.352 166.571 99.203 147.147 78.0254Z"
          id="Window_Front-Right-Side"
          fill={getColorForPart("Window_Front-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Window_Front-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M118 25C118 34.9411 109.941 43 100 43C90.0589 43 82 34.9411 82 25C82 15.0589 90.0589 7 100 7C109.941 7 118 15.0589 118 25Z"
          fill="white"
        />
        <path
          d="M96 8L99.0385 18.6347C99.3148 19.6017 100.685 19.6017 100.962 18.6347L104 8M96 42L99.0385 31.3653C99.3148 30.3983 100.685 30.3983 100.962 31.3653L104 42M83.2783 19.9688L94.0074 22.6547C94.9831 22.8989 95.6683 21.7121 94.969 20.9893L87.2783 13.0405M112.723 36.9688L105.033 29.02C104.333 28.2972 105.018 27.1104 105.994 27.3546L116.723 30.0405M87.2783 36.9688L94.969 29.02C95.6683 28.2972 94.9831 27.1104 94.0074 27.3546L83.2783 30.0405M116.723 19.9688L105.994 22.6547C105.018 22.8989 104.333 21.7121 105.033 20.9893L112.723 13.0405M118 25C118 34.9411 109.941 43 100 43C90.0589 43 82 34.9411 82 25C82 15.0589 90.0589 7 100 7C109.941 7 118 15.0589 118 25Z"
          stroke="#6F6464"
          id="Alloy-Rim_Front-Right-Side"
          fill={getColorForPart("Alloy-Rim_Front-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Alloy-Rim_Front-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
        />
        <path
          d="M321 25C321 34.9411 312.941 43 303 43C293.059 43 285 34.9411 285 25C285 15.0589 293.059 7 303 7C312.941 7 321 15.0589 321 25Z"
          fill="white"
        />
        <path
          d="M299 8L302.038 18.6347C302.315 19.6017 303.685 19.6017 303.962 18.6347L307 8M299 42L302.038 31.3653C302.315 30.3983 303.685 30.3983 303.962 31.3653L307 42M286.278 19.9688L297.007 22.6547C297.983 22.8989 298.668 21.7121 297.969 20.9893L290.278 13.0405M315.723 36.9688L308.033 29.02C307.333 28.2972 308.018 27.1104 308.994 27.3546L319.723 30.0405M290.278 36.9688L297.969 29.02C298.668 28.2972 297.983 27.1104 297.007 27.3546L286.278 30.0405M319.723 19.9688L308.994 22.6547C308.018 22.8989 307.333 21.7121 308.033 20.9893L315.723 13.0405M321 25C321 34.9411 312.941 43 303 43C293.059 43 285 34.9411 285 25C285 15.0589 293.059 7 303 7C312.941 7 321 15.0589 321 25Z"
          stroke="#6F6464"
          id="Alloy-Rim_Rear-Right-Side"
          fill={getColorForPart("Alloy-Rim_Rear-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Alloy-Rim_Rear-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
        />
        <path
          d="M100 56.5C113.641 56.5 124.93 47.0853 127.117 34.7646C123.407 45.6483 112.654 53.4984 100 53.4984C87.3465 53.4984 76.5932 45.6483 72.8832 34.7646C75.0703 47.0853 86.3594 56.5 100 56.5Z"
          id="Arch-Panel_Front-Right-Side"
          fill={getColorForPart("Arch-Panel_Front-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Arch-Panel_Front-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M303 56.5C316.641 56.5 327.93 47.0853 330.117 34.7646C326.407 45.6483 315.654 53.4984 303 53.4984C290.346 53.4984 279.593 45.6483 275.883 34.7646C278.07 47.0853 289.359 56.5 303 56.5Z"
          id="Arch-Panel_Rear-Right-Side"
          fill={getColorForPart("Arch-Panel_Rear-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Arch-Panel_Rear-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M277.651 108H227.467L225.536 80.0042L287.785 80.4944L277.651 108Z"
          id="Window_Rear-Right-Side"
          fill={getColorForPart("Window_Rear-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Window_Rear-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M211.501 68.9896C211.501 68.9896 211.501 68.9905 211.501 68.9922C211.501 68.9905 211.501 68.9896 211.501 68.9896ZM211.449 68.9356C211.478 68.9672 211.492 68.9885 211.497 69C211.492 69.0115 211.478 69.0328 211.449 69.0644C211.383 69.1369 211.26 69.2308 211.06 69.3359C210.661 69.5454 210.051 69.7493 209.255 69.9261C207.672 70.278 205.46 70.5 203 70.5C200.54 70.5 198.328 70.278 196.745 69.9261C195.949 69.7493 195.339 69.5454 194.94 69.3359C194.74 69.2308 194.617 69.1369 194.551 69.0644C194.522 69.0328 194.508 69.0115 194.503 69C194.508 68.9885 194.522 68.9672 194.551 68.9356C194.617 68.8631 194.74 68.7692 194.94 68.6641C195.339 68.4546 195.949 68.2507 196.745 68.0739C198.328 67.722 200.54 67.5 203 67.5C205.46 67.5 207.672 67.722 209.255 68.0739C210.051 68.2507 210.661 68.4546 211.06 68.6641C211.26 68.7692 211.383 68.8631 211.449 68.9356ZM194.499 68.9896C194.499 68.9896 194.499 68.9905 194.499 68.9922C194.499 68.9905 194.499 68.9896 194.499 68.9896ZM194.499 69.0104C194.499 69.0104 194.499 69.0095 194.499 69.0078C194.499 69.0095 194.499 69.0104 194.499 69.0104ZM211.501 69.0078C211.501 69.0095 211.501 69.0104 211.501 69.0104C211.501 69.0104 211.501 69.0095 211.501 69.0078Z"
          id="Exterior-Door-Handle_Front-Right-Side"
          fill={getColorForPart("Exterior-Door-Handle_Front-Right-Side")}
          onMouseMove={(e) =>
            showTooltip(e, "Exterior-Door-Handle_Front-Right-Side")
          }
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M118.955 179.496C118.99 179.826 118.677 180.279 118.039 180.346C117.401 180.413 117.001 180.035 116.966 179.705L113.046 142.41C113.012 142.079 113.325 141.627 113.963 141.56C114.601 141.493 115.001 141.87 115.035 142.201L118.955 179.496Z"
          id="Wiper_Front-Side"
          fill={getColorForPart("Wiper_Front-Side")}
          onMouseMove={(e) => showTooltip(e, "Wiper_Front-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M332.056 179.496C332.091 179.826 331.778 180.279 331.14 180.346C330.502 180.413 330.102 180.035 330.067 179.705L326.147 142.41C326.112 142.079 326.425 141.627 327.063 141.56C327.701 141.493 328.101 141.87 328.136 142.201L332.056 179.496Z"
          id="Wiper_Rear-Side"
          fill={getColorForPart("Wiper_Rear-Side")}
          onMouseMove={(e) => showTooltip(e, "Wiper_Rear-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M197.5 127.5C196.885 127.5 196.352 127.349 195.989 127.132C195.617 126.909 195.5 126.67 195.5 126.5C195.5 126.33 195.617 126.091 195.989 125.868C196.352 125.651 196.885 125.5 197.5 125.5H272.5C273.115 125.5 273.648 125.651 274.011 125.868C274.383 126.091 274.5 126.33 274.5 126.5C274.5 126.67 274.383 126.909 274.011 127.132C273.648 127.349 273.115 127.5 272.5 127.5H197.5Z"
          id="Roof-Rail_Right-Side"
          fill={getColorForPart("Roof-Rail_Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Roof-Rail_Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M197.5 197.5C196.885 197.5 196.352 197.349 195.989 197.132C195.617 196.909 195.5 196.67 195.5 196.5C195.5 196.33 195.617 196.091 195.989 195.868C196.352 195.651 196.885 195.5 197.5 195.5H272.5C273.115 195.5 273.648 195.651 274.011 195.868C274.383 196.091 274.5 196.33 274.5 196.5C274.5 196.67 274.383 196.909 274.011 197.132C273.648 197.349 273.115 197.5 272.5 197.5H197.5Z"
          id="Roof-Rail_Left-Side"
          fill={getColorForPart("Roof-Rail_Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Roof-Rail_Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M145.25 268.5C144.714 268.5 144.251 268.354 143.936 268.145C143.619 267.933 143.5 267.695 143.5 267.5C143.5 267.305 143.619 267.067 143.936 266.855C144.251 266.646 144.714 266.5 145.25 266.5H212.75C213.286 266.5 213.749 266.646 214.064 266.855C214.381 267.067 214.5 267.305 214.5 267.5C214.5 267.695 214.381 267.933 214.064 268.145C213.749 268.354 213.286 268.5 212.75 268.5H145.25ZM222.781 268.5C221.99 268.5 221.5 267.975 221.5 267.5C221.5 267.025 221.99 266.5 222.781 266.5H276.219C277.01 266.5 277.5 267.025 277.5 267.5C277.5 267.975 277.01 268.5 276.219 268.5H222.781Z"
          id="Molding_Left-Side"
          fill={getColorForPart("Molding_Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Molding_Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M145.25 56.5C144.714 56.5 144.251 56.3542 143.936 56.1446C143.619 55.9328 143.5 55.695 143.5 55.5C143.5 55.305 143.619 55.0672 143.936 54.8554C144.251 54.6458 144.714 54.5 145.25 54.5H212.75C213.286 54.5 213.749 54.6458 214.064 54.8554C214.381 55.0672 214.5 55.305 214.5 55.5C214.5 55.695 214.381 55.9328 214.064 56.1446C213.749 56.3542 213.286 56.5 212.75 56.5H145.25ZM222.781 56.5C221.99 56.5 221.5 55.9752 221.5 55.5C221.5 55.0248 221.99 54.5 222.781 54.5H276.219C277.01 54.5 277.5 55.0248 277.5 55.5C277.5 55.9752 277.01 56.5 276.219 56.5H222.781Z"
          id="Molding_Right-Side"
          fill={getColorForPart("Molding_Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Molding_Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M286.501 68.9896C286.501 68.9896 286.501 68.9905 286.501 68.9922C286.501 68.9905 286.501 68.9896 286.501 68.9896ZM286.449 68.9356C286.478 68.9672 286.492 68.9885 286.497 69C286.492 69.0115 286.478 69.0328 286.449 69.0644C286.383 69.1369 286.26 69.2308 286.06 69.3359C285.661 69.5454 285.051 69.7493 284.255 69.9261C282.672 70.278 280.46 70.5 278 70.5C275.54 70.5 273.328 70.278 271.745 69.9261C270.949 69.7493 270.339 69.5454 269.94 69.3359C269.74 69.2308 269.617 69.1369 269.551 69.0644C269.522 69.0328 269.508 69.0115 269.503 69C269.508 68.9885 269.522 68.9672 269.551 68.9356C269.617 68.8631 269.74 68.7692 269.94 68.6641C270.339 68.4546 270.949 68.2507 271.745 68.0739C273.328 67.722 275.54 67.5 278 67.5C280.46 67.5 282.672 67.722 284.255 68.0739C285.051 68.2507 285.661 68.4546 286.06 68.6641C286.26 68.7692 286.383 68.8631 286.449 68.9356ZM269.499 68.9896C269.499 68.9896 269.499 68.9905 269.499 68.9922C269.499 68.9905 269.499 68.9896 269.499 68.9896ZM269.499 69.0104C269.499 69.0104 269.499 69.0095 269.499 69.0078C269.499 69.0095 269.499 69.0104 269.499 69.0104ZM286.501 69.0078C286.501 69.0095 286.501 69.0104 286.501 69.0104C286.501 69.0104 286.501 69.0095 286.501 69.0078Z"
          id="Exterior-Door-Handle_Rear-Right-Side"
          fill={getColorForPart("Exterior-Door-Handle_Rear-Right-Side")}
          onMouseMove={(e) =>
            showTooltip(e, "Exterior-Door-Handle_Rear-Right-Side")
          }
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M314.035 85.6346C307.973 92.7824 298.02 102.304 286.399 107.56L296.843 80.5H311.474C314.304 80.5 315.801 83.5528 314.035 85.6346Z"
          id="Quarter-Glass_Right-Side"
          fill={getColorForPart("Quarter-Glass_Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Quarter-Glass_Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M147.147 244.975L213.59 243.509L219.388 215H210.532C197.716 216.648 166.571 223.797 147.147 244.975Z"
          id="Window_Front-Left-Side"
          fill={getColorForPart("Window_Front-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Window_Front-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M118 297C118 306.941 109.941 315 100 315C90.0589 315 82 306.941 82 297C82 287.059 90.0589 279 100 279C109.941 279 118 287.059 118 297Z"
          fill="white"
        />
        <path
          d="M96 280L99.0385 290.635C99.3148 291.602 100.685 291.602 100.962 290.635L104 280M96 314L99.0385 303.365C99.3148 302.398 100.685 302.398 100.962 303.365L104 314M83.2783 291.969L94.0074 294.655C94.9831 294.899 95.6683 293.712 94.969 292.989L87.2783 285.041M112.723 308.969L105.033 301.02C104.333 300.297 105.018 299.11 105.994 299.355L116.723 302.041M87.2783 308.969L94.969 301.02C95.6683 300.297 94.9831 299.11 94.0074 299.355L83.2783 302.041M116.723 291.969L105.994 294.655C105.018 294.899 104.333 293.712 105.033 292.989L112.723 285.041M118 297C118 306.941 109.941 315 100 315C90.0589 315 82 306.941 82 297C82 287.059 90.0589 279 100 279C109.941 279 118 287.059 118 297Z"
          stroke="#6F6464"
          id="Alloy-Rim_Front-Left-Side"
          fill={getColorForPart("Alloy-Rim_Front-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Alloy-Rim_Front-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
        />
        <path
          d="M151.034 244.877C153.916 241.684 157.129 238.896 160.51 236.467C161.777 235.557 163.427 235.699 164.161 236.857C165.745 239.357 165.808 242.294 164.952 244.057C164.801 244.368 164.435 244.574 163.967 244.584L151.034 244.877Z"
          id="Side-Mirror_Left-Side"
          fill={getColorForPart("Side-Mirror_Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Side-Mirror_Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M151.034 78.1233C153.916 81.3163 157.129 84.1036 160.51 86.5326C161.777 87.443 163.427 87.301 164.161 86.1433C165.745 83.6432 165.808 80.7056 164.952 78.9427C164.801 78.6316 164.435 78.4264 163.967 78.4158L151.034 78.1233Z"
          id="Side-Mirror_Right-Side"
          fill={getColorForPart("Side-Mirror_Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Side-Mirror_Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M321 297C321 306.941 312.941 315 303 315C293.059 315 285 306.941 285 297C285 287.059 293.059 279 303 279C312.941 279 321 287.059 321 297Z"
          fill="white"
        />
        <path
          d="M299 280L302.038 290.635C302.315 291.602 303.685 291.602 303.962 290.635L307 280M299 314L302.038 303.365C302.315 302.398 303.685 302.398 303.962 303.365L307 314M286.278 291.969L297.007 294.655C297.983 294.899 298.668 293.712 297.969 292.989L290.278 285.041M315.723 308.969L308.033 301.02C307.333 300.297 308.018 299.11 308.994 299.355L319.723 302.041M290.278 308.969L297.969 301.02C298.668 300.297 297.983 299.11 297.007 299.355L286.278 302.041M319.723 291.969L308.994 294.655C308.018 294.899 307.333 293.712 308.033 292.989L315.723 285.041M321 297C321 306.941 312.941 315 303 315C293.059 315 285 306.941 285 297C285 287.059 293.059 279 303 279C312.941 279 321 287.059 321 297Z"
          id="Alloy-Rim_Rear-Left-Side"
          fill={getColorForPart("Alloy-Rim_Rear-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Alloy-Rim_Rear-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M100 265.5C113.633 265.5 124.948 275.42 127.123 288.435C123.422 276.99 112.678 268.712 100 268.712C87.3225 268.712 76.5783 276.99 72.8772 288.435C75.0517 275.42 86.3674 265.5 100 265.5Z"
          id="Arch-Panel_Front-Left-Side"
          fill={getColorForPart("Arch-Panel_Front-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Arch-Panel_Front-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M303 264.5C316.628 264.5 327.957 274.672 330.125 288.034C326.428 276.308 315.689 267.817 303 267.817C290.311 267.817 279.572 276.308 275.875 288.034C278.043 274.672 289.372 264.5 303 264.5Z"
          id="Arch-Panel_Rear-Left-Side"
          fill={getColorForPart("Arch-Panel_Rear-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Arch-Panel_Rear-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M277.651 215H227.467L225.536 242.996L287.785 242.506L277.651 215Z"
          id="Window_Rear-Left-Side"
          fill={getColorForPart("Window_Rear-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Window_Rear-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M211.501 254.01C211.501 254.01 211.501 254.01 211.501 254.008C211.501 254.01 211.501 254.01 211.501 254.01ZM211.449 254.064C211.478 254.033 211.492 254.012 211.497 254C211.492 253.988 211.478 253.967 211.449 253.936C211.383 253.863 211.26 253.769 211.06 253.664C210.661 253.455 210.051 253.251 209.255 253.074C207.672 252.722 205.46 252.5 203 252.5C200.54 252.5 198.328 252.722 196.745 253.074C195.949 253.251 195.339 253.455 194.94 253.664C194.74 253.769 194.617 253.863 194.551 253.936C194.522 253.967 194.508 253.988 194.503 254C194.508 254.012 194.522 254.033 194.551 254.064C194.617 254.137 194.74 254.231 194.94 254.336C195.339 254.545 195.949 254.749 196.745 254.926C198.328 255.278 200.54 255.5 203 255.5C205.46 255.5 207.672 255.278 209.255 254.926C210.051 254.749 210.661 254.545 211.06 254.336C211.26 254.231 211.383 254.137 211.449 254.064ZM194.499 254.01C194.499 254.01 194.499 254.01 194.499 254.008C194.499 254.01 194.499 254.01 194.499 254.01ZM194.499 253.99C194.499 253.99 194.499 253.99 194.499 253.992C194.499 253.99 194.499 253.99 194.499 253.99ZM211.501 253.992C211.501 253.99 211.501 253.99 211.501 253.99C211.501 253.99 211.501 253.99 211.501 253.992Z"
          id="Exterior-Door-Handle_Front-Left-Side"
          fill={getColorForPart("Exterior-Door-Handle_Front-Left-Side")}
          onMouseMove={(e) =>
            showTooltip(e, "Exterior-Door-Handle_Front-Left-Side")
          }
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M286.501 254.01C286.501 254.01 286.501 254.01 286.501 254.008C286.501 254.01 286.501 254.01 286.501 254.01ZM286.449 254.064C286.478 254.033 286.492 254.012 286.497 254C286.492 253.988 286.478 253.967 286.449 253.936C286.383 253.863 286.26 253.769 286.06 253.664C285.661 253.455 285.051 253.251 284.255 253.074C282.672 252.722 280.46 252.5 278 252.5C275.54 252.5 273.328 252.722 271.745 253.074C270.949 253.251 270.339 253.455 269.94 253.664C269.74 253.769 269.617 253.863 269.551 253.936C269.522 253.967 269.508 253.988 269.503 254C269.508 254.012 269.522 254.033 269.551 254.064C269.617 254.137 269.74 254.231 269.94 254.336C270.339 254.545 270.949 254.749 271.745 254.926C273.328 255.278 275.54 255.5 278 255.5C280.46 255.5 282.672 255.278 284.255 254.926C285.051 254.749 285.661 254.545 286.06 254.336C286.26 254.231 286.383 254.137 286.449 254.064ZM269.499 254.01C269.499 254.01 269.499 254.01 269.499 254.008C269.499 254.01 269.499 254.01 269.499 254.01ZM269.499 253.99C269.499 253.99 269.499 253.99 269.499 253.992C269.499 253.99 269.499 253.99 269.499 253.99ZM286.501 253.992C286.501 253.99 286.501 253.99 286.501 253.99C286.501 253.99 286.501 253.99 286.501 253.992Z"
          id="Exterior-Door-Handle_Rear-Left-Side"
          fill={getColorForPart("Exterior-Door-Handle_Rear-Left-Side")}
          onMouseMove={(e) =>
            showTooltip(e, "Exterior-Door-Handle_Rear-Left-Side")
          }
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M314.035 237.365C307.973 230.218 298.02 220.696 286.399 215.44L296.843 242.5H311.474C314.304 242.5 315.801 239.447 314.035 237.365Z"
          id="Quarter-Glass_Left-Side"
          fill={getColorForPart("Quarter-Glass_Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Quarter-Glass_Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M43.0996 89.2682V117.368C38.4964 121.193 35.8487 121.371 34.3992 120.787C33.0496 120.243 32.5102 118.985 32.3082 118.514C32.3054 118.507 32.3025 118.5 32.2998 118.494V89.8628C32.4671 89.8311 32.6765 89.7889 32.9205 89.7379C33.4936 89.6183 34.2667 89.4483 35.1527 89.2463C36.9248 88.8422 39.1558 88.3082 41.1535 87.7886C42.1358 87.533 43.0996 88.271 43.0996 89.2682Z"
          id="Head-Light_Right-Side"
          fill={getColorForPart("Head-Light_Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Head-Light_Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M43.0996 232.333V204.234C38.4964 200.409 35.8487 200.23 34.3992 200.815C33.0496 201.359 32.5102 202.617 32.3082 203.088C32.3054 203.095 32.3025 203.101 32.2998 203.108V231.739C32.4671 231.771 32.6765 231.813 32.9205 231.864C33.4936 231.983 34.2667 232.153 35.1527 232.355C36.9248 232.759 39.1558 233.293 41.1535 233.813C42.1358 234.069 43.0996 233.331 43.0996 232.333Z"
          id="Head-Light_Left-Side"
          fill={getColorForPart("Head-Light_Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Head-Light_Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M16.0615 139.029C20.6453 136.6 28.0392 134.372 39.5 133.537V188.473C34.3707 188.183 26.9687 187.2 20.7817 185.158C17.5789 184.101 14.7367 182.771 12.7044 181.133C10.6774 179.499 9.5 177.598 9.5 175.378V145.649C9.73261 144.113 11.4163 141.491 16.0615 139.029Z"
          id="Grille_Front-Side"
          fill={getColorForPart("Grille_Front-Side")}
          onMouseMove={(e) => showTooltip(e, "Grille_Front-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M400.039 136.973C398.375 135.603 395.69 134.402 391.5 133.6V188.421C393.417 188.097 396.045 187.283 398.266 186.104C399.488 185.455 400.561 184.709 401.322 183.895C402.084 183.082 402.5 182.238 402.5 181.378V141.626C402.409 139.999 401.756 138.387 400.039 136.973Z"
          id="Grille_Rear-Side"
          fill={getColorForPart("Grille_Rear-Side")}
          onMouseMove={(e) => showTooltip(e, "Grille_Rear-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M301.562 173.413C302.316 173.298 303.203 173.133 303.961 172.852C304.985 172.473 305.5 171.991 305.5 171.39V151.083C305.482 150.733 305.411 150.469 305.287 150.252C305.162 150.034 304.964 149.828 304.637 149.627C304.033 149.257 303.057 148.942 301.501 148.613C301.509 150.707 301.553 153.391 301.599 156.247C301.631 158.17 301.664 160.17 301.687 162.119C301.744 166.746 301.751 171.113 301.562 173.413Z"
          id="Brake-Light"
          fill={getColorForPart("Brake-Light")}
          onMouseMove={(e) => showTooltip(e, "Brake-Light")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M410.5 147C410.5 146.172 411.172 145.5 412 145.5H423C423.828 145.5 424.5 146.172 424.5 147V175C424.5 175.828 423.828 176.5 423 176.5H412C411.172 176.5 410.5 175.828 410.5 175V147Z"
          id="License-Plate"
          fill={getColorForPart("License-Plate")}
          onMouseMove={(e) => showTooltip(e, "License-Plate")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M299.5 248C299.5 247.172 300.172 246.5 301 246.5H310C310.828 246.5 311.5 247.172 311.5 248V256C311.5 256.828 310.828 257.5 310 257.5H301C300.172 257.5 299.5 256.828 299.5 256V248Z"
          id="Fuel-Cap"
          fill={getColorForPart("Fuel-Cap")}
          onMouseMove={(e) => showTooltip(e, "Fuel-Cap")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M49.1102 163.061C48.5245 162.475 48.5245 161.525 49.1102 160.94L51.9387 158.111C52.5245 157.525 53.4742 157.525 54.06 158.111L56.8884 160.94C57.4742 161.525 57.4742 162.475 56.8884 163.061L54.06 165.889C53.4742 166.475 52.5245 166.475 51.9387 165.889L49.1102 163.061Z"
          id="Logo_Front-Side"
          fill={getColorForPart("Logo_Front-Side")}
          onMouseMove={(e) => showTooltip(e, "Logo_Front-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M374.767 162.061C374.182 161.475 374.182 160.525 374.767 159.94L377.596 157.111C378.182 156.525 379.131 156.525 379.717 157.111L382.546 159.94C383.131 160.525 383.131 161.475 382.546 162.061L379.717 164.889C379.131 165.475 378.182 165.475 377.596 164.889L374.767 162.061Z"
          id="Logo_Rear-Side"
          fill={getColorForPart("Logo_Rear-Side")}
          onMouseMove={(e) => showTooltip(e, "Logo_Rear-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <circle
          cx="413.5"
          cy="218.5"
          r="4"
          id="Fog-Light_Rear-Left-Side"
          fill={getColorForPart("Fog-Light_Rear-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Fog-Light_Rear-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <circle
          cx="13.5"
          cy="219"
          r="4"
          id="Fog-Light_Front-Left-Side"
          fill={getColorForPart("Fog-Light_Front-Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Fog-Light_Front-Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <circle
          cx="413.5"
          cy="103"
          r="4"
          id="Fog-Light_Rear-Right-Side"
          fill={getColorForPart("Fog-Light_Rear-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Fog-Light_Rear-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <circle
          cx="13.5"
          cy="103"
          r="4"
          id="Fog-Light_Front-Right-Side"
          fill={getColorForPart("Fog-Light_Front-Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Fog-Light_Front-Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M293.277 158.945L293.509 159.061L293.738 158.938C293.935 158.832 294.243 158.719 294.583 158.633C294.923 158.548 295.256 158.498 295.5 158.498C297.157 158.498 298.5 159.841 298.5 161.498C298.5 163.155 297.157 164.498 295.5 164.498C293.844 164.498 292.5 163.155 292.5 161.498V161.209L292.25 161.065L279.247 153.574C279.247 153.574 279.247 153.574 279.247 153.574C279.196 153.545 279.106 153.501 279.015 153.457C279.004 153.451 278.992 153.446 278.98 153.44C278.866 153.384 278.723 153.314 278.563 153.232C278.24 153.065 277.856 152.852 277.511 152.613C277.156 152.367 276.886 152.122 276.746 151.905C276.68 151.801 276.659 151.726 276.655 151.678C276.652 151.639 276.658 151.593 276.701 151.529C276.764 151.433 276.9 151.343 277.23 151.344C277.559 151.344 277.973 151.438 278.413 151.588C279.285 151.886 280.109 152.35 280.25 152.431L280.263 152.439L280.277 152.445L293.277 158.945Z"
          id="Antenna"
          fill={getColorForPart("Antenna")}
          onMouseMove={(e) => showTooltip(e, "Antenna")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M357.5 76.1834V66.0084C357.5 65.2377 358.084 64.5924 358.851 64.5158L368.5 63.5524V78.4637C366.697 78.3291 361.627 77.9077 358.871 77.6773C358.095 77.6125 357.5 76.9643 357.5 76.1834ZM59.7615 62.5H47.158C43.7201 60.0496 40.753 54.9708 39.1763 49.5616L55.1499 50.9711L59.7615 62.5Z"
          id="Indicator-Light_Right-Side"
          fill={getColorForPart("Indicator-Light_Right-Side")}
          onMouseMove={(e) => showTooltip(e, "Indicator-Light_Right-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
          stroke="#6F6464"
        />
        <path
          d="M357.5 256.678V247.085C357.5 246.657 357.541 246.379 357.616 246.189C357.682 246.021 357.779 245.909 357.952 245.816C358.146 245.713 358.447 245.63 358.923 245.576C359.394 245.523 359.997 245.503 360.773 245.5L360.775 245.5L360.781 245.5L360.802 245.5L360.876 245.5L361.147 245.5L362.089 245.5L364.914 245.5L367.725 245.5L368.5 245.5V258.5L367.726 258.5L364.919 258.5L362.099 258.5L361.159 258.499L360.89 258.499L360.816 258.499L360.795 258.499L360.789 258.499C360.016 258.494 359.417 258.459 358.951 258.386C358.483 258.313 358.184 258.206 357.988 258.082C357.659 257.873 357.5 257.533 357.5 256.678ZM54.6643 272.029L39.675 273.435C40.4221 270.812 41.4006 268.261 42.6052 266.048C43.8874 263.693 45.4108 261.75 47.1582 260.5H59.8849L54.6643 272.029Z"
          stroke="#6F6464"
          id="Indicator-Light_Left-Side"
          fill={getColorForPart("Indicator-Light_Left-Side")}
          onMouseMove={(e) => showTooltip(e, "Indicator-Light_Left-Side")}
          onMouseLeave={hideTooltip}
          className="car-part"
        />
      </svg>

      {tooltip.visible && (
        <div
          className="fixed bg-white p-4 rounded-lg shadow-xl pointer-events-none z-50 text-sm border border-gray-200"
          style={{
            transform: `translate(${tooltip.x + 15}px, ${tooltip.y + 15}px)`,
            maxWidth: "280px",
          }}
        >
          <div className="font-bold text-gray-900 mb-2">
            {tooltip.part.replace(/-/g, " ").replace(/_/g, " ")}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Damage Intensity:</span>
              <span className="font-semibold">
                {tooltip.intensity === 0 ? "0" : tooltip.intensity}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Condition:</span>
              <span
                className={`
          font-semibold
          ${tooltip.intensity === 0 && "text-green-600"}
          ${tooltip.intensity === 1 && "text-yellow-600"}
          ${tooltip.intensity === 2 && "text-orange-600"}
          ${tooltip.intensity >= 3 && "text-red-600"}
        `}
              >
                {tooltip.intensity === 0 && "No Damage"}
                {tooltip.intensity === 1 && "Minor Damage"}
                {tooltip.intensity === 2 && "Moderate Damage"}
                {tooltip.intensity >= 3 && "Severe Damage"}
              </span>
            </div>
          </div>

          {/* Optional: small color indicator */}
          <div className="mt-3 flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border border-gray-400"
              style={{
                backgroundColor: getColorForIntensity(tooltip.intensity),
              }}
            />
            <span className="text-xs text-gray-500">
              Visual indicator on diagram
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CarDiagramSvg;
