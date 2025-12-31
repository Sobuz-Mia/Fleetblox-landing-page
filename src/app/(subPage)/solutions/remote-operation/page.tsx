import GlobeSection from "@/components/modules/home/globe";
import FeatureCard from "@/components/ui/FeatureCard";
import Image from "next/image";
import FeatureItem from "./components/FeatureItem";
// import StarterFleetActionButton from "@/components/ui/StarterFleetActionButton";

// Icon Components
const ControlWithoutPhysicalPresence = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.2036 9H5.21588C4.79139 9 4.44531 9.36856 4.44531 9.82062V28.9106H33.9809V9.82062C33.9745 9.36856 33.6284 9 33.2039 9H33.2036ZM16.8783 9.77887H21.5344C21.5344 9.77887 21.8955 10.116 21.8905 10.4002C21.8856 10.676 21.5344 10.996 21.5344 10.996H16.8783C16.8783 10.996 16.5594 10.6689 16.5549 10.4002C16.5502 10.1228 16.8783 9.77887 16.8783 9.77887Z"
        fill="#B8CBFC"
      />
      <path
        d="M34.3597 30.2578H4.04678L2.02902 37.9561C1.96356 38.2063 2.00958 38.4706 2.1596 38.6725C2.30996 38.8813 2.53192 38.9993 2.77333 38.9993H35.6329C35.8746 38.9993 36.1031 38.8809 36.2466 38.6725C36.397 38.4637 36.4427 38.2066 36.3772 37.9561L34.3597 30.2578Z"
        fill="#B8CBFC"
      />
      <path
        d="M36.1397 26.972C36.1397 28.0911 35.2393 28.9986 34.1286 28.9986C33.0177 28.9986 32.1172 28.0911 32.1172 26.972C32.1172 25.8528 33.0176 24.9453 34.1286 24.9453C35.2393 24.9453 36.1397 25.8528 36.1397 26.972Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
      <path
        d="M30.1235 23.1556L29.0125 21.8206C28.9325 21.726 28.895 21.602 28.9092 21.4784C28.9236 21.3549 28.9884 21.2429 29.088 21.1696C30.5724 20.1546 32.3247 19.6112 34.1187 19.6094C35.9128 19.6078 37.6662 20.1479 39.1524 21.1602C39.2522 21.2333 39.3171 21.345 39.3318 21.4686C39.3462 21.592 39.3092 21.716 39.2293 21.8107L38.1219 23.1493C37.9747 23.3321 37.7127 23.3703 37.5202 23.2371C36.5237 22.5363 35.3376 22.1611 34.1227 22.162C32.9075 22.1629 31.7221 22.5401 30.7267 23.2423C30.5337 23.3761 30.2714 23.3384 30.1235 23.1556Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
      <path
        d="M26.8056 19.1521L25.6839 17.8044C25.6056 17.7112 25.5683 17.5901 25.5803 17.4687C25.5923 17.3472 25.6526 17.2359 25.7476 17.1601C28.1535 15.3088 31.0957 14.3042 34.1228 14.3008C37.15 14.2972 40.0946 15.2951 42.5044 17.1409C42.5993 17.2164 42.6601 17.3275 42.6723 17.4489C42.6845 17.5702 42.6474 17.6913 42.5696 17.7848L41.4526 19.1351C41.2949 19.323 41.0167 19.349 40.8275 19.1934C38.9173 17.6788 36.5567 16.8566 34.1262 16.8595C31.6956 16.8622 29.3368 17.69 27.4299 19.209C27.2412 19.3648 26.9635 19.3396 26.8056 19.1521Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
      <path
        d="M44.7741 15.1193C44.6162 15.3083 44.3363 15.3331 44.148 15.1747C41.3213 12.8327 37.7742 11.5542 34.1147 11.5584C30.4549 11.5629 26.9108 12.8497 24.0899 15.1986C23.902 15.3573 23.6223 15.3331 23.464 15.1445L22.3401 13.794C22.2625 13.7013 22.2252 13.581 22.2363 13.4603C22.2476 13.3397 22.3064 13.2284 22.3995 13.1517C25.7228 10.4692 29.8533 9.00493 34.1113 9.00001C38.3697 8.99487 42.5031 10.4491 45.8327 13.124C45.9259 13.2005 45.9849 13.3113 45.9964 13.432C46.008 13.5527 45.9709 13.6729 45.8937 13.7659L44.7741 15.1193Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};

