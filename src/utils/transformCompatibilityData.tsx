// Interface for the capability object in the API response
interface Capability {
  permission: string;
  endpoint: string;
  capable: boolean;
  reason: string | null;
}

// Interface for each car object in the API response
interface ApiCarResponse {
  vin: string;
  compatible: boolean;
  capabilities?: Capability[];
  isCompatible: boolean;
  message: string;
}

// Interface for the transformed car data
export interface TransformedCarData {
  vin: string;
  isCompatible: boolean;
  endpoints: EndpointStatus[];
}

interface EndpointStatus {
  endpoint: string;
  capable: boolean;
}

// Function to transform API response data
const transformCompatibilityData = (data: ApiCarResponse[]) => {
  return data.map((car) => {
    const endpoints = car.capabilities?.map((capability) => ({
      endpoint: capability.endpoint,
      capable: capability.capable,
    }));

    return {
      vin: car.vin,
      isCompatible: car.isCompatible,
      endpoints,
    };
  });
};

export default transformCompatibilityData;
