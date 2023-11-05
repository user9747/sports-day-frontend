import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "../../../axios";
import { toast } from "react-toastify";

export const useGetEvents = () =>
  useQuery({
    queryKey: ["useGetEvents"],
    queryFn: async () => {
      return axios.get(`/events/list`);
    },
    select: (data) => data.data?.data?.events,
    keepPreviousData: true,
  });

export const useGetRegisteredEvents = () =>
  useQuery({
    queryKey: ["useGetRegisteredEvents"],
    queryFn: async () => {
      return axios.get(`/events/list-registered`);
    },
    select: (data) => data.data?.data?.events,
    keepPreviousData: true,
  });

export const useRegisterEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => axios.post(`events/register/${eventId}`),
    onSuccess: (data, input) => {
      queryClient.invalidateQueries({ queryKey: ["useGetRegisteredEvents"] });
      toast.success("Registered Successfully");
    },
  });
};

export const useUnRegisterEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => axios.post(`events/unregister/${eventId}`),
    onSuccess: (data, input) => {
      queryClient.invalidateQueries({ queryKey: ["useGetRegisteredEvents"] });
      toast.success("UnRegistered Successfully");
    },
  });
};