const MaximizeVehicleUptime = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.5746 39.5564C35.416 43.71 29.8854 45.9989 24.002 45.9989C19.2267 45.9989 14.6988 44.469 10.9333 41.6805V44.5335C10.9333 45.3443 10.2758 46 9.46533 46C8.65445 46 7.99732 45.3439 7.99732 44.5335V38.5193C7.99732 37.7085 8.65483 37.0528 9.46533 37.0528H15.4857C16.2966 37.0528 16.9537 37.7089 16.9537 38.5193C16.9537 39.33 16.2962 39.9858 15.4857 39.9858H13.6057C21.0005 44.7856 31.0173 43.9548 37.4975 37.4821C43.4247 31.5596 44.7811 22.2851 40.7953 14.9275C40.4095 14.2157 40.674 13.3262 41.3876 12.9394C42.1008 12.5555 42.9904 12.8175 43.3776 13.5326C47.9773 22.0217 46.4128 32.7224 39.5739 39.5565L39.5746 39.5564ZM10.5016 10.5179C14.1054 6.9185 18.8985 4.9345 23.9983 4.9345C27.7478 4.9345 31.3271 6.01598 34.3943 8.01386H32.5146C31.7038 8.01386 31.0466 8.66998 31.0466 9.48037C31.0466 10.2911 31.7042 10.9469 32.5146 10.9469H38.5351C39.3459 10.9469 40.0031 10.2908 40.0031 9.48037V3.46651C40.0031 2.65574 39.3455 2 38.5351 2C37.7242 2 37.067 2.65612 37.067 3.46651V6.32387C28.4527 -0.0357053 16.2256 0.653577 8.42675 8.44398C1.58673 15.2776 0.0225734 25.9783 4.623 34.466C4.88892 34.9573 5.3938 35.2353 5.91541 35.2353C6.15109 35.2353 6.3908 35.1782 6.613 35.0592C7.32625 34.6724 7.59068 33.783 7.20532 33.0712C3.21906 25.7145 4.57489 16.4405 10.5027 10.5174L10.5016 10.5179Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
      <path
        d="M28.3042 15.8461C28.3042 15.1413 29.0147 14.6634 29.6196 15.0251C31.0887 15.9036 32.3027 17.204 33.0738 18.8081L33.494 19.6822C33.6057 19.9146 33.8407 20.0623 34.0985 20.0623C37.4321 20.0623 40.1345 22.7646 40.1345 26.0981V27.9117C40.1345 28.3934 39.744 28.7838 39.2623 28.7838H9.10348C8.4207 28.7838 7.86719 28.2304 7.86719 27.5476V22.8439C7.86719 21.3077 9.11258 20.0623 10.6489 20.0623H11.3374C11.8127 20.0623 12.2458 19.79 12.4517 19.3617L12.7178 18.8081C13.4413 17.3031 14.5546 16.0654 15.9027 15.1927C16.5052 14.8027 17.2389 15.2789 17.2389 15.9966V18.6812C17.2389 19.3602 17.7894 19.9106 18.4684 19.9106H27.0747C27.7538 19.9106 28.3042 19.3602 28.3042 18.6812V15.8461Z"
        fill="#B8CBFC"
      />
      <path
        d="M16.5711 22.3086C15.4708 22.3086 14.3952 22.6349 13.4803 23.2461C12.5654 23.8574 11.8524 24.7263 11.4313 25.7428C11.0102 26.7593 11.0002 27.8779 11.1147 28.957C11.3294 30.0361 11.8592 31.0274 12.6373 31.8054C13.4153 32.5834 14.4066 33.1133 15.4858 33.3279C16.565 33.5426 17.6836 33.4324 18.7001 33.0113C19.7167 32.5903 20.5856 31.8772 21.1969 30.9624C21.8082 30.0475 22.1345 28.972 22.1345 27.8717H18.7965C18.7965 28.3118 18.666 28.742 18.4214 29.108C18.1769 29.4739 17.8294 29.7591 17.4227 29.9276C17.0161 30.096 16.5687 30.14 16.137 30.0542C15.7053 29.9683 15.3088 29.7564 14.9976 29.4452C14.6864 29.134 14.4744 28.7375 14.3886 28.3058C14.3027 27.8742 14.3468 27.4267 14.5152 27.0201C14.6836 26.6135 14.9689 26.266 15.3348 26.0215C15.7008 25.777 16.131 25.6465 16.5711 25.6465V22.3086Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
      <path
        d="M26.3281 27.8717C26.3281 26.7714 26.6544 25.6958 27.2657 24.781C27.877 23.8662 28.7459 23.1531 29.7625 22.7321C30.779 22.311 31.8976 22.2008 32.9768 22.4155C34.056 22.6301 35.0473 23.16 35.8253 23.938C36.6034 24.716 37.1332 25.7073 37.3479 26.7864C37.5626 27.8655 37.4524 28.9841 37.0313 30.0006C36.6102 31.0171 35.8972 31.886 34.9823 32.4972C34.0674 33.1085 32.9918 33.4348 31.8915 33.4348L31.8915 30.0969C32.3316 30.0969 32.7618 29.9664 33.1278 29.7219C33.4937 29.4774 33.779 29.1299 33.9474 28.7233C34.1158 28.3167 34.1599 27.8692 34.074 27.4376C33.9882 27.0059 33.7762 26.6094 33.465 26.2982C33.1538 25.987 32.7573 25.7751 32.3256 25.6892C31.8939 25.6034 31.4465 25.6474 31.0399 25.8158C30.6332 25.9843 30.2857 26.2695 30.0412 26.6354C29.7966 27.0014 29.6661 27.4316 29.6661 27.8717L26.3281 27.8717Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};

