"use client";
import { Modal } from "antd";
import Link from "next/link";
import InspectionPage from "../components/TripAuditInspection";
import TripAuditSection from "../components/TripAuditSection";

const PaymentFailed = () => {
  return (
    <div>
      <div className="bg-[#FAFAFF] pt-[80px] md:pt-[160px] pb-[60px] max-w-[1200px] w-full mx-auto text-center px-5">
        <h1 className="text-[36px] md:text-[52px] text-[#04082C] font-bold mb-5">
          Trip Audit
        </h1>
        <TripAuditSection />
      </div>
      <InspectionPage step={3} />

      <Modal
        open={true}
        onCancel={() => {}}
        footer={null}
        centered
        width={420}
        closeIcon={false}
        className="shadow-[0_4px_12px_0_rgba(0,0,0,0.14)]"
      >
        <div className="">
          <div className="flex items-center justify-center">
            <div
              className="p-[10px] rounded-full w-fit"
              style={{ background: `rgba(255, 0, 0, 0.06)` }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
              >
                <path
                  d="M15.4924 23.2131C15.8596 23.2131 16.1653 23.0925 16.4094 22.8513C16.6535 22.6101 16.7756 22.3059 16.7756 21.9386C16.7756 21.5714 16.655 21.2657 16.4138 21.0216C16.1726 20.7775 15.8684 20.6554 15.5011 20.6554C15.1339 20.6554 14.8282 20.776 14.5841 21.0172C14.34 21.2584 14.2179 21.5626 14.2179 21.9299C14.2179 22.2971 14.3385 22.6028 14.5797 22.8469C14.8209 23.091 15.1251 23.2131 15.4924 23.2131ZM15.5141 17.2916C15.8348 17.2916 16.1092 17.1774 16.3373 16.9491C16.5654 16.7207 16.6794 16.445 16.6794 16.1218V8.58808C16.6794 8.27106 16.565 7.99815 16.3361 7.76938C16.1072 7.54063 15.8342 7.42625 15.517 7.42625C15.1937 7.42625 14.918 7.54063 14.6899 7.76938C14.4618 7.99815 14.3478 8.27106 14.3478 8.58808V16.1218C14.3478 16.445 14.462 16.7207 14.6905 16.9491C14.9189 17.1774 15.1935 17.2916 15.5141 17.2916ZM15.5006 30.9935C13.3575 30.9935 11.3427 30.5862 9.45617 29.7716C7.56967 28.9571 5.92867 27.8516 4.53317 26.4552C3.13767 25.0588 2.03326 23.4191 1.21996 21.5362C0.406652 19.6533 0 17.6414 0 15.5006C0 13.3575 0.407292 11.3427 1.22187 9.45617C2.03643 7.56967 3.14192 5.92867 4.53833 4.53317C5.93472 3.13767 7.57438 2.03326 9.45729 1.21996C11.3402 0.406652 13.3521 0 15.4929 0C17.636 0 19.6508 0.407292 21.5373 1.22188C23.4238 2.03643 25.0648 3.14192 26.4603 4.53833C27.8558 5.93472 28.9602 7.57437 29.7735 9.45729C30.5868 11.3402 30.9935 13.3521 30.9935 15.4929C30.9935 17.636 30.5862 19.6508 29.7716 21.5373C28.9571 23.4238 27.8516 25.0648 26.4552 26.4603C25.0588 27.8558 23.4191 28.9602 21.5362 29.7735C19.6533 30.5868 17.6414 30.9935 15.5006 30.9935Z"
                  fill="#FF0000"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-[20px] text-[#303030] font-bold text-center">
            Purchase failed
          </h2>
          <p className="text-[14px] text-[#6F6464] leading-[18px] text-center">
            Please check your details and try again. If the issue persists,
            contact our support team for assistance
          </p>

          <Link href={"/trip-audit"}>
            <button className="bg-[#2D65F2] rounded-md py-3 px-5 w-full text-white text-[16px] font-bold my-10">
              Okay
            </button>
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentFailed;
