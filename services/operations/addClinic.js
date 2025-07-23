import { toast } from "react-hot-toast";
import { setLoading } from "../../src/slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";

const { ADD_CLINIC_API } = endpoints;

export function addClinic(clinicName, city, colony, latitude, longitude, userId) {
  return async (dispatch) => {
    const toastId = toast.loading("Adding clinic...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", ADD_CLINIC_API, {
        clinicName,
        city,
        colony,
        latitude,
        longitude,
        userId,
      });

      console.log("Add Clinic API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Clinic Added Successfully ✅");
    } catch (error) {
      console.error("Add Clinic API ERROR:", error);
      toast.error("Could not add clinic ❌");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