const FasterOperationsWithAIWorkflows = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.73268 41C2.98963 41 2.34842 40.7316 1.80905 40.1948C1.26968 39.658 1 39.0198 1 38.2803V17.3197C1 16.5802 1.26968 15.942 1.80905 15.4052C2.34842 14.8684 2.98963 14.6 3.73268 14.6H12.3684V10.7201C12.3684 9.98063 12.6381 9.34232 13.1775 8.8052C13.7168 8.2684 14.3581 8 15.1011 8H22.8989C23.6419 8 24.2832 8.2684 24.8225 8.8052C25.3619 9.34232 25.6316 9.98063 25.6316 10.7201V14.6H34.2673C35.0104 14.6 35.6516 14.8684 36.1909 15.4052C36.7303 15.942 37 16.5802 37 17.3197V38.2803C37 39.0198 36.7303 39.658 36.1909 40.1948C35.6516 40.7316 35.0104 41 34.2673 41H3.73268ZM14.5185 14.6H23.4815V10.7201C23.4815 10.5749 23.4209 10.4418 23.2996 10.3208C23.1781 10.2002 23.0445 10.1398 22.8989 10.1398H15.1011C14.9555 10.1398 14.8219 10.2002 14.7004 10.3208C14.5791 10.4418 14.5185 10.5749 14.5185 10.7201V14.6Z"
        fill="#B8CBFC"
      />
      <path
        d="M37 21C31.4763 21 27 25.4763 27 31C27 36.5233 31.4763 41 37 41C42.5237 41 47 36.5237 47 31C46.9998 25.4763 42.5237 21 37 21ZM42.8186 31.4093L37.8542 35.8896C37.5116 36.1651 36.9999 35.9211 36.9999 35.4801V32.3148L32.8541 35.8896C32.5115 36.1651 31.9998 35.9212 31.9998 35.4802V26.5316C31.9998 26.0907 32.5078 25.8466 32.8541 26.1221L36.9999 29.6852V26.5316C36.9999 26.0907 37.5078 25.8466 37.8542 26.1222L42.8186 30.5905C43.0824 30.7993 43.0824 31.1968 42.8186 31.4094V31.4093Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};

