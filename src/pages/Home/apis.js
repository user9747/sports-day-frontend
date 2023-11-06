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
    mutationFn: (event) => axios.post(`events/register/${event.id}`),
    onSuccess: (data, input) => {
      queryClient.invalidateQueries({ queryKey: ["useGetRegisteredEvents"] });
      toast.success(`Registered for ${input.name}`);
    },
  });
};

export const useUnRegisterEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event) => axios.post(`events/unregister/${event.id}`),
    onSuccess: (data, input) => {
      queryClient.invalidateQueries({ queryKey: ["useGetRegisteredEvents"] });
      toast.info(`UnRegistered from ${input.name}`);
    },
  });
};
