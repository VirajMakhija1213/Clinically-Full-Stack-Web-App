import { toast } from "react-hot-toast";
import { setLoading } from "../../src/slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";

const { GET_CLINICS } = endpoints;

// This is a thunk action creator
export function getAllClinics({ setClinics }) {
  // It returns an async function that can perform side effects
  return async (dispatch) => {
    // Update toast message to reflect the current action
    const toastId = toast.loading("Fetching clinics...");
    dispatch(setLoading(true));

    try {
      // Make the API call to get all clinics
      const response = await apiConnector("GET", GET_CLINICS);

      console.log("GET ALL CLINICS API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
      setClinics(response.data.data);
      
      // Update success toast message

    } catch (error) {
      console.error("GET ALL CLINICS API ERROR:", error);
      // Update error toast message
      toast.error("Could not fetch clinics ❌");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}