const RemoveAccessDelaysAndSecurityRisks = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 44C18.766 44 18.5204 43.9797 18.2633 43.9391C18.0061 43.8985 17.7651 43.8376 17.5401 43.7564C12.4804 41.9296 8.45886 38.8311 5.47557 34.461C2.49186 30.0905 1 25.3603 1 20.2704V9.8387C1 9.00324 1.25093 8.25121 1.75279 7.5826C2.25464 6.91439 2.90371 6.42988 3.7 6.12907L17.5459 1.25758C18.0473 1.08586 18.532 1 19 1C19.468 1 19.9527 1.08586 20.4541 1.25758L34.3 6.12907C35.0963 6.42988 35.7454 6.91439 36.2472 7.5826C36.7491 8.25121 37 9.00324 37 9.8387V20.2704C37 25.3603 35.5081 30.0905 32.5244 34.461C29.5411 38.8311 25.5196 41.9296 20.4599 43.7564C20.2349 43.8376 19.9939 43.8985 19.7367 43.9391C19.4796 43.9797 19.234 44 19 44Z"
        fill="#B8CBFC"
      />
      <path
        d="M35 27C29.4763 27 25 31.4763 25 37C25 42.5233 29.4763 47 35 47C40.5237 47 45 42.5237 45 37C44.9998 31.4763 40.5237 27 35 27ZM40.8186 37.4093L35.8542 41.8896C35.5116 42.1651 34.9999 41.9211 34.9999 41.4801V38.3148L30.8541 41.8896C30.5115 42.1651 29.9998 41.9212 29.9998 41.4802V32.5316C29.9998 32.0907 30.5078 31.8466 30.8541 32.1221L34.9999 35.6852V32.5316C34.9999 32.0907 35.5078 31.8466 35.8542 32.1222L40.8186 36.5905C41.0824 36.7993 41.0824 37.1968 40.8186 37.4094V37.4093Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};

