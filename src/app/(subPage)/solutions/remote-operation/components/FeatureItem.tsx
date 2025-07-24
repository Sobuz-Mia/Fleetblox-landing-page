import CheckIcon from "@/components/icons/CheckIcon"

interface FeatureItemProps {
  title: string
  description: string
}

const FeatureItem = ({ title, description }: FeatureItemProps) => {
  return (
    <div className="flex items-center gap-5 w-full">
      <div>
        <CheckIcon />
      </div>
      <div>
        <h3 className="text-[#333] font-openSans text-[18px] font-bold mb-[5px] leading-6">
          {title}
        </h3>
        <p className="text-[16px] leading-6 text-[#7D7D7D] font-openSans">
          {description}
        </p>
      </div>
    </div>
  )
}

export default FeatureItem 