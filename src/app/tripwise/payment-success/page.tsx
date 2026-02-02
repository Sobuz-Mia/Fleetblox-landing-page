"use client";
import { Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import InspectionPage from "../components/TripAuditInspection";
import TripAuditSection from "../components/TripAuditSection";

const PaymentSuccess = () => {
  return (
    <div>
      <div className="bg-[#FAFAFF] pt-[80px] md:pt-[160px] pb-[60px] max-w-[1200px] w-full mx-auto text-center px-5">
        <h1 className="text-[36px] md:text-[52px] text-[#04082C] font-bold mb-5">
          Trip Wise
        </h1>
        <TripAuditSection />
      </div>
      <InspectionPage step={3} />
      <Modal
        open={true}
        onCancel={() => {}}
        footer={null}
        centered
        width={700}
        closeIcon={false}
        className="shadow-[0_4px_12px_0_rgba(0,0,0,0.14)]"
      >
        <div className="p-5">
          <div className="flex items-center justify-center">
            <div
              className="p-[10px] rounded-full w-fit"
              style={{ background: `rgba(77, 180, 41, 0.06)` }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M20.0074 35.4974C17.8623 35.4974 15.8467 35.0931 13.9604 34.2844C12.0741 33.4757 10.4316 32.3724 9.03294 30.9744C7.63427 29.5763 6.53041 27.9346 5.72135 26.0491C4.91233 24.1637 4.50781 22.1484 4.50781 20.0034C4.50781 17.8499 4.91222 15.8321 5.72102 13.9501C6.52985 12.068 7.63341 10.4277 9.03169 9.02903C10.43 7.63037 12.072 6.5265 13.9578 5.71745C15.8436 4.90842 17.8592 4.50391 20.0046 4.50391C21.4138 4.50391 22.7802 4.68634 24.1039 5.0512C25.4277 5.41606 26.6948 5.95532 27.9052 6.66899C28.2033 6.84849 28.3902 7.09795 28.4661 7.41736C28.542 7.73681 28.48 8.02741 28.2802 8.28916C28.0751 8.55943 27.8059 8.72235 27.4725 8.77791C27.1392 8.83346 26.8203 8.7715 26.5158 8.59203C25.519 8.01617 24.4702 7.57946 23.3692 7.28191C22.2682 6.98435 21.1467 6.83557 20.0046 6.83557C16.3465 6.83557 13.2377 8.11522 10.6784 10.6745C8.11913 13.2338 6.83948 16.3425 6.83948 20.0007C6.83948 23.6588 8.11913 26.7675 10.6784 29.3268C13.2377 31.8861 16.3465 33.1657 20.0046 33.1657C23.6627 33.1657 26.7714 31.8861 29.3307 29.3268C31.89 26.7675 33.1696 23.6588 33.1696 20.0007C33.1696 19.6418 33.1574 19.2943 33.1328 18.9582C33.1082 18.6222 33.0617 18.2795 32.9934 17.9301C32.9378 17.5976 32.9917 17.2851 33.1552 16.9924C33.3187 16.6998 33.5632 16.5081 33.8889 16.4173C34.2021 16.3265 34.4946 16.3717 34.7665 16.5527C35.0384 16.7338 35.2022 16.9819 35.2577 17.2971C35.3293 17.7319 35.3878 18.1738 35.4332 18.6226C35.4786 19.0714 35.5013 19.5307 35.5013 20.0007C35.5013 22.146 35.097 24.1616 34.2883 26.0474C33.4796 27.9332 32.3763 29.5753 30.9783 30.9735C29.5802 32.3718 27.9406 33.4754 26.0594 34.2842C24.1783 35.093 22.1609 35.4974 20.0074 35.4974ZM17.6728 23.6113L33.0222 8.25712C33.2476 8.03167 33.5187 7.91414 33.8355 7.90453C34.1523 7.89492 34.4341 8.0136 34.6811 8.26057C34.9149 8.49435 35.0318 8.7691 35.0318 9.08482C35.0318 9.40052 34.9137 9.6764 34.6776 9.91249L18.6809 25.9141C18.3881 26.2068 18.0521 26.3532 17.6728 26.3532C17.2936 26.3532 16.9602 26.2068 16.6729 25.9141L12.1664 21.4077C11.9357 21.1823 11.8176 20.9104 11.8123 20.592C11.8069 20.2736 11.925 19.9937 12.1664 19.7523C12.4025 19.5162 12.6771 19.3981 12.9901 19.3981C13.3032 19.3981 13.5804 19.5162 13.8219 19.7523L17.6728 23.6113Z"
                  fill="#4DB429"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-[20px] text-[#303030] font-bold text-center">
            Purchase completed
          </h2>
          <p className="text-[14px] text-[#6F6464] leading-[18px] text-center">
            A Trip ID has been sent to your{" "}
            <span className="text-[#0336BC] font-medium"> email</span>{" "}
            (hum*****@gmail.com). Please inter your tip id to access your order
            page
          </p>
          <div className="border-[2px] border-[#002D9F] p-[10px] rounded-[10px] my-[30px] w-full h-full shadow-[4px_4px_12px_0_rgba(0,0,0,0.14)]">
            <div className="bg-[#FAFAFF] rounded-[11px] filter blur-[0.44999998807907104px] pt-[26px] pb-[19px] px-16">
              <div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="57"
                    height="68"
                    viewBox="0 0 57 68"
                    fill="none"
                  >
                    <path
                      d="M-0.000553858 2.59799C-0.0554417 1.21837 1.01847 0.0554683 2.39809 0.000578877C3.77771 -0.0543106 4.94061 1.0196 4.99549 2.39922L2.49747 2.4986L-0.000553858 2.59799ZM55.9152 48.7531C56.7956 49.8167 56.647 51.3926 55.5834 52.273L38.2505 66.6194C37.1868 67.4998 35.6109 67.3512 34.7305 66.2876C33.8502 65.2239 33.9987 63.648 35.0624 62.7677L50.4694 50.0153L37.717 34.6082C36.8367 33.5446 36.9852 31.9687 38.0489 31.0883C39.1125 30.2079 40.6884 30.3565 41.5688 31.4201L55.9152 48.7531ZM2.49747 2.4986L4.99549 2.39922C5.2625 9.11045 8.01778 19.6042 15.471 28.8396C22.863 37.999 34.9707 46.0431 54.224 47.8581L53.9893 50.3471L53.7547 52.8361C33.1881 50.8972 19.836 42.2097 11.5801 31.9797C3.38547 21.8257 0.304765 10.2721 -0.000553858 2.59799L2.49747 2.4986Z"
                      fill="#002D9F"
                    />
                  </svg>
                  <div>
                    <h5 className="text-[#04082C] text-[18px] font-montserrat font-bold text-center mb-2 ">
                      Trip wise
                    </h5>
                    <div className="flex justify-center">
                      <Image
                        src={"/images/trip-audit/input.svg"}
                        //   fill
                        alt="input"
                        height={400}
                        width={400}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-center text-[#7D7D7D] text-[7px] font-semibold mt-[10px]">
                  Please enter your Trip ID received after purchasing the trip
                  wise to access and manage your vehicle inspection workflow and
                  monitoring
                </p>
              </div>
            </div>
          </div>
          <Link href={"/tripwise"}>
            <button className="bg-[#2D65F2] rounded-md py-3 px-5 w-full text-white text-[16px] font-bold">
              Okay
            </button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentSuccess;