const ScalableOperationsAcrossLocations = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.0075 9.54626C28.1017 9.03158 27.4221 8.51718 26.7428 8.05951C25.0441 6.8588 23.6853 5.88674 19.7786 5.25773C18.1367 5.02905 17.6838 6.22979 17.4006 7.08745C17.0609 8.0022 16.8345 8.34547 16.1549 8.34547C13.9468 8.34547 13.2107 7.8308 12.1349 7.03043C11.6252 6.6301 11.0026 6.23001 10.1533 5.77241C12.3048 4.62901 14.6829 4 17.2874 4C21.9867 4 26.1767 6.17277 29.0077 9.54626H29.0075ZM9.02087 6.45873C10.1531 6.97341 10.8893 7.48781 11.5122 7.94548C12.6444 8.80321 13.607 9.43222 16.155 9.43222C17.6837 9.43222 18.1366 8.23151 18.4763 7.43108C18.816 6.45902 18.9859 6.23037 19.6085 6.3447C23.2324 6.91641 24.3646 7.71712 26.1197 8.91783C27.1388 9.66116 28.3845 10.5189 30.4794 11.548C31.2154 12.806 31.7816 14.2354 32.178 15.7219C31.3854 15.9506 30.7625 16.0079 30.1964 16.0649C29.0641 16.1793 28.1016 16.2366 26.6293 17.7803C24.0248 20.4678 23.9116 21.1538 23.7984 24.756C23.7417 26.1284 24.591 26.5857 25.1574 26.8715C25.6671 27.1575 26.0068 27.3288 26.1765 28.0149C26.5729 29.959 25.78 31.9601 25.5536 32.4174C24.0813 33.3322 22.4962 34.0755 20.7408 34.4759C19.5518 33.9042 18.5327 33.7898 17.7398 33.6755C16.4376 33.5038 15.7014 33.3895 14.7956 31.7313C13.9462 30.1876 14.3992 29.3299 14.9088 28.3008C15.475 27.1574 16.0411 25.8994 15.192 23.841C14.3427 21.7825 13.0405 21.3822 11.9647 20.9822C10.9456 20.6391 10.0395 20.3531 9.36018 18.8094C9.13373 18.2947 9.41693 17.8373 10.3228 17.094C10.8889 16.5793 11.455 16.1219 11.3985 15.4359C11.3985 15.0356 11.1153 14.6926 10.6625 14.3495C8.34121 12.7484 7.09539 13.0915 5.56668 13.4918C4.83059 13.6634 4.03797 13.8921 2.96218 13.9492C4.15147 10.8613 6.30306 8.23119 9.02076 6.45914L9.02087 6.45873ZM2 19.4384C2 17.9517 2.22645 16.4652 2.62289 15.0929C4.03838 15.0929 5.05771 14.8069 5.85026 14.6355C7.26576 14.2352 8.11505 14.0638 9.98346 15.3216C10.1534 15.4359 10.2099 15.4932 10.2099 15.4932C10.1532 15.6649 9.75701 16.0079 9.53056 16.2365C8.79447 16.9226 7.66215 17.8946 8.28481 19.3241C9.19064 21.2682 10.4364 21.7255 11.5686 22.0685C12.5877 22.4116 13.4938 22.6976 14.1167 24.2983C14.796 25.8421 14.3431 26.7571 13.8335 27.7862C13.2673 28.9296 12.6445 30.245 13.7767 32.3032C14.9657 34.476 16.1547 34.6473 17.5702 34.819C17.6834 34.819 17.7402 34.819 17.8534 34.8763H17.2305C8.8512 34.8763 2.00029 27.9579 2.00029 19.4387L2 19.4384ZM27.1394 31.2167C27.3659 30.2447 27.5359 28.987 27.2526 27.7862C27.0262 26.5855 26.2336 26.1852 25.6672 25.8994C25.1011 25.6134 24.8746 25.4991 24.8746 24.813C24.9878 21.3825 24.9878 21.0392 27.3659 18.5807C28.5549 17.38 29.1777 17.3227 30.2535 17.2083C30.8197 17.151 31.4993 17.0939 32.3484 16.8652C32.4616 17.723 32.5748 18.5806 32.5748 19.4384C32.5748 24.1837 30.48 28.3579 27.1394 31.2167Z"
        fill="#B8CBFC"
      />
      <path
        d="M18.3735 19.4375C17.6082 19.4375 16.9922 20.0336 16.9922 20.7803V38.317C16.9922 39.0641 17.6083 39.6599 18.3735 39.6599H44.6178C45.383 39.6599 45.9991 39.0638 45.9991 38.317V20.7803C45.9991 20.0333 45.383 19.4375 44.6178 19.4375H18.3735ZM29.0782 40.3825L27.6969 43.2715H35.2942L34.2583 40.3825H29.0782Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};

