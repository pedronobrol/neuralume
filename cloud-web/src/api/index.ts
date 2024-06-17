export * from "./auth";

export type RequestStatus = {
  completed: boolean;
  success: boolean;
  errorMessage: string | null | undefined;
};