const BoostTeamProductivityAndEfficiency = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.59669 40.0011C3.15846 40.0011 2.78279 39.8323 2.46967 39.4946C2.15656 39.1569 2 38.7517 2 38.279V37.5351C2 36.1316 2.67454 34.9911 4.02361 34.1137C5.37269 33.2358 7.12626 32.7969 9.28432 32.7969C9.70585 32.7969 10.1097 32.8119 10.4958 32.8419C10.8823 32.8716 11.2619 32.9244 11.6346 33.0004C11.2681 33.6514 10.9973 34.3196 10.8221 35.0049C10.6472 35.6902 10.5597 36.3928 10.5597 37.1128V40.0011H3.59669ZM15.4706 40.0011C14.9957 40.0011 14.5969 39.8264 14.2743 39.4771C13.9521 39.1274 13.7909 38.7008 13.7909 38.1974V37.1944C13.7909 36.2335 14.0424 35.3449 14.5455 34.5285C15.0489 33.7125 15.7852 33.0076 16.7544 32.4138C17.7238 31.82 18.8653 31.3685 20.1786 31.0594C21.4923 30.7503 22.9262 30.5958 24.4803 30.5958C26.0643 30.5958 27.5131 30.7503 28.8268 31.0594C30.1401 31.3685 31.2799 31.82 32.2461 32.4138C33.2123 33.0076 33.9476 33.7088 34.452 34.5174C34.9567 35.3257 35.2091 36.218 35.2091 37.1944V38.1974C35.2091 38.7008 35.0455 39.1274 34.7183 39.4771C34.3908 39.8264 33.9936 40.0011 33.5269 40.0011H15.4706ZM38.4305 40.0011V37.1191C38.4305 36.3681 38.3455 35.6489 38.1755 34.9615C38.0055 34.274 37.7536 33.6212 37.4199 33.003C37.8054 32.9253 38.1829 32.8716 38.5523 32.8419C38.9221 32.8119 39.313 32.7969 39.725 32.7969C41.8827 32.7969 43.6347 33.2353 44.9808 34.1121C46.3269 34.9888 47 36.1279 47 37.5292V38.279C47 38.7517 46.8425 39.1569 46.5274 39.4946C46.2123 39.8323 45.8343 40.0011 45.3935 40.0011H38.4305ZM9.27941 30.5248C8.37937 30.5248 7.61182 30.1802 6.97675 29.491C6.342 28.8018 6.02463 27.9734 6.02463 27.0059C6.02463 26.0259 6.34413 25.1972 6.98313 24.5197C7.62213 23.8425 8.39018 23.5039 9.28727 23.5039C10.1958 23.5039 10.9673 23.8425 11.6017 24.5197C12.2358 25.1972 12.5529 26.029 12.5529 27.0149C12.5529 27.9715 12.2393 28.7956 11.612 29.4873C10.9845 30.179 10.207 30.5248 9.27941 30.5248ZM39.7255 30.5248C38.8346 30.5248 38.0685 30.1781 37.4273 29.4846C36.786 28.7912 36.4653 27.9669 36.4653 27.0117C36.4653 26.0279 36.7868 25.1972 37.4297 24.5197C38.0726 23.8425 38.84 23.5039 39.7319 23.5039C40.6506 23.5039 41.4239 23.8425 42.0517 24.5197C42.6799 25.1972 42.994 26.0268 42.994 27.0085C42.994 27.9778 42.6808 28.8062 42.0542 29.4936C41.4276 30.1811 40.6514 30.5248 39.7255 30.5248Z"
        fill="#B8CBFC"
      />
      <path
        d="M24.556 17.0018V22.1933C24.556 22.3298 24.5959 22.4413 24.6758 22.5279C24.7559 22.6143 24.8642 22.6575 25.0008 22.6575C25.1375 22.6575 25.2524 22.6123 25.3458 22.5218C25.4391 22.431 25.4858 22.3144 25.4858 22.1718V17.0018L27.6331 19.1694C27.7134 19.2496 27.8165 19.2861 27.9425 19.2789C28.0685 19.2718 28.1726 19.2268 28.2549 19.1439C28.3373 19.0612 28.3784 18.958 28.3784 18.8343C28.3784 18.7107 28.3376 18.6055 28.2561 18.5187L25.5941 15.859C25.433 15.7056 25.2437 15.6289 25.026 15.6289C24.8082 15.6289 24.6226 15.7056 24.4692 15.859L21.7943 18.5338C21.7008 18.6384 21.6558 18.7455 21.6594 18.8553C21.6629 18.965 21.7059 19.0612 21.7882 19.1439C21.8705 19.2268 21.9758 19.2682 22.1043 19.2682C22.2327 19.2682 22.3393 19.2234 22.424 19.1338L24.556 17.0018ZM25.0064 29C23.626 29 22.3284 28.7366 21.1137 28.2099C19.899 27.6832 18.8391 26.9675 17.9338 26.0628C17.0284 25.1581 16.3131 24.1006 15.7878 22.8902C15.2626 21.6798 15 20.3852 15 19.0064C15 17.6232 15.2634 16.3218 15.7901 15.1022C16.3168 13.8829 17.0325 12.8221 17.9372 11.9198C18.8419 11.0176 19.8994 10.3054 21.1098 9.78336C22.3202 9.26112 23.6148 9 24.9936 9C26.3768 9 27.6782 9.26252 28.8978 9.78756C30.1173 10.3126 31.1782 11.0252 32.0805 11.9254C32.9825 12.8254 33.6946 13.8831 34.2166 15.0983C34.7389 16.3136 35 17.612 35 18.9936C35 20.374 34.7382 21.6716 34.2147 22.8863C33.6909 24.101 32.9783 25.1609 32.0768 26.0662C31.1753 26.9716 30.1169 27.6869 28.9017 28.2122C27.6864 28.7374 26.388 29 25.0064 29Z"
        fill="#2D65F2"
        fillOpacity="0.5"
      />
    </svg>
  );
};

const features = [
  {
    title: "Body Condition Diagram Viewer",
    description:
      "Remotely view exterior damage to the vehicle with interactive, real-time diagrams.",
  },
  {
    title: "Live Vehicle Health Insights",
    description:
      "Monitor total vehicle health through a dedicated, real-time visual health dashboard.",
  },
  {
    title: "AI powered General Inspection",
    description:
      "Intelligent step by step inspection workflow that generates a comprehensive diagnostic report.",
  },
  {
    title: "Smart Door Access",
    description:
      "Remotely lock or unlock entry doors to allow technicians access and instantly check door status for complete control.",
  },
];

const features2 = [
  {
    title: "Location & Role-Based Team",
    description:
      "Designate teams by zone or branch with only role-based access to the vehicle and related tasks.",
  },
  {
    title: "Task Assignment & Management",
    description:
      "Create, track, and update tasks in real time using a centralized task manager.",
  },
  {
    title: "Crew App for Field Tasks",
    description:
      "Enable teams in the field to manage tasks instantly from the Crew App, guided by predictive operational workflows.",
  },
];

const KeyBenefits = [
  {
    icon: ControlWithoutPhysicalPresence,
    title: "Control Without Physical Presence",
  },
  {
    icon: MaximizeVehicleUptime,
    title: "Maximize Vehicle Uptime",
  },
  {
    icon: FasterOperationsWithAIWorkflows,
    title: "Faster Operations with AI Workflows",
  },
  {
    icon: RemoveAccessDelaysAndSecurityRisks,
    title: "Remove Access Delays and Security Risks",
  },
  {
    icon: ScalableOperationsAcrossLocations,
    title: "Scalable Operations Across Locations",
  },
  {
    icon: BoostTeamProductivityAndEfficiency,
    title: "Boost Team Productivity and Efficiency",
  },
];

const RemoteOperation = () => {
  return (
    <div>
      {/* hero section */}
      <section className="bg-[#FAFAFF] pt-[100px] lg:pt-[140px] pb-[30px] ">
        <div className="lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] mx-auto w-full flex flex-col px-5 lg:flex-row items-center justify-between">
          <div className="lg:pl-[100px] max-w-[660px] w-full">
            <h3 className="text-[#0336BC] font-openSans font-bold text-[22px]">
              Remote Operation
            </h3>
            <h1 className="text-[#04082C] text-[36px] lg:text-[52px] font-bold leading-[1.1]">
              Modern Fleets don&apos;t Stop Moving On Autopilot
            </h1>
            <p className="text-[#333] text-[16px] leading-6 mt-[10px] lg:mt-4 mb-5 font-openSans">
              Fleetblox Remote Operations gives you the power to manage your
              entire operation remotely—ensuring business continuity and
              complete control, no matter where your vehicles or teams are
              located.
            </p>
            {/* <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="hidden transition-all bg-[#2D65F2] hover:bg-[#0336BC] font-openSans text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px] lg:flex items-center px-4 py-3 text-base font-bold rounded-md group">
                <div className="z-20 whitespace-nowrap">Start today</div>
                <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                  <RightArrowIcon />
                </div>
              </button>
            </Link>
            <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="lg:hidden bg-[#2D65F2] hover:bg-[#0336BC] text-white w-full flex px-4 py-3 text-[14px] font-openSans font-bold rounded-md justify-center">
                Start today
              </button>
            </Link> */}

            {/* <StarterFleetActionButton text="Start Today" />
            <StarterFleetActionButton isMobile={true} text="Start Today" /> */}
          </div>
          <div className=" w-full py-10 lg:pl-[60px]">
            <Image
              src="/images/solutions/remote-operation-hero.svg"
              alt="AI assistant for fleet optimization"
              width={700}
              height={491}
              className="object-contain w-full"
            />
          </div>
        </div>
      </section>
      {/* hero section end */}
      {/* <section className=" mx-auto w-full py-[60px] lg:py-[120px] px-5">
        <div className="max-w-[840px] mx-auto w-full text-center mb-[60px]">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold text-center leading-[1.1] mb-[10px]">
            Fleet Smart Onboarding
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans ">
            Streamline your remote onboarding with an intelligent workflow
          </p>
        </div>
        <SmartOnboarding OnboardingData={OnboardingData} />
      </section> */}

      {/* remote diagnostics section */}
      <section className="max-w-[1200px] mx-auto w-full py-[120px] px-5">
        <div className="max-w-[840px] mx-auto w-full md:text-center mb-[60px]">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold md:text-center leading-[1.1] mb-[10px]">
            Remote Diagnostics
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans ">
            Replace Traditional Checks with Automated, Interactive Diagnostics
            from Anywhere
          </p>
        </div>
        <div className="flex justify-between flex-col md:flex-row items-center gap-10">
          <div className=" ">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full"
              poster="/images/solutions/remote-operation-hero.svg"
            >
              <source
                src="/videos/solutions/remote_health.mov"
                type="video/mp4"
              />
            </video>
          </div>
          <div className=" max-w-[580px] w-full space-y-[40px]">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
      {/* vehicle status monitoring section */}
      <section className="max-w-[1200px] mx-auto w-full py-[120px] px-5">
        <div className="max-w-[840px] mx-auto w-full md:text-center mb-[60px]">
          <h2 className="text-[#04082C] text-[28px] lg:text-[36px] font-bold md:text-center leading-[1.1] mb-[10px]">
            Remote Crew Management
          </h2>
          <p className="text-[#333] text-[16px] leading-6 font-openSans ">
            Remote coordination across locations with intelligent assignments,
            tasks and crew management.
          </p>
        </div>
        <div className="flex justify-between flex-col md:flex-row-reverse items-center gap-10">
          <div className=" ">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full"
              poster="/images/solutions/remote-operation-hero.svg"
            >
              <source
                src="/videos/solutions/remote_health-2.mov"
                type="video/mp4"
              />
            </video>
          </div>
          <div className=" max-w-[580px] w-full space-y-[40px]">
            {features2.map((feature, index) => (
              <FeatureItem
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="max-w-[1200px] mx-auto w-full mt-16 mb-[100px] px-5">
        <h2 className="mb-[40px] lg:mb-[60px] text-center text-[#04082C] text-[28px] lg:text-[36px] font-bold">
          Unlock Peak Fleet Performance — Anywhere, Anytime
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[30px]">
          {KeyBenefits?.map((data, index) => (
            <FeatureCard
              key={index}
              icon={<data.icon />}
              title2={data.title}
              className="max-w-[380px] w-full"
            />
          ))}
        </div>
      </section>
      {/* why Key Benefits end */}

      {/* glove section start */}

      <div>
        <GlobeSection
          paddingTop="pt-[40px]"
          title="Drive Your Fleet Operations Forward"
          description="Manage your fleet effortlessly from wherever you are. Fleetblox Remote Operations puts control in your hands."
        />
      </div>
    </div>
  );
};

export default RemoteOperation;